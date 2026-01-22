import { Hono } from 'hono'
import { Glob } from "bun"

const page = new Hono()
const glob = new Glob("src/pages/**/controller.tsx")

console.log("🚀 Auto-registering routes...")

// Kita gunakan loop untuk memindai semua controller
for (const file of glob.scanSync(".")) {
  // 1. Dapatkan nama folder (misal: "src/pages/home/controller.tsx" -> "home")
  // 2. Jika path adalah "src/pages/product/detail/controller.tsx" -> "product/detail"
  const routePath = file
    .replace("src/pages/", "")
    .replace("/controller.tsx", "")
    .replace("home", "") // "home" biasanya dijadikan root "/"

  // 3. Import controller secara dinamis
  const module = await import(`./${file.replace("src/", "")}`)
  const controller = module.default

  if (controller instanceof Hono) {
    const finalPath = `/${routePath}`
    console.log(`   Mapped: ${finalPath || '/'}`)
    page.route(finalPath, controller)
  }
}

export default page