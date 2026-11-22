import { createHash } from "node:crypto";

export const resumePath = "public/saturn_amarbat.pdf";
export const resumeRoute = "/saturn_amarbat.pdf";
// Keep previous explicitly approved public revisions here when replacing the PDF.
export const approvedResumeHashes = [
  "1b482a453137e62cedaa0f0e81c9d05bafac11fae246e46f2c05b05ee66f71f7",
];

export const sha256 = (bytes) =>
  createHash("sha256").update(bytes).digest("hex");
