import { mkdir, writeFile, exists } from 'fs/promises';
import { join } from 'path';

interface MakePageOptions {
  withScript?: boolean;
}

export async function makePage(name: string, options: MakePageOptions = {}) {
  const { withScript = false } = options;
  const pageName = name.toLowerCase();
  const PageName = capitalize(name);
  const pageDir = join(process.cwd(), 'src', 'pages', pageName);
  
  // Check if page already exists
  if (await exists(pageDir)) {
    console.error(`❌ Error: Page "${pageName}" already exists!`);
    process.exit(1);
  }
  
  console.log(`📦 Generating page: ${pageName}...`);
  
  // Create directory
  await mkdir(pageDir, { recursive: true });
  
  // Generate controller.tsx
  let controllerContent = `import { Hono } from 'hono'
import { ${PageName}Template } from './template'

const ${pageName} = new Hono()

${pageName}.get('/', async (c) => {
  return c.html(<${PageName}Template />)
})

${pageName}.get('/data', async (c) => {
  return c.json({ 
    status: 'ok', 
    message: 'This is a generated page. Edit this file at src/pages/${pageName}/template.tsx'
  })
})

`;

if (withScript) {
  controllerContent += `
${pageName}.get('/getinfo', async (c) => {
  return c.json({ 
    status: 'ok', 
    info: 'And this text came from the script.js via custom Alpine.data script.' 
  })
})

`;
}

controllerContent += `
export default ${pageName}
`;
  
  await writeFile(join(pageDir, 'controller.tsx'), controllerContent);
  console.log(`  ✅ Created: src/pages/${pageName}/controller.tsx`);
  
  // Generate template.tsx
  let templateContent = '';

  if(withScript) {
    templateContent += `import { raw } from 'hono/html'
import scriptContent from "./script.js?raw"

`;
  }

  templateContent += `export const ${PageName}Template = () => {
  return (
    <div id="page-${PageName}" x-data="$heroic.page({ url: 'page/${pageName}/data' })">`;

  if(withScript) {
    templateContent += `
      <div x-data="${pageName}">`;
  } else {
    templateContent += `
      <div>
      `;
  }

  templateContent += `
        <div id="appCapsule" class="px-3 mt-5">
          <h1>Welcome to ${PageName} Page</h1>
          <p x-html="data.message"></p>
          `;

  if(withScript) {
    templateContent += `
          <p x-html="info"></p>`;
  }

  templateContent += `
        </div>
        `;

  if(withScript) {
    templateContent += `
        <script>{raw(scriptContent)}</script>
      `;
  }
  
  templateContent += `
      </div>
    </div>
  );
};
`;
  
  await writeFile(join(pageDir, 'template.tsx'), templateContent);
  console.log(`  ✅ Created: src/pages/${pageName}/template.tsx`);
  
  // Generate script.js (optional, only if --with-script flag is provided)
  if (withScript) {
    const scriptContent = `// Client-side script for ${pageName} page

Alpine.data("${pageName}", function () {
  return {
    info: "",

    init() {
      // Fetch data from the server
      try {
        $heroic.fetch("page/${pageName}/getinfo")
          .then((response) => {
            if (response.data && response.data.info) {
              this.info = response.data.info;
            }
          })
          .catch((error) => {
            console.error('Error fetching ${pageName} data:', error);
          });
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
  };
});
`;
    
    await writeFile(join(pageDir, 'script.js'), scriptContent);
    console.log(`  ✅ Created: src/pages/${pageName}/script.js`);
  }
  
  console.log(`\n✨ Page "${pageName}" generated successfully!`);
  console.log(`\nNext steps:`);
  console.log(`  1. Add route to src/routes.ts:`);
  console.log(`     import ${pageName} from './pages/${pageName}/controller'`);
  console.log(`     page.route('/${pageName}', ${pageName})`);
  console.log(`  2. Add client-side route at: src/pages/layout.tsx:`);
  console.log(`     <template x-route="/${pageName}" x-template="/page/${pageName}"></template>`);
  
  if (!withScript) {
    console.log(`\n💡 Tip: Use -s or --with-script to generate script.js file`);
  }
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
