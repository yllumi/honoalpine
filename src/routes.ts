import { Hono } from 'hono'
import { Home } from './controllers/Home'

const routes = new Hono()

// Kumpulan route Anda
routes.get('/', (c) => Home.renderIndex(c))
routes.get('/api/status', (c) => Home.getApiStatus(c))

// Anda bisa menambah route lain di sini tanpa mengotori index.ts
// routes.get('/about', (c) => c.text('Halaman About'))

export default routes