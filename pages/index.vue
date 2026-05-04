<script setup lang="ts">
import { sectorsList } from '~/data/sectors'

const { init: initReveal } = useReveal()
const { apply: applyMagnetic } = useMagnetic()

useHead({
  title: 'Denani ITS Network — Marketing per gli ITS Academy d\'Italia',
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Denani ITS Network — Framework Marketing per ITS Academy',
        provider: {
          '@type': 'Organization',
          name: 'DENANI S.R.L',
          url: 'https://denani.odoo.com/'
        },
        areaServed: {
          '@type': 'Place',
          name: 'Nord Italia'
        },
        serviceType: 'Marketing Strategico per ITS Academy, Lead Generation, Social Media Management, Video Production',
        offers: sectorsList.map((s) => ({
          '@type': 'Offer',
          name: `Pacchetto Marketing ${s.name}`,
          priceSpecification: { '@type': 'PriceSpecification', price: '44500', priceCurrency: 'EUR' }
        })),
        audience: {
          '@type': 'EducationalAudience',
          educationalRole: 'ITS Academy'
        }
      })
    }
  ]
})

onMounted(() => {
  nextTick(() => {
    initReveal()
    applyMagnetic()
  })
})
</script>

<template>
  <div class="portal-page">
    <SiteHeader />
    <main>
      <section class="home-hero">
        <div class="home-hero-bg" aria-hidden="true"></div>
        <div class="home-hero-grid" aria-hidden="true"></div>
        <div class="home-hero-inner">
          <div data-reveal>
            <div class="hero-eyebrow">
              <span class="pulse"></span>
              <span class="eyebrow-text">Framework replicabile · 7 filiere ITS</span>
              <span class="eyebrow-logos" aria-hidden="true">
                <img src="/DENANI-LOGO-WHITE.webp" alt="Denani" class="eyebrow-logo" />
              </span>
            </div>
          </div>
          <h1 data-reveal>
            Marketing per gli
            <span class="accent">ITS Academy</span>
            <br />d'Italia.
          </h1>
          <p class="home-hero-sub" data-reveal>
            Lo stesso modello costruito da <strong>DENANI S.R.L</strong> per <strong>ITS Academy</strong> — campagna di lancio + mantenimento annuale, KPI iscritti, ecosistema industriale — declinato sulle <strong>sette filiere ITS</strong> più rilevanti del Nord Italia. Una proposta autonoma per settore, sempre personalizzabile sul singolo ITS interlocutore.
          </p>
          <div class="hero-cta-row" data-reveal>
            <a href="#settori" class="btn btn-primary">Esplora i Settori<span class="arrow">→</span></a>
            <a href="#metodologia" class="btn btn-ghost">Vedi il Metodo</a>
          </div>

          <div class="home-stats" data-reveal>
            <div class="stat-cell"><div class="num">7</div><div class="label">Filiere ITS</div></div>
            <div class="stat-cell"><div class="num">16</div><div class="label">Mesi · Lancio + Mantenimento</div></div>
            <div class="stat-cell"><div class="num">≥30</div><div class="label">Iscritti target / settore</div></div>
            <div class="stat-cell"><div class="num">44.5k</div><div class="label">€ scenario tipo / anno</div></div>
          </div>
        </div>
      </section>

      <SectorsGrid />
      <MetodologiaSection />
      <OurWorksSection />
      <DownloadSection
        eyebrow="Area Download"
        title="Scarica il framework<br>Denani ITS Network."
        subtitle="Tutti i dettagli del modello replicabile per le 7 filiere ITS in un documento PDF executive."
        pdf-path="/PDF/Denani Lucchini ITS network.pdf"
      />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.portal-page {
  background: #05080f;
  color: #fff;
}

.home-hero {
  position: relative;
  min-height: min(100vh, 980px);
  display: flex; align-items: center;
  overflow: hidden;
  color: var(--white);
  padding: clamp(110px, 12vw, 140px) 0 clamp(56px, 7vw, 84px);
}
.home-hero-bg {
  position: absolute; inset: 0;
  background-image: url('/hero-students.jpg');
  background-size: cover; background-position: center;
}
.home-hero-bg::after {
  content: ''; position: absolute; inset: 0;
  background:
    linear-gradient(180deg, rgba(0, 26, 61, 0.88) 0%, rgba(0, 26, 61, 0.7) 50%, rgba(0, 26, 61, 0.94) 100%),
    radial-gradient(circle at 20% 80%, rgba(0, 102, 255, 0.28), transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(123, 97, 255, 0.18), transparent 50%);
}
.home-hero-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 80px 80px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
}

.home-hero-inner {
  position: relative; z-index: 2;
  max-width: 1320px; margin: 0 auto; width: 100%;
  padding: 0 clamp(20px, 5vw, 48px);
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
  width: 6px; height: 6px; border-radius: 50%; background: #7dd3fc;
  box-shadow: 0 0 0 0 #7dd3fc;
  animation: pulse 2s infinite;
}
.eyebrow-logo { height: 28px; width: auto; display: inline-block; vertical-align: middle; margin: 0 6px; opacity: 0.9; }

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(125,211,252,0.7); }
  70% { box-shadow: 0 0 0 12px rgba(125,211,252,0); }
  100% { box-shadow: 0 0 0 0 rgba(125,211,252,0); }
}

.home-hero h1 { max-width: 14ch; margin-bottom: 24px; }
.home-hero h1 .accent { color: var(--electric-glow); font-style: italic; font-weight: 400; }
.home-hero-sub {
  font-size: clamp(0.98rem, 1.35vw, 1.22rem);
  max-width: 64ch;
  color: rgba(255,255,255,0.78);
  line-height: 1.65;
  margin-bottom: clamp(28px, 4vw, 44px);
}
.home-hero-sub strong { color: var(--white); }
.hero-cta-row { display: flex; gap: 16px; flex-wrap: wrap; align-items: center; }

.home-stats {
  margin-top: clamp(38px, 8vw, 96px);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: var(--radius-md);
  overflow: hidden;
  backdrop-filter: blur(10px);
}
.stat-cell { padding: clamp(18px, 3vw, 28px) clamp(16px, 2.6vw, 24px); background: rgba(0,26,61,0.4); }
.stat-cell .num {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  color: var(--white);
  line-height: 1;
  margin-bottom: 8px;
}
.stat-cell .label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(255,255,255,0.6);
  font-weight: 500;
}

@media (max-width: 980px) {
  .home-hero { min-height: auto; }
  .home-hero-inner { max-width: 760px; }
  .home-stats { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 760px) {
  .home-hero-inner {
    max-width: 100%;
    margin-left: 0;
  }
  .home-hero-sub {
    max-width: 40ch;
  }
  .hero-cta-row {
    width: 100%;
    max-width: 320px;
  }
  .hero-cta-row .btn {
    width: 100%;
    justify-content: center;
  }
}
@media (max-width: 600px) {
  .home-hero { padding-top: 100px; }
  .home-stats { grid-template-columns: 1fr 1fr; }
  .home-hero-inner { max-width: 100%; }
  .home-hero h1 { max-width: 100%; font-size: clamp(2rem, 9vw, 2.5rem); line-height: 1.08; }
  .home-hero-sub { font-size: 0.9375rem; max-width: 100%; }
  .hero-eyebrow { flex-direction: column; gap: 8px; padding: 12px 16px; text-align: center; font-size: 0.75rem; border-radius: 10px;}
  .eyebrow-logos { display: none; }
  .hero-cta-row { max-width: 100%; }
}
@media (max-width: 420px) {
  .home-stats {
    grid-template-columns: 1fr;
  }
}
</style>
