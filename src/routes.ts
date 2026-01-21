import { Hono } from 'hono'
import home from './controllers/home'
import about from './controllers/about'

// Semua route disini under segment /api
const api = new Hono().basePath('/api')

api.route('/home', home)
api.route('/about', about)

export default api