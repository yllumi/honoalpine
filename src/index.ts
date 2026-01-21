import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import api from "./routes";

const app = new Hono();
const isProd = process.env.NODE_ENV === 'production';

// Memasang semua route controller yang sudah didefinisikan di backend
app.route("/", api);

// Serve file statis
// Di HTML, Anda bisa memanggil /static/components.min.js
app.use("/static/*", serveStatic({ 
  root: "./", 
  rewriteRequestPath: (path) => path.replace(/^\/static/, isProd ? "/public/dist" : "/src/static" ),
}));

// Serving template halaman
app.get(
  "/template/*",
  serveStatic({ 
    root: "./", 
    rewriteRequestPath: (path) => path.replace(/^\/template/, '/src/views/pages'),
    mimes: { html: "text/html" },
  })
);

// Serving template partial
app.get(
  "/component/*",
  serveStatic({ 
    root: "./", 
    rewriteRequestPath: (path) => path.replace(/^\/component/, '/src/views/components'),
    mimes: { html: "text/html" },
  })
);

// Halaman utama sekaligus fallback menampilkan main layout
// karena frontend routing di-handle oleh Alpine + Pinecone Router
app.get("*", serveStatic({ path: "/src/views/index.html" }));

export default {
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  fetch: app.fetch,
};
