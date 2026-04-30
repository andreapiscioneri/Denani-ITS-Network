<script setup lang="ts">
import type { Sector } from '~/data/sectors'

const props = defineProps<{
  sector: Sector
}>()

const heroBg = ref<HTMLElement | null>(null)

const onScroll = () => {
  if (!heroBg.value) return
  const y = window.scrollY
  if (y < window.innerHeight) {
    heroBg.value.style.transform = `scale(1.1) translate3d(0, ${y * 0.35}px, 0)`
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <section class="hero" id="hero">
    <div ref="heroBg" class="hero-bg" :style="{ backgroundImage: `url('${props.sector.hero.bgImage}')` }" aria-hidden="true"></div>
    <div class="hero-grid" aria-hidden="true"></div>
    <div class="hero-inner">
      <div data-reveal>
        <div class="hero-eyebrow">
          <span class="pulse"></span>
          <span class="eyebrow-text">{{ props.sector.hero.eyebrow }}</span>
          <span class="eyebrow-logos" aria-hidden="true">
            <img src="/DENANI-LOGO-WHITE.webp" alt="Denani" class="eyebrow-logo" />
          </span>
        </div>
      </div>
      <h1 data-reveal>
        {{ props.sector.hero.titleLead }}
        <span class="accent">{{ props.sector.hero.titleAccent }}</span>
        <br />
        {{ props.sector.hero.titleTrail }}
      </h1>
      <p class="hero-sub" data-reveal v-html="props.sector.hero.subtitle"></p>
      <div class="hero-cta-row" data-reveal>
        <a href="#scenario" class="btn btn-primary">
          Vedi Scenario Economico
          <span class="arrow">→</span>
        </a>
        <a href="#download" class="btn btn-ghost">
          Scarica PDF Riepilogo
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex; align-items: center;
  overflow: hidden;
  color: var(--white);
  padding: 140px 32px 80px;
}
.hero-bg {
  position: absolute; inset: 0;
  background-size: cover; background-position: center;
  transform: scale(1.1);
  will-change: transform;
}
.hero-bg::after {
  content: ''; position: absolute; inset: 0;
  background:
    linear-gradient(180deg, rgba(0, 26, 61, 0.85) 0%, rgba(0, 26, 61, 0.65) 50%, rgba(0, 26, 61, 0.92) 100%),
    radial-gradient(circle at 20% 80%, var(--sector-accent-soft, rgba(0, 102, 255, 0.25)), transparent 50%);
}
.hero-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 80px 80px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
}

.hero-inner {
  position: relative; z-index: 2;
  max-width: 1320px; margin: 0 auto; width: 100%;
}
.hero-eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 8px 16px;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 100px;
  backdrop-filter: blur(12px);
  background: rgba(255,255,255,0.06);
  font-size: 0.8125rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 32px;
}
.eyebrow-text, .eyebrow-logos { display: inline-flex; align-items: center; gap: 10px; }
.hero-eyebrow .pulse {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--sector-accent-glow, #7dd3fc);
  box-shadow: 0 0 0 0 var(--sector-accent-glow, #7dd3fc);
  animation: pulse 2s infinite;
}
.eyebrow-logo { height: 28px; width: auto; display: inline-block; vertical-align: middle; margin: 0 6px; opacity: 0.9; }

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(125,211,252,0.7); }
  70% { box-shadow: 0 0 0 12px rgba(125,211,252,0); }
  100% { box-shadow: 0 0 0 0 rgba(125,211,252,0); }
}

.hero h1 { max-width: 22ch; margin-bottom: 24px; }
.hero h1 .accent {
  color: var(--sector-accent-glow, var(--electric-glow));
  font-style: italic;
  font-weight: 400;
}
.hero-sub {
  font-size: clamp(1.0625rem, 1.4vw, 1.3125rem);
  max-width: 64ch;
  color: rgba(255,255,255,0.78);
  line-height: 1.55;
  margin-bottom: 48px;
}
.hero-sub :deep(strong) { color: var(--white); }
.hero-cta-row { display: flex; gap: 16px; flex-wrap: wrap; align-items: center; }

@media (max-width: 980px) {
  .hero { padding: 120px 24px 64px; }
  .hero-eyebrow { font-size: 0.75rem; padding: 6px 12px; gap: 6px; }
  .eyebrow-logo { height: 24px; margin: 0 3px; }
}
@media (max-width: 600px) {
  .hero { padding: 124px 16px 64px; }
  .hero h1 { max-width: 14ch; font-size: 2.25rem; line-height: 1.08; }
  .hero-sub { font-size: 0.9375rem; }
  .hero-eyebrow {
    border-radius: 20px;
    font-size: 0.75rem;
    padding: 14px 18px;
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
  .eyebrow-text, .eyebrow-logos { justify-content: center; flex-wrap: wrap; gap: 4px; }
  .eyebrow-logo { height: 20px; margin: 0 2px; }
}
</style>
