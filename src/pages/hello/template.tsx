import { InfoTemplate } from "./_info";

export const HelloTemplate = () => {
  return (
    <div 
      id="pageHello" 
      x-data="$heroic.page({ url: 'page/hello/data' })">
      <ha-header title="Beranda"></ha-header>

      <div id="appCapsule" class="px-3">
        <div class="blog-list mt-2">
          <template x-for="blog in data.blogs">
            <p x-text="blog.title"></p>
          </template>
        </div>

        <InfoTemplate />
      </div>

      <ha-bottommenu></ha-bottommenu>
    </div>
  );
};
