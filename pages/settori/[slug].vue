<script setup lang="ts">
import { getSector } from '~/data/sectors'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

// Look up sector — 404 if invalid slug
const sector = computed(() => getSector(slug.value))

if (!sector.value) {
  // SSR off, but throwError works on client redirect anyway
  throw createError({ statusCode: 404, statusMessage: `Settore "${slug.value}" non trovato` })
}

const { init: initReveal } = useReveal()
const { apply: applyMagnetic } = useMagnetic()

useHead(() => ({
  title: sector.value!.meta.pageTitle,
  meta: [
    { name: 'description', content: sector.value!.meta.description },
    { name: 'keywords', content: sector.value!.meta.keywords },
    { property: 'og:title', content: sector.value!.meta.pageTitle },
    { property: 'og:description', content: sector.value!.meta.description }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: `Marketing Strategico ITS — ${sector.value!.name}`,
        provider: {
          '@type': 'Organization',
          name: 'DENANI S.R.L',
          url: 'https://denani.odoo.com/'
        },
        areaServed: { '@type': 'Place', name: 'Nord Italia' },
        serviceType: `Marketing per ITS Academy — Filiera ${sector.value!.shortName}`,
        offers: sector.value!.pricing.plans.map((p) => ({
          '@type': 'Offer',
          name: `Campagna Promozionale ${p.name}`,
          price: p.price.replace(/[^\d]/g, ''),
          priceCurrency: 'EUR'
        })),
        audience: {
          '@type': 'EducationalAudience',
          educationalRole: `ITS Academy ${sector.value!.shortName}`
        }
      })
    }
  ]
}))

// CSS custom properties per sector accent (scoped to page)
const pageStyle = computed(() => ({
  '--sector-accent': sector.value!.accent,
  '--sector-accent-glow': sector.value!.accentGlow,
  '--sector-accent-soft': sector.value!.accentSoft
}))

onMounted(() => {
  nextTick(() => {
    initReveal()
    applyMagnetic()
  })
})

// Re-init reveal when sector changes (route change)
watch(slug, () => {
  nextTick(() => {
    initReveal()
    applyMagnetic()
  })
})
</script>

<template>
  <div v-if="sector" class="sector-page" :style="pageStyle">
    <SiteHeader :current-sector="sector.slug" :show-anchors="true" />
    <main>
      <HeroSection :sector="sector" />
      <PartnersSection :logos="sector.partners.logos" />
      <EcosystemSection :sector="sector" />
      <PricingSection :sector="sector" />
      <KpiSection :sector="sector" />
      <MaintenanceSection :sector="sector" />
      <ScenarioSection :sector="sector" />
      <DownloadSection :sector="sector" />
    </main>
    <SiteFooter :sector="sector" />
  </div>
</template>

<style scoped>
.sector-page {
  /* CSS custom properties iniettate via :style si propagano a tutti i componenti scoped sotto */
}
</style>
