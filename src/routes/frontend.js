document.addEventListener("alpine:init", () => {
  window.PineconeRouter.settings({
    basePath: "/",
    targetID: "app",
  });

  // Frontend template routers
  window.PineconeRouter.add("/", { templates: ["/template/home"] });
  window.PineconeRouter.add("/about", { templates: ["/template/about"] });
});
