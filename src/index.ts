import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import routes from "./routes/backend";

const app = new Hono();

// Serving file statik (CSS, JS, Gambar)
app.use("/static/*", serveStatic({ root: "./" }));
app.use("/main.js", serveStatic({ root: "./", rewriteRequestPath: (path) => path.replace(/^\/main.js/, '/src/routes/frontend.js'), }));

// Serving template halaman
app.get(
  "/template/*",
  serveStatic({ 
    root: "./src/", 
    rewriteRequestPath: (path) => path.replace(/^\/template/, '/pages'),
    mimes: { html: "text/html", css: "text/css", js: "application/javascript" }
  })
);

// Halaman utama sekaligus fallback menampilkan main layout
app.get("*", async (c) => {
  try {
    const file = Bun.file("./src/layout.html");
    const html = await file.text();
    return c.html(html);
  } catch (e) {
    return c.text("File layout.html tidak ditemukan", 404);
  }
});

// Memasang semua route yang sudah didefinisikan
app.route("/", routes);

export default {
  port: 3000,
  fetch: app.fetch,
};
