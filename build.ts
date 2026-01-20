// build.ts
import { rmSync } from "node:fs";

// 1. Bersihkan folder dist lama agar tidak menumpuk
try {
  rmSync("./public/dist", { recursive: true, force: true });
} catch (e) {
  // Folder belum ada, abaikan
}

console.log("📦 Building frontend assets...");

// 2. Jalankan Bun Build untuk minify
const jsResult = await Bun.build({
  entrypoints: [
    "./src/static/js/components.js",
    "./src/static/js/main.js",
    "./src/static/js/helpers.js",
  ],
  outdir: "./public/dist/js",
  minify: true,
  naming: "[name].[ext]",
});

const cssResult = await Bun.build({
  entrypoints: [
    "./src/static/css/style.css",
    "./src/static/css/custom.css",
  ],
  outdir: "./public/dist/css",
  minify: true,
  naming: "[name].[ext]",
});

const result = {
  success: jsResult.success && cssResult.success,
  logs: [...(jsResult.logs ?? []), ...(cssResult.logs ?? [])],
};

if (result.success) {
  console.log("✅ Build success: Assets minified in ./public/dist");
} else {
  console.error("❌ Build failed");
  console.error(result.logs);
}
