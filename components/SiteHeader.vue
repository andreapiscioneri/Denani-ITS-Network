<script setup lang="ts">
import { sectorsList } from '~/data/sectors'

const props = defineProps<{
  /** Slug del settore corrente — usato per evidenziare la voce nel menu Settori */
  currentSector?: string
  /** Mostra ancore interne alla pagina (per landing settoriali) */
  showAnchors?: boolean
}>()

const scrolled = ref(false)
const mobileMenuOpen = ref(false)
const sectorMenuOpen = ref(false)

const onScroll = () => {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

const handleAnchor = (e: MouseEvent, id: string) => {
  const target = document.querySelector(id)
  if (target) {
    e.preventDefault()
    window.scrollTo({ top: (target as HTMLElement).offsetTop - 80, behavior: 'smooth' })
  }
  mobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const toggleSectorMenu = () => {
  sectorMenuOpen.value = !sectorMenuOpen.value
}

// Chiude il menu settori quando clicca fuori
const onDocClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.sector-dropdown')) {
    sectorMenuOpen.value = false
  }
}
onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))

const anchors = [
  { label: 'Il settore', href: '#ecosistema' },
  { label: 'Cosa impari', href: '#campagna' },
  { label: 'Esperienza', href: '#kpi' },
  { label: 'Testimonianze', href: '#mantenimento' },
  { label: 'Open day', href: '#scenario' },
  { label: 'Contatti', href: '#download' }
]
</script>

<template>
  <header class="site-header" :class="{ scrolled }">
    <div class="header-inner">
      <NuxtLink to="/" class="brand-mark" aria-label="Denani ITS Network — Home">
        <span class="logo-fondazione">
          <span class="blue">Denani</span><br />
          <span class="green">/ITS Network</span>
        </span>
        <span class="tagline">Marketing per ITS Academy</span>
      </NuxtLink>

      <nav class="nav-main" aria-label="Navigazione principale">
        <template v-if="props.showAnchors">
          <a v-for="a in anchors" :key="a.href" :href="a.href" @click="handleAnchor($event, a.href)">{{ a.label }}</a>
        </template>
      </nav>

      <a href="https://denani.odoo.com/" target="_blank" rel="noopener" class="quality-seal" aria-label="A cura di DENANI S.R.L">
        <span class="seal-dot" aria-hidden="true"></span>
        <span class="seal-text">
          <small>A cura di</small>
          <img src="/DENANI-LOGO-WHITE.webp" alt="DENANI S.R.L" class="denani-logo" />
        </span>
      </a>

      <button v-if="props.showAnchors" class="hamburger" :class="{ active: mobileMenuOpen }" @click="toggleMobileMenu" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <nav v-if="mobileMenuOpen" class="nav-mobile" aria-label="Navigazione mobile">
      <template v-if="props.showAnchors">
        <div class="nav-mobile-section">
          <div class="nav-mobile-label">Sezioni</div>
          <a v-for="a in anchors" :key="a.href" :href="a.href" @click="handleAnchor($event, a.href)">{{ a.label }}</a>
        </div>
      </template>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  padding: 16px clamp(16px, 2.4vw, 32px);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  background: rgba(5, 8, 15, 0.6);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  transition: all 0.4s var(--ease);
}
.site-header.scrolled {
  padding: 10px clamp(16px, 2.4vw, 32px);
  background: rgba(5, 8, 15, 0.88);
  border-bottom-color: rgba(255,255,255,0.08);
}
.header-inner { max-width: 1320px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 32px; }
.brand-mark { display: flex; align-items: center; gap: 12px; text-decoration: none; }
.brand-mark .logo-fondazione {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 1.0625rem;
  line-height: 1;
  letter-spacing: -0.02em;
}
.brand-mark .logo-fondazione .blue { color: #fff; }
.brand-mark .logo-fondazione .green { color: #0066ff; }
.brand-mark .tagline {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: rgba(255,255,255,0.4);
  border-left: 1px solid rgba(255,255,255,0.12);
  padding-left: 12px;
  font-weight: 500;
}

.nav-main { display: flex; gap: 28px; align-items: center; }
.nav-main a, .nav-main .sector-toggle {
  font-size: 0.9375rem; color: rgba(255,255,255,0.68); text-decoration: none;
  font-weight: 500; position: relative; transition: color 0.3s var(--ease);
  background: none; border: none; cursor: pointer; font-family: inherit;
  padding: 0;
}
.nav-main a::after {
  content: ''; position: absolute; bottom: -6px; left: 0; right: 0; height: 1px;
  background: #0066ff; transform: scaleX(0); transform-origin: right;
  transition: transform 0.4s var(--ease);
}
.nav-main a:hover { color: #fff; }
.nav-main a:hover::after { transform: scaleX(1); transform-origin: left; }

.sector-dropdown { position: relative; }
.sector-toggle {
  display: inline-flex; align-items: center; gap: 4px;
}
.sector-toggle .caret { font-size: 0.65rem; transition: transform 0.3s var(--ease); }
.sector-toggle.active .caret { transform: rotate(180deg); }
.sector-toggle:hover { color: var(--sector-accent, var(--navy)); }

.sector-menu {
  position: absolute; top: calc(100% + 14px); left: -16px;
  min-width: 320px;
  background: rgba(255,255,255,0.98);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: 8px;
  display: flex; flex-direction: column; gap: 2px;
}
.sector-item {
  display: flex; align-items: flex-start; gap: 12px;
  padding: 12px 14px;
  border-radius: var(--radius-sm);
  text-decoration: none;
  color: var(--navy-deep);
  transition: background 0.25s var(--ease);
}
.sector-item:hover, .sector-item.active { background: var(--fog); }
.sector-item.active { color: var(--navy); }
.sector-item::after { display: none !important; }
.sector-dot {
  width: 10px; height: 10px; border-radius: 50%;
  margin-top: 6px;
  box-shadow: 0 0 0 3px rgba(0,0,0,0.04);
  flex-shrink: 0;
}
.sector-item-name { font-weight: 600; font-size: 0.9375rem; line-height: 1.2; }
.sector-item-filiera { font-size: 0.75rem; color: var(--slate-light); margin-top: 2px; }

.quality-seal {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 14px 8px 10px;
  border-radius: 100px;
  background: linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 100%);
  color: var(--white);
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  box-shadow: var(--shadow-md);
  transition: all 0.3s var(--ease);
  position: relative;
  overflow: hidden;
}
.denani-logo { height: 16px; width: auto; display: block; }
.seal-text img { height: 16px; width: auto; }
.quality-seal::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(120deg, transparent, rgba(255,255,255,0.18), transparent);
  transform: translateX(-100%);
  transition: transform 0.8s var(--ease);
}
.quality-seal:hover::before { transform: translateX(100%); }
.quality-seal:hover { transform: translateY(-1px); box-shadow: var(--shadow-lg); }
.seal-dot { width: 8px; height: 8px; border-radius: 50%; background: #7dd3fc; box-shadow: 0 0 12px #7dd3fc; }
.seal-text { display: flex; flex-direction: row; align-items: center; gap: 6px; line-height: 1.1; }
.seal-text small { font-size: 0.625rem; opacity: 0.7; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; white-space: nowrap; }

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  margin: -8px;
}
.hamburger span {
  width: 24px;
  height: 2px;
  background: rgba(255,255,255,0.85);
  border-radius: 1px;
  transition: all 0.3s var(--ease);
}
.hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(8px, 8px); }
.hamburger.active span:nth-child(2) { opacity: 0; }
.hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(8px, -8px); }

.nav-mobile {
  display: none;
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  background: rgba(5, 8, 15, 0.88);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(255,255,255,0.07);
  flex-direction: column;
  padding: 20px clamp(16px, 2.4vw, 32px) 28px;
  gap: 24px;
  max-height: 80vh;
  overflow-y: auto;
}
.nav-mobile-section { display: flex; flex-direction: column; gap: 8px; }
.nav-mobile-label {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: rgba(255,255,255,0.35);
  font-weight: 600;
  margin-bottom: 4px;
}
.nav-mobile a, .nav-mobile-sector {
  display: flex; align-items: center; gap: 10px;
  font-size: 1rem;
  color: rgba(255,255,255,0.68);
  text-decoration: none;
  font-weight: 500;
  padding: 6px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.nav-mobile-sector .sector-dot { margin-top: 0; }
.nav-mobile a:hover, .nav-mobile-sector:hover { color: #fff; }

@media (max-width: 980px) {
  .nav-main { display: none; }
  .hamburger { display: flex; }
  .nav-mobile { display: flex; }
  .tagline { display: none; }
  .brand-mark { margin-right: auto; }
  .quality-seal {
    margin-left: auto;
    margin-right: 2px;
  }
}
@media (max-width: 760px) {
  .header-inner { gap: 10px; }
  .quality-seal { padding: 6px 9px; }
  .seal-text { gap: 4px; }
  .quality-seal .seal-text small { display: inline; font-size: 0.58rem; }
  .hamburger { margin: -6px; padding: 6px; }
  .hamburger span { width: 22px; }
}
@media (max-width: 540px) {
  .brand-mark .logo-fondazione { font-size: 0.875rem; }
  .quality-seal { padding: 6px 10px; gap: 6px; }
  .seal-dot { width: 7px; height: 7px; }
  .denani-logo { height: 14px; }
}
</style>
