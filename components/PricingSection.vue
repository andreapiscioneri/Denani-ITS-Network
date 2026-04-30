<script setup lang="ts">
import type { Sector } from '~/data/sectors'

const props = defineProps<{
  sector: Sector
}>()
</script>

<template>
  <section class="pricing" id="campagna">
    <div class="container">
      <div class="section-head" data-reveal>
        <div class="eyebrow">{{ props.sector.pricing.eyebrow }}</div>
        <h2>{{ props.sector.pricing.title }}</h2>
        <p class="lead" v-html="props.sector.pricing.lead"></p>
      </div>

      <div class="pricing-row" data-reveal-stagger>
        <article
          v-for="plan in props.sector.pricing.plans"
          :key="plan.name"
          class="price-card"
          :class="{ featured: plan.featured }"
        >
          <div v-if="plan.badge" class="price-tag">{{ plan.badge }}</div>
          <div class="price-name">{{ plan.name }}</div>
          <div class="price-amount">{{ plan.price }}</div>
          <div class="price-period">{{ plan.period }}</div>
          <ul class="price-features">
            <li>
              <span class="feat-label">Contenuti</span>
              <span>{{ plan.contenuti }}</span>
            </li>
            <li>
              <span class="feat-label">Gestione campagna</span>
              <span>{{ plan.gestione }}</span>
            </li>
            <li>
              <span class="feat-label">Report risultati</span>
              <span>{{ plan.report }}</span>
            </li>
          </ul>
        </article>
      </div>

      <p class="iva-note">Importi al netto IVA</p>
    </div>
  </section>
</template>

<style scoped>
.pricing { background: var(--white); }
.pricing-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1320px;
  margin: 0 auto;
}
.price-card {
  position: relative;
  background: var(--white);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 40px 36px 36px;
  transition: all 0.5s var(--ease);
  overflow: hidden;
}
.price-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); border-color: rgba(0,45,98,0.15); }
.price-card.featured {
  background: linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 100%);
  color: var(--white);
  border: none;
  transform: scale(1.02);
  box-shadow: 0 32px 80px rgba(0,45,98,0.25);
}
.price-card.featured:hover { transform: scale(1.02) translateY(-6px); }
.price-card.featured::after {
  content: ''; position: absolute;
  width: 320px; height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--sector-accent-glow, var(--electric-glow)) 0%, transparent 70%);
  opacity: 0.25; filter: blur(60px);
  bottom: -150px; right: -120px;
  z-index: 0;
}
.price-card > * { position: relative; z-index: 1; }

.price-tag {
  display: inline-flex;
  padding: 5px 12px;
  border-radius: 100px;
  background: var(--sector-accent, var(--orange));
  color: var(--white);
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 700;
  margin-bottom: 24px;
}
.price-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.0625rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-weight: 500;
  margin-bottom: 16px;
}
.price-amount {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.75rem, 4.5vw, 3.5rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: 4px;
}
.price-card:not(.featured) .price-amount { color: var(--navy); }
.price-period { font-size: 0.875rem; opacity: 0.6; margin-bottom: 32px; }
.price-features { list-style: none; margin-bottom: 36px; }
.price-features li {
  display: flex; flex-direction: column; gap: 2px;
  padding: 12px 0;
  border-top: 1px solid var(--line);
  font-size: 0.9375rem;
}
.price-card.featured .price-features li { border-top-color: rgba(255,255,255,0.12); }
.feat-label {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 600;
  opacity: 0.5;
}
.price-features li span:not(.feat-label) { white-space: pre-line; }

.iva-note {
  text-align: center;
  margin-top: 16px;
  font-size: 0.8125rem;
  color: var(--slate-light);
  letter-spacing: 0.04em;
}

@media (max-width: 980px) {
  .pricing-row { grid-template-columns: 1fr; }
  .price-card.featured { transform: none; }
  .price-card.featured:hover { transform: translateY(-6px); }
}
</style>
