<script setup lang="ts">
import type { Sector } from '~/data/sectors'

const props = defineProps<{
  sector: Sector
}>()
</script>

<template>
  <section class="total-investment" id="scenario">
    <div class="container">
      <div class="section-head" data-reveal>
        <div class="eyebrow">{{ props.sector.scenario.eyebrow }}</div>
        <h2>{{ props.sector.scenario.title }}</h2>
        <p class="lead">{{ props.sector.scenario.lead }}</p>
      </div>

      <div class="checkout-card" data-reveal>
        <div v-for="row in props.sector.scenario.rows" :key="row.label" class="checkout-row">
          <div class="label">
            <strong>{{ row.label }}</strong>
            <small>{{ row.sub }}</small>
          </div>
          <div class="amount">{{ row.amount }}</div>
        </div>

        <div class="checkout-total">
          <div class="label">Investimento Totale Stimato</div>
          <div class="amount-big">{{ props.sector.scenario.total }}</div>
        </div>

        <div class="checkout-meta">Importi al netto IVA</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.total-investment {
  background: var(--black);
  color: var(--white);
  overflow: hidden;
  position: relative;
}
.total-investment::before {
  content: ''; position: absolute;
  width: 800px; height: 800px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--sector-accent, var(--electric)) 0%, transparent 60%);
  opacity: 0.18; filter: blur(80px);
  top: 30%; left: -200px;
  z-index: 0;
}
.total-investment::after {
  content: ''; position: absolute;
  width: 600px; height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--sector-accent-glow, var(--orange)) 0%, transparent 60%);
  opacity: 0.12; filter: blur(80px);
  bottom: 10%; right: -150px;
  z-index: 0;
}
.total-investment .container { position: relative; z-index: 2; }
.total-investment :deep(.section-head h2) { color: var(--white); }
.total-investment :deep(.section-head .lead) { color: rgba(255,255,255,0.6); }
.total-investment :deep(.eyebrow) { color: var(--sector-accent-glow, var(--electric-glow)); }
.total-investment :deep(.eyebrow::before) { background: var(--sector-accent-glow, var(--electric-glow)); }

.checkout-card {
  max-width: 880px; margin: 0 auto;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: var(--radius-xl);
  padding: 56px;
  backdrop-filter: blur(24px);
}
.checkout-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.checkout-row:last-of-type { border-bottom: none; }
.checkout-row .label { display: flex; flex-direction: column; gap: 4px; }
.checkout-row .label strong {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.0625rem;
  font-weight: 500;
}
.checkout-row .label small { font-size: 0.8125rem; color: rgba(255,255,255,0.5); }
.checkout-row .amount {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.375rem;
  font-weight: 500;
  letter-spacing: -0.02em;
}
.checkout-total {
  margin-top: 24px;
  padding: 32px;
  background: linear-gradient(135deg, var(--navy) 0%, var(--sector-accent, var(--electric)) 100%);
  border-radius: var(--radius-md);
  display: flex; align-items: center; justify-content: space-between;
}
.checkout-total .label { font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.16em; opacity: 0.85; font-weight: 500; }
.checkout-total .amount-big {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1;
}
.checkout-meta {
  text-align: center;
  margin-top: 32px;
  font-size: 0.8125rem;
  color: rgba(255,255,255,0.5);
  letter-spacing: 0.04em;
}

@media (max-width: 980px) {
  .checkout-card { padding: 32px 24px; }
}
@media (max-width: 600px) {
  .checkout-row { flex-direction: column; align-items: flex-start; gap: 8px; }
  .checkout-total { flex-direction: column; align-items: flex-start; gap: 16px; }
}
</style>
