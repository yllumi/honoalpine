import { ArticleTemplate } from './_article'
import { FooterTemplate } from './_footer'

export const DashboardTemplate = () => {
  return (
    <div class="page page-current" id="dashboard" x-data="dashboard()">
        <style>{`
        .w48 { width: 48px; }
        .shortcut { width: 60px; }
        `}</style>

        <div class="appHeader bg-brand-2">
            <div class="left ps-2">
            </div>
            <div class="pageTitle">
                <img src="<?= base_url('mobilekit/assets/img/masagi/logo-masagi-min.png') ?>" alt="" style="height: 45px" />
            </div>
            <div class="right">
            </div>
        </div>

        <div id="appCapsule" class="pb-0">
            <div class="header-large-title mt-2 mb-3 w-100" style="position: absolute;top: 55px;">
                <div class="d-flex align-items-center justify-content-start gap-3">
                    <div class="use text-light">
                        <p class="m-0">Ahlan wa sahlan,</p>
                        <div class="h5 m-0" x-text="Alpine.store('core').user.name"></div>
                    </div>
                </div>

                <div class="card mt-1 rounded-bottom-5 rounded-end-5 shadow">
                    <div class="px-3 py-2 d-flex justify-content-center">
                        <a href="/feeds" class="text-center shortcut">
                            <img src="<?= base_url('mobilekit/assets/img/masagi/info-min.png') ?>" alt="info" class="w48" />
                            <h6 class="mb-1">Kabar</h6>
                        </a>
                        <a href="/anggota" class="text-center shortcut">
                            <img src="<?= base_url('mobilekit/assets/img/masagi/anggota-min.png') ?>" alt="anggota" class="w48" />
                            <h6 class="mb-1">Anggota</h6>
                        </a>
                        <a href="/iuran" class="text-center shortcut">
                            <img src="<?= base_url('mobilekit/assets/img/masagi/iuran-min.png') ?>" alt="iuran" class="w48" />
                            <h6 class="mb-1">Iuran</h6>
                        </a>
                        <a href="/profile" class="text-center shortcut">
                            <img src="<?= base_url('mobilekit/assets/img/masagi/account-min.png') ?>" alt="akun" class="w48" />
                            <h6 class="mb-1">Akun</h6>
                        </a>
                    </div>
                </div>
            </div>

            <div style="height: 140px;margin-bottom: 20px;border-radius: 0 0 50% 50%; background-color: #1875ad !important; background: linear-gradient(180deg, rgba(24, 117, 173, 1) 0%, rgba(24, 117, 173, 1) 10%, rgba(0, 212, 255, 1) 100%);"></div>

            <ArticleTemplate />
            <FooterTemplate />
        </div>
    </div>
  );
};
