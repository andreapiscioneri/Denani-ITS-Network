<script setup lang="ts">
import type { Sector } from '~/data/sectors'

const props = defineProps<{
  sector?: Sector
}>()

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Meccatronica', href: '/settori/meccatronica-automotive' },
  { label: 'Energia & Ambiente', href: '/settori/energia-ambiente' },
  { label: 'ICT & Digital', href: '/settori/ict-digital' },
  { label: 'Agroalimentare', href: '/settori/agroalimentare' },
  { label: 'Sistema Moda', href: '/settori/sistema-moda' }
]

const founding = computed(() => {
  if (props.sector) return props.sector.partners.logos.map(l => l.name)
  return ['ITS Lombardia Meccatronica', 'ITS Energia & Ambiente', 'ITS Tech Talent Factory', 'ITS Agroalimentare', 'ITS Sistema Moda']
})

const foundingHeader = computed(() => {
  if (props.sector) return 'Founding Partner del settore'
  return 'Filiere ITS coperte'
})

const contactLinks = [
  { label: 'support@denani.it', href: 'mailto:support@denani.it' },
  { label: 'Bergamo, Italia', href: null },
  { label: 'denani.odoo.com', href: 'https://denani.odoo.com/' }
]
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="/DENANI-LOGO-WHITE.webp" alt="DENANI S.R.L" class="footer-denani-logo" />
          <p>
            Strategia e coordinamento a cura di <strong>DENANI S.R.L</strong>. Marketing strategico, branding e comunicazione per gli ITS Academy d'Italia e per le filiere industriali ad alta occupabilità tecnica.
          </p>
        </div>

        <div class="footer-col">
          <h4>Network</h4>
          <ul>
            <li v-for="link in navLinks" :key="link.label">
              <NuxtLink :to="link.href">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>{{ foundingHeader }}</h4>
          <ul>
            <li v-for="name in founding" :key="name">
              <span class="footer-text">{{ name }}</span>
            </li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Contatti</h4>
          <ul>
            <li v-for="link in contactLinks" :key="link.label">
              <a v-if="link.href" :href="link.href">{{ link.label }}</a>
              <span v-else class="footer-text">{{ link.label }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div>© 2026 · Tutti i diritti riservati a Denani S.R.L</div>
        <div class="social-row">
          <a href="https://www.linkedin.com/company/denanisrl/posts/?feedView=all" target="_blank" rel="noopener" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a href="https://www.facebook.com/DENANISRL" target="_blank" rel="noopener" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="https://www.instagram.com/denanisrl/" target="_blank" rel="noopener" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="https://www.tiktok.com/@denanisrl" target="_blank" rel="noopener" aria-label="TikTok">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/></svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer { background: var(--black); color: rgba(255,255,255,0.6); padding: 80px 32px 40px; }
.footer-inner { max-width: 1320px; margin: 0 auto; }
.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 56px;
  padding-bottom: 56px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.footer-denani-logo { height: 60px; width: auto; margin-bottom: 16px; display: block; }
.footer-brand p { font-size: 0.9375rem; color: rgba(255,255,255,0.5); max-width: 38ch; }
.footer-brand p strong { color: rgba(255,255,255,0.85); font-weight: 600; }
.footer-col h4 {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--white);
  font-weight: 600;
  margin-bottom: 20px;
}
.footer-col ul { list-style: none; }
.footer-col li { margin-bottom: 12px; }
.footer-col a {
  color: rgba(255,255,255,0.55);
  font-size: 0.9375rem;
  text-decoration: none;
  transition: color 0.3s var(--ease);
}
.footer-col a:hover { color: var(--sector-accent, var(--white)); }
.footer-text { color: rgba(255,255,255,0.55); font-size: 0.9375rem; }
.footer-bottom {
  padding-top: 32px;
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 20px;
  font-size: 0.8125rem;
  color: rgba(255,255,255,0.45);
}
.social-row { display: flex; gap: 12px; }
.social-row a {
  width: 40px; height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.12);
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  transition: all 0.3s var(--ease);
}
.social-row a:hover { background: var(--white); color: var(--black); border-color: var(--white); }
.social-row svg { width: 16px; height: 16px; }

@media (max-width: 980px) {
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
}
@media (max-width: 600px) {
  .footer-grid { grid-template-columns: 1fr; }
}
</style>
