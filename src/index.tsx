import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import page from "./routes";
import { AppLayout } from "./pages/appLayout";

const app = new Hono();
const isProd = process.env.NODE_ENV === 'production';

// Memasang semua page route controller yang sudah didefinisikan di backend
app.route("/", page);

// Serve file statis
// Di HTML, Anda bisa memanggil /static/components.min.js
app.use("/static/*", serveStatic({ 
  root: "./", 
  rewriteRequestPath: (path) => path.replace(/^\/static/, isProd ? "/public/dist" : "/src/static" ),
}));

// Halaman utama sekaligus fallback menampilkan main layout
// karena frontend routing di-handle oleh Alpine + Pinecone Router
app.get("*", async (c) => {
  return c.html(<AppLayout />)
});

export default {
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  fetch: app.fetch,
};
