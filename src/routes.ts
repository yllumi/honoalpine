import { Hono } from 'hono'
import home from './controllers/home'

// Semua route disini under segment /api
const api = new Hono().basePath('/api')
api.route('/home', home)

export default api