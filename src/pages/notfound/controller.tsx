import { Hono } from 'hono'
import { NotFoundTemplate } from './template'

const notFound = new Hono()

notFound.get('/template', (c) => {
  return c.html(<NotFoundTemplate />)
})

export default notFound