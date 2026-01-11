import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import routes from "./routes";

const app = new Hono();

// Serving file statik (CSS, JS, Gambar)
app.use("/static/*", serveStatic({ root: "./" }));
app.use("/main.js", serveStatic({ path: "/public/main.js" }));
app.use("/components.js", serveStatic({ path: "/public/templates/partials/_components.js" }));

// Serving template halaman
app.get(
  "/template/*",
  serveStatic({ 
    root: "./", 
    rewriteRequestPath: (path) => path.replace(/^\/template/, '/public/templates'),
    mimes: { html: "text/html" }
  })
);

// Halaman utama sekaligus fallback menampilkan main layout
// karena frontend routing di-handle oleh Alpine + Pinecone Router
app.get("*", serveStatic({ path: "/public/layout.html" }));

// Memasang semua route controller yang sudah didefinisikan
app.route("/", routes);

export default {
  port: 3000,
  fetch: app.fetch,
};
