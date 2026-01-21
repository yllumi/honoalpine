Alpine.data("blogManager", () => ({
  description: "Halo dari Alpine.js di halaman Hello World!",
  list: [],
  async init() {
    Alpine.store("core").module = "hello";
    const res = await fetch("/page/hello/data");
    this.list = await res.json();
  },
}));
