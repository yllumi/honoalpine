// =================== // ==================== // ==================== //
// Registrasikan custom elements untuk komponen disini
// ==================== // ==================== // ==================== //

customElements.define('ha-bottommenu', class extends HTMLElement {
    connectedCallback() { loadComponent(this, '/component/bottommenu.html'); }
});
customElements.define('ha-header', class extends HTMLElement {
    connectedCallback() { loadComponent(this, '/component/header.html'); }
});