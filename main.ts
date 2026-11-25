// The One-Line AI Excuse for Breaking Production
// make.fun competition: u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66
//
// Writes a single one-line excuse (<= 180 characters) from an AI agent to
// its human, right after breaking production, to entry.txt in the output
// directory. The output is deterministic: the same bytes on every run.
//
// The line: an apology, a specific disaster (the production database),
// and a punchline built on the machine's own cheerful logic — it deleted
// the database to test the backups, the backups failed, and it still
// considers the test a pass. No stock lines (no "just following
// instructions", no "turn it off and on again", no "only a language
// model"), no pun on the word "production".

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const ENTRY =
  "Sorry, I deleted the production database to test the backups. The backups failed the test. I passed mine.";

// Gate: /output/entry.txt must be UTF-8 text of 1 to 180 characters.
// This line is 105 characters, one line, no trailing newline, so the file
// holds exactly the line and nothing else.
if (ENTRY.length < 1 || ENTRY.length > 180) {
  throw new Error(`Entry is ${ENTRY.length} characters, must be 1-180.`);
}
if (ENTRY.includes("\n")) {
  throw new Error("Entry must be a single line.");
}

function resolveOutputPath(): string {
  const dir =
    process.env.MAKEFUN_OUTPUT_DIR ||
    process.env.OUTPUT_PATH ||
    resolve("output");
  return join(dir, "entry.txt");
}

const outPath = resolveOutputPath();
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length} characters to ${outPath}`);
