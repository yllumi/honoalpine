// =================== // ==================== // ==================== //
// Registrasikan custom elements untuk komponen disini
// ==================== // ==================== // ==================== //

customElements.define('ha-bottommenu', class extends HTMLElement {
    connectedCallback() { loadComponent(this, '/template/partials/bottommenu.html'); }
});
customElements.define('ha-header', class extends HTMLElement {
    connectedCallback() { loadComponent(this, '/template/partials/header.html'); }
});

// ==================== // ==================== // ==================== //
// Function helper untuk memuat dan memasang komponen 
// ==================== // ==================== // ==================== //
const templateCache = {};
async function loadComponent(element, path) {
    let html;

    // 1. Cek apakah template sudah ada di cache
    if (templateCache[path]) {
        html = templateCache[path];
    } else {
        // 2. Jika belum ada, fetch dari server
        const res = await fetch(path);
        html = await res.text();
        // Simpan ke cache untuk penggunaan berikutnya
        templateCache[path] = html;
    }

    // 3. Proses "Props" (sama seperti sebelumnya)
    let processedHtml = html;
    for (let i = 0; i < element.attributes.length; i++) {
        const attr = element.attributes[i];
        const placeholder = new RegExp(`{{${attr.name}}}`, 'g');
        processedHtml = processedHtml.replace(placeholder, attr.value);
    }

    element.innerHTML = processedHtml;

    // 4. Beritahu Alpine untuk memproses elemen baru ini
    if (window.Alpine) {
        window.Alpine.initTree(element);
    }
}