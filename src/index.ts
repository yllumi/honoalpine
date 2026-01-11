import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import routes from './routes'

const app = new Hono()

// Serving file statik (CSS, JS, Gambar)
app.use('/templates/*', serveStatic({ root: './src/' }))

// Memasang semua route yang sudah didefinisikan
app.route('/', routes)

export default {
  port: 3000,
  fetch: app.fetch,
}