import { Hono } from 'hono'

const about = new Hono()

about.get('/', async (c) => {
  return c.json({ status: 'ok', message: 'Ini data untuk halaman about!' })
})

export default about