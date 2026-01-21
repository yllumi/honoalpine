export const Layout = () => {
  return (
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#05b2c5" />

        <title>My App</title>
        <link rel="stylesheet" href="/static/css/style.css" />
        <link rel="stylesheet" href="/static/css/custom.css" />
        
        <script src="//cdn.jsdelivr.net/npm/pinecone-router@7.3.0/dist/router.min.js"></script>
        <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
        <script src="/static/js/heroic.js"></script>
        <script src="/static/js/components.js"></script>
        <script src="/static/js/main.js"></script>
      </head>
      <body>
        <div id="app" x-data></div>

        <div id="router" x-data>
          <template x-route="/" x-template="/page/home"></template>
          <template x-route="notfound" x-template="/page/notfound"></template>
          <template x-route="/about" x-template="/page/about"></template>
          <template x-route="/hello" x-template="/page/hello"></template>
        </div>
      </body>
    </html>
  )
}