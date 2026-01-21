import { Hono } from 'hono'
import notFound from './pages/notfound/controller'
import home from './pages/home/controller'
import blog from './pages/blog/controller'
import about from './pages/about/controller'

// Semua server-side route disini
const page = new Hono()

page.route('/', home)
page.route('/notfound', notFound)
page.route('/blog', blog)
page.route('/about', about)

export default page