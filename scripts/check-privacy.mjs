import { execFileSync } from "node:child_process";
import { lstatSync, readFileSync } from "node:fs";
import { approvedResumeHashes, resumePath, sha256 } from "./resume.mjs";

const git = (...args) =>
  execFileSync("git", args, { maxBuffer: 128 * 1024 * 1024 });
const paths = (args) => git(...args).toString().split("\0").filter(Boolean);
const localPath =
  /(?:^|\/)(?:\.vercel(?:\/|$)|\.env(?:[.-]|\/|$)|\.npmrc$|auth\.json$|credentials\.json$|id_(?:rsa|ed25519|ecdsa|dsa)$)|\.(?:pem|key|pfx|p12)$/i;
const credentialPatterns = [
  /-----BEGIN (?:[A-Z0-9]+ )*PRIVATE KEY-----/,
  /\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}|npm_[A-Za-z0-9]{30,}|(?:AKIA|ASIA)[A-Z0-9]{16})\b/,
  /\b(?:VERCEL_(?:TOKEN|OIDC_TOKEN)|GH_TOKEN|GITHUB_TOKEN|NPM_TOKEN|NODE_AUTH_TOKEN)\s*[:=]\s*["']?[A-Za-z0-9._-]{16,}\b/,
];

const failures = new Set();
function reviewPath(path) {
  if (localPath.test(path)) failures.add("local credential or Vercel path");
  if (/\.pdf$/i.test(path) && path !== resumePath) {
    failures.add("unapproved PDF path");
  }
}

function reviewBytes(bytes, path) {
  const pdf = /%PDF-[0-9]\.[0-9]/.test(bytes.subarray(0, 1024).toString("latin1"));
  if (pdf || /\.pdf$/i.test(path)) {
    if (
      !pdf ||
      path !== resumePath ||
      !approvedResumeHashes.includes(sha256(bytes))
    ) {
      failures.add("unapproved PDF content");
    }
    return;
  }
  if (
    !bytes.subarray(0, 8192).includes(0) &&
    credentialPatterns.some((pattern) => pattern.test(bytes.toString("utf8")))
  ) {
    failures.add("possible credential in source");
  }
}

// Check every historical path, even if a later commit removed or renamed it.
for (const path of paths([
  "log", "--format=", "--name-only", "--no-renames",
  "--diff-merges=first-parent", "-z", "HEAD",
])) {
  reviewPath(path);
}

// Check the index separately from the working copy and inspect each Git blob once.
const objects = new Map();
for (const entry of git("rev-list", "--objects", "HEAD").toString().trim().split("\n")) {
  const separator = entry.indexOf(" ");
  if (separator !== -1) objects.set(entry.slice(0, separator), new Set([entry.slice(separator + 1)]));
}
for (const entry of paths(["ls-files", "--stage", "-z"])) {
  const tab = entry.indexOf("\t");
  const [, oid] = entry.slice(0, tab).split(" ");
  const path = entry.slice(tab + 1);
  reviewPath(path);
  if (!objects.has(oid)) objects.set(oid, new Set());
  objects.get(oid).add(path);
}

const objectTypes = execFileSync("git", ["cat-file", "--batch-check=%(objectname) %(objecttype)"], {
  input: [...objects.keys()].join("\n") + "\n",
  encoding: "utf8",
}).trim().split("\n");
for (const object of objectTypes) {
  const [oid, type] = object.trim().split(" ");
  if (type !== "blob") continue;
  const bytes = git("cat-file", "blob", oid);
  for (const name of objects.get(oid)) reviewBytes(bytes, name);
}
for (const path of new Set(paths(["ls-files", "-z", "--cached", "--others", "--exclude-standard"]))) {
  reviewPath(path);
  const stats = lstatSync(path, { throwIfNoEntry: false });
  if (stats?.isFile()) reviewBytes(readFileSync(path), path);
}

const resume = lstatSync(resumePath, { throwIfNoEntry: false });
if (!resume?.isFile() || sha256(readFileSync(resumePath)) !== approvedResumeHashes.at(-1)) {
  failures.add("current public résumé does not match the approved revision");
}

if (failures.size) {
  // Paths and matched text may themselves contain private values.
  for (const failure of failures) console.error(`Privacy check failed: ${failure}`);
  process.exitCode = 1;
} else {
  console.log("Privacy checks passed for history, index, and publishable working files.");
}
