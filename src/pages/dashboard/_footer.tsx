export const FooterTemplate = () => {
    return (
        <footer class="appFooter text-center p-3">
            <div class="d-flex justify-content-center">
                <img src="/mobilekit/assets/img/logo-pemuda-min.png" class="logo-pemuda-footer me-2 w-10 mb-3" />
            </div>

            <div class="footer-title">
                Masagi App © 2024 by Pemuda Persis Bandung Barat
            </div>
            <div class="">
                <i class="bi bi-building"></i> Gedung Pusat Dakwah Persatuan Islam (PUSDAPI) Mandalasari,
                Kec. Cipatat, Kabupaten Bandung Barat, Jawa Barat 40554 <br />
                Kontak: 08986818780
            </div>

            <div class="mt-2">
                <a href="https://www.instagram.com/pemudapersisbandungbarat" class="btn btn-icon btn-sm btn-instagram" target="_blank">
                    <i class="bi bi-instagram"></i>
                </a>
                <a href="https://api.whatsapp.com/send?phone=628986818780" class="btn btn-icon btn-sm btn-whatsapp" target="_blank">
                    <i class="bi bi-whatsapp"></i>
                </a>
            </div>
        </footer>
    );
};