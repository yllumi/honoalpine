import { Hono } from 'hono'
import { HelloTemplate } from './template' // Import template JSX
import pool from '../../config/db'                 // Import koneksi database

const hello = new Hono()

hello.get('/', (c) => {
  return c.html(<HelloTemplate />)
})

hello.get('/data', async (c) => {
  try {
    // Melakukan query ke database
    const [rows] = await pool.query('SELECT * FROM mein_microblogs ORDER BY id DESC')
    
    // Mengembalikan data sebagai JSON
    return c.json({
      status: 'ok',
      blogs: rows
    })
  } catch (error: any) {
    console.error("Database Error:", error.message)
    return c.json({ 
      status: 'error', 
      message: 'Gagal mengambil data dari database' 
    }, 500)
  }
})

export default hello