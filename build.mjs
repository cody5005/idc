// Builds two self-contained files from src/app.template.html:
//
//   index.html     a full standalone page — drop it on any static host
//   artifact.html  the same page as a body fragment, for Claude Artifacts
//
// Both inline the two variable webfonts as data URIs, so neither file
// makes a single outbound request. Run: node build.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "src");

const b64 = (name) => readFileSync(join(src, "fonts", name)).toString("base64");

const template = readFileSync(join(src, "app.template.html"), "utf8")
  .replace("__FREDOKA_B64__", b64("fredoka-latin.woff2"))
  .replace("__NUNITO_B64__", b64("nunito-latin.woff2"));

// Artifacts wrap the file in their own <head>/<body>, so ship it whole.
writeFileSync(join(here, "artifact.html"), template);

// For the standalone page, split the template where <head> content ends.
const splitAt = template.indexOf("</style>") + "</style>".length;
if (splitAt < "</style>".length) throw new Error("template is missing its </style>");
const head = template.slice(0, splitAt).trim();
const body = template.slice(splitAt).trim();

const indent = (text, pad) =>
  text
    .split("\n")
    .map((line) => (line.trim() ? pad + line : ""))
    .join("\n");

const FAVICON =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="82" font-size="82">💅</text></svg>'
  );

const standalone = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <meta name="description" content="The reply they deserve. A shareable troll page for anyone who got a text too long to care about." />
    <meta name="robots" content="index, follow" />
    <meta property="og:title" content="idc. – I Don't Care Quiz 💅" />
    <meta property="og:description" content="Someone has a very important message for you…" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="idc. – I Don't Care Quiz 💅" />
    <meta name="twitter:description" content="Someone has a very important message for you…" />
    <meta name="theme-color" content="#fdf2f6" />
    <link rel="icon" href="${FAVICON}" />
${indent(head, "    ")}
  </head>
  <body>
${indent(body, "    ")}
  </body>
</html>
`;

writeFileSync(join(here, "index.html"), standalone);

const kb = (s) => (Buffer.byteLength(s) / 1024).toFixed(0) + " KB";
console.log(`artifact.html  ${kb(template)}`);
console.log(`index.html     ${kb(standalone)}`);
