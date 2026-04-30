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

interface LearningBlock {
  icon: string
  title: string
  desc: string
  tech: string
}

interface ThemeConfig {
  mood: string
  headline: string
  subline: string
  accent2: string
  glow: string
  heroImage: string
  heroPosition: string
  imageFilter: string
  imageOverlay: string
  visualTag: string
  sectorCards: { title: string; text: string }[]
  learning: LearningBlock[]
  experience: { step: string; title: string; text: string }[]
}

const themes: Record<string, ThemeConfig> = {
  'meccatronica-automotive': {
    mood: 'Robotica, CNC, automazione e linee produttive 4.0',
    headline: 'Costruisci l\'industria del futuro.',
    subline: 'Dai laboratori avanzati alle aziende leader tra Bergamo e Brescia.',
    accent2: '#8cc4ff',
    glow: 'rgba(0, 102, 255, 0.38)',
    heroImage: '/hero-students.jpg',
    heroPosition: 'center 44%',
    imageFilter: 'hue-rotate(0deg) saturate(1.05) contrast(1.1) brightness(0.55)',
    imageOverlay: 'linear-gradient(165deg, rgba(4, 12, 28, 0.72) 0%, rgba(3, 10, 28, 0.88) 100%)',
    visualTag: 'Smart Robotics Lab',
    sectorCards: [
      { title: 'Cosa fa questo settore', text: 'Progetta, automatizza e ottimizza macchine intelligenti, sistemi meccatronici e processi industriali complessi.' },
      { title: 'Dove lavorerai', text: 'Reparti R&D, produzione avanzata, manutenzione predittiva, impiantistica e automotive performance.' },
      { title: 'Competenze chiave', text: 'PLC, sensoristica, CAD/CAM, diagnostica guasti, integrazione hardware-software e problem solving tecnico.' },
      { title: 'Figure più richieste', text: 'Tecnico meccatronico, automation specialist, manutentore 4.0, tecnico di processo e collaudatore industriale.' }
    ],
    learning: [
      { icon: '01', title: 'Laboratorio Robotica', desc: 'Programmazione celle robotiche e sicurezza operativa su linee reali.', tech: 'Robot collaborativi, PLC, HMI' },
      { icon: '02', title: 'Diagnostica Macchine', desc: 'Analisi guasti e manutenzione predittiva su sistemi elettromeccanici.', tech: 'Sensoristica, analisi vibrazioni' },
      { icon: '03', title: 'Digital Manufacturing', desc: 'Dal modello digitale al pezzo finito con workflow industriale.', tech: 'CAD/CAM, simulazione CNC' },
      { icon: '04', title: 'Controllo Qualita', desc: 'Misurazioni, test e validazione componenti in ambienti produttivi.', tech: 'Metrologia, test bench' }
    ],
    experience: [
      { step: '01', title: 'Stage in Azienda', text: 'Esperienza sul campo con team tecnici in aziende partner del territorio lombardo.' },
      { step: '02', title: 'Project Work Reale', text: 'Sviluppo di progetti applicati con obiettivi concreti e review professionali.' },
      { step: '03', title: 'Visite Industriali', text: 'Accesso a impianti e reparti produttivi per vedere il flusso operativo completo.' },
      { step: '04', title: 'Career Acceleration', text: 'Mentorship, orientamento e supporto per l\'ingresso nel mondo del lavoro tecnico.' }
    ]
  },
  'energia-ambiente': {
    mood: 'Energia intelligente, sostenibilita e impianti evoluti',
    headline: 'Trasforma energia in carriera.',
    subline: 'Competenze green-tech per la transizione industriale lombarda.',
    accent2: '#8df7da',
    glow: 'rgba(0, 200, 150, 0.34)',
    heroImage: '/hero-students.jpg',
    heroPosition: 'center 30%',
    imageFilter: 'hue-rotate(75deg) saturate(1.2) contrast(1.05) brightness(0.6)',
    imageOverlay: 'linear-gradient(165deg, rgba(5, 22, 17, 0.68) 0%, rgba(2, 12, 9, 0.9) 100%)',
    visualTag: 'Green Grid Control Room',
    sectorCards: [
      { title: 'Cosa fa questo settore', text: 'Progetta soluzioni per efficienza energetica, impianti smart e sostenibilita industriale.' },
      { title: 'Dove lavorerai', text: 'Utility, aziende impiantistiche, energy manager team, smart building e sistemi BMS.' },
      { title: 'Competenze chiave', text: 'Energy monitoring, audit energetici, fotovoltaico, IoT per impianti e normativa tecnica.' },
      { title: 'Figure più richieste', text: 'Tecnico energia, impiantista smart, specialista efficienza, tecnico ambiente e sostenibilita.' }
    ],
    learning: [
      { icon: '01', title: 'Impianti Smart', desc: 'Gestione impianti intelligenti ad alta efficienza per industria e terziario.', tech: 'BMS, IoT, telecontrollo' },
      { icon: '02', title: 'Rinnovabili', desc: 'Progettazione e manutenzione sistemi fotovoltaici e accumulo energetico.', tech: 'PV systems, storage, inverter' },
      { icon: '03', title: 'Data Energy', desc: 'Lettura KPI energetici e ottimizzazione dei consumi con dashboard dedicate.', tech: 'SCADA, analytics, KPI tracking' },
      { icon: '04', title: 'Compliance & Safety', desc: 'Normative, sicurezza e best practice per impianti e processi sostenibili.', tech: 'Norme CEI, sicurezza impianti' }
    ],
    experience: [
      { step: '01', title: 'Stage in Utility', text: 'Training operativo in aziende energia e multiutility del territorio.' },
      { step: '02', title: 'Cantieri Tecnici', text: 'Attivita reali su impianti e sistemi di monitoraggio energetico.' },
      { step: '03', title: 'Audit sul Campo', text: 'Analisi consumi e proposte migliorative su casi applicativi concreti.' },
      { step: '04', title: 'Profilo Occupabile', text: 'Portfolio tecnico immediatamente spendibile in imprese green-tech.' }
    ]
  },
  'ict-digital': {
    mood: 'Cybersecurity, cloud, AI e infrastrutture digitali',
    headline: 'Entra nella manifattura digitale.',
    subline: 'Diventa il profilo tech che le imprese cercano adesso.',
    accent2: '#77e2ff',
    glow: 'rgba(76, 212, 255, 0.34)',
    heroImage: '/hero-students.jpg',
    heroPosition: 'center 48%',
    imageFilter: 'hue-rotate(190deg) saturate(1.28) contrast(1.08) brightness(0.56)',
    imageOverlay: 'linear-gradient(165deg, rgba(5, 9, 26, 0.7) 0%, rgba(3, 8, 20, 0.9) 100%)',
    visualTag: 'Cyber Command Lab',
    sectorCards: [
      { title: 'Cosa fa questo settore', text: 'Protegge dati, sviluppa sistemi digitali e abilita l\'innovazione IT nelle aziende.' },
      { title: 'Dove lavorerai', text: 'Reparti IT, SOC, software house, aziende industriali digitalizzate e consulenza tech.' },
      { title: 'Competenze chiave', text: 'Reti, cybersecurity, cloud, scripting, automazione, analisi dati e troubleshooting.' },
      { title: 'Figure più richieste', text: 'Cybersecurity analyst, cloud specialist, tecnico reti, junior developer, data technician.' }
    ],
    learning: [
      { icon: '01', title: 'Cyber Lab', desc: 'Attacchi simulati e difesa infrastrutture in ambiente protetto.', tech: 'SIEM, threat analysis, SOC' },
      { icon: '02', title: 'Cloud & DevOps', desc: 'Deploy di servizi e automazione pipeline per applicazioni moderne.', tech: 'Container, CI/CD, cloud platform' },
      { icon: '03', title: 'Networking', desc: 'Configurazione e protezione reti aziendali su scenari real-world.', tech: 'VLAN, firewall, VPN' },
      { icon: '04', title: 'Data & AI Basics', desc: 'Uso pratico dei dati per insight operativi e supporto decisionale.', tech: 'SQL, dashboard, AI tools' }
    ],
    experience: [
      { step: '01', title: 'Hackathon Tecnici', text: 'Sfide hands-on su use case reali proposti da aziende partner.' },
      { step: '02', title: 'Stage ICT', text: 'Inserimento in team digital con tutor dedicato e obiettivi misurabili.' },
      { step: '03', title: 'Project Sprint', text: 'Sviluppo in team agile con demo finale davanti ai referenti aziendali.' },
      { step: '04', title: 'Job Placement', text: 'Accesso facilitato a colloqui con imprese del network lombardo.' }
    ]
  },
  agroalimentare: {
    mood: 'Food innovation, controllo qualita e automazione di filiera',
    headline: 'Innova il food, guida il cambiamento.',
    subline: 'Tecnologia e produzione avanzata nel cuore agroalimentare lombardo.',
    accent2: '#d2f2b5',
    glow: 'rgba(148, 214, 80, 0.36)',
    heroImage: '/hero-students.jpg',
    heroPosition: 'center 42%',
    imageFilter: 'hue-rotate(95deg) saturate(1.15) contrast(1.06) brightness(0.6)',
    imageOverlay: 'linear-gradient(165deg, rgba(20, 21, 10, 0.66) 0%, rgba(13, 15, 7, 0.9) 100%)',
    visualTag: 'Food Tech Pilot Plant',
    sectorCards: [
      { title: 'Cosa fa questo settore', text: 'Integra processo alimentare, automazione e qualita per produzione sicura e scalabile.' },
      { title: 'Dove lavorerai', text: 'Aziende food, controllo qualita, impianti produttivi, R&D prodotto e filiere smart.' },
      { title: 'Competenze chiave', text: 'Sicurezza alimentare, tecnologie di processo, tracciabilita e monitoraggio dati.' },
      { title: 'Figure più richieste', text: 'Tecnico food process, quality specialist, tecnico produzione, operatore impianti avanzati.' }
    ],
    learning: [
      { icon: '01', title: 'Processi Alimentari', desc: 'Gestione linee produttive e parametri critici di trasformazione.', tech: 'PLC linee, sensori di processo' },
      { icon: '02', title: 'Qualita & Sicurezza', desc: 'Controlli HACCP e sistemi di tracciabilita in ambienti reali.', tech: 'QA protocol, tracciatura lotti' },
      { icon: '03', title: 'Packaging Tech', desc: 'Soluzioni packaging sostenibili e controllo performance su linea.', tech: 'Vision system, test materiali' },
      { icon: '04', title: 'Data di Filiera', desc: 'Raccolta dati e ottimizzazione KPI produttivi e logistici.', tech: 'MES, analytics dashboard' }
    ],
    experience: [
      { step: '01', title: 'Stage Produzione', text: 'Esperienza in plant food con monitoraggio produzione e qualita.' },
      { step: '02', title: 'Laboratori Sensoriali', text: 'Test prodotto e analisi tecnica con approccio pratico-scientifico.' },
      { step: '03', title: 'Visite di Filiera', text: 'Dalla materia prima al confezionamento: visione completa del processo.' },
      { step: '04', title: 'Inserimento Professionale', text: 'Passaggio rapido verso ruoli tecnici richiesti nel food-tech.' }
    ]
  },
  'sistema-moda': {
    mood: 'Design industriale, manifattura evoluta e fashion-tech',
    headline: 'Disegna il futuro della moda tech.',
    subline: 'Tra creativita e tecnologia per brand e filiere produttive avanzate.',
    accent2: '#f5dcc3',
    glow: 'rgba(230, 184, 138, 0.34)',
    heroImage: '/hero-students.jpg',
    heroPosition: 'center 36%',
    imageFilter: 'hue-rotate(328deg) saturate(0.96) contrast(1.14) brightness(0.58)',
    imageOverlay: 'linear-gradient(165deg, rgba(24, 16, 13, 0.66) 0%, rgba(15, 9, 7, 0.9) 100%)',
    visualTag: 'Advanced Fashion Studio',
    sectorCards: [
      { title: 'Cosa fa questo settore', text: 'Unisce design, materiali innovativi e processi produttivi per la moda tecnologica.' },
      { title: 'Dove lavorerai', text: 'Uffici stile, prototipazione, produzione, controllo qualita e supply chain moda.' },
      { title: 'Competenze chiave', text: 'CAD moda, modellistica digitale, materiali smart, prototipazione e industrializzazione.' },
      { title: 'Figure più richieste', text: 'Tecnico prodotto moda, prototipista digitale, quality specialist, process technician.' }
    ],
    learning: [
      { icon: '01', title: 'Design & Prototipi', desc: 'Dallo sketch tecnico al prototipo fisico con workflow professionale.', tech: 'CAD moda, prototipazione rapida' },
      { icon: '02', title: 'Materiali Innovativi', desc: 'Studio materiali performanti e sostenibili per nuove collezioni.', tech: 'Textile tech, materiali smart' },
      { icon: '03', title: 'Industrializzazione', desc: 'Ottimizzazione processi per produzione scalabile e controllo costi.', tech: 'Process planning, PLM basics' },
      { icon: '04', title: 'Qualita di Collezione', desc: 'Controllo standard tecnici su capi e accessori in fase di produzione.', tech: 'QA moda, test conformita' }
    ],
    experience: [
      { step: '01', title: 'Stage Fashion-Tech', text: 'Esperienze in aziende moda e manifattura avanzata del territorio.' },
      { step: '02', title: 'Capsule Project', text: 'Sviluppo mini-collezioni tecniche con revisione professionale.' },
      { step: '03', title: 'Visite in Produzione', text: 'Osservazione diretta di reparti, macchinari e processi di confezione.' },
      { step: '04', title: 'Portfolio Occupabile', text: 'Output progettuali concreti da presentare in colloquio.' }
    ]
  }
}

const theme = computed(() => themes[slug.value] ?? themes['meccatronica-automotive'])

const companies = computed(() => {
  const names = sector.value!.partners.logos.map((l) => l.name)
  return names.length > 0 ? names : ['Tenaris', 'Brembo', 'ABB', 'Lovato Electric']
})

const reels = computed(() => [
  {
    role: 'Studente ITS',
    name: 'Luca, 20',
    quote: 'In laboratorio ho capito che questa e una carriera vera, non solo teoria.'
  },
  {
    role: 'Ex Studente',
    name: 'Sara, 23',
    quote: 'Dopo lo stage sono stata inserita in azienda: il passaggio studio-lavoro e stato immediato.'
  },
  {
    role: 'Responsabile HR',
    name: 'Azienda Partner',
    quote: `Cerchiamo profili ${sector.value!.shortName.toLowerCase()} gia pronti a lavorare su progetti reali.`
  }
])

const openDayDate = computed(() => {
  const now = new Date()
  const nextDate = new Date(now.getFullYear(), now.getMonth() + 1, 18, 9, 30, 0)
  if (nextDate.getTime() <= now.getTime()) {
    return new Date(now.getFullYear(), now.getMonth() + 2, 18, 9, 30, 0)
  }
  return nextDate
})

const countdown = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })
let countdownTimer: ReturnType<typeof setInterval> | null = null

const updateCountdown = () => {
  const now = Date.now()
  const target = openDayDate.value.getTime()
  const distance = Math.max(target - now, 0)

  countdown.value = {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60)
  }
}

const formattedOpenDayDate = computed(() => new Intl.DateTimeFormat('it-IT', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
}).format(openDayDate.value))

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
  '--sector-accent-soft': sector.value!.accentSoft,
  '--sector-accent-2': theme.value.accent2,
  '--sector-glow': theme.value.glow,
  '--hero-image-filter': theme.value.imageFilter,
  '--hero-image-overlay': theme.value.imageOverlay
}))

onMounted(() => {
  nextTick(() => {
    initReveal()
    applyMagnetic()
  })

  updateCountdown()
  countdownTimer = setInterval(updateCountdown, 1000)
})

onBeforeUnmount(() => {
  if (countdownTimer) clearInterval(countdownTimer)
})

// Re-init reveal when sector changes (route change)
watch(slug, () => {
  nextTick(() => {
    initReveal()
    applyMagnetic()
  })

  updateCountdown()
})
</script>

<template>
  <div v-if="sector" class="sector-page" :style="pageStyle">
    <SiteHeader :current-sector="sector.slug" :show-anchors="true" />
    <main>
      <section class="sector-hero">
        <div
          class="hero-media"
          :style="{ backgroundImage: `url('${theme.heroImage}')`, backgroundPosition: theme.heroPosition }"
          aria-hidden="true"
        ></div>
        <div class="hero-media-overlay" aria-hidden="true"></div>
        <div class="hero-noise" aria-hidden="true"></div>
        <div class="hero-glow" aria-hidden="true"></div>
        <div class="container hero-wrap">
          <div class="hero-copy" data-reveal>
            <div class="hero-eyebrow">
              <span class="dot"></span>
              <span>{{ sector.filiera }}</span>
            </div>
            <h1>{{ theme.headline }}</h1>
            <p>
              Percorsi ITS altamente specializzati collegati alle aziende leader del territorio.
              <strong>{{ theme.subline }}</strong>
            </p>
            <div class="hero-cta-row">
              <a href="#overview-story" class="btn btn-primary">Scopri il percorso <span class="arrow">→</span></a>
              <a href="#open-day-live" class="btn btn-ghost">Prenota open day</a>
              <a href="https://wa.me/393490000000" target="_blank" rel="noopener" class="btn btn-ghost">Parla con un tutor</a>
            </div>
          </div>

          <div class="hero-visual" data-reveal>
            <div class="hero-tag">{{ theme.visualTag }}</div>
            <div class="hero-stat-grid">
              <article>
                <span>Placement</span>
                <strong>92%</strong>
              </article>
              <article>
                <span>Ore in laboratorio</span>
                <strong>700+</strong>
              </article>
              <article>
                <span>Aziende partner</span>
                <strong>{{ companies.length }}+</strong>
              </article>
              <article>
                <span>Territorio</span>
                <strong>BG · BS</strong>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="overview-story" class="sector-overview">
        <div class="container">
          <div class="section-head left" data-reveal>
            <span class="eyebrow">Il Settore</span>
            <h2>Un settore ad alta richiesta, con sbocchi reali.</h2>
            <p class="lead">{{ theme.mood }}. Una formazione progettata con le imprese, per entrare in ruoli tecnici ad alta occupabilita.</p>
          </div>

          <div class="overview-grid reveal-stagger" data-reveal-stagger>
            <article v-for="card in theme.sectorCards" :key="card.title" class="overview-card">
              <h3>{{ card.title }}</h3>
              <p>{{ card.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="companies-wall">
        <div class="container">
          <div class="section-head" data-reveal>
            <span class="eyebrow">Aziende Collegate</span>
            <h2>Le aziende che cercano i professionisti di domani.</h2>
          </div>
          <div class="logos-grid reveal-stagger" data-reveal-stagger>
            <article v-for="name in companies" :key="name" class="logo-chip">
              <span>{{ name }}</span>
            </article>
          </div>
        </div>
      </section>

      <section id="learning-story" class="learning-section">
        <div class="container">
          <div class="section-head left" data-reveal>
            <span class="eyebrow">Cosa Imparerai</span>
            <h2>Laboratori, tecnologie e strumenti da industria avanzata.</h2>
          </div>

          <div class="learning-grid reveal-stagger" data-reveal-stagger>
            <article v-for="block in theme.learning" :key="block.title" class="learning-card">
              <div class="learning-icon">{{ block.icon }}</div>
              <h3>{{ block.title }}</h3>
              <p>{{ block.desc }}</p>
              <small>{{ block.tech }}</small>
            </article>
          </div>
        </div>
      </section>

      <section id="experience-story" class="experience-section">
        <div class="container">
          <div class="section-head" data-reveal>
            <span class="eyebrow">Esperienza Reale</span>
            <h2>Non una simulazione. Un percorso professionale concreto.</h2>
          </div>

          <div class="experience-timeline reveal-stagger" data-reveal-stagger>
            <article v-for="item in theme.experience" :key="item.title" class="timeline-item">
              <div class="step">{{ item.step }}</div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="testimonials-story" class="testimonials-section">
        <div class="container">
          <div class="section-head left" data-reveal>
            <span class="eyebrow">Testimonianze</span>
            <h2>Formato social reels, storie vere.</h2>
          </div>

          <div class="reels-row reveal-stagger" data-reveal-stagger>
            <article v-for="item in reels" :key="item.name" class="reel-card">
              <div class="reel-top">
                <span>{{ item.role }}</span>
                <button type="button" aria-label="Riproduci testimonianza">▶</button>
              </div>
              <blockquote>"{{ item.quote }}"</blockquote>
              <p>{{ item.name }}</p>
            </article>
          </div>
        </div>
      </section>

      <PartnersSection :logos="sector.partners.logos" />
      <EcosystemSection :sector="sector" />
      <PricingSection :sector="sector" />
      <KpiSection :sector="sector" />
      <MaintenanceSection :sector="sector" />
      <ScenarioSection :sector="sector" />
      <DownloadSection :sector="sector" />

      <section id="open-day-live" class="open-day-section">
        <div class="container open-day-wrap">
          <div class="open-day-copy" data-reveal>
            <span class="eyebrow">Open Day</span>
            <h2>Scopri il tuo futuro dal vivo.</h2>
            <p>Incontra coordinatori, studenti e aziende partner. Vedi i laboratori, prova tecnologie reali e ricevi orientamento personalizzato.</p>
            <div class="open-day-date">Prossima data: <strong>{{ formattedOpenDayDate }}</strong></div>

            <div class="countdown-grid" aria-live="polite">
              <article><span>{{ countdown.days }}</span><small>Giorni</small></article>
              <article><span>{{ countdown.hours }}</span><small>Ore</small></article>
              <article><span>{{ countdown.minutes }}</span><small>Minuti</small></article>
              <article><span>{{ countdown.seconds }}</span><small>Secondi</small></article>
            </div>
          </div>

          <form class="open-day-form" data-reveal>
            <h3>Prenota il tuo posto</h3>
            <label>
              Nome e cognome
              <input type="text" name="name" placeholder="Es. Marco R." required />
            </label>
            <label>
              Email
              <input type="email" name="email" placeholder="nome@email.it" required />
            </label>
            <label>
              Telefono
              <input type="tel" name="phone" placeholder="+39" required />
            </label>
            <label>
              Settore di interesse
              <input type="text" :value="sector.name" readonly />
            </label>
            <button type="submit" class="btn btn-electric">Conferma iscrizione <span class="arrow">→</span></button>
            <a href="https://wa.me/393490000000" target="_blank" rel="noopener" class="whatsapp-link">Oppure scrivici su WhatsApp</a>
          </form>
        </div>
      </section>

      <section id="final-cta" class="bottom-cta">
        <div class="container">
          <div class="bottom-cta-card" data-reveal>
            <p>Fondazione ITS Dalmine · Bergamo · Brescia · Lombardia industriale</p>
            <h3>Accesso diretto al mondo industriale avanzato.</h3>
            <div class="bottom-actions">
              <a href="#open-day-live" class="btn btn-primary">Prenota Open Day</a>
              <a href="https://wa.me/393490000000" target="_blank" rel="noopener" class="btn btn-ghost">Parla con un Tutor</a>
            </div>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter :sector="sector" />

    <a href="#open-day-live" class="sticky-cta">Open Day</a>
    <a href="https://wa.me/393490000000" target="_blank" rel="noopener" class="whatsapp-fab" aria-label="WhatsApp tutor">WA</a>
  </div>
</template>

<style scoped>
.sector-page {
  background: radial-gradient(circle at 12% 8%, rgba(255,255,255,0.09) 0%, transparent 46%), #05080f;
  color: var(--white);
}

.container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 32px;
}

section {
  padding: 110px 0;
  position: relative;
}

.section-head {
  margin-bottom: 48px;
}

.section-head h2 {
  color: var(--white);
  max-width: 14ch;
}

.section-head.left .lead,
.section-head .lead {
  color: rgba(235, 244, 255, 0.72);
  max-width: 62ch;
}

.eyebrow {
  color: var(--sector-accent-2);
}

.eyebrow::before {
  background: var(--sector-accent-2);
}

.sector-hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-top: 140px;
}

.hero-noise,
.hero-glow,
.hero-media,
.hero-media-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-media {
  background-size: cover;
  background-repeat: no-repeat;
  filter: var(--hero-image-filter);
  transform: scale(1.03);
}

.hero-media-overlay {
  background: var(--hero-image-overlay);
}

.hero-noise {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 90px 90px;
  opacity: 0.35;
  mask-image: radial-gradient(circle at center, black 34%, transparent 86%);
  -webkit-mask-image: radial-gradient(circle at center, black 34%, transparent 86%);
}

.hero-glow {
  background:
    radial-gradient(circle at 78% 28%, var(--sector-glow), transparent 44%),
    radial-gradient(circle at 16% 84%, rgba(255, 255, 255, 0.08), transparent 42%);
}

.hero-wrap {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 48px;
  align-items: end;
  position: relative;
  z-index: 2;
}

.hero-copy h1 {
  margin: 16px 0 20px;
  max-width: 11ch;
  text-wrap: balance;
}

.hero-copy p {
  color: rgba(235, 244, 255, 0.8);
  max-width: 54ch;
  margin-bottom: 34px;
  font-size: clamp(1rem, 1.35vw, 1.2rem);
}

.hero-copy p strong {
  color: var(--white);
  font-weight: 600;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.05);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.13em;
  color: rgba(255, 255, 255, 0.88);
}

.hero-eyebrow .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--sector-accent);
  box-shadow: 0 0 18px var(--sector-accent);
}

.hero-cta-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.hero-visual {
  padding: 22px;
  border-radius: 26px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: linear-gradient(160deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.03) 100%);
  backdrop-filter: blur(14px);
}

.hero-tag {
  display: inline-flex;
  margin-bottom: 18px;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--sector-accent-2);
}

.hero-stat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.hero-stat-grid article {
  padding: 16px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(0, 0, 0, 0.24);
}

.hero-stat-grid span {
  display: block;
  color: rgba(229, 238, 255, 0.62);
  font-size: 0.78rem;
  margin-bottom: 8px;
}

.hero-stat-grid strong {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.65rem;
  letter-spacing: -0.03em;
}

.sector-overview {
  background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.overview-card {
  padding: 26px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.14);
  background: linear-gradient(130deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%);
}

.overview-card h3 {
  font-size: 1.22rem;
  margin-bottom: 10px;
}

.overview-card p {
  color: rgba(235, 244, 255, 0.74);
}

.companies-wall {
  background: #050a14;
}

.companies-wall .section-head h2 {
  max-width: 18ch;
  margin: 0 auto;
  text-align: center;
}

.logos-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.logo-chip {
  min-height: 110px;
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.35s var(--ease), border-color 0.35s var(--ease), background 0.35s var(--ease);
}

.logo-chip span {
  color: rgba(255,255,255,0.92);
  font-weight: 600;
  letter-spacing: 0.02em;
}

.logo-chip:hover {
  transform: translateY(-4px);
  border-color: var(--sector-accent);
  background: rgba(255,255,255,0.08);
}

.learning-section {
  background: linear-gradient(180deg, #050a14 0%, #081021 100%);
}

.learning-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.learning-card {
  padding: 26px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.04);
}

.learning-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.24);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: var(--sector-accent-2);
  margin-bottom: 12px;
}

.learning-card h3 {
  margin-bottom: 8px;
}

.learning-card p {
  color: rgba(235,244,255,0.72);
  margin-bottom: 12px;
}

.learning-card small {
  color: rgba(255,255,255,0.62);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.66rem;
}

.experience-section {
  background: #070d18;
}

.experience-section .section-head h2 {
  max-width: 18ch;
  margin: 0 auto;
  text-align: center;
}

.experience-timeline {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.timeline-item {
  padding: 22px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.04);
}

.timeline-item .step {
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  color: var(--sector-accent-2);
  margin-bottom: 10px;
}

.timeline-item h3 {
  font-size: 1.08rem;
  margin-bottom: 8px;
}

.timeline-item p {
  color: rgba(235,244,255,0.72);
  font-size: 0.95rem;
}

.testimonials-section {
  background: linear-gradient(180deg, #070d18 0%, #04070f 100%);
}

.reels-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.reel-card {
  min-height: 360px;
  padding: 18px;
  border-radius: 22px;
  border: 1px solid rgba(255,255,255,0.18);
  background:
    linear-gradient(165deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.02) 66%),
    radial-gradient(circle at 80% 20%, var(--sector-glow), transparent 35%);
  display: flex;
  flex-direction: column;
}

.reel-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: auto;
}

.reel-top span {
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.78);
}

.reel-top button {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.28);
  color: var(--white);
  background: rgba(255,255,255,0.1);
}

.reel-card blockquote {
  margin: 30px 0 14px;
  font-size: 1.2rem;
  line-height: 1.4;
  color: var(--white);
  max-width: 22ch;
}

.reel-card p {
  color: rgba(255,255,255,0.66);
  font-size: 0.92rem;
}

.open-day-section {
  background: #04070f;
  padding-bottom: 80px;
}

.open-day-wrap {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 20px;
}

.open-day-copy,
.open-day-form {
  border-radius: 24px;
  border: 1px solid rgba(255,255,255,0.16);
  background: rgba(255,255,255,0.04);
  padding: 26px;
}

.open-day-copy h2 {
  margin: 10px 0 14px;
}

.open-day-copy p {
  color: rgba(235,244,255,0.74);
  margin-bottom: 14px;
}

.open-day-date {
  color: rgba(255,255,255,0.88);
  margin-bottom: 18px;
}

.countdown-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.countdown-grid article {
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.16);
  background: rgba(255,255,255,0.06);
  padding: 12px;
  text-align: center;
}

.countdown-grid span {
  display: block;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.7rem;
  font-weight: 700;
}

.countdown-grid small {
  text-transform: uppercase;
  font-size: 0.64rem;
  letter-spacing: 0.11em;
  color: rgba(255,255,255,0.62);
}

.open-day-form h3 {
  margin-bottom: 12px;
}

.open-day-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.open-day-form label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.84rem;
  color: rgba(255,255,255,0.72);
}

.open-day-form input {
  height: 46px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.16);
  background: rgba(255,255,255,0.06);
  color: var(--white);
  padding: 0 12px;
  outline: none;
}

.open-day-form input:focus {
  border-color: var(--sector-accent);
  box-shadow: 0 0 0 3px var(--sector-accent-soft);
}

.whatsapp-link {
  color: var(--sector-accent-2);
  text-decoration: none;
  font-size: 0.85rem;
}

.bottom-cta {
  padding-top: 0;
}

.bottom-cta-card {
  border-radius: 22px;
  border: 1px solid rgba(255,255,255,0.14);
  background: linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%);
  padding: 28px;
  text-align: center;
}

.bottom-cta-card p {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.68rem;
  color: rgba(255,255,255,0.62);
  margin-bottom: 10px;
}

.bottom-cta-card h3 {
  font-size: clamp(1.4rem, 2.8vw, 2.2rem);
  margin-bottom: 20px;
}

.bottom-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.sticky-cta {
  position: fixed;
  right: 14px;
  bottom: 20px;
  z-index: 90;
  height: 46px;
  padding: 0 18px;
  border-radius: 999px;
  background: linear-gradient(130deg, var(--sector-accent) 0%, var(--sector-accent-2) 100%);
  color: #041024;
  text-decoration: none;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  box-shadow: 0 14px 30px var(--sector-glow);
}

.whatsapp-fab {
  position: fixed;
  right: 14px;
  bottom: 74px;
  z-index: 90;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #22c55e;
  color: #01250d;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 0.78rem;
  font-weight: 800;
}

@media (max-width: 1100px) {
  .hero-wrap,
  .open-day-wrap {
    grid-template-columns: 1fr;
  }

  .experience-timeline {
    grid-template-columns: 1fr 1fr;
  }

  .reels-row,
  .logos-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 760px) {
  .container {
    padding: 0 16px;
  }

  section {
    padding: 84px 0;
  }

  .sector-hero {
    padding-top: 122px;
  }

  .hero-copy h1 {
    font-size: 2.45rem;
    line-height: 1.06;
  }

  .hero-cta-row .btn {
    width: 100%;
    justify-content: center;
  }

  .overview-grid,
  .learning-grid,
  .reels-row,
  .experience-timeline,
  .logos-grid,
  .countdown-grid {
    grid-template-columns: 1fr;
  }

  .reel-card {
    min-height: 300px;
  }

  .sticky-cta {
    left: 16px;
    right: 16px;
    justify-content: center;
  }

  .whatsapp-fab {
    bottom: 78px;
  }
}
</style>
