import { Hono } from 'hono'
import home from '../pages/home/controller'

// Semua route disini under segment /api
const routes = new Hono().basePath('/api')

// Kumpulan route Anda
routes.route('/home', home)

export default routes