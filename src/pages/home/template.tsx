export const HomeTemplate = () => {
  return (
    <div class="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <div class="mb-6 mt-10 inline-block px-4 py-1 bg-tosca/10 text-tosca rounded-full text-sm font-bold uppercase tracking-widest">
        Installation Successful
      </div>

      <h1 class="text-6xl md:text-8xl font-black text-slate-900 mb-6">
        <div>Stay <span class="text-tosca">Fast.</span></div>
        <div>Be <span class="text-hero-orange">Heroic.</span></div>
      </h1>

      <p class="text-xl text-slate-600 max-w-2xl mb-10">
        Your new metaframework powered by <span class="font-mono font-bold text-slate-900">Bun + Hono</span> is ready. 
        Build high-performance applications with zero friction.
      </p>

      <div class="flex flex-col md:flex-row gap-4">
        <button class="px-8 py-4 bg-tosca hover:bg-[#1a968f] text-white rounded-xl font-bold shadow-lg shadow-tosca/20 transition-all transform hover:-translate-y-1">
          Get Started
        </button>
      </div>

      <div class="mt-20 flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
        <a href="https://bun.com/" class="flex items-center gap-2 font-bold"><span>Bun</span></a>
        <a href="https://hono.dev/" class="flex items-center gap-2 font-bold"><span>Hono</span></a>
        <a href="https://alpinejs.dev/" class="flex items-center gap-2 font-bold"><span>Alpine.js</span></a>
        <a href="https://pinecone-router.pages.dev/" class="flex items-center gap-2 font-bold"><span>Pinecone</span></a>
      </div>
    </div>
  );
};
