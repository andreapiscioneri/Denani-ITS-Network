<script setup lang="ts">
import type { Sector } from '~/data/sectors'

const props = defineProps<{
  sector?: Sector
  /** Override per la home (no sector) */
  eyebrow?: string
  title?: string
  subtitle?: string
  pdfPath?: string
}>()

const display = computed(() => {
  if (props.sector) return props.sector.download
  return {
    eyebrow: props.eyebrow ?? 'Area Download',
    title: props.title ?? 'Scarica il framework<br>completo.',
    subtitle: props.subtitle ?? 'Tutti i dettagli del modello replicabile per i 5 settori in un documento PDF.',
    pdfPath: props.pdfPath ?? '#'
  }
})

const onDownload = (e: MouseEvent) => {
  e.preventDefault()
  if (display.value.pdfPath && display.value.pdfPath !== '#') {
    window.open(display.value.pdfPath, '_blank')
  } else {
    alert('PDF in preparazione — disponibile a breve.')
  }
}
</script>

<template>
  <section class="pre-footer" id="download">
    <div class="pre-footer-bg" aria-hidden="true"></div>
    <div class="container" data-reveal>
      <div class="pre-footer-inner">
        <div class="pre-footer-text">
          <div class="eyebrow eyebrow--light">{{ display.eyebrow }}</div>
          <h2 v-html="display.title"></h2>
          <p>{{ display.subtitle }}</p>
        </div>
        <div class="pre-footer-action">
          <a href="#" class="download-visual" @click="onDownload">
            <div class="icon">
              <img src="/DENANI-LOGO-WHITE.webp" alt="DENANI" class="denani-logo" />
            </div>
            <div class="visual-label">PDF Proposta <span class="arrow">→</span></div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pre-footer {
  background: var(--navy-deep);
  padding: clamp(60px, 9vw, 120px) 0;
  position: relative;
  overflow: hidden;
}
.pre-footer-bg {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 48px 48px;
}
.pre-footer-bg::after {
  content: '';
  position: absolute;
  bottom: -120px; right: -120px;
  width: 480px; height: 480px;
  background: radial-gradient(circle, var(--sector-accent, var(--electric)) 0%, transparent 65%);
  opacity: 0.18; filter: blur(60px);
}

.pre-footer-inner {
  max-width: 1080px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(24px, 4vw, 64px);
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}

.pre-footer-text { flex: 1; min-width: 280px; }
.eyebrow--light {
  color: rgba(255,255,255,0.45);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-weight: 600;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.eyebrow--light::before {
  content: ''; display: inline-block;
  width: 24px; height: 1px;
  background: rgba(255,255,255,0.3);
}
.pre-footer-text h2 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--white);
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 16px;
}
.pre-footer-text p { font-size: 1rem; color: rgba(255,255,255,0.5); line-height: 1.6; }

.pre-footer-action { flex-shrink: 0; }
.download-visual {
  display: flex; flex-direction: column; align-items: center; gap: 16px;
  text-decoration: none; cursor: pointer;
  transition: transform 0.4s var(--ease);
}
.download-visual:hover { transform: translateY(-4px); }

.download-visual .icon {
  width: clamp(96px, 12vw, 120px); height: clamp(96px, 12vw, 120px);
  background: linear-gradient(160deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%);
  border: 1.5px solid rgba(255,255,255,0.2);
  border-radius: 28px;
  display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(12px);
  transition: border-color 0.3s, background 0.3s;
}
.download-visual:hover .icon {
  border-color: var(--sector-accent-glow, rgba(255,255,255,0.4));
  background: linear-gradient(160deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%);
}
.denani-logo { width: 64px; height: auto; display: block; }
.visual-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255,255,255,0.7);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.visual-label .arrow { margin-left: 4px; }

@media (max-width: 700px) {
  .pre-footer-inner { flex-direction: column; align-items: flex-start; gap: 40px; }
  .pre-footer-action { width: 100%; display: flex; justify-content: center; }
  .download-visual { align-items: center; }
  .pre-footer-text h2 {
    font-size: clamp(1.55rem, 7vw, 2.1rem);
  }
}
</style>
