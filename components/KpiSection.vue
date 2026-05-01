<script setup lang="ts">
import type { Sector } from '~/data/sectors'

const props = defineProps<{
  sector: Sector
}>()

const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  // Intersection observer optional kept lightweight
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) obs.unobserve(e.target)
      })
    },
    { threshold: 0.3 }
  )
  if (sectionRef.value) obs.observe(sectionRef.value)
})
</script>

<template>
  <section ref="sectionRef" class="kpi" id="kpi">
    <div class="container">
      <div class="section-head" data-reveal>
        <div class="eyebrow">{{ props.sector.kpi.eyebrow }}</div>
        <h2>{{ props.sector.kpi.title }}</h2>
        <p class="lead">{{ props.sector.kpi.lead }}</p>
      </div>

      <div class="kpi-dashboard" data-reveal>
        <div class="dashboard-head">
          <h3>Budget ADS → Conversioni Stimate</h3>
          <div class="live-indicator">
            <span class="dot-blue"></span>
            Non incluso, a cura del cliente.
          </div>
        </div>
        <table class="kpi-table">
          <thead>
            <tr>
              <th>Investimento ADS</th>
              <th>Distribuzione Budget</th>
              <th>Iscritti Attesi</th>
              <th>Visualizzazioni Stimate</th>
              <th>Performance</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in props.sector.kpi.rows" :key="row.budget">
              <td><span class="budget-cell">{{ row.budget }}</span></td>
              <td>
                <div class="platform-split">
                  <div v-for="p in row.platforms" :key="p.label" class="platform-row">
                    <span class="platform-label" :class="p.label.toLowerCase()">{{ p.label }}</span>
                  </div>
                </div>
              </td>
              <td>
                <div class="iscritti-result">
                  <span class="num">{{ row.num }}</span> {{ row.result }}
                </div>
              </td>
              <td>
                <div class="platform-split">
                  <div v-for="p in row.platforms" :key="p.label" class="platform-row">
                    <span class="platform-label" :class="p.label.toLowerCase()">{{ p.label }}</span>
                    <span class="platform-val">{{ p.views }}</span>
                  </div>
                </div>
              </td>
              <td><span class="roi-tag" :class="{ high: row.high }">{{ row.tag }}</span></td>
            </tr>
          </tbody>
        </table>
        <div class="kpi-disclaimer">
          <strong>Nota metodologica:</strong> {{ props.sector.kpi.disclaimer }}
        </div>
        <p class="kpi-iva">Importi al netto IVA</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.kpi { background: var(--fog); }
.kpi-dashboard {
  max-width: 1320px;
  margin: 0 auto;
  background: var(--white);
  border-radius: var(--radius-xl);
  padding: 48px;
  border: 1px solid var(--line);
  box-shadow: var(--shadow-md);
}
.dashboard-head {
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
}
.dashboard-head h3 { color: var(--navy-deep); }
.live-indicator { display: flex; gap: 8px; align-items: center; font-size: 0.8125rem; color: var(--slate-light); }
.dot-blue {
  display: inline-block; width: 8px; height: 8px; border-radius: 50%;
  background: var(--sector-accent, var(--electric));
}

.kpi-table { width: 100%; border-collapse: collapse; margin-top: 32px; }
.kpi-table thead th {
  text-align: left;
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-weight: 600;
  color: var(--slate);
  padding: 16px 24px;
  border-bottom: 1px solid var(--line);
}
.kpi-table tbody tr { border-bottom: 1px solid var(--line); transition: background 0.3s var(--ease); }
.kpi-table tbody tr:hover { background: var(--fog); }
.kpi-table tbody tr:last-child { border-bottom: none; }
.kpi-table td { padding: 28px 24px; vertical-align: middle; }

.budget-cell {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--navy);
  letter-spacing: -0.02em;
}
.iscritti-result {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.875rem;
  font-weight: 600;
  color: var(--navy-deep);
  letter-spacing: -0.03em;
}
.iscritti-result .num { color: var(--sector-accent, var(--orange)); }

.platform-split { display: flex; flex-direction: column; gap: 6px; }
.platform-row { display: flex; align-items: center; gap: 8px; }
.platform-label {
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 2px 6px;
  border-radius: 4px;
  min-width: 44px;
  text-align: center;
}
.platform-label.meta { background: #e7f0ff; color: #1877f2; }
.platform-label.tiktok { background: #f0f0f0; color: #111; }
.platform-label.google { background: #e6f4ea; color: #1e8e3e; }
.platform-val {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--navy);
}

.roi-tag {
  display: inline-flex;
  padding: 4px 10px;
  border-radius: 6px;
  background: rgba(0,45,98,0.06);
  color: var(--navy);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}
.roi-tag.high { background: var(--sector-accent-soft, #e6f4ea); color: var(--sector-accent, #1e8e3e); }

.kpi-disclaimer {
  margin-top: 32px;
  padding: 20px 24px;
  background: var(--fog);
  border-left: 3px solid var(--sector-accent, var(--electric));
  border-radius: 8px;
  font-size: 0.875rem;
  color: var(--slate);
  line-height: 1.6;
}
.kpi-disclaimer strong { color: var(--navy-deep); }
.kpi-iva {
  margin-top: 12px;
  font-size: 0.8125rem;
  color: var(--slate-light);
  letter-spacing: 0.04em;
  text-align: center;
}

@media (max-width: 980px) {
  .kpi-dashboard { padding: 20px 16px; }
  .kpi-table { display: block; }
  .kpi-table thead { display: none; }
  .kpi-table tbody { display: flex; flex-direction: column; gap: 16px; }
  .kpi-table tbody tr {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px 12px;
    padding: 16px;
    background: transparent;
    border-radius: var(--radius-lg);
    border-bottom: none !important;
  }
  .kpi-table td { padding: 4px 0; }
  .kpi-table td:nth-child(1) { grid-column: 1 / -1; }
  .kpi-table td:nth-child(3) { grid-column: 1 / -1; }
  .kpi-table td:nth-child(5) { grid-column: 1 / -1; }
  .budget-cell { font-size: 1.125rem; }
  .iscritti-result { font-size: 1.375rem; }
}
</style>
