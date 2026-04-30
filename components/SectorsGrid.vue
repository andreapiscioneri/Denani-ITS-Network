<script setup lang="ts">
import { sectorsList } from '~/data/sectors'
</script>

<template>
  <section class="sectors-grid-section" id="settori">
    <div class="container">
      <div class="section-head" data-reveal>
        <div class="eyebrow">I Cinque Settori</div>
        <h2>Un metodo, cinque filiere ITS.</h2>
        <p class="lead">
          Lo stesso impianto strategico costruito su <strong>ITS Fondazione Dalmine</strong> declinato sulle cinque filiere ITS più rilevanti del Nord Italia.
          Ogni landing è una proposta autonoma, personalizzabile sui partner industriali del singolo ITS interlocutore.
        </p>
      </div>

      <div class="sectors-grid" data-reveal-stagger>
        <NuxtLink
          v-for="(s, idx) in sectorsList"
          :key="s.slug"
          :to="`/settori/${s.slug}`"
          class="sector-card"
          :class="`sector-pos-${idx}`"
          :style="{ '--card-accent': s.accent, '--card-accent-glow': s.accentGlow }"
        >
          <div class="card-bg" :style="{ background: `linear-gradient(135deg, ${s.accent}1a 0%, ${s.accent}05 100%)` }"></div>
          <div class="card-inner">
            <div class="card-meta">
              <span class="card-dot"></span>
              <span class="card-filiera">{{ s.filiera }}</span>
            </div>
            <h3 class="card-name">{{ s.name }}</h3>
            <p class="card-tagline">{{ s.hero.titleLead }} <em>{{ s.hero.titleAccent }}</em> {{ s.hero.titleTrail }}</p>
            <div class="card-cta">
              Apri la proposta <span class="arrow">→</span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sectors-grid-section { background: var(--white); }
.sectors-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: minmax(260px, auto);
  gap: 16px;
  max-width: 1320px;
  margin: 0 auto;
}

.sector-card {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--white);
  border: 1px solid var(--line);
  text-decoration: none;
  color: var(--navy-deep);
  transition: all 0.5s var(--ease);
  min-height: 260px;
}
.sector-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 32px 80px rgba(0,0,0,0.10);
  border-color: var(--card-accent);
}

.card-bg { position: absolute; inset: 0; transition: opacity 0.5s var(--ease); opacity: 0.6; }
.sector-card:hover .card-bg { opacity: 1; }

.card-inner {
  position: relative; z-index: 1;
  padding: 36px;
  height: 100%;
  display: flex; flex-direction: column; justify-content: space-between;
  gap: 16px;
}

.card-meta {
  display: flex; align-items: center; gap: 10px;
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-weight: 600;
  color: var(--slate);
}
.card-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: var(--card-accent);
  box-shadow: 0 0 0 4px var(--card-accent), 0 0 12px var(--card-accent);
  opacity: 0.85;
}

.card-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.5rem, 2.4vw, 2rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.05;
  color: var(--navy-deep);
}

.card-tagline {
  font-size: 0.9375rem;
  color: var(--slate);
  line-height: 1.5;
  max-width: 38ch;
}
.card-tagline em { font-style: italic; color: var(--card-accent); font-weight: 500; }

.card-cta {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--card-accent);
  letter-spacing: 0.02em;
  margin-top: 8px;
}
.card-cta .arrow { transition: transform 0.3s var(--ease); }
.sector-card:hover .card-cta .arrow { transform: translateX(6px); }

/* Bento layout — 5 sectors over 6 cols */
.sector-pos-0 { grid-column: span 4; min-height: 320px; }
.sector-pos-1 { grid-column: span 2; }
.sector-pos-2 { grid-column: span 2; }
.sector-pos-3 { grid-column: span 2; }
.sector-pos-4 { grid-column: span 2; }

@media (max-width: 980px) {
  .sectors-grid { grid-template-columns: 1fr 1fr; }
  .sector-pos-0, .sector-pos-1, .sector-pos-2, .sector-pos-3, .sector-pos-4 { grid-column: span 1; }
  .sector-pos-0 { grid-column: span 2; }
}
@media (max-width: 600px) {
  .sectors-grid { grid-template-columns: 1fr; }
  .sector-pos-0 { grid-column: span 1; }
}
</style>
