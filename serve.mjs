// Tiny static server for local preview. Run: node serve.mjs
// Then open http://localhost:4321

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, extname, normalize } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 4321;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".woff2": "font/woff2",
  ".svg": "image/svg+xml",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
};

createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const rel = normalize(path === "/" ? "/index.html" : path).replace(/^([/\\])+/, "");
  try {
    const file = await readFile(join(root, rel));
    res.writeHead(200, {
      "content-type": TYPES[extname(rel)] || "application/octet-stream",
      "cache-control": "no-store",
    });
    res.end(file);
  } catch {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("Not found");
  }
}).listen(PORT, () => console.log(`idc. running at http://localhost:${PORT}`));
