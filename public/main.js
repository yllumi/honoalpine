document.addEventListener("alpine:init", () => {
  window.PineconeRouter.settings({
    basePath: "/",
    targetID: "app",
  });

  Alpine.store('core', {
    module: 'home',
  })

  // Frontend template routers
  // window.PineconeRouter.add("/", { templates: ["/template/home"], preload: true });
});
