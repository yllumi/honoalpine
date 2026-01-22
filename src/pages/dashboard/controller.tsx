import { Hono } from 'hono'
import { AppLayout } from '../appLayout'
import { DashboardTemplate } from './template'

const dashboard = new Hono()

dashboard.get('/', (c) => {
  return c.html(<AppLayout />)
})

dashboard.get('/template', (c) => {
  return c.html(<DashboardTemplate />)
})

dashboard.get('/data', (c) => {
  return c.json({ 
    status: 'ok', 
    message: 'This is a generated page. Edit this file at src/pages/dashboard/template.tsx'
  })
})


export default dashboard
