<script setup lang="ts">
import type { Sector } from '~/data/sectors'

const props = defineProps<{
  sector: Sector
}>()
</script>

<template>
  <section class="ecosystem" id="ecosistema">
    <div class="container">
      <div class="section-head" data-reveal>
        <div class="eyebrow">{{ props.sector.partners.sectionEyebrow }}</div>
        <h2>{{ props.sector.partners.sectionTitle }}</h2>
        <p class="lead" v-html="props.sector.partners.sectionLead"></p>
      </div>

      <div class="bento" data-reveal-stagger>
        <article
          v-for="(p, idx) in props.sector.partners.ecosystem"
          :key="p.name"
          class="bento-tile"
          :class="`tile-pos-${idx}`"
        >
          <div class="tile-bg" :style="{ background: p.gradient }" aria-hidden="true"></div>
          <div class="tile-overlay"></div>
          <div class="tile-content">
            <div class="tile-meta"><span class="dot"></span>{{ p.role }}</div>
            <div>
              <div class="tile-brand">{{ p.name }}</div>
              <div class="tile-tagline">{{ p.tagline }}</div>
            </div>
          </div>
        </article>
      </div>

      <p class="ecosystem-note">
        Loghi e nomi indicati a titolo esemplificativo dell'ecosistema-tipo della filiera. La proposta finale verrà personalizzata
        sui partner industriali reali del singolo ITS interlocutore.
      </p>
    </div>
  </section>
</template>

<style scoped>
.ecosystem { background: var(--fog); padding: clamp(60px, 9vw, 132px) 0; }
.container { max-width: 1320px; margin: 0 auto; padding: 0 clamp(20px, 4vw, 48px); }
.bento {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: minmax(140px, auto);
  gap: 16px;
}
.bento-tile {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--white);
  border: 1px solid var(--line);
  transition: all 0.5s var(--ease);
  will-change: transform;
  min-height: 280px;
}
.bento-tile:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
.bento-tile .tile-bg {
  position: absolute; inset: 0;
  background-size: cover; background-position: center;
  transition: transform 0.8s var(--ease);
}
.bento-tile:hover .tile-bg { transform: scale(1.06); }
.bento-tile .tile-content {
  position: relative; z-index: 2;
  padding: clamp(20px, 3vw, 36px);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.bento-tile .tile-overlay {
  position: absolute; inset: 0; z-index: 1;
  background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%);
}

.tile-brand {
  color: var(--white);
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 1.875rem;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
}
.tile-tagline { color: rgba(255,255,255,0.85); font-size: 0.9375rem; line-height: 1.5; }
.tile-meta {
  display: flex; align-items: center; gap: 8px;
  color: rgba(255,255,255,0.7);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 500;
}
.tile-meta .dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--sector-accent-glow, var(--orange));
}

.tile-pos-0 { grid-column: span 3; }
.tile-pos-1 { grid-column: span 3; }
.tile-pos-2 { grid-column: span 6; min-height: 240px; }

.ecosystem-note {
  margin: 28px 0 0;
  font-size: 0.8125rem;
  color: var(--slate-light);
  letter-spacing: 0.02em;
  font-style: italic;
  text-align: center;
}

/* section-head scoped */
.section-head { text-align: center; max-width: 720px; margin: 0 auto clamp(36px, 6vw, 56px); }
.eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 0.72rem; text-transform: uppercase;
  letter-spacing: 0.2em; font-weight: 700;
  color: var(--navy); margin-bottom: 18px;
}
.eyebrow::before { content: ''; width: 20px; height: 1px; background: var(--navy); }

@media (max-width: 980px) {
  .bento { grid-template-columns: 1fr 1fr; gap: 14px; }
  .tile-pos-0, .tile-pos-1 { grid-column: span 1; }
  .tile-pos-2 { grid-column: span 2; }
}
@media (max-width: 640px) {
  .bento { grid-template-columns: 1fr; gap: 12px; }
  .tile-pos-0, .tile-pos-1, .tile-pos-2 { grid-column: span 1; min-height: 220px; }
  .tile-brand { font-size: 1.5rem; }
  .tile-tagline { font-size: 0.875rem; }
}
</style>
