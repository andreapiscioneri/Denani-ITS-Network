<script setup lang="ts">
import { sectorsList } from '~/data/sectors'
</script>

<template>
  <section class="sectors-section" id="settori">
    <div class="container">
      <div class="section-head" data-reveal>
        <div class="eyebrow">Scegli il tuo settore</div>
        <h2>Sette filiere ITS.<br>Una sola scelta da fare.</h2>
        <p class="lead">
          Percorsi biennali post-diploma di alta specializzazione tecnica, collegati alle aziende
          leader del territorio lombardo. Seleziona il settore per scoprire il percorso.
        </p>
      </div>

      <div class="sectors-bento" data-reveal-stagger>
        <NuxtLink
          v-for="(s, idx) in sectorsList"
          :key="s.slug"
          :to="`/settori/${s.slug}`"
          class="s-card"
          :class="`s-pos-${idx}`"
          :style="{ '--ca': s.accent, '--ca-glow': s.accentGlow }"
        >
          <div class="s-bg"></div>
          <div class="s-inner">
            <div class="s-top">
              <div class="s-meta">
                <span class="s-dot"></span>
                <span class="s-filiera">{{ s.filiera }}</span>
              </div>
              <h3 class="s-name">{{ s.name }}</h3>
              <p class="s-tagline">
                {{ s.hero.titleLead }}
                <em>{{ s.hero.titleAccent }}</em>
                {{ s.hero.titleTrail }}
              </p>
            </div>
            <div class="s-cta">
              Scopri il percorso <span class="s-arrow">→</span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sectors-section {
  background: #05080f;
  padding: clamp(64px, 9vw, 120px) 0;
  position: relative;
}
.sectors-section::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0,102,255,0.4), transparent);
}

.container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 48px);
}

.section-head {
  text-align: center;
  max-width: 700px;
  margin: 0 auto clamp(30px, 5vw, 64px);
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 700;
  color: #4da8ff;
  margin-bottom: 18px;
}
.eyebrow::before {
  content: '';
  width: 20px;
  height: 1px;
  background: #4da8ff;
}

.section-head h2 {
  color: #fff;
  margin-bottom: 18px;
  font-size: clamp(2rem, 4vw, 3.25rem);
}

.section-head .lead {
  font-size: 1.0625rem;
  color: rgba(235,244,255,0.6);
  line-height: 1.65;
}

/* ── Bento grid ─── */
/*
  7 settori su griglia 12 colonne:
  Riga 1: pos-0 (5 col) + pos-1 (4 col) + pos-2 (3 col)   = 12
  Riga 2: pos-3 (3 col) + pos-4 (3 col) + pos-5 (3 col) + pos-6 (3 col) = 12
*/
.sectors-bento {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(clamp(220px, 24vw, 280px), auto);
  gap: 14px;
}

.s-pos-0 { grid-column: span 5; }
.s-pos-1 { grid-column: span 4; }
.s-pos-2 { grid-column: span 3; }
.s-pos-3 { grid-column: span 3; }
.s-pos-4 { grid-column: span 3; }
.s-pos-5 { grid-column: span 3; }
.s-pos-6 { grid-column: span 3; }

/* ── Card ─────────── */
.s-card {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  text-decoration: none;
  color: #fff;
  transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  min-height: 280px;
  display: flex;
}

.s-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 28px 72px rgba(0,0,0,0.5), 0 0 0 1px var(--ca);
  border-color: var(--ca);
  background: rgba(255,255,255,0.07);
}

.s-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, color-mix(in srgb, var(--ca) 14%, transparent) 0%, color-mix(in srgb, var(--ca) 4%, transparent) 100%);
  opacity: 0;
  transition: opacity 0.45s ease;
}
.s-card:hover .s-bg { opacity: 1; }

.s-inner {
  position: relative;
  z-index: 1;
  padding: clamp(18px, 2.8vw, 32px);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}

.s-top { display: flex; flex-direction: column; gap: 12px; }

.s-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-weight: 600;
  color: rgba(235,244,255,0.45);
  flex-wrap: wrap;
}

.s-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--ca);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--ca) 25%, transparent);
  flex-shrink: 0;
}

.s-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.35rem, 2vw, 1.85rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.06;
  color: #fff;
}

/* card grande — titolo più grande */
.s-pos-0 .s-name { font-size: clamp(1.6rem, 2.6vw, 2.25rem); }

.s-tagline {
  font-size: 0.9375rem;
  color: rgba(235,244,255,0.55);
  line-height: 1.55;
  max-width: 36ch;
}
.s-tagline em {
  font-style: italic;
  color: var(--ca);
  font-weight: 500;
}

.s-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--ca);
  letter-spacing: 0.01em;
}

.s-arrow {
  display: inline-block;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.s-card:hover .s-arrow { transform: translateX(6px); }

/* ── Responsive ────── */
@media (max-width: 1100px) {
  /*
    Riga 1: pos-0 (6) + pos-1 (6)
    Riga 2: pos-2 (4) + pos-3 (4) + pos-4 (4)
    Riga 3: pos-5 (6) + pos-6 (6)
  */
  .s-pos-0 { grid-column: span 6; }
  .s-pos-1 { grid-column: span 6; }
  .s-pos-2 { grid-column: span 4; }
  .s-pos-3 { grid-column: span 4; }
  .s-pos-4 { grid-column: span 4; }
  .s-pos-5 { grid-column: span 6; }
  .s-pos-6 { grid-column: span 6; }
}

@media (max-width: 760px) {
  .sectors-bento { grid-template-columns: 1fr 1fr; grid-auto-rows: auto; gap: 12px; }
  .s-pos-0,
  .s-pos-1,
  .s-pos-2,
  .s-pos-3,
  .s-pos-4,
  .s-pos-5,
  .s-pos-6 { grid-column: span 1; }
  .s-pos-0 { grid-column: span 2; }
  .s-inner { padding: 24px; }
  .s-card { min-height: 220px; }
}

@media (max-width: 480px) {
  .sectors-bento { grid-template-columns: 1fr; }
  .s-pos-0 { grid-column: span 1; }
}
</style>
