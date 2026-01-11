import { Hono } from 'hono'
import mysql from 'mysql2/promise'

const home = new Hono()

// Konfigurasi Koneksi Database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'admin',      // Sesuaikan dengan user mysql Anda
  password: 'admin',      // Sesuaikan dengan password mysql Anda
  database: 'masagi',
  waitForConnections: true,
  connectionLimit: 10,
});

home.get('/', async (c) => {
  try {
    // Query data dari tabel
    const [rows] = await pool.query('SELECT id, title, content FROM mein_microblogs ORDER BY id DESC');
    
    return c.json({ 
      status: 'ok', 
      data: rows 
    });
  } catch (error) {
    console.error(error);
    return c.json({ status: 'error', message: 'Gagal mengambil data' }, 500);
  }
})

export default home