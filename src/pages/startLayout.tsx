export const StartLayout = (props: { title: string, children: any }) => {
  return (
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{props.title}</title>
        
        <script src="https://cdn.tailwindcss.com"></script>
        
        <script src="https://cdn.jsdelivr.net/npm/pinecone-router@7.3.0/dist/router.min.js"></script>
        <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

        <style>{`
            /* Custom Theme Colors */
            :root {
                --tosca: #20b2aa;
                --orange: #ff8c00;
            }
            .bg-tosca { background-color: var(--tosca); }
            .text-tosca { color: var(--tosca); }
            .text-hero-orange { color: var(--orange); }
            .border-tosca { border-color: var(--tosca); }
        `}</style>
    </head>
    <body class="bg-slate-50 font-sans antialiased text-slate-800">

        <main x-data>
            {props.children}
        </main>

    </body>
    </html>
  )
}