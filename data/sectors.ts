/**
 * Single source of truth per le 5 landing settoriali.
 * Ogni Sector contiene tutti i dati necessari per renderizzare una landing completa.
 *
 * Per pitchare il framework a un ITS reale: sostituire i campi
 *   partners.logos, partners.ecosystem e meta.exampleITS
 * con i dati del singolo ITS interlocutore.
 */

// ===========================================================================
// Tipi
// ===========================================================================

export interface PartnerLogo {
  src?: string         // path /public; se assente usa "name" come testo
  name: string
  dark?: boolean       // tile scura (per loghi bianchi)
}

export interface EcosystemPartner {
  name: string
  role: string
  tagline: string
  /** background gradient inline (CSS) — usato come fallback estetico se non c'è img */
  gradient: string
}

export interface PricingPlan {
  name: 'Base' | 'Medio' | 'Pro'
  price: string
  period: string
  contenuti: string
  gestione: string
  report: string
  featured?: boolean
  badge?: string
}

export interface KpiPlatformEntry {
  label: string
  views: string
}

export interface KpiRow {
  budget: string
  result: string
  num: string
  platforms: KpiPlatformEntry[]
  tag: string
  high?: boolean
}

export interface MaintenanceTier {
  name: 'Base' | 'Medio' | 'Pro'
  contenutiMensili: string
  piattaforme: string[]
  costoMensile: string
  costoAnnuo: string
  featured?: boolean
}

export interface MaintenanceAdsRow {
  level: 'Base' | 'Medio' | 'Pro'
  monthly: string
  yearly: string
  platforms: string[]
  views: string
}

export interface ScenarioRow {
  label: string
  sub: string
  amount: string
}

export interface ExampleITS {
  name: string
  region: string
  url?: string
}

export interface Sector {
  // Identità
  slug: string
  name: string
  shortName: string
  filiera: string

  // Tema visivo (override CSS custom props)
  accent: string
  accentGlow: string
  accentSoft: string

  // Hero
  hero: {
    eyebrow: string
    titleLead: string
    titleAccent: string
    titleTrail: string
    subtitle: string  // HTML stringa con <strong>
    bgImage: string
  }

  // Marquee + Bento partner
  partners: {
    sectionEyebrow: string
    sectionTitle: string
    sectionLead: string
    logos: PartnerLogo[]
    ecosystem: EcosystemPartner[]
  }

  // Pricing campagna 4 mesi
  pricing: {
    eyebrow: string
    title: string
    lead: string
    plans: PricingPlan[]
  }

  // KPI iscritti attesi
  kpi: {
    eyebrow: string
    title: string
    lead: string
    rows: KpiRow[]
    disclaimer: string
  }

  // Mantenimento 12 mesi
  maintenance: {
    eyebrow: string
    title: string
    lead: string
    tiers: MaintenanceTier[]
    ads: MaintenanceAdsRow[]
    videoNotes: { title: string; items: { strong: string; text: string }[] }
  }

  // Scenario economico totale
  scenario: {
    eyebrow: string
    title: string
    lead: string
    rows: ScenarioRow[]
    total: string
  }

  // Pre-footer download
  download: {
    eyebrow: string
    title: string
    subtitle: string
    pdfPath: string  // path o "#" se non disponibile
  }

  // Meta
  meta: {
    pageTitle: string
    description: string
    keywords: string
    exampleITS: ExampleITS[]
  }
}

// ===========================================================================
// Plan template di base (riusato dai 5 settori, leggermente personalizzato)
// ===========================================================================

const basePlans: PricingPlan[] = [
  {
    name: 'Base',
    price: '6.000 €',
    period: 'una tantum · 4 mesi',
    contenuti: '1 video istituzionale (30/45 sec)\n+ 2 brevi (15 sec)',
    gestione: 'Setup + base',
    report: 'Finale (dopo i 4 mesi)'
  },
  {
    name: 'Medio',
    price: '9.000 €',
    period: 'una tantum · 4 mesi',
    badge: 'Consigliato',
    featured: true,
    contenuti: '4–6 video + post',
    gestione: 'Setup + ottimizzazione',
    report: 'Mensile'
  },
  {
    name: 'Pro',
    price: '12.000 €',
    period: 'una tantum · 4 mesi',
    contenuti: '6–10 video + post',
    gestione: 'Avanzata',
    report: 'KPI avanzati'
  }
]

const baseMaintenanceTiers: MaintenanceTier[] = [
  {
    name: 'Base',
    contenutiMensili: '1 video (30/45 sec) + 2 post',
    piattaforme: ['Facebook', 'Instagram'],
    costoMensile: '1.200 €',
    costoAnnuo: '14.400 €'
  },
  {
    name: 'Medio',
    featured: true,
    contenutiMensili: '2 video (30/45 sec) + 1 attività',
    piattaforme: ['Facebook', 'Instagram', 'TikTok'],
    costoMensile: '2.000 €',
    costoAnnuo: '24.000 €'
  },
  {
    name: 'Pro',
    contenutiMensili: '3 video avanzati (45/60 sec)',
    piattaforme: ['Facebook', 'Instagram', 'TikTok', 'YouTube Shorts'],
    costoMensile: '2.800 €',
    costoAnnuo: '33.600 €'
  }
]

const baseMaintenanceAds: MaintenanceAdsRow[] = [
  { level: 'Base', monthly: '400 — 600 €', yearly: '4.800 — 7.200 €', platforms: ['Facebook', 'Instagram'], views: '~20.000 — 35.000' },
  { level: 'Medio', monthly: '600 — 800 €', yearly: '7.200 — 9.600 €', platforms: ['Facebook', 'Instagram', 'TikTok'], views: '~40.000 — 60.000' },
  { level: 'Pro', monthly: '800 — 1.200 €', yearly: '9.600 — 14.400 €', platforms: ['Facebook', 'Instagram', 'TikTok', 'Google'], views: '~65.000 — 100.000' }
]

const baseVideoNotes = {
  title: 'Nota sulla realizzazione dei video',
  items: [
    {
      strong: 'Pacchetto base:',
      text: 'video puliti, diretti e funzionali. Prevedono riprese standard nei laboratori e un montaggio classico con musica di sottofondo.'
    },
    {
      strong: 'Pacchetto Medio:',
      text: 'i video diventano più ritmati e dinamici, pensati apposta per catturare l\'attenzione sui social. Aggiungiamo animazioni, parole chiave in sovraimpressione che compaiono a schermo e transizioni moderne.'
    },
    {
      strong: 'Pacchetto Pro:',
      text: 'la massima cura del dettaglio. Questo livello ci permette di investire più tempo nella lavorazione.'
    }
  ]
}

const baseScenarioRows: ScenarioRow[] = [
  { label: 'Campagna Promozionale (4 mesi)', sub: 'Piano Medio · setup, contenuti, ottimizzazione', amount: '9.000 €' },
  { label: 'ADS Lancio', sub: 'Budget pubblicitario campagna iniziale', amount: '4.000 €' },
  { label: 'Mantenimento Annuale (12 mesi)', sub: 'Piano Medio · 2.000€ × 12 mesi', amount: '24.000 €' },
  { label: 'ADS Mantenimento', sub: 'Advertising distribuito sui 12 mesi', amount: '7.500 €' }
]

// ===========================================================================
// Settori
// ===========================================================================

export const sectors: Record<string, Sector> = {

  // -------------------------------------------------------------------------
  // 1. MECCATRONICA & AUTOMOTIVE
  // -------------------------------------------------------------------------
  'meccatronica-automotive': {
    slug: 'meccatronica-automotive',
    name: 'Meccatronica & Automotive',
    shortName: 'Meccatronica',
    filiera: 'ITS Meccatronica · Mobilità Sostenibile',

    accent: '#0066FF',
    accentGlow: '#2E8BFF',
    accentSoft: 'rgba(0, 102, 255, 0.12)',

    hero: {
      eyebrow: 'Filiera Meccatronica · Automotive · Mobilità',
      titleLead: 'Il Talento della',
      titleAccent: 'Meccatronica',
      titleTrail: 'che muove l\'industria.',
      subtitle: 'Strategia Marketing Integrata per ITS Academy del settore <strong>meccatronico, automotive e mobilità sostenibile</strong>. Un metodo replicabile costruito da <strong>DENANI S.R.L</strong> sull\'esperienza di <strong>ITS Fondazione Dalmine</strong>, in collaborazione con un ecosistema industriale d\'eccellenza.',
      bgImage: '/hero-students.jpg'
    },

    partners: {
      sectionEyebrow: 'L\'Ecosistema del Talento Meccatronico',
      sectionTitle: 'Una sinergia d\'eccellenza industriale',
      sectionLead: 'La forza dei <strong>founding partner</strong> industriali al servizio della <strong>formazione tecnica</strong> d\'alto livello: meccatronica, automazione, energia e materiali avanzati.',
      logos: [
        { name: 'Brembo' },
        { name: 'Tenaris' },
        { name: 'Lovato Electric' },
        { name: 'ABB Italia' },
        { name: 'Camozzi Group' }
      ],
      ecosystem: [
        {
          name: 'Brembo',
          role: 'Founding Partner · Sistemi frenanti',
          tagline: 'High-performance braking systems: ricerca, materiali compositi e tecnologie per la mobilità del futuro.',
          gradient: 'linear-gradient(135deg, #1a2332 0%, #0a0e1a 100%)'
        },
        {
          name: 'Tenaris',
          role: 'Founding Partner · Acciaio',
          tagline: 'Architettura industriale dell\'acciaio: tubi senza saldatura per energia, automotive e infrastrutture critiche.',
          gradient: 'linear-gradient(135deg, #1c3a5e 0%, #0a1828 100%)'
        },
        {
          name: 'Lovato Electric',
          role: 'Founding Partner · Automazione',
          tagline: 'Smart electrical panels e soluzioni di automazione per gli impianti industriali Industry 4.0.',
          gradient: 'linear-gradient(135deg, #2a3441 0%, #1a1f2a 100%)'
        }
      ]
    },

    pricing: {
      eyebrow: 'Campagna Promozionale · 4 Mesi',
      title: 'Tre piani di lancio. Una sola direzione strategica.',
      lead: 'Campagna finalizzata alle iscrizioni e alla promozione del polo ITS Meccatronica in tutto il Nord Italia. Comunicazione differenziata per <strong>studenti</strong> e <strong>genitori</strong>, con produzione video, advertising e reportistica inclusi.',
      plans: basePlans
    },

    kpi: {
      eyebrow: 'Focus Risultati · KPI Iscritti Attesi',
      title: 'Proiezioni basate su benchmark settore meccatronico.',
      lead: 'Le stime di iscrizione sono elaborate su benchmark medi del settore education tecnica meccatronica/automotive in Lombardia. Non costituiscono garanzia di risultato.',
      rows: [
        { budget: '2.000 — 3.000€', result: 'iscritti', num: '15-25', platforms: [{ label: 'Meta', views: '~100.000–150.000' }], tag: 'Entry Level' },
        { budget: '3.000 — 5.000€', result: 'iscritti', num: '≥30', platforms: [{ label: 'Meta', views: '~110.000' }, { label: 'Google', views: '~95.000' }], tag: 'Target Ottimale', high: true },
        { budget: '5.000 — 7.000€', result: 'iscritti', num: '35-50', platforms: [{ label: 'Meta', views: '~105.000' }, { label: 'TikTok', views: '~170.000' }, { label: 'Google', views: '~80.000' }], tag: 'Performance Massima' }
      ],
      disclaimer: 'Le proiezioni sono basate su benchmark del settore education-technical meccatronico Lombardia. Variabili: stagionalità, qualità del messaggio, geo-targeting (Bergamo, Brescia, Lecco, Milano Nord-Est).'
    },

    maintenance: {
      eyebrow: 'Mantenimento Annuale · 12 Mesi',
      title: 'Brand continuity & social management.',
      lead: 'Servizio di gestione marketing con pubblicazioni organiche calendarizzate, mantenuto attivo per costruire pipeline iscritti anno successivo.',
      tiers: baseMaintenanceTiers,
      ads: baseMaintenanceAds,
      videoNotes: baseVideoNotes
    },

    scenario: {
      eyebrow: 'Scenario Economico Totale',
      title: 'Investimento strategico',
      lead: 'Sintesi del piano economico complessivo: campagna di lancio, ADS, mantenimento annuale e advertising di mantenimento.',
      rows: baseScenarioRows,
      total: '44.500 €'
    },

    download: {
      eyebrow: 'Area Download',
      title: 'Scarica la proposta<br>Meccatronica.',
      subtitle: 'Tutti i dettagli della strategia marketing per il settore meccatronico in un documento PDF completo.',
      pdfPath: '#'
    },

    meta: {
      pageTitle: 'Meccatronica & Automotive — Marketing per ITS Academy | Denani',
      description: 'Strategia marketing integrata per ITS Meccatronica, Automotive e Mobilità sostenibile. Lancio + mantenimento, KPI iscritti, ecosistema industriale. A cura di DENANI S.R.L.',
      keywords: 'ITS Meccatronica, ITS Automotive, marketing ITS, iscrizioni ITS Lombardia, Denani Bergamo',
      exampleITS: [
        { name: 'ITS Lombardia Meccatronica', region: 'Lombardia' },
        { name: 'ITS Maker', region: 'Emilia-Romagna' },
        { name: 'ITS Tech Talent Factory', region: 'Lombardia' },
        { name: 'ITS Fondazione Dalmine', region: 'Bergamo, Lombardia' },
        { name: 'ITS Meccatronico Veneto', region: 'Veneto' },
        { name: 'ITS Meccatronico Piemonte', region: 'Piemonte' }
      ]
    }
  },

  // -------------------------------------------------------------------------
  // 2. ENERGIA & AMBIENTE
  // -------------------------------------------------------------------------
  'energia-ambiente': {
    slug: 'energia-ambiente',
    name: 'Energia & Ambiente',
    shortName: 'Energia',
    filiera: 'ITS Energia · Ambiente · Sostenibilità',

    accent: '#00C896',
    accentGlow: '#3FE5B6',
    accentSoft: 'rgba(0, 200, 150, 0.12)',

    hero: {
      eyebrow: 'Filiera Energia · Impiantistica · Edilizia Sostenibile',
      titleLead: 'Il Talento per la',
      titleAccent: 'transizione energetica',
      titleTrail: 'che il Paese ha urgenza di formare.',
      subtitle: 'Strategia Marketing Integrata per ITS Academy del settore <strong>energetico, impiantistico e dell\'edilizia evoluta</strong>. Un metodo replicabile per intercettare i giovani che vogliono lavorare alla <strong>decarbonizzazione</strong> e all\'efficienza energetica industriale.',
      bgImage: '/hero-students.jpg'
    },

    partners: {
      sectionEyebrow: 'L\'Ecosistema della Transizione Energetica',
      sectionTitle: 'Una sinergia per il futuro sostenibile',
      sectionLead: 'I <strong>founding partner</strong> dell\'energia e dell\'impiantistica al servizio della <strong>formazione tecnica</strong> d\'alto livello: rinnovabili, efficienza, edilizia evoluta, smart building.',
      logos: [
        { name: 'Enel' },
        { name: 'A2A' },
        { name: 'Edison' },
        { name: 'Riello' },
        { name: 'Saipem' }
      ],
      ecosystem: [
        {
          name: 'Enel X',
          role: 'Founding Partner · Energie rinnovabili',
          tagline: 'Soluzioni di elettrificazione, mobilità elettrica, fotovoltaico e accumulo per industria e infrastrutture pubbliche.',
          gradient: 'linear-gradient(135deg, #003d2e 0%, #001a14 100%)'
        },
        {
          name: 'A2A',
          role: 'Founding Partner · Multi-utility',
          tagline: 'Generazione, distribuzione, teleriscaldamento ed economia circolare: la transizione energetica del territorio lombardo.',
          gradient: 'linear-gradient(135deg, #0a3a2a 0%, #051c14 100%)'
        },
        {
          name: 'Riello',
          role: 'Founding Partner · Impiantistica termica',
          tagline: 'Pompe di calore, caldaie a condensazione e sistemi ibridi per l\'efficientamento di edifici residenziali e industriali.',
          gradient: 'linear-gradient(135deg, #1a3328 0%, #0a1814 100%)'
        }
      ]
    },

    pricing: {
      eyebrow: 'Campagna Promozionale · 4 Mesi',
      title: 'Tre piani di lancio per la filiera green.',
      lead: 'Campagna finalizzata alle iscrizioni dei percorsi tecnici energetici e ambientali. Narrazione costruita su <strong>impatto reale</strong>, <strong>occupabilità immediata</strong> e <strong>missione climatica</strong> — i tre asset più efficaci con le nuove generazioni.',
      plans: basePlans
    },

    kpi: {
      eyebrow: 'Focus Risultati · KPI Iscritti Attesi',
      title: 'Proiezioni basate su benchmark settore green-tech.',
      lead: 'Le stime sono elaborate su benchmark del settore education energetico-ambientale. Il forte trend "green jobs" tende a migliorare il CPL rispetto ad altre filiere tecniche.',
      rows: [
        { budget: '2.000 — 3.000€', result: 'iscritti', num: '18-28', platforms: [{ label: 'Meta', views: '~110.000–160.000' }], tag: 'Entry Level' },
        { budget: '3.000 — 5.000€', result: 'iscritti', num: '≥35', platforms: [{ label: 'Meta', views: '~120.000' }, { label: 'Google', views: '~100.000' }], tag: 'Target Ottimale', high: true },
        { budget: '5.000 — 7.000€', result: 'iscritti', num: '40-55', platforms: [{ label: 'Meta', views: '~115.000' }, { label: 'TikTok', views: '~180.000' }, { label: 'Google', views: '~85.000' }], tag: 'Performance Massima' }
      ],
      disclaimer: 'Benchmark del settore education green-tech Italia. Il messaggio "transizione energetica" beneficia di una percezione positiva che migliora il tasso di click. Variabili: stagionalità, geo-targeting, copertura mediatica del tema climatico.'
    },

    maintenance: {
      eyebrow: 'Mantenimento Annuale · 12 Mesi',
      title: 'Brand continuity & social management.',
      lead: 'Pubblicazioni organiche calendarizzate sui temi della sostenibilità, dell\'efficienza energetica e degli sbocchi professionali del settore green.',
      tiers: baseMaintenanceTiers,
      ads: baseMaintenanceAds,
      videoNotes: baseVideoNotes
    },

    scenario: {
      eyebrow: 'Scenario Economico Totale',
      title: 'Investimento strategico',
      lead: 'Sintesi del piano economico complessivo per il lancio e il mantenimento delle iscrizioni del polo ITS Energia & Ambiente.',
      rows: baseScenarioRows,
      total: '44.500 €'
    },

    download: {
      eyebrow: 'Area Download',
      title: 'Scarica la proposta<br>Energia & Ambiente.',
      subtitle: 'Tutti i dettagli della strategia marketing per il settore energetico-ambientale in un documento PDF completo.',
      pdfPath: '#'
    },

    meta: {
      pageTitle: 'Energia & Ambiente — Marketing per ITS Academy | Denani',
      description: 'Strategia marketing integrata per ITS Energia, Ambiente, Sostenibilità. Lancio + mantenimento, KPI iscritti, ecosistema utility ed energie rinnovabili. A cura di DENANI S.R.L.',
      keywords: 'ITS Energia Ambiente, marketing ITS green, iscrizioni ITS sostenibilità, transizione energetica formazione',
      exampleITS: [
        { name: 'ITS Energia Ambiente Sostenibilità', region: 'Lombardia' },
        { name: 'ITS Territorio Energia Costruire', region: 'Emilia-Romagna' },
        { name: 'ITS Meccatronica Alto Adige (filiera energia)', region: 'Trentino-Alto Adige' }
      ]
    }
  },

  // -------------------------------------------------------------------------
  // 3. ICT & DIGITAL TRANSFORMATION
  // -------------------------------------------------------------------------
  'ict-digital': {
    slug: 'ict-digital',
    name: 'ICT & Digital Transformation',
    shortName: 'ICT',
    filiera: 'ITS ICT · Cybersecurity · AI',

    accent: '#7B61FF',
    accentGlow: '#9D87FF',
    accentSoft: 'rgba(123, 97, 255, 0.12)',

    hero: {
      eyebrow: 'Filiera ICT · Cybersecurity · Intelligenza Artificiale',
      titleLead: 'Il Talento',
      titleAccent: 'digitale',
      titleTrail: 'che il mercato sta cercando ora.',
      subtitle: 'Strategia Marketing Integrata per ITS Academy del settore <strong>ICT, cybersecurity, cloud e intelligenza artificiale</strong>. Un metodo replicabile per intercettare i giovani che vogliono lavorare nelle <strong>tecnologie più richieste</strong> d\'Italia.',
      bgImage: '/hero-students.jpg'
    },

    partners: {
      sectionEyebrow: 'L\'Ecosistema del Talento Digitale',
      sectionTitle: 'Una sinergia tra system integrator d\'eccellenza',
      sectionLead: 'I <strong>founding partner</strong> dell\'ICT al servizio della <strong>formazione tecnica</strong> d\'alto livello: sviluppo software, cybersecurity, cloud, AI applicata e digital transformation per l\'industria.',
      logos: [
        { name: 'Reply' },
        { name: 'Engineering' },
        { name: 'NTT Data' },
        { name: 'Vimar' },
        { name: 'Italtel' }
      ],
      ecosystem: [
        {
          name: 'Reply',
          role: 'Founding Partner · System Integration',
          tagline: 'Consulenza, system integration, applicazioni e processi digitali end-to-end per la trasformazione delle imprese italiane.',
          gradient: 'linear-gradient(135deg, #1a1438 0%, #0a0820 100%)'
        },
        {
          name: 'Engineering',
          role: 'Founding Partner · Digital Transformation',
          tagline: 'Software, servizi e infrastruttura digitale per pubblica amministrazione, sanità, energia, manifattura e servizi finanziari.',
          gradient: 'linear-gradient(135deg, #2a1f4a 0%, #150f25 100%)'
        },
        {
          name: 'NTT Data',
          role: 'Founding Partner · Cloud & AI',
          tagline: 'Soluzioni cloud, intelligenza artificiale generativa e cybersecurity per le grandi imprese e le PMI strutturate.',
          gradient: 'linear-gradient(135deg, #1c1638 0%, #0e0b1c 100%)'
        }
      ]
    },

    pricing: {
      eyebrow: 'Campagna Promozionale · 4 Mesi',
      title: 'Tre piani di lancio per la filiera digitale.',
      lead: 'Campagna finalizzata alle iscrizioni dei percorsi ICT. Linguaggio, estetica e canali tarati su una platea <strong>nativa digitale</strong> — il pubblico più sensibile alla qualità del contenuto e meno tollerante verso comunicazione "scolastica".',
      plans: basePlans
    },

    kpi: {
      eyebrow: 'Focus Risultati · KPI Iscritti Attesi',
      title: 'Proiezioni basate su benchmark settore tech.',
      lead: 'Le stime sono elaborate su benchmark del settore education ICT. Il pubblico è più reattivo ma più costoso da intercettare: il CPL medio risulta leggermente superiore alle filiere tecniche tradizionali.',
      rows: [
        { budget: '2.500 — 3.500€', result: 'iscritti', num: '12-22', platforms: [{ label: 'Meta', views: '~90.000–130.000' }], tag: 'Entry Level' },
        { budget: '3.500 — 5.500€', result: 'iscritti', num: '≥28', platforms: [{ label: 'Meta', views: '~100.000' }, { label: 'Google', views: '~110.000' }], tag: 'Target Ottimale', high: true },
        { budget: '5.500 — 8.000€', result: 'iscritti', num: '32-48', platforms: [{ label: 'Meta', views: '~95.000' }, { label: 'TikTok', views: '~190.000' }, { label: 'Google', views: '~95.000' }], tag: 'Performance Massima' }
      ],
      disclaimer: 'Benchmark del settore education ICT Italia. Il pubblico nativo digitale è esigente: gli investimenti su qualità della creatività e su Google Search rendono di più rispetto a Meta puro. Variabili: stagionalità, copy strategy, qualità landing.'
    },

    maintenance: {
      eyebrow: 'Mantenimento Annuale · 12 Mesi',
      title: 'Brand continuity & social management.',
      lead: 'Pubblicazioni organiche calendarizzate con focus su <strong>linguaggio tech credibile</strong>, demo di progetti studenti e contenuti di hiring delle aziende partner.',
      tiers: baseMaintenanceTiers,
      ads: baseMaintenanceAds,
      videoNotes: baseVideoNotes
    },

    scenario: {
      eyebrow: 'Scenario Economico Totale',
      title: 'Investimento strategico',
      lead: 'Sintesi del piano economico complessivo per il lancio e il mantenimento delle iscrizioni del polo ITS ICT & Digital.',
      rows: baseScenarioRows,
      total: '44.500 €'
    },

    download: {
      eyebrow: 'Area Download',
      title: 'Scarica la proposta<br>ICT & Digital.',
      subtitle: 'Tutti i dettagli della strategia marketing per il settore ICT in un documento PDF completo.',
      pdfPath: '#'
    },

    meta: {
      pageTitle: 'ICT & Digital — Marketing per ITS Academy | Denani',
      description: 'Strategia marketing integrata per ITS ICT, Cybersecurity, AI. Lancio + mantenimento, KPI iscritti, ecosistema digitale italiano. A cura di DENANI S.R.L.',
      keywords: 'ITS ICT, ITS digitale, ITS cybersecurity, ITS AI, marketing iscrizioni tech, formazione informatica',
      exampleITS: [
        { name: 'ITS Tech Talent Factory', region: 'Lombardia' },
        { name: 'ITS Angelo Rizzoli', region: 'Lombardia' },
        { name: 'ITS Digital Academy Mario Volpato', region: 'Veneto' },
        { name: 'ITS ICT Piemonte', region: 'Piemonte' },
        { name: 'ITS ICT Liguria', region: 'Liguria' },
        { name: 'ITS ICT FVG', region: 'Friuli Venezia Giulia' }
      ]
    }
  },

  // -------------------------------------------------------------------------
  // 4. AGROALIMENTARE & FOOD TECH
  // -------------------------------------------------------------------------
  'agroalimentare': {
    slug: 'agroalimentare',
    name: 'Agroalimentare & Food Tech',
    shortName: 'Agroalimentare',
    filiera: 'ITS Agroalimentare · Food Tech',

    accent: '#5A9F3A',
    accentGlow: '#7BC456',
    accentSoft: 'rgba(90, 159, 58, 0.12)',

    hero: {
      eyebrow: 'Filiera Agroalimentare · Food Tech · Sostenibilità Alimentare',
      titleLead: 'Il Talento del',
      titleAccent: 'Made in Italy',
      titleTrail: 'che racconta la qualità del cibo italiano.',
      subtitle: 'Strategia Marketing Integrata per ITS Academy del settore <strong>agroalimentare e food tech</strong>. Un metodo replicabile per riportare i giovani in una delle filiere più riconoscibili e identitarie del Paese: produzione, trasformazione, packaging e qualità alimentare.',
      bgImage: '/hero-students.jpg'
    },

    partners: {
      sectionEyebrow: 'L\'Ecosistema del Made in Italy Agroalimentare',
      sectionTitle: 'Una sinergia con i grandi marchi del food italiano',
      sectionLead: 'I <strong>founding partner</strong> dell\'agroalimentare al servizio della <strong>formazione tecnica</strong> d\'alto livello: produzione industriale, food safety, supply chain, packaging sostenibile e tecnologie agroalimentari 4.0.',
      logos: [
        { name: 'Barilla' },
        { name: 'Lavazza' },
        { name: 'Granarolo' },
        { name: 'Galbani' },
        { name: 'Sammontana' }
      ],
      ecosystem: [
        {
          name: 'Barilla',
          role: 'Founding Partner · Pasta & Bakery',
          tagline: 'Eccellenza industriale italiana nella pasta e nei prodotti da forno: ricerca, qualità e sostenibilità della filiera grano.',
          gradient: 'linear-gradient(135deg, #1f3514 0%, #0e1a08 100%)'
        },
        {
          name: 'Granarolo',
          role: 'Founding Partner · Lattiero-caseario',
          tagline: 'Filiera latte 100% italiana: produzione, trasformazione e distribuzione di latte fresco e formaggi DOP.',
          gradient: 'linear-gradient(135deg, #2a3818 0%, #15200d 100%)'
        },
        {
          name: 'Lavazza',
          role: 'Founding Partner · Coffee Industry',
          tagline: 'L\'arte italiana del caffè a livello globale: tostatura, sostenibilità della filiera e innovazione di prodotto.',
          gradient: 'linear-gradient(135deg, #1a2810 0%, #0a1408 100%)'
        }
      ]
    },

    pricing: {
      eyebrow: 'Campagna Promozionale · 4 Mesi',
      title: 'Tre piani di lancio per la filiera food.',
      lead: 'Campagna finalizzata alle iscrizioni dei percorsi tecnici agroalimentari. Narrazione che valorizza <strong>tradizione + tecnologia</strong>, <strong>filiera corta</strong> e <strong>sbocchi nelle grandi industrie alimentari italiane</strong>.',
      plans: basePlans
    },

    kpi: {
      eyebrow: 'Focus Risultati · KPI Iscritti Attesi',
      title: 'Proiezioni basate su benchmark settore food.',
      lead: 'Le stime sono elaborate su benchmark del settore education agroalimentare. La narrazione "Made in Italy" e l\'estetica visiva del cibo permettono CPL competitivi su Meta e TikTok.',
      rows: [
        { budget: '2.000 — 3.000€', result: 'iscritti', num: '18-28', platforms: [{ label: 'Meta', views: '~120.000–170.000' }], tag: 'Entry Level' },
        { budget: '3.000 — 5.000€', result: 'iscritti', num: '≥32', platforms: [{ label: 'Meta', views: '~130.000' }, { label: 'Google', views: '~85.000' }], tag: 'Target Ottimale', high: true },
        { budget: '5.000 — 7.000€', result: 'iscritti', num: '38-55', platforms: [{ label: 'Meta', views: '~125.000' }, { label: 'TikTok', views: '~200.000' }, { label: 'Google', views: '~75.000' }], tag: 'Performance Massima' }
      ],
      disclaimer: 'Benchmark del settore education agroalimentare. La forte componente visiva del cibo facilita performance organiche e advertising. Variabili: stagionalità (picco iscrizioni primavera), bacino geografico, copertura partner industriali.'
    },

    maintenance: {
      eyebrow: 'Mantenimento Annuale · 12 Mesi',
      title: 'Brand continuity & social management.',
      lead: 'Pubblicazioni organiche calendarizzate sui temi della <strong>filiera</strong>, della <strong>qualità</strong>, della <strong>sostenibilità alimentare</strong> e degli sbocchi nelle grandi industrie del food.',
      tiers: baseMaintenanceTiers,
      ads: baseMaintenanceAds,
      videoNotes: baseVideoNotes
    },

    scenario: {
      eyebrow: 'Scenario Economico Totale',
      title: 'Investimento strategico',
      lead: 'Sintesi del piano economico complessivo per il lancio e il mantenimento delle iscrizioni del polo ITS Agroalimentare.',
      rows: baseScenarioRows,
      total: '44.500 €'
    },

    download: {
      eyebrow: 'Area Download',
      title: 'Scarica la proposta<br>Agroalimentare.',
      subtitle: 'Tutti i dettagli della strategia marketing per il settore agroalimentare in un documento PDF completo.',
      pdfPath: '#'
    },

    meta: {
      pageTitle: 'Agroalimentare & Food Tech — Marketing per ITS Academy | Denani',
      description: 'Strategia marketing integrata per ITS Agroalimentare. Lancio + mantenimento, KPI iscritti, ecosistema dei grandi marchi food italiani. A cura di DENANI S.R.L.',
      keywords: 'ITS Agroalimentare, ITS food, marketing ITS food tech, iscrizioni ITS agroalimentare, formazione filiera alimentare',
      exampleITS: [
        { name: 'ITS Agroalimentare Lombardia', region: 'Lombardia' },
        { name: 'ITS Agroalimentare Veneto', region: 'Veneto' },
        { name: 'ITS Agroalimentare Emilia-Romagna', region: 'Emilia-Romagna' },
        { name: 'ITS Agroalimentare Piemonte', region: 'Piemonte' }
      ]
    }
  },

  // -------------------------------------------------------------------------
  // 5. SISTEMA MODA
  // -------------------------------------------------------------------------
  'sistema-moda': {
    slug: 'sistema-moda',
    name: 'Sistema Moda',
    shortName: 'Moda',
    filiera: 'ITS Sistema Moda · Manifattura · Design',

    accent: '#C8A45E',
    accentGlow: '#E0BE7A',
    accentSoft: 'rgba(200, 164, 94, 0.12)',

    hero: {
      eyebrow: 'Filiera Tessile · Pelletteria · Manifattura · Design',
      titleLead: 'Il Talento della',
      titleAccent: 'manifattura italiana',
      titleTrail: 'che il mondo continua a comprare.',
      subtitle: 'Strategia Marketing Integrata per ITS Academy del <strong>Sistema Moda</strong>: tessile, pelletteria, design, modelleria e manifattura tecnica. Un metodo replicabile per ricostruire l\'attrattività di una filiera ad altissima occupabilità ma percepita come "vecchia" dai giovani.',
      bgImage: '/hero-students.jpg'
    },

    partners: {
      sectionEyebrow: 'L\'Ecosistema della Moda Italiana',
      sectionTitle: 'Una sinergia con le maison del lusso e della manifattura',
      sectionLead: 'I <strong>founding partner</strong> del Sistema Moda al servizio della <strong>formazione tecnica</strong> d\'alto livello: pelletteria, tessile, modelleria, calzaturificio e tecnologie applicate al lusso e al design industriale.',
      logos: [
        { name: 'Tod\'s' },
        { name: 'Brunello Cucinelli' },
        { name: 'Loro Piana' },
        { name: 'Lonati' },
        { name: 'Damiani' }
      ],
      ecosystem: [
        {
          name: 'Brunello Cucinelli',
          role: 'Founding Partner · Lusso umanistico',
          tagline: 'Cashmere, sartorialità e capitalismo umanistico: la qualità totale del Made in Italy nel segmento del lusso assoluto.',
          gradient: 'linear-gradient(135deg, #2e2515 0%, #18120a 100%)'
        },
        {
          name: 'Tod\'s',
          role: 'Founding Partner · Pelletteria',
          tagline: 'Eccellenza italiana nella pelletteria e nella calzatura: tradizione manifatturiera e innovazione di prodotto.',
          gradient: 'linear-gradient(135deg, #2a2010 0%, #150f08 100%)'
        },
        {
          name: 'Lonati',
          role: 'Founding Partner · Macchine tessili',
          tagline: 'Leader globale nelle macchine per calzetteria e tessile a maglia: ingegneria meccanica al servizio della moda.',
          gradient: 'linear-gradient(135deg, #2c2818 0%, #16140c 100%)'
        }
      ]
    },

    pricing: {
      eyebrow: 'Campagna Promozionale · 4 Mesi',
      title: 'Tre piani di lancio per la filiera moda.',
      lead: 'Campagna finalizzata alle iscrizioni dei percorsi tecnici del Sistema Moda. Narrazione costruita per <strong>cambiare la percezione</strong> della filiera: non "lavoro vecchio", ma <strong>tecnologia, design e maison globali</strong>.',
      plans: basePlans
    },

    kpi: {
      eyebrow: 'Focus Risultati · KPI Iscritti Attesi',
      title: 'Proiezioni basate su benchmark settore moda.',
      lead: 'Le stime sono elaborate su benchmark del settore education Sistema Moda. La filiera richiede uno sforzo creativo extra: il messaggio "tecnologia + lusso" è meno scontato e va costruito con cura.',
      rows: [
        { budget: '2.500 — 3.500€', result: 'iscritti', num: '12-20', platforms: [{ label: 'Meta', views: '~95.000–140.000' }], tag: 'Entry Level' },
        { budget: '3.500 — 5.500€', result: 'iscritti', num: '≥26', platforms: [{ label: 'Meta', views: '~110.000' }, { label: 'Google', views: '~80.000' }], tag: 'Target Ottimale', high: true },
        { budget: '5.500 — 8.000€', result: 'iscritti', num: '30-45', platforms: [{ label: 'Meta', views: '~105.000' }, { label: 'TikTok', views: '~210.000' }, { label: 'Google', views: '~70.000' }], tag: 'Performance Massima' }
      ],
      disclaimer: 'Benchmark del settore education Sistema Moda. La filiera è ad alta occupabilità ma con percezione bassa nei giovani: investire in qualità della creatività e in TikTok genera il miglior ritorno. Variabili: forza visiva dei contenuti, partnership con maison.'
    },

    maintenance: {
      eyebrow: 'Mantenimento Annuale · 12 Mesi',
      title: 'Brand continuity & social management.',
      lead: 'Pubblicazioni organiche calendarizzate dentro le maison, sui laboratori tecnici, sui dietro le quinte delle collezioni e sui percorsi di carriera reali del Sistema Moda.',
      tiers: baseMaintenanceTiers,
      ads: baseMaintenanceAds,
      videoNotes: baseVideoNotes
    },

    scenario: {
      eyebrow: 'Scenario Economico Totale',
      title: 'Investimento strategico',
      lead: 'Sintesi del piano economico complessivo per il lancio e il mantenimento delle iscrizioni del polo ITS Sistema Moda.',
      rows: baseScenarioRows,
      total: '44.500 €'
    },

    download: {
      eyebrow: 'Area Download',
      title: 'Scarica la proposta<br>Sistema Moda.',
      subtitle: 'Tutti i dettagli della strategia marketing per il settore moda in un documento PDF completo.',
      pdfPath: '#'
    },

    meta: {
      pageTitle: 'Sistema Moda — Marketing per ITS Academy | Denani',
      description: 'Strategia marketing integrata per ITS Sistema Moda: tessile, pelletteria, design, modelleria. Lancio + mantenimento, KPI iscritti, ecosistema delle maison italiane. A cura di DENANI S.R.L.',
      keywords: 'ITS Sistema Moda, ITS Cosmo, ITS Machina Lonati, marketing ITS moda, iscrizioni ITS tessile pelletteria',
      exampleITS: [
        { name: 'ITS Cosmo', region: 'Lombardia' },
        { name: 'ITS Machina Lonati', region: 'Brescia, Lombardia' },
        { name: 'ITS Last', region: 'Veneto' }
      ]
    }
  }

}

// ===========================================================================
// Helpers
// ===========================================================================

export const sectorsList: Sector[] = Object.values(sectors)

export const getSector = (slug: string): Sector | undefined => sectors[slug]

export const sectorSlugs: string[] = Object.keys(sectors)
