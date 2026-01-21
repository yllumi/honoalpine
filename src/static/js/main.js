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

  Alpine.store("core", {
    module: "home",
  });

  // Tambahkan di $heroic object
  $heroic.loadPageScript = function (scriptPath, callback) {
    // Hapus script lama jika ada
    const oldScript = document.querySelector(
      `script[data-page-script="${scriptPath}"]`,
    );
    if (oldScript) {
      oldScript.remove();
    }

    // Load script baru dengan timestamp untuk bypass cache
    const script = document.createElement("script");
    script.src = `${scriptPath}?t=${Date.now()}`;
    script.dataset.pageScript = scriptPath;
    script.onload = () => {
      if (callback) callback();
    };
    document.head.appendChild(script);
  };

  // Frontend template routers
  // window.PineconeRouter.add("/", { templates: ["/template/home"], preload: true });
});
