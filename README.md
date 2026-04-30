# Denani ITS Network — Framework Marketing per ITS Academy

Landing **Nuxt 3** multi-pagina, institutional & industrial-tech, che ripropone il modello costruito per **ITS Fondazione Dalmine** in versione **replicabile** su cinque filiere ITS.

> Strategia e coordinamento a cura di **DENANI S.R.L** — Bergamo

## Concept

Stesso impianto strategico della proposta Dalmine (campagna di lancio 4 mesi + mantenimento annuale 12 mesi, scenario economico, KPI iscritti) declinato per **cinque settori industriali** corrispondenti alle principali filiere ITS Academy del Nord Italia.

Ogni landing settoriale è una proposta autonoma, sostituibile/personalizzabile sui partner reali del singolo ITS interlocutore.

## Stack
- **Nuxt 3** (Vue 3, Composition API, `<script setup lang="ts">`)
- TypeScript
- CSS scoped per componente + design tokens globali
- Zero dipendenze runtime esterne (Google Fonts via CDN)

## Setup
```bash
npm install
npm run dev      # dev server su http://localhost:3000
npm run build    # build di produzione (SSR)
npm run generate # static site (SSG)
npm run preview
```

## Struttura del Progetto
```
Denani-ITS-Network/
├── app.vue                       # Root con <NuxtPage />
├── nuxt.config.ts                # Config + meta SEO globali
├── package.json
├── tsconfig.json
├── assets/css/main.css           # Design tokens, tipografia, animazioni
├── composables/
│   ├── useReveal.ts              # IntersectionObserver scroll-triggered
│   └── useMagnetic.ts            # Hover magnetico CTA
├── data/
│   └── sectors.ts                # Definizioni dei 5 settori (single source of truth)
├── components/
│   ├── SiteHeader.vue            # Header sticky + Quality Seal Denani + menu Settori
│   ├── HeroSection.vue           # Parallax cinematografico (data-driven)
│   ├── PartnersSection.vue       # Marquee logo partner del settore
│   ├── EcosystemSection.vue      # Bento grid partner industriali
│   ├── PricingSection.vue        # Cards Base/Medio/Pro (campagna 4 mesi)
│   ├── KpiSection.vue            # Dashboard tabella KPI iscritti
│   ├── MaintenanceSection.vue    # Cards mantenimento 12 mesi + ADS
│   ├── ScenarioSection.vue       # Checkout style scenario economico totale
│   ├── DownloadSection.vue       # Pre-footer download PDF
│   ├── SectorsGrid.vue           # Grid 5 settori (solo home)
│   ├── MetodologiaSection.vue    # Metodologia replicabile (solo home)
│   ├── OurWorksSection.vue       # Portfolio video Denani (solo home)
│   └── SiteFooter.vue            # Footer minimalista + social
└── pages/
    ├── index.vue                 # Home master del framework
    └── settori/
        └── [slug].vue            # Landing dinamica per settore
```

## I Cinque Settori

| Slug | Settore | Filiera ITS | Accent Color |
|------|---------|-------------|--------------|
| `meccatronica-automotive` | Meccatronica & Automotive | ITS Meccatronica / Mobilità sostenibile | Electric Blue |
| `energia-ambiente` | Energia & Ambiente | ITS Energia, Ambiente, Sostenibilità | Verde Sostenibile |
| `ict-digital` | ICT & Digital Transformation | ITS ICT / Tech Talent Factory | Viola Tech |
| `agroalimentare` | Agroalimentare & Food Tech | ITS Agroalimentare | Verde Food |
| `sistema-moda` | Sistema Moda | ITS Cosmo / Moda | Oro Luxury |

## Architettura del Brand
- **Parent Brand (H1):** Denani ITS Network — Navy `#002D62`
- **Per landing settoriale:** Settore + Founding Partner industriali (placeholder personalizzabili)
- **Quality Seal / Coordinamento:** DENANI S.R.L (sempre presente)

## Sezioni della Landing Settoriale
1. **Sticky Header** con Quality Seal Denani + menu Settori
2. **Hero parallax** con headline settoriale + accent color del settore
3. **Marquee Partner** logo partner industriali del settore
4. **Bento Grid Ecosistema** — 3 partner industriali "founding" del settore
5. **Pricing Cards** Campagna Promozionale (Base 6k · Medio 9k · Pro 12k)
6. **KPI Dashboard** "Iscritti Attesi" tarata sul settore
7. **Mantenimento Annuale** (Base/Medio/Pro)
8. **Scenario Economico Totale** (44.500€) — checkout style su sezione dark
9. **Pre-footer Download** PDF settoriale
10. **Footer** minimalista

## Sezioni della Home Master
1. **Sticky Header**
2. **Hero generale** del framework "Denani per gli ITS d'Italia"
3. **Sectors Grid** Bento dei 5 settori (cliccabili → landing)
4. **Metodologia replicabile** (3-step framework)
5. **Our Works** portfolio video Denani
6. **Pre-footer Download**
7. **Footer**

## Design System
- **Tipografia:** Space Grotesk (display) + Inter (body)
- **Palette base:** Navy Deep `#001A3D`, Navy `#002D62`, Slate, Fog
- **Accent dinamico per settore:** override CSS custom properties via `data-sector` attribute
- **Stile:** Apple minimalism + Spotify Bento + Awwwards motion

## Personalizzazione per pitch reali
Per pitchare il framework a uno specifico ITS:
1. Aprire `data/sectors.ts`, individuare il settore corretto
2. Sostituire `partners.logos` e `partners.ecosystem` con i partner industriali reali del singolo ITS
3. Aggiornare `meta.exampleITS` con il nome dell'ITS destinatario
4. Aggiornare `pricing` se la negoziazione richiede personalizzazioni economiche

## Lingua
Tutto il testo visibile è in **italiano**.
