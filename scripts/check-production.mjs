import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { once } from "node:events";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";
import { approvedResumeHashes, resumeRoute, sha256 } from "./resume.mjs";

const canonical = "https://www.saturnmade.tech";
const reservation = createServer().listen(0, "127.0.0.1");
await once(reservation, "listening");
const { port } = reservation.address();
await new Promise((resolve) => reservation.close(resolve));
const origin = `http://127.0.0.1:${port}`;
const next = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));
const child = spawn(
  process.execPath,
  [next, "start", "--hostname", "127.0.0.1", "--port", String(port)],
  { stdio: ["ignore", "ignore", "inherit"] },
);
const closed = once(child, "close");

const fetchRoute = (path) =>
  fetch(origin + path, { signal: AbortSignal.timeout(3000) });
const allowsIndexing = (response) =>
  assert.doesNotMatch(response.headers.get("x-robots-tag") ?? "", /\b(?:noindex|none)\b/i);

try {
  let home;
  for (let attempt = 0; attempt < 40 && child.exitCode === null; attempt++) {
    try {
      home = await fetchRoute("/");
      break;
    } catch {
      await delay(250);
    }
  }
  assert.equal(home?.status, 200, "Production homepage unavailable. Run the build first.");
  allowsIndexing(home);
  const html = await home.text();
  assert.ok(html.includes(`rel="canonical" href="${canonical}"`), "Canonical URL differs");
  const robotsMeta = html.match(/<meta\b[^>]*name="(?:robots|googlebot)"[^>]*>/gi) ?? [];
  for (const meta of robotsMeta) {
    assert.ok(!/\b(?:noindex|none)\b/i.test(meta), "Robots meta blocks homepage indexing");
  }
  assert.ok(html.includes('property="og:image"') && html.includes('name="twitter:image"'));
  const download = /<a\b(?=[^>]*href="\/saturn_amarbat\.pdf")[^>]*\sdownload(?:=""|(?=[\s>]))[^>]*>/;
  assert.ok(download.test(html), "Approved résumé download link missing");

  const pdf = await fetchRoute(resumeRoute);
  assert.equal(pdf.status, 200);
  assert.match(pdf.headers.get("content-type") ?? "", /^application\/pdf\b/);
  assert.match(pdf.headers.get("x-robots-tag") ?? "", /\bnoindex\b/i);
  assert.equal(sha256(Buffer.from(await pdf.arrayBuffer())), approvedResumeHashes.at(-1));

  for (const [path, type] of [
    ["/robots.txt", /text\/plain/],
    ["/sitemap.xml", /xml/],
    ["/icon.svg", /image\/svg\+xml/],
    ["/manifest.webmanifest", /json/],
    ["/opengraph-image", /image\//],
    ["/twitter-image", /image\//],
  ]) {
    const response = await fetchRoute(path);
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get("content-type") ?? "", type, path);
    allowsIndexing(response);
    const body = await response.text();
    if (path === "/robots.txt") {
      assert.match(body, /^User-Agent:\s*\*\s*$/im);
      assert.match(body, /^Allow:\s*\/\s*$/im);
      assert.doesNotMatch(body, /^Disallow:\s*\/\s*$/im);
      assert.ok(body.includes(`${canonical}/sitemap.xml`));
    }
    if (path === "/sitemap.xml") assert.ok(body.includes(canonical));
  }
  console.log("Production smoke passed for the homepage, SEO routes, and approved résumé.");
} finally {
  child.kill();
  await closed;
}
