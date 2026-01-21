import { Hono } from 'hono'
import notFound from './pages/notfound/controller'
import home from './pages/home/controller'
import about from './pages/about/controller'
import hello from './pages/hello/controller'

// Semua route disini under segment /page
const page = new Hono().basePath('/page')

page.route('/notfound', notFound)
page.route('/home', home)
page.route('/about', about)
page.route('/hello', hello)

export default page