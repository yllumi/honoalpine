import { Hono } from 'hono'
import { AboutTemplate } from './template'

const about = new Hono()

about.get('/', (c) => {
  return c.html(<AboutTemplate />)
})

about.get('/data', async (c) => {
  return c.json({ 
    status: 'ok', 
    description: 'Ini data untuk halaman about!' 
  })
})

export default about