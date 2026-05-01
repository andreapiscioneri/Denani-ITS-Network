<script setup lang="ts">
defineProps<{
  sectorName: string
  accentColor: string
}>()

const year = new Date().getFullYear()

const contacts = [
  { label: 'info@fondazionedalmine.it', href: 'mailto:info@fondazionedalmine.it' },
  { label: 'Via Marconi 5, Dalmine (BG)', href: null },
  { label: '+39 035 563 511', href: 'tel:+390355563511' }
]

const info = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Cookie Policy', href: '#' },
  { label: 'Note Legali', href: '#' }
]
</script>

<template>
  <footer class="sec-footer">
    <div class="sec-footer-glow" aria-hidden="true"></div>
    <div class="sec-footer-inner">
      <div class="sec-footer-top">
        <div class="sec-brand">
          <div class="sec-logo">
            <span class="sec-logo-its">ITS</span>
            <span class="sec-logo-name">Academy</span>
          </div>
          <p>
            Percorsi biennali post-diploma di alta specializzazione tecnica. Collegati alle imprese
            leader del territorio lombardo per un accesso diretto al mercato del lavoro.
          </p>
          <div class="sec-territory">
            <span class="ter-tag">Bergamo</span>
            <span class="ter-tag">Brescia</span>
            <span class="ter-tag">Milano</span>
            <span class="ter-tag">Lombardia</span>
          </div>
        </div>

        <div class="sec-col">
          <h4>Orientamento</h4>
          <ul>
            <li><a href="#open-day-live">Open Day</a></li>
            <li><a href="#overview-story">Il Percorso</a></li>
            <li><a href="#learning-story">Laboratori</a></li>
            <li><a href="#experience-story">Stage</a></li>
          </ul>
        </div>

        <div class="sec-col">
          <h4>Contatti</h4>
          <ul>
            <li v-for="c in contacts" :key="c.label">
              <a v-if="c.href" :href="c.href">{{ c.label }}</a>
              <span v-else>{{ c.label }}</span>
            </li>
          </ul>
        </div>

        <div class="sec-col">
          <h4>Social</h4>
          <div class="sec-socials">
            <a href="https://www.instagram.com" target="_blank" rel="noopener" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://www.tiktok.com" target="_blank" rel="noopener" aria-label="TikTok">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/></svg>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
            </a>
          </div>
          
        </div>
      </div>

      <div class="sec-footer-bottom">
        <div class="sec-bottom-left">
          <span>© {{ year }} ITS Academy · Tutti i diritti riservati</span>
          <span class="sep" aria-hidden="true">·</span>
          <a href="https://denani.odoo.com/" target="_blank" rel="noopener" class="made-by">
            Powered by Denani S.R.L
          </a>
        </div>
        <div class="sec-bottom-right">
          <a v-for="l in info" :key="l.label" :href="l.href">{{ l.label }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.sec-footer {
  background: #030609;
  color: rgba(255, 255, 255, 0.55);
  padding: clamp(56px, 8vw, 80px) 0 clamp(24px, 4vw, 36px);
  position: relative;
  overflow: hidden;
}

.sec-footer-glow {
  position: absolute;
  top: 0; left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--sector-accent, #0066ff), transparent);
  opacity: 0.4;
}

.sec-footer-inner { max-width: 1320px; margin: 0 auto; }

.sec-footer-top {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1fr;
  gap: clamp(24px, 4vw, 56px);
  padding-bottom: clamp(24px, 4vw, 56px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.sec-logo {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-bottom: 18px;
}
.sec-logo-its {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.625rem;
  font-weight: 800;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
}
.sec-logo-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.02em;
}

.sec-brand p {
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.44);
  max-width: 36ch;
  line-height: 1.65;
  margin-bottom: 18px;
}

.sec-territory {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.ter-tag {
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.5);
}

.sec-col h4 {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 700;
  margin-bottom: 20px;
}
.sec-col ul { list-style: none; }
.sec-col li { margin-bottom: 12px; }
.sec-col a {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9375rem;
  text-decoration: none;
  transition: color 0.25s ease;
}
.sec-col a:hover { color: rgba(255, 255, 255, 0.9); }
.sec-col span {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9375rem;
}

.sec-socials {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
.sec-socials a {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.55);
  transition: all 0.25s ease;
}
.sec-socials a:hover {
  background: var(--sector-accent, #0066ff);
  border-color: var(--sector-accent, #0066ff);
  color: #fff;
  transform: translateY(-2px);
}
.sec-socials svg { width: 15px; height: 15px; }

.wa-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.25);
  color: #4ade80 !important;
  font-size: 0.8rem !important;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
  letter-spacing: 0 !important;
}
.wa-btn:hover { background: rgba(34, 197, 94, 0.2); color: #86efac !important; }
.wa-btn svg { width: 15px; height: 15px; flex-shrink: 0; }

.sec-footer-bottom {
  padding-top: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}
.sec-bottom-left {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.8125rem;
  flex-wrap: wrap;
}
.sep { color: rgba(255, 255, 255, 0.2); }
.made-by {
  color: rgba(255, 255, 255, 0.35) !important;
  font-size: 0.8125rem !important;
  text-decoration: none;
  transition: color 0.2s;
}
.made-by:hover { color: rgba(255, 255, 255, 0.7) !important; }

.sec-bottom-right {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.sec-bottom-right a {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.35);
  text-decoration: none;
  transition: color 0.2s;
}
.sec-bottom-right a:hover { color: rgba(255, 255, 255, 0.7); }

@media (max-width: 980px) {
  .sec-footer-top { grid-template-columns: 1fr 1fr; gap: 36px; }
}
@media (max-width: 600px) {
  .sec-footer-top { grid-template-columns: 1fr; gap: 32px; }
  .sec-footer-bottom { flex-direction: column; align-items: flex-start; gap: 12px; }
  .sec-bottom-right {
    gap: 14px;
  }
}
</style>
