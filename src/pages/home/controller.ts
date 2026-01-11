import { Hono } from 'hono'

const home = new Hono()

home.get('/', async (c) => {
  return c.json({ status: 'ok', message: 'Ini data untuk halaman home!' })
})

export default home