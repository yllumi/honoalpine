import { Hono } from 'hono'
import { StartLayout } from '../startLayout'
import { HomeTemplate } from './template'

const home = new Hono()

home.get('/', async (c) => {
  return c.html(
    <StartLayout title="Home">
      <HomeTemplate />
    </StartLayout>
  )
})

home.get('/data', async (c) => {
  return c.json({ 
    status: 'ok', 
    message: 'This is a generated page. Edit this file at src/pages/home/template.tsx'
  })
})


export default home
