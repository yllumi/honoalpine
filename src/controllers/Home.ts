import { Context } from 'hono'

export class Home {
  static async renderIndex(c: Context) {
    try {
      const file = Bun.file('./src/index.html')
      const html = await file.text()
      return c.html(html)
    } catch (e) {
      return c.text('File index.html tidak ditemukan', 404)
    }
  }

  static async getApiStatus(c: Context) {
    return c.json({ status: 'ok', message: 'Server berjalan dengan Bun!' })
  }
}