import { Hono } from 'hono'
import notFound from './pages/notfound/controller'
import home from './pages/home/controller'

// Semua route disini under segment /page
const page = new Hono().basePath('/page')

page.route('/notfound', notFound)
page.route('/home', home)

export default page