document.addEventListener("alpine:init", () => {
  window.PineconeRouter.settings({
    basePath: "/",
    targetID: "app",
    fetchOptions: {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("heroic_token"),
      },
    },
  });

  Alpine.store('core', {
    module: 'home',
  })

  // Frontend template routers
  // window.PineconeRouter.add("/", { templates: ["/template/home"], preload: true });
});
