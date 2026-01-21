export const AboutTemplate = () => {
  return (
    <div 
      id="page-About" 
      x-data="$heroic.page({ url: 'about/data' })"
      x-init="Alpine.store('core').module = 'about'"
    >
      <div>
        <ha-header></ha-header>
      
        <div id="appCapsule" class="px-3 mt-5">
          <h1>Welcome to About Page</h1>
          <p x-html="data.message"></p>
        </div>

        <ha-bottommenu></ha-bottommenu>
      </div>
    </div>
  );
};
