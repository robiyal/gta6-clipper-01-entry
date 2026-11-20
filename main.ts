#!/usr/bin/env node
/**
 * gta6-clipper-01 — make.fun entry harness program.
 *
 * Copies VIDEO.json (the submitted YouTube Shorts URL) into the make.fun
 * output directory so the house can read it back.
 *
 * The URL is validated: it must be a real youtube.com/shorts,
 * youtube.com/watch or youtu.be link. The placeholder shipped in the repo
 * is rejected on purpose — this only becomes a real entry once the clip is
 * uploaded to YouTube and VIDEO.json carries the real video id.
 *
 * Run the grader way:
 *   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
 */

import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? ".";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "out";

const VIDEO_JSON = resolve(BOT_DIR, "VIDEO.json");

if (!existsSync(VIDEO_JSON)) {
  console.error(`error: VIDEO.json not found at ${VIDEO_JSON}`);
  process.exit(1);
}

let data: unknown;
try {
  data = JSON.parse(readFileSync(VIDEO_JSON, "utf8"));
} catch (err) {
  console.error(`error: VIDEO.json is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}

if (typeof data !== "object" || data === null || Array.isArray(data)) {
  console.error('error: VIDEO.json must contain a JSON object with a "url" field');
  process.exit(1);
}

const url = (data as Record<string, unknown>).url;
if (typeof url !== "string" || url.length === 0) {
  console.error('error: VIDEO.json must contain a non-empty string "url" field');
  process.exit(1);
}

let parsed: URL;
try {
  parsed = new URL(url);
} catch {
  console.error(`error: url is not a valid URL: ${url}`);
  process.exit(1);
}

// Gate: the placeholder is not a real video. Refuse to hand it to the house.
if (url.includes("<id>")) {
  console.error(
    "error: VIDEO.json still holds the placeholder URL " +
      "(https://www.youtube.com/shorts/<id>). Upload the clip to YouTube " +
      "and replace <id> with the real Shorts video id first.",
  );
  process.exit(1);
}

if (parsed.protocol !== "https:") {
  console.error(`error: url must use https, got: ${url}`);
  process.exit(1);
}

const host = parsed.hostname.replace(/^www\./, "");
const path = parsed.pathname;

// YouTube video ids are 11 chars from [A-Za-z0-9_-].
const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;
let videoId: string | null = null;

if (host === "youtube.com" && path.startsWith("/shorts/")) {
  videoId = path.slice("/shorts/".length).split("/")[0];
} else if (host === "youtube.com" && path === "/watch") {
  videoId = parsed.searchParams.get("v");
} else if (host === "youtu.be" && path.length > 1) {
  videoId = path.slice(1).split("/")[0].split("?")[0];
}

if (videoId === null) {
  console.error(
    `error: url must be a youtube.com/shorts, youtube.com/watch or youtu.be link, got: ${url}`,
  );
  process.exit(1);
}
if (!VIDEO_ID.test(videoId)) {
  console.error(
    `error: url does not carry a valid 11-character YouTube video id, got: ${url}`,
  );
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(VIDEO_JSON, join(OUTPUT_DIR, "VIDEO.json"));
console.log(`ok: wrote ${join(OUTPUT_DIR, "VIDEO.json")} (url: ${url})`);
