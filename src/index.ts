import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import api from "./routes";

const app = new Hono();

// Memasang semua route controller yang sudah didefinisikan di backend
app.route("/", api);

// Serving file statik (CSS, JS, Gambar)
app.use("/static/*", serveStatic({ root: "./" }));
app.use("/main.js", serveStatic({ path: "/src/views/main.js" }));
app.use("/helper.js", serveStatic({ path: "/src/views/helper.js" }));
app.use("/components.js", serveStatic({ path: "/src/views/components.js" }));

// Serving template halaman
app.get(
  "/template/*",
  serveStatic({ 
    root: "./", 
    rewriteRequestPath: (path) => path.replace(/^\/template/, '/src/views/pages'),
    mimes: { html: "text/html" }
  })
);

// Halaman utama sekaligus fallback menampilkan main layout
// karena frontend routing di-handle oleh Alpine + Pinecone Router
app.get("*", serveStatic({ path: "/src/views/index.html" }));

export default {
  port: 3000,
  fetch: app.fetch,
};
