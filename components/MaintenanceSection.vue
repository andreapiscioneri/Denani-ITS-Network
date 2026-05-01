<script setup lang="ts">
import type { Sector } from '~/data/sectors'

const props = defineProps<{
  sector: Sector
}>()
</script>

<template>
  <section class="maintenance" id="mantenimento">
    <div class="container">
      <div class="section-head left maintenance-head" data-reveal>
        <div class="head-text">
          <div class="eyebrow">{{ props.sector.maintenance.eyebrow }}</div>
          <h2>{{ props.sector.maintenance.title }}</h2>
          <p class="lead" v-html="props.sector.maintenance.lead"></p>
        </div>
      </div>
    </div>

    <div class="maintenance-scroll-wrap" data-reveal>
      <div class="maintenance-scroll">
        <article
          v-for="tier in props.sector.maintenance.tiers"
          :key="tier.name"
          class="maint-card"
          :class="{ featured: tier.featured }"
        >
          <div class="maint-name">{{ tier.name }}</div>
          <div class="maint-price">
            <span class="amount">{{ tier.costoMensile }}</span>
            <span class="period">/mese</span>
          </div>
          <ul class="maint-list">
            <li>
              <span class="maint-label">Contenuti mensili</span>
              <span>{{ tier.contenutiMensili }}</span>
            </li>
            <li>
              <span class="maint-label">Piattaforme</span>
              <div class="platform-badges">
                <span
                  v-for="p in tier.piattaforme"
                  :key="p"
                  class="platform-badge"
                  :class="p.toLowerCase().replace(/\s+/g, '-')"
                >{{ p }}</span>
              </div>
            </li>
            <li>
              <span class="maint-label">Costo annuo</span>
              <span>{{ tier.costoAnnuo }}</span>
            </li>
          </ul>
        </article>
      </div>
    </div>

    <div class="container">
      <p class="iva-note">Importi al netto IVA</p>
    </div>

    <div class="container">
      <div class="video-notes" data-reveal>
        <div class="video-notes-title">{{ props.sector.maintenance.videoNotes.title }}</div>
        <ul>
          <li v-for="(item, i) in props.sector.maintenance.videoNotes.items" :key="i">
            <strong>{{ item.strong }}</strong> {{ item.text }}
          </li>
        </ul>
      </div>
    </div>

    <div class="container">
      <div class="ads-maint-block" data-reveal>
        <div class="ads-maint-head">
          <div class="eyebrow-sm">ADS Mantenimento · Non incluso</div>
          <h3>Budget pubblicitario per la continuità</h3>
          <p>
            Budget ADS consigliato per il mantenimento della visibilità dopo la campagna di lancio.
            Importi mensili orientativi, distribuiti sulle piattaforme attive per ogni livello.
          </p>
        </div>
        <table class="ads-table">
          <thead>
            <tr>
              <th>Livello</th>
              <th>Budget mensile</th>
              <th>Budget annuo</th>
              <th>Piattaforme</th>
              <th>Visualizzazioni stimate/mese</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in props.sector.maintenance.ads" :key="row.level">
              <td><span class="tier-label">{{ row.level }}</span></td>
              <td><span class="ads-amount">{{ row.monthly }}</span></td>
              <td><span class="ads-amount-sm">{{ row.yearly }}</span></td>
              <td>
                <div class="platform-badges">
                  <span
                    v-for="p in row.platforms"
                    :key="p"
                    class="platform-badge"
                    :class="p.toLowerCase().replace(/\s+/g, '-')"
                  >{{ p }}</span>
                </div>
              </td>
              <td><span class="ads-views">{{ row.views }}</span></td>
            </tr>
          </tbody>
        </table>
        <div class="ads-maint-note">
          Budget ADS non incluso nel costo di gestione · Da concordare e gestire separatamente · Valori indicativi basati su benchmark di settore<br>Importi al netto IVA
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.maintenance { background: var(--white); padding-bottom: 80px; }
.maintenance-head { max-width: none; display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 32px; }
.head-text { max-width: 720px; }

.maintenance-scroll-wrap { position: relative; max-width: 1500px; margin: 0 auto; }
.maintenance-scroll {
  display: flex; gap: 24px;
  padding: 16px 32px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}
.maintenance-scroll::-webkit-scrollbar { display: none; }
.maint-card {
  flex: 0 0 420px;
  background: linear-gradient(160deg, var(--white) 0%, var(--fog) 100%);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 40px;
  scroll-snap-align: start;
  transition: all 0.5s var(--ease);
  position: relative;
  overflow: hidden;
}
.maint-card::before {
  content: ''; position: absolute;
  top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--navy), var(--sector-accent, var(--electric)));
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.6s var(--ease);
}
.maint-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
.maint-card:hover::before { transform: scaleX(1); }
.maint-card.featured {
  background: linear-gradient(160deg, var(--navy-deep) 0%, var(--navy) 100%);
  color: var(--white);
  border: none;
}
.maint-card.featured::before { background: var(--sector-accent, var(--orange)); transform: scaleX(1); }

.maint-name {
  font-family: 'Space Grotesk', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.8125rem;
  font-weight: 600;
  margin-bottom: 28px;
  opacity: 0.6;
}
.maint-card.featured .maint-name {
  opacity: 1;
  color: var(--sector-accent-glow, var(--orange));
}

.maint-price { display: flex; align-items: baseline; gap: 4px; margin-bottom: 12px; }
.maint-price .amount {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 3.5rem; font-weight: 600; letter-spacing: -0.04em; line-height: 0.95;
}
.maint-price .period { font-size: 1rem; opacity: 0.6; }

.maint-list { list-style: none; margin-top: 24px; }
.maint-list li {
  padding: 12px 0;
  font-size: 0.9375rem;
  border-top: 1px solid var(--line);
  display: flex; flex-direction: column; gap: 2px;
}
.maint-card.featured .maint-list li { border-top-color: rgba(255,255,255,0.1); }
.maint-label {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 600;
  opacity: 0.5;
}

.platform-badges { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
.platform-badge {
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 2px 8px;
  border-radius: 4px;
}
.platform-badge.facebook { background: #e7f0ff; color: #1877f2; }
.platform-badge.instagram { background: #fce4ec; color: #c2185b; }
.platform-badge.tiktok { background: #f0f0f0; color: #111; }
.platform-badge.youtube-shorts { background: #fff0e6; color: var(--orange); }
.platform-badge.google { background: #e6f4ea; color: #1e8e3e; }
.maint-card.featured .platform-badge.facebook { background: rgba(24,119,242,0.2); color: #90c3ff; }
.maint-card.featured .platform-badge.instagram { background: rgba(194,24,91,0.2); color: #f48fb1; }
.maint-card.featured .platform-badge.tiktok { background: rgba(255,255,255,0.15); color: #eee; }
.maint-card.featured .platform-badge.youtube-shorts { background: rgba(255,107,26,0.2); color: #ffb38a; }

.video-notes {
  margin: 48px auto 0;
  padding: 32px 36px;
  background: var(--fog);
  border-radius: var(--radius-lg);
  border-left: 3px solid var(--sector-accent, var(--navy));
}
.video-notes-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 600;
  color: var(--navy);
  margin-bottom: 16px;
}
.video-notes ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.video-notes li { font-size: 0.9375rem; color: var(--slate); line-height: 1.6; }
.video-notes li strong { color: var(--navy-deep); }

.ads-maint-block {
  margin-top: 64px;
  background: var(--fog);
  border-radius: var(--radius-xl);
  padding: 48px;
  border: 1px solid var(--line);
}
.eyebrow-sm {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-weight: 600;
  color: var(--sector-accent, var(--orange));
  margin-bottom: 8px;
}
.ads-maint-head h3 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.25rem, 2vw, 1.75rem);
  font-weight: 600;
  color: var(--navy-deep);
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}
.ads-maint-head p { font-size: 0.9375rem; color: var(--slate); line-height: 1.6; margin-bottom: 32px; }

.ads-table { width: 100%; border-collapse: collapse; }
.ads-table thead th {
  text-align: left;
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-weight: 600;
  color: var(--slate);
  padding: 12px 16px;
  border-bottom: 1px solid var(--line);
}
.ads-table tbody tr { border-bottom: 1px solid var(--line); transition: background 0.2s; }
.ads-table tbody tr:hover { background: var(--white); }
.ads-table tbody tr:last-child { border-bottom: none; }
.ads-table td { padding: 20px 16px; vertical-align: middle; }

.tier-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--navy);
}
.ads-amount {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--navy-deep);
  letter-spacing: -0.02em;
}
.ads-amount-sm {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--slate);
}
.ads-views {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--navy);
}

.iva-note {
  font-size: 0.8125rem;
  color: var(--slate-light);
  letter-spacing: 0.04em;
  margin-top: 8px;
  text-align: center;
}
.ads-maint-note {
  margin-top: 24px;
  font-size: 0.8125rem;
  color: var(--slate-light);
  letter-spacing: 0.02em;
  text-align: center;
}

@media (max-width: 980px) {
  .ads-maint-block { padding: 24px 16px; }
  .ads-table { display: block; }
  .ads-table thead { display: none; }
  .ads-table tbody { display: flex; flex-direction: column; gap: 12px; }
  .ads-table tbody tr {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 12px;
    padding: 16px;
    background: transparent;
    border-radius: var(--radius-lg);
    border-bottom: none !important;
  }
  .ads-table td { padding: 4px 0; vertical-align: top; }
  .ads-table td:nth-child(1) { grid-column: 1 / -1; }
  .ads-table td:nth-child(4) { grid-column: 1 / -1; }
  .ads-amount { font-size: 1rem; }
}
</style>
