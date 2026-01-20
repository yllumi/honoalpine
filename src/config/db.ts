import mysql from 'mysql2/promise'

// Pastikan DB_NAME ada, jika tidak aplikasi mungkin error saat query
if (!Bun.env.DB_NAME) {
  console.warn("⚠️ Peringatan: DB_NAME tidak ditemukan di environment variable!");
}

export const pool = mysql.createPool({
  host: Bun.env.DB_HOST,
  user: Bun.env.DB_USER,
  password: Bun.env.DB_PASS,
  database: Bun.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});