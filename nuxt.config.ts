// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-04-01',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  ssr: false,

  app: {
    head: {
      htmlAttrs: { lang: 'it' },
      title: 'Denani ITS Network — Framework Marketing per ITS Academy | DENANI S.R.L',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Framework replicabile di marketing strategico per ITS Academy: 5 filiere (Meccatronica, Energia & Ambiente, ICT, Agroalimentare, Sistema Moda). Lancio + mantenimento annuale, KPI iscritti, ecosistema industriale. A cura di DENANI S.R.L.'
        },
        {
          name: 'keywords',
          content:
            'ITS Academy, marketing ITS, iscrizioni ITS, meccatronica, energia ambiente, ICT, agroalimentare, sistema moda, formazione tecnica, DENANI S.R.L, Bergamo, Lombardia'
        },
        { name: 'author', content: 'DENANI S.R.L' },
        { property: 'og:title', content: 'Denani ITS Network — Marketing per gli ITS Academy d\'Italia' },
        {
          property: 'og:description',
          content: 'Connettere Talento e Industria. Un metodo replicabile, cinque filiere, un solo ecosistema. A cura di DENANI S.R.L.'
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'it_IT' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/Favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap'
        }
      ]
    }
  }
})
