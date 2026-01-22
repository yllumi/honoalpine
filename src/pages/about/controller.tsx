import { Hono } from 'hono'
import { AboutTemplate } from './template'

const about = new Hono()

about.get('/template', (c) => {
  return c.html(<AboutTemplate />)
})

about.get('/data', (c) => {
  return c.json({ 
    status: 'ok', 
    message: 'This is a generated page. Edit this file at src/pages/about/template.tsx'
  })
})


export default about
