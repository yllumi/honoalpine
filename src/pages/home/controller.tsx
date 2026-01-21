import { Hono } from 'hono'
import pool from '../../config/db'
import { HomeTemplate } from './template'

const home = new Hono()

home.get('/', (c) => {
  return c.html(<HomeTemplate />)
})

home.get('/data', async (c) => {
  try {
    // Query data dari tabel
    const [rows] = await pool.query('SELECT id, title, content FROM mein_microblogs ORDER BY id DESC');
    
    return c.json({ 
      status: 'ok',
      blog: rows 
    });

  } catch (error) {
    console.error(error);
    return c.json({ 
      status: 'error', 
      message: 'Gagal mengambil data' 
    }, 500);
  }
})

export default home