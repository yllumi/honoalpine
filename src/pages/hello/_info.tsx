import { raw } from 'hono/html'
import scriptContent from "./_info.js?raw";

export const InfoTemplate = () => {
  return (
    <div x-data="blogManager">
      <h1>Info Page</h1>
      <h2 x-text="description"></h2>

      <div class="blog-list mt-2">
        <template x-for="blog in list.blogs">
          <p x-text="blog.title"></p>
        </template>
      </div>

      <script>{raw(scriptContent)}</script>
    </div>
  );
};
