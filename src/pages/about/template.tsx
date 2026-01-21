export const AboutTemplate = () => {
  return (
    <div id="about" x-data="$heroic.page({url:'page/about/data'})">
      <template x-if="!ui.loading">
        <section x-init="Alpine.store('core').module = 'about'">
          <ha-header title="About Us"></ha-header>

          <div id="appCapsule" class="px-3 mt-3">
            <p x-html="data.description"></p>
          </div>

          <ha-bottommenu></ha-bottommenu>
        </section>
      </template>
    </div>
  );
};