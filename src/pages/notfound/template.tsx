export const NotFoundTemplate = () => {
  return (
    <div id="home">
      <ha-header title="Page Not Found"></ha-header>

      <div id="appCapsule" class="px-3">
        <div class="text-center mt-2">
          <img src="/static/img/not-found.min.png" alt="" class="mb-3 w-50" />
          <h3>Halaman tidak ditemukan</h3>
          <p>Kembali ke <a href="/">Beranda</a></p>
        </div>
      </div>

      <ha-bottommenu></ha-bottommenu>
    </div>
  );
};