export const HomeTemplate = () => {
  return (
    <section
        id="home" 
        x-data="$heroic.page({url: 'page/home/data'})" 
        x-init="Alpine.store('core').module = 'home'">
        <ha-header title="Beranda"></ha-header>

        <div id="appCapsule" class="px-3" x-data="home">
          <div class="blog-list mt-2">
            <template x-for="item in data.blog" x-bind:key="item.id">
              <div class="card mb-2 p-2">
                <h3 x-text="item.title" class="h3 mb-3"></h3>
                <p x-html="item.content" class="lead"></p>
              </div>
            </template>

            <template x-if="data.blog.length === 0">
              <p>Memuat konten...</p>
            </template>
          </div>
        </div>

        <ha-bottommenu></ha-bottommenu>
    </section>
  );
};
