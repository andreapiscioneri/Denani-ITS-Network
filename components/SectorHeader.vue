<script setup lang="ts">
defineProps<{
  sectorName: string
  sectorFiliera: string
  accentColor: string
}>()

const scrolled = ref(false)
const mobileOpen = ref(false)

const onScroll = () => { scrolled.value = window.scrollY > 40 }

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const anchors = [
  { label: 'Il Settore', href: '#overview-story' },
  { label: 'Imparerai', href: '#learning-story' },
  { label: 'Esperienza', href: '#experience-story' },
  { label: 'Testimonianze', href: '#testimonials-story' }
]

const scrollTo = (e: MouseEvent, id: string) => {
  const el = document.querySelector(id)
  if (el) {
    e.preventDefault()
    window.scrollTo({ top: (el as HTMLElement).offsetTop - 80, behavior: 'smooth' })
  }
  mobileOpen.value = false
}
</script>

<template>
  <header class="sector-hdr" :class="{ scrolled, 'mobile-open': mobileOpen }">
    <div class="hdr-inner">
      <div class="brand">
        <div class="brand-logo">
          <span class="brand-its">ITS</span>
          <span class="brand-fondazione">Academy</span>
        </div>
        <div class="brand-sep" aria-hidden="true"></div>
        <div class="sector-badge" :style="{ '--badge-accent': accentColor }">
          <span class="sector-dot" aria-hidden="true"></span>
          {{ sectorFiliera }}
        </div>
      </div>

      <nav class="hdr-nav" aria-label="Sezioni landing">
        <a v-for="a in anchors" :key="a.href" :href="a.href" @click="scrollTo($event, a.href)">
          {{ a.label }}
        </a>
      </nav>

      <a href="#open-day-live" class="hdr-cta" @click="scrollTo($event, '#open-day-live')">
        Open Day <span class="arr">↓</span>
      </a>

      <button class="hbg" :class="{ open: mobileOpen }" @click="mobileOpen = !mobileOpen" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>

      <nav v-if="mobileOpen" class="hdr-mobile" aria-label="Navigazione mobile">
      <a v-for="a in anchors" :key="a.href" :href="a.href" @click="scrollTo($event, a.href)">{{ a.label }}</a>
      <a href="#open-day-live" class="mobile-cta" @click="scrollTo($event, '#open-day-live')">Prenota Open Day ↓</a>
    </nav>
  </header>
</template>

<style scoped>
.sector-hdr {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 16px clamp(16px, 2.4vw, 32px);
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.sector-hdr.scrolled {
  padding: 10px clamp(16px, 2.4vw, 32px);
  background: rgba(5, 8, 15, 0.88);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.sector-hdr.mobile-open {
  background: rgba(5, 8, 15, 0.92);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.hdr-inner {
  max-width: 1320px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: clamp(14px, 2vw, 28px);
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
}

.brand-logo {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.brand-its {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1;
}

.brand-fondazione {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9375rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.01em;
  line-height: 1;
  white-space: nowrap;
}

.brand-sep {
  width: 1px;
  height: 28px;
  background: rgba(255, 255, 255, 0.12);
}

.sector-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 12px 5px 8px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.05);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.82);
  white-space: nowrap;
}

.sector-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--badge-accent, #0066ff);
  box-shadow: 0 0 10px var(--badge-accent, #0066ff);
  flex-shrink: 0;
}

.hdr-nav {
  display: flex;
  gap: clamp(16px, 1.9vw, 28px);
  align-items: center;
  margin-left: auto;
}

.hdr-nav a {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.68);
  text-decoration: none;
  transition: color 0.25s ease;
}
.hdr-nav a:hover { color: #fff; }

.hdr-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--sector-accent, #0066ff) 0%, var(--sector-accent-2, #4da8ff) 100%);
  color: var(--sector-btn-text, #fff);
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px var(--sector-glow, rgba(0, 102, 255, 0.35));
  flex-shrink: 0;
}
.hdr-cta:hover { transform: translateY(-2px); box-shadow: 0 14px 36px var(--sector-glow, rgba(0, 102, 255, 0.45)); }
.arr { transition: transform 0.25s ease; }
.hdr-cta:hover .arr { transform: translateX(3px); }

.hbg {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  margin: -8px -8px -8px auto;
}
.hbg span {
  width: 22px;
  height: 2px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 1px;
  transition: all 0.3s ease;
  display: block;
}
.hbg.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 7px); }
.hbg.open span:nth-child(2) { opacity: 0; }
.hbg.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -7px); }

.hdr-mobile {
  position: absolute;
  top: calc(100% + 8px);
  left: clamp(16px, 2.4vw, 32px);
  right: clamp(16px, 2.4vw, 32px);
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 16px 16px;
  background: rgba(5, 8, 15, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.45);
  z-index: 120;
}
.hdr-mobile a {
  color: rgba(255, 255, 255, 0.68);
  text-decoration: none;
  font-size: 1.0625rem;
  font-weight: 500;
  padding: 10px 4px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: color 0.2s;
}
.hdr-mobile a:hover { color: #fff; }
.mobile-cta {
  margin-top: 10px;
  color: var(--sector-btn-text, #fff) !important;
  background: linear-gradient(135deg, var(--sector-accent, #0066ff) 0%, var(--sector-accent-2, #4da8ff) 100%);
  border-radius: 999px;
  padding: 11px 16px !important;
  font-weight: 700 !important;
  border-bottom: none !important;
}

@media (max-width: 980px) {
  .hdr-nav, .hdr-cta { display: none; }
  .hbg { display: flex; }
}
@media (max-width: 760px) {
  .hdr-mobile {
    left: 18px;
    right: 18px;
  }
  .sector-badge {
    max-width: 46vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
@media (max-width: 600px) {
  .hdr-mobile {
    left: 16px;
    right: 16px;
    top: calc(100% + 6px);
    border-radius: 14px;
  }
  .brand-fondazione { font-size: 0.8125rem; }
  .brand-sep, .sector-badge { display: none; }
}
</style>
