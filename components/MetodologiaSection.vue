<script setup lang="ts">
const steps = [
  {
    num: '01',
    title: 'Analisi & Posizionamento',
    text: 'Lavoriamo sul singolo ITS: filiera, partner industriali reali, percorsi formativi, criticità di acquisizione iscritti. Da qui costruiamo una narrazione credibile per il territorio in cui l\'ITS opera.',
    keyword: 'Settimane 1-2'
  },
  {
    num: '02',
    title: 'Lancio · 4 Mesi',
    text: 'Campagna di iscrizioni attiva su Meta, TikTok e Google. Produzione contenuti video reali (laboratori, aziende partner, testimonianze studenti), funnel lead e ottimizzazione continua. Tre livelli di pacchetto: Base, Medio, Pro.',
    keyword: 'Da 6.000 €'
  },
  {
    num: '03',
    title: 'Mantenimento · 12 Mesi',
    text: 'Gestione marketing continuativa per mantenere la pipeline iscritti aperta tutto l\'anno. Pubblicazioni organiche, ADS sempre-attivi e ottimizzazione progressiva del costo per iscritto. Tre livelli: Base, Medio, Pro.',
    keyword: 'Da 1.200 €/mese'
  }
]
</script>

<template>
  <section class="metodologia" id="metodologia">
    <div class="container">
      <div class="section-head" data-reveal>
        <div class="eyebrow">Il Metodo Replicabile</div>
        <h2>Tre fasi. Un anno e quattro mesi.</h2>
        <p class="lead">
          Lo stesso impianto strategico per ogni settore. Identico nella metodologia, sempre personalizzato sul singolo ITS e sui partner industriali del territorio.
        </p>
      </div>

      <div class="steps" data-reveal-stagger>
        <article v-for="step in steps" :key="step.num" class="step">
          <div class="step-num">{{ step.num }}</div>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-text">{{ step.text }}</p>
          <div class="step-keyword">{{ step.keyword }}</div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.metodologia { background: var(--fog); }
.steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1320px;
  margin: 0 auto;
}
.step {
  background: var(--white);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 40px 36px;
  position: relative;
  transition: all 0.5s var(--ease);
}
.step:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
.step-num {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--navy);
  letter-spacing: -0.04em;
  line-height: 0.9;
  opacity: 0.18;
  margin-bottom: 24px;
}
.step-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--navy-deep);
  letter-spacing: -0.02em;
  margin-bottom: 16px;
}
.step-text {
  font-size: 0.9375rem;
  color: var(--slate);
  line-height: 1.6;
  margin-bottom: 28px;
}
.step-keyword {
  display: inline-flex;
  padding: 8px 16px;
  border-radius: 100px;
  background: var(--fog);
  border: 1px solid var(--line);
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--navy);
  letter-spacing: 0.02em;
}

@media (max-width: 980px) {
  .steps { grid-template-columns: 1fr; }
}
</style>
