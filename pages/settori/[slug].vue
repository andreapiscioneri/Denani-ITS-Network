<script setup lang="ts">
import { getSector } from '~/data/sectors'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const sector = computed(() => getSector(slug.value))

if (!sector.value) {
  throw createError({ statusCode: 404, statusMessage: `Settore "${slug.value}" non trovato` })
}

const { init: initReveal } = useReveal()
const { apply: applyMagnetic } = useMagnetic()

interface LearningBlock { icon: string; title: string; desc: string; tech: string }
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
  companies: string[]
  testimonials: { role: string; name: string; quote: string }[]
}

const themes: Record<string, ThemeConfig> = {
  'meccatronica-automotive': {
    mood: 'Robotica, CNC, automazione e linee produttive 4.0',
    headline: 'Costruisci l\'industria del futuro.',
    subline: 'Dai laboratori avanzati alle aziende leader tra Bergamo, Brescia e Milano.',
    accent2: '#8cc4ff',
    glow: 'rgba(0, 102, 255, 0.38)',
    heroImage: '/hero-students.jpg',
    heroPosition: 'center 44%',
    imageFilter: 'hue-rotate(0deg) saturate(1.05) contrast(1.1) brightness(0.45)',
    imageOverlay: 'linear-gradient(165deg, rgba(4, 12, 28, 0.78) 0%, rgba(3, 10, 28, 0.92) 100%)',
    visualTag: 'Smart Robotics Lab',
    companies: ['Tenaris', 'Brembo', 'Avio Aero', 'Lovato Electric', 'Cosberg', 'Gewiss'],
    sectorCards: [
      { title: 'Cosa fa questo settore', text: 'Progetta, automatizza e ottimizza macchine intelligenti, sistemi meccatronici e processi industriali complessi.' },
      { title: 'Dove lavorerai', text: 'Reparti R&D, produzione avanzata, manutenzione predittiva, impiantistica e automotive performance.' },
      { title: 'Competenze chiave', text: 'PLC, sensoristica, CAD/CAM, diagnostica guasti, integrazione hardware-software e problem solving tecnico.' },
      { title: 'Figure più richieste', text: 'Tecnico meccatronico, automation specialist, manutentore 4.0, tecnico di processo e collaudatore industriale.' }
    ],
    learning: [
      { icon: '01', title: 'Laboratorio Robotica', desc: 'Programmazione celle robotiche e sicurezza operativa su linee reali.', tech: 'Robot collaborativi · PLC · HMI' },
      { icon: '02', title: 'Diagnostica Macchine', desc: 'Analisi guasti e manutenzione predittiva su sistemi elettromeccanici.', tech: 'Sensoristica · analisi vibrazioni' },
      { icon: '03', title: 'Digital Manufacturing', desc: 'Dal modello digitale al pezzo finito con workflow industriale completo.', tech: 'CAD/CAM · simulazione CNC' },
      { icon: '04', title: 'Controllo Qualità', desc: 'Misurazioni, test e validazione componenti in ambienti produttivi.', tech: 'Metrologia · test bench' }
    ],
    experience: [
      { step: '01', title: 'Stage in Azienda', text: 'Esperienza sul campo con team tecnici in aziende partner del territorio lombardo.' },
      { step: '02', title: 'Project Work Reale', text: 'Sviluppo di progetti applicati con obiettivi concreti e review professionali.' },
      { step: '03', title: 'Visite Industriali', text: 'Accesso a impianti e reparti produttivi per vedere il flusso operativo completo.' },
      { step: '04', title: 'Career Acceleration', text: 'Mentorship, orientamento e supporto per l\'ingresso nel mondo del lavoro tecnico.' }
    ],
    testimonials: [
      { role: 'Studente ITS · 2° anno', name: 'Luca M., 20 anni', quote: 'In laboratorio ho capito che questa è una carriera vera, non solo teoria. Ogni giorno lavoro con macchinari che in un\'altra scuola non avrei mai visto.' },
      { role: 'Ex Studente · ora in Brembo', name: 'Sara T., 23 anni', quote: 'Dopo lo stage sono stata inserita in azienda. Il passaggio dallo studio al lavoro è stato immediato, netto, reale.' },
      { role: 'HR Manager · Tenaris', name: 'Azienda Partner', quote: 'Cerchiamo tecnici meccatronici già pronti a lavorare su progetti reali. I ragazzi ITS hanno le competenze pratiche che servono subito.' }
    ]
  },
  'energia-ambiente': {
    mood: 'Energia intelligente, sostenibilità e impianti evoluti',
    headline: 'Trasforma energia in carriera.',
    subline: 'Competenze green-tech per la transizione industriale lombarda.',
    accent2: '#FCD34D',
    glow: 'rgba(245, 158, 11, 0.38)',
    heroImage: '/hero-students.jpg',
    heroPosition: 'center 30%',
    imageFilter: 'hue-rotate(22deg) saturate(1.3) contrast(1.08) brightness(0.46)',
    imageOverlay: 'linear-gradient(165deg, rgba(24, 16, 4, 0.76) 0%, rgba(16, 10, 2, 0.92) 100%)',
    visualTag: 'Green Grid Control Room',
    companies: ['A2A', 'Enel Green Power', 'ABB', 'Gewiss', 'Schneider Electric', 'Siemens'],
    sectorCards: [
      { title: 'Cosa fa questo settore', text: 'Progetta soluzioni per efficienza energetica, impianti smart e sostenibilità industriale.' },
      { title: 'Dove lavorerai', text: 'Utility, aziende impiantistiche, energy manager team, smart building e sistemi BMS.' },
      { title: 'Competenze chiave', text: 'Energy monitoring, audit energetici, fotovoltaico, IoT per impianti e normativa tecnica.' },
      { title: 'Figure più richieste', text: 'Tecnico energia, impiantista smart, specialista efficienza, tecnico ambiente e sostenibilità.' }
    ],
    learning: [
      { icon: '01', title: 'Impianti Smart', desc: 'Gestione impianti intelligenti ad alta efficienza per industria e terziario.', tech: 'BMS · IoT · telecontrollo' },
      { icon: '02', title: 'Rinnovabili', desc: 'Progettazione e manutenzione sistemi fotovoltaici e accumulo energetico.', tech: 'PV systems · storage · inverter' },
      { icon: '03', title: 'Data Energy', desc: 'Lettura KPI energetici e ottimizzazione consumi con dashboard dedicate.', tech: 'SCADA · analytics · KPI' },
      { icon: '04', title: 'Compliance & Safety', desc: 'Normative, sicurezza e best practice per impianti e processi sostenibili.', tech: 'Norme CEI · sicurezza impianti' }
    ],
    experience: [
      { step: '01', title: 'Stage in Utility', text: 'Training operativo in aziende energia e multiutility del territorio.' },
      { step: '02', title: 'Cantieri Tecnici', text: 'Attività reali su impianti e sistemi di monitoraggio energetico.' },
      { step: '03', title: 'Audit sul Campo', text: 'Analisi consumi e proposte migliorative su casi applicativi concreti.' },
      { step: '04', title: 'Profilo Occupabile', text: 'Portfolio tecnico immediatamente spendibile in imprese green-tech.' }
    ],
    testimonials: [
      { role: 'Studente ITS · 1° anno', name: 'Marco B., 19 anni', quote: 'Studiare energia non vuol dire solo pannelli solari. Qui programmiamo sistemi reali, monitoriamo impianti e interveniamo su guasti veri.' },
      { role: 'Ex Studente · ora in A2A', name: 'Giulia F., 22 anni', quote: 'Il mio stage si è trasformato in un contratto. Non me lo aspettavo così presto, ma la formazione ITS mi aveva già preparata.' },
      { role: 'Energy Manager · ABB', name: 'Azienda Partner', quote: 'Le competenze green-tech sono rarissime. I ragazzi ITS Energia escono con una preparazione che vale doppio nel mercato di oggi.' }
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
    imageFilter: 'hue-rotate(190deg) saturate(1.28) contrast(1.08) brightness(0.48)',
    imageOverlay: 'linear-gradient(165deg, rgba(5, 9, 26, 0.76) 0%, rgba(3, 8, 20, 0.92) 100%)',
    visualTag: 'Cyber Command Lab',
    companies: ['Leonardo', 'Cisco', 'Huawei', 'Fastweb', 'Engineering', 'Var Group'],
    sectorCards: [
      { title: 'Cosa fa questo settore', text: 'Protegge dati, sviluppa sistemi digitali e abilita l\'innovazione IT nelle aziende.' },
      { title: 'Dove lavorerai', text: 'Reparti IT, SOC, software house, aziende industriali digitalizzate e consulenza tech.' },
      { title: 'Competenze chiave', text: 'Reti, cybersecurity, cloud, scripting, automazione, analisi dati e troubleshooting.' },
      { title: 'Figure più richieste', text: 'Cybersecurity analyst, cloud specialist, tecnico reti, junior developer, data technician.' }
    ],
    learning: [
      { icon: '01', title: 'Cyber Lab', desc: 'Attacchi simulati e difesa infrastrutture in ambiente protetto.', tech: 'SIEM · threat analysis · SOC' },
      { icon: '02', title: 'Cloud & DevOps', desc: 'Deploy di servizi e automazione pipeline per applicazioni moderne.', tech: 'Container · CI/CD · cloud' },
      { icon: '03', title: 'Networking', desc: 'Configurazione e protezione reti aziendali su scenari real-world.', tech: 'VLAN · firewall · VPN' },
      { icon: '04', title: 'Data & AI Basics', desc: 'Uso pratico dei dati per insight operativi e supporto decisionale.', tech: 'SQL · dashboard · AI tools' }
    ],
    experience: [
      { step: '01', title: 'Hackathon Tecnici', text: 'Sfide hands-on su use case reali proposti da aziende partner.' },
      { step: '02', title: 'Stage ICT', text: 'Inserimento in team digital con tutor dedicato e obiettivi misurabili.' },
      { step: '03', title: 'Project Sprint', text: 'Sviluppo in team agile con demo finale davanti ai referenti aziendali.' },
      { step: '04', title: 'Job Placement', text: 'Accesso facilitato a colloqui con imprese del network lombardo.' }
    ],
    testimonials: [
      { role: 'Studente ITS · 2° anno', name: 'Alessandro R., 21 anni', quote: 'Fare cybersecurity a scuola sembra strano, ma qui è reale: attacchiamo sistemi in laboratorio e li difendiamo. Nessuna università fa questo.' },
      { role: 'Ex Studente · ora in Fastweb', name: 'Chiara M., 22 anni', quote: 'In sei mesi di stage ho imparato più che in tre anni di superiori. Adesso gestisco infrastrutture cloud di clienti veri.' },
      { role: 'IT Director · Engineering', name: 'Azienda Partner', quote: 'Il profilo ICT junior che esce da ITS è già operativo. Non ha bisogno di un anno di onboarding: sa già come lavoriamo.' }
    ]
  },
  agroalimentare: {
    mood: 'Food innovation, controllo qualità e automazione di filiera',
    headline: 'Innova il food, guida il cambiamento.',
    subline: 'Tecnologia e produzione avanzata nel cuore agroalimentare lombardo.',
    accent2: '#d2f2b5',
    glow: 'rgba(148, 214, 80, 0.36)',
    heroImage: '/hero-students.jpg',
    heroPosition: 'center 42%',
    imageFilter: 'hue-rotate(95deg) saturate(1.15) contrast(1.06) brightness(0.5)',
    imageOverlay: 'linear-gradient(165deg, rgba(20, 21, 10, 0.72) 0%, rgba(13, 15, 7, 0.92) 100%)',
    visualTag: 'Food Tech Pilot Plant',
    companies: ['Barilla', 'Granarolo', 'Lavazza', 'Ferrero', 'Nestlé Italia', 'Inalca'],
    sectorCards: [
      { title: 'Cosa fa questo settore', text: 'Integra processo alimentare, automazione e qualità per produzione sicura e scalabile.' },
      { title: 'Dove lavorerai', text: 'Aziende food, controllo qualità, impianti produttivi, R&D prodotto e filiere smart.' },
      { title: 'Competenze chiave', text: 'Sicurezza alimentare, tecnologie di processo, tracciabilità e monitoraggio dati.' },
      { title: 'Figure più richieste', text: 'Tecnico food process, quality specialist, tecnico produzione, operatore impianti avanzati.' }
    ],
    learning: [
      { icon: '01', title: 'Processi Alimentari', desc: 'Gestione linee produttive e parametri critici di trasformazione.', tech: 'PLC linee · sensori di processo' },
      { icon: '02', title: 'Qualità & Sicurezza', desc: 'Controlli HACCP e sistemi di tracciabilità in ambienti reali.', tech: 'QA protocol · tracciatura lotti' },
      { icon: '03', title: 'Packaging Tech', desc: 'Soluzioni packaging sostenibili e controllo performance su linea.', tech: 'Vision system · test materiali' },
      { icon: '04', title: 'Data di Filiera', desc: 'Raccolta dati e ottimizzazione KPI produttivi e logistici.', tech: 'MES · analytics dashboard' }
    ],
    experience: [
      { step: '01', title: 'Stage Produzione', text: 'Esperienza in plant food con monitoraggio produzione e qualità.' },
      { step: '02', title: 'Laboratori Sensoriali', text: 'Test prodotto e analisi tecnica con approccio pratico-scientifico.' },
      { step: '03', title: 'Visite di Filiera', text: 'Dalla materia prima al confezionamento: visione completa del processo.' },
      { step: '04', title: 'Inserimento Professionale', text: 'Passaggio rapido verso ruoli tecnici richiesti nel food-tech.' }
    ],
    testimonials: [
      { role: 'Studente ITS · 1° anno', name: 'Davide C., 19 anni', quote: 'Non pensavo che fare il tecnico in un\'azienda alimentare fosse così interessante. Qui ho capito che ogni prodotto che mangi è frutto di ingegneria.' },
      { role: 'Ex Studente · ora in Barilla', name: 'Federica L., 23 anni', quote: 'Sono entrata in Barilla grazie allo stage ITS. Controllo una linea produttiva da sola: responsabilità vera, non finta.' },
      { role: 'Plant Manager · Granarolo', name: 'Azienda Partner', quote: 'Cerchiamo tecnici che capiscono la filiera end-to-end. Gli studenti ITS hanno questo approccio integrato già nel DNA.' }
    ]
  },
  'sistema-moda': {
    mood: 'Design industriale, manifattura evoluta e fashion-tech',
    headline: 'Disegna il futuro della moda tech.',
    subline: 'Tra creatività e tecnologia per brand e filiere produttive avanzate.',
    accent2: '#f5dcc3',
    glow: 'rgba(230, 184, 138, 0.34)',
    heroImage: '/hero-students.jpg',
    heroPosition: 'center 36%',
    imageFilter: 'hue-rotate(328deg) saturate(0.96) contrast(1.14) brightness(0.48)',
    imageOverlay: 'linear-gradient(165deg, rgba(24, 16, 13, 0.72) 0%, rgba(15, 9, 7, 0.92) 100%)',
    visualTag: 'Advanced Fashion Studio',
    companies: ['Versace', 'OTB Group', 'Corneliani', 'Brembana & Rolle', 'Marzotto', 'Loro Piana'],
    sectorCards: [
      { title: 'Cosa fa questo settore', text: 'Unisce design, materiali innovativi e processi produttivi per la moda tecnologica.' },
      { title: 'Dove lavorerai', text: 'Uffici stile, prototipazione, produzione, controllo qualità e supply chain moda.' },
      { title: 'Competenze chiave', text: 'CAD moda, modellistica digitale, materiali smart, prototipazione e industrializzazione.' },
      { title: 'Figure più richieste', text: 'Tecnico prodotto moda, prototipista digitale, quality specialist, process technician.' }
    ],
    learning: [
      { icon: '01', title: 'Design & Prototipi', desc: 'Dallo sketch tecnico al prototipo fisico con workflow professionale.', tech: 'CAD moda · prototipazione rapida' },
      { icon: '02', title: 'Materiali Innovativi', desc: 'Studio materiali performanti e sostenibili per nuove collezioni.', tech: 'Textile tech · materiali smart' },
      { icon: '03', title: 'Industrializzazione', desc: 'Ottimizzazione processi per produzione scalabile e controllo costi.', tech: 'Process planning · PLM basics' },
      { icon: '04', title: 'Qualità di Collezione', desc: 'Controllo standard tecnici su capi e accessori in fase di produzione.', tech: 'QA moda · test conformità' }
    ],
    experience: [
      { step: '01', title: 'Stage Fashion-Tech', text: 'Esperienze in aziende moda e manifattura avanzata del territorio.' },
      { step: '02', title: 'Capsule Project', text: 'Sviluppo mini-collezioni tecniche con revisione professionale.' },
      { step: '03', title: 'Visite in Produzione', text: 'Osservazione diretta di reparti, macchinari e processi di confezione.' },
      { step: '04', title: 'Portfolio Occupabile', text: 'Output progettuali concreti da presentare in colloquio.' }
    ],
    testimonials: [
      { role: 'Studente ITS · 2° anno', name: 'Sofia B., 20 anni', quote: 'Moda e tecnologia sembrano mondi separati, ma qui li vivi insieme ogni giorno. Uso il CAD per prototipi che finiscono in showroom reali.' },
      { role: 'Ex Studente · ora in OTB Group', name: 'Lorenzo M., 22 anni', quote: 'Ho iniziato con uno stage, adesso sono nel team tecnico. Il portfolio che ho costruito all\'ITS ha fatto la differenza nel colloquio.' },
      { role: 'Product Director · Corneliani', name: 'Azienda Partner', quote: 'I tecnici di prodotto moda sono rari. Con ITS abbiamo trovato profili che capiscono sia il prodotto che il processo industriale.' }
    ]
  },
  'mobilita-automotive': {
    mood: 'Elettrico, connesso, autonomo: la mobilità che verrà',
    headline: 'Guida la mobilità del futuro.',
    subline: 'Sistemi EV, diagnostica avanzata e automotive di nuova generazione.',
    accent2: '#ffb3b3',
    glow: 'rgba(220, 50, 50, 0.34)',
    heroImage: '/hero-students.jpg',
    heroPosition: 'center 50%',
    imageFilter: 'hue-rotate(345deg) saturate(1.3) contrast(1.1) brightness(0.44)',
    imageOverlay: 'linear-gradient(165deg, rgba(28, 8, 8, 0.76) 0%, rgba(18, 4, 4, 0.92) 100%)',
    visualTag: 'EV Systems Lab',
    companies: ['Brembo', 'Stellantis', 'Bosch', 'Continental', 'Magneti Marelli', 'Dana'],
    sectorCards: [
      { title: 'Cosa fa questo settore', text: 'Sviluppa, testa e ottimizza sistemi per veicoli elettrici, ibridi e a guida connessa.' },
      { title: 'Dove lavorerai', text: 'OEM automotive, tier 1 fornitori, officine avanzate, motorsport e mobility service.' },
      { title: 'Competenze chiave', text: 'Diagnostica OBD, sistemi HV per EV, ADAS, reti CAN, calibrazione centraline e test bench.' },
      { title: 'Figure più richieste', text: 'Tecnico EV, calibratore ECU, specialista ADAS, tecnico diagnostica avanzata, motorsport tech.' }
    ],
    learning: [
      { icon: '01', title: 'Sistemi Elettrici EV', desc: 'Gestione batterie, motori elettrici e architetture high-voltage su veicoli reali.', tech: 'HV systems · BMS · inverter' },
      { icon: '02', title: 'Diagnostica Avanzata', desc: 'Lettura centraline, aggiornamento firmware e fault analysis su banco.', tech: 'OBD · ADAS diagnostics · CAN' },
      { icon: '03', title: 'Sistemi ADAS', desc: 'Calibrazione e test di sistemi di assistenza alla guida su pista.', tech: 'Radar · lidar · camera fusion' },
      { icon: '04', title: 'Performance & Test', desc: 'Misurazioni, ottimizzazione e collaudo in condizioni simulate e reali.', tech: 'Test bench · data logging' }
    ],
    experience: [
      { step: '01', title: 'Stage Automotive', text: 'Inserimento in team tecnici di aziende tier 1 e OEM del territorio.' },
      { step: '02', title: 'Track Days', text: 'Sessioni su pista per calibrazione e test sistemi in condizioni reali.' },
      { step: '03', title: 'Lab EV', text: 'Laboratorio dedicato ai sistemi ad alta tensione per veicoli elettrici.' },
      { step: '04', title: 'Career Day', text: 'Incontri diretti con recruiter delle aziende partner del network.' }
    ],
    testimonials: [
      { role: 'Studente ITS · 2° anno', name: 'Mattia G., 21 anni', quote: 'Lavorare su un\'auto elettrica vera, con i sistemi HV reali, è una cosa che ti cambia la prospettiva. L\'auto del futuro la studi qui, non in un libro.' },
      { role: 'Ex Studente · ora in Bosch', name: 'Valentina R., 23 anni', quote: 'In Bosch ero l\'unica del mio team a conoscere la diagnostica ADAS. Quel vantaggio me lo ha dato il percorso ITS.' },
      { role: 'Technical Lead · Brembo', name: 'Azienda Partner', quote: 'L\'automotive sta cambiando più veloce di qualunque altra industria. Abbiamo bisogno di tecnici aggiornati sull\'elettrico fin da subito.' }
    ]
  },
  'industria-digitale': {
    mood: 'AI industriale, digital twin, Industry 5.0 e smart factory',
    headline: 'Entra nell\'industria che pensa.',
    subline: 'AI, digital twin e automazione intelligente al servizio della fabbrica.',
    accent2: '#a5f3fc',
    glow: 'rgba(6, 182, 212, 0.36)',
    heroImage: '/hero-students.jpg',
    heroPosition: 'center 40%',
    imageFilter: 'hue-rotate(175deg) saturate(1.35) contrast(1.1) brightness(0.44)',
    imageOverlay: 'linear-gradient(165deg, rgba(3, 12, 22, 0.78) 0%, rgba(2, 8, 16, 0.93) 100%)',
    visualTag: 'AI Factory Control Room',
    companies: ['Siemens', 'Rockwell', 'Fanuc', 'Comau', 'Prima Industrie', 'Camozzi'],
    sectorCards: [
      { title: 'Cosa fa questo settore', text: 'Progetta e gestisce fabbriche connesse: AI, IoT industriale, digital twin e Industry 5.0.' },
      { title: 'Dove lavorerai', text: 'System integrator, OEM manifatturieri, reparti Industry 4.0, consulenza tech-industriale.' },
      { title: 'Competenze chiave', text: 'OT/IT integration, digital twin, machine learning applicato, SCADA evoluti e cybersecurity OT.' },
      { title: 'Figure più richieste', text: 'Industry 4.0 specialist, digital twin engineer, OT security analyst, AI process analyst.' }
    ],
    learning: [
      { icon: '01', title: 'Digital Twin', desc: 'Replica virtuale di impianti reali per simulazione, test e ottimizzazione.', tech: 'Siemens NX · Unity Industrial' },
      { icon: '02', title: 'AI Applicata', desc: 'Machine learning per predictive maintenance e quality control automatizzato.', tech: 'Python · ML · edge computing' },
      { icon: '03', title: 'Industrial IoT', desc: 'Connessione e orchestrazione dispositivi su reti OT sicure e scalabili.', tech: 'MQTT · OPC-UA · SCADA' },
      { icon: '04', title: 'Cybersecurity OT', desc: 'Protezione di reti industriali e sistemi di controllo da attacchi informatici.', tech: 'ICS security · network segmentation' }
    ],
    experience: [
      { step: '01', title: 'Smart Factory Tour', text: 'Accesso a stabilimenti Industria 4.0 con guida tecnica specializzata.' },
      { step: '02', title: 'AI Project', text: 'Sviluppo di un modello predittivo applicato a dati di produzione reali.' },
      { step: '03', title: 'Stage OT', text: 'Inserimento in team di system integration su progetti industriali attivi.' },
      { step: '04', title: 'Certificazioni', text: 'Percorso per certificazioni industry-standard (Siemens, Cisco OT, etc.).' }
    ],
    testimonials: [
      { role: 'Studente ITS · 1° anno', name: 'Francesco P., 20 anni', quote: 'Non sapevo cosa fosse un digital twin. Adesso ne costruisco uno per una linea produttiva vera. Questa non è teoria, è il lavoro di domani.' },
      { role: 'Ex Studente · ora in Siemens', name: 'Elena C., 22 anni', quote: 'Siemens mi ha assunto dopo tre mesi di stage. Lavoro su sistemi Industry 4.0 con colleghi che hanno lauree magistrali.' },
      { role: 'R&D Director · Comau', name: 'Azienda Partner', quote: 'L\'Industry 5.0 ha bisogno di tecnici che parlino sia il linguaggio OT che quello IT. I profili ITS sono rari e preziosissimi.' }
    ]
  }
}

const getCompanyLogo = (name: string): string | null => {
  const logoMap: Record<string, string> = {
    // Meccatronica
    'Tenaris': '/Loghi/Tenaris.png',
    'Brembo': '/Loghi/Brembo.png',
    'Avio Aero': '/Loghi/Avio Aero.png',
    'Lovato Electric': '/Loghi/Lovato Electric.png',
    'Cosberg': '/Loghi/Cosberg.png',
    'Gewiss': '/Loghi/Gewiss.png',
    // Energia
    'A2A': '/Loghi/A2A.png',
    'Enel Green Power': '/Loghi/enel green power.png',
    'ABB': '/Loghi/ABB.png',
    'Schneider Electric': '/Loghi/Schneider_Electric_2007.svg.png',
    // ICT
    'Leonardo': '/Loghi/Logo_Leonardo.svg.png',
    'Cisco': '/Loghi/cisco.png',
    'Huawei': '/Loghi/Huawei-Logo.png',
    'Fastweb': '/Loghi/fastweb.png',
    'Engineering': '/Loghi/Engineering.png',
    'Var Group': '/Loghi/Var Group.png',
    // Agroalimentare
    'Barilla': '/Loghi/Barilla.webp',
    'Granarolo': '/Loghi/Granarolo_corporate_POS2.svg.png',
    'Lavazza': '/Loghi/Lavazza_-_logo_(Italy,_1995).svg.png',
    'Ferrero': '/Loghi/Ferrero.svg',
    'Nestlé Italia': '/Loghi/Nestlé Italia.png',
    'Inalca': '/Loghi/Inalca.png',
    // Moda
    'Versace': '/Loghi/Versace.png',
    'OTB Group': '/Loghi/OTB Group.svg',
    'Corneliani': '/Loghi/Corneliani.png',
    'Brembana & Rolle': '/Loghi/Brembana & Rolle.png',
    'Marzotto': '/Loghi/Marzotto.png',
    'Loro Piana': '/Loghi/Loro Piana.svg',
    // Automotive
    'Stellantis': '/Loghi/Stellantis.svg.png',
    'Bosch': '/Loghi/Bosch.png',
    'Continental': '/Loghi/Continental.png',
    'Magneti Marelli': '/Loghi/Magneti Marelli.png',
    'Dana': '/Loghi/Dana.png',
    // Industry 4.0
    'Rockwell': '/Loghi/Rockwell_Automation_logo_(2019).svg.png',
    'Fanuc': '/Loghi/fanuc.png',
    'Comau': '/Loghi/Comau.svg',
    'Camozzi': '/Loghi/Camozzi.png',
    'Prima Industrie': '/Loghi/Prima Industrie.png',
  }
  return logoMap[name] ?? null
}

const theme = computed(() => themes[slug.value] ?? themes['meccatronica-automotive'])

const openDayDate = computed(() => {
  const now = new Date()
  const nextDate = new Date(now.getFullYear(), now.getMonth() + 1, 18, 9, 30, 0)
  return nextDate.getTime() <= now.getTime()
    ? new Date(now.getFullYear(), now.getMonth() + 2, 18, 9, 30, 0)
    : nextDate
})

const countdown = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })
let countdownTimer: ReturnType<typeof setInterval> | null = null

const updateCountdown = () => {
  const distance = Math.max(openDayDate.value.getTime() - Date.now(), 0)
  countdown.value = {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60)
  }
}

const formattedOpenDayDate = computed(() => new Intl.DateTimeFormat('it-IT', {
  day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
}).format(openDayDate.value))

useHead(() => ({
  title: sector.value!.meta.pageTitle,
  meta: [
    { name: 'description', content: sector.value!.meta.description },
    { name: 'keywords', content: sector.value!.meta.keywords },
    { property: 'og:title', content: sector.value!.meta.pageTitle },
    { property: 'og:description', content: sector.value!.meta.description }
  ]
}))

const pageStyle = computed(() => ({
  '--sector-accent': sector.value!.accent,
  '--sector-accent-glow': sector.value!.accentGlow,
  '--sector-accent-soft': sector.value!.accentSoft,
  '--sector-accent-2': theme.value.accent2,
  '--sector-glow': theme.value.glow,
  '--hero-image-filter': theme.value.imageFilter,
  '--hero-image-overlay': theme.value.imageOverlay,
  '--sector-btn-text': sector.value!.accentOnDark ?? '#fff'
}))

onMounted(() => {
  nextTick(() => { initReveal(); applyMagnetic() })
  updateCountdown()
  countdownTimer = setInterval(updateCountdown, 1000)
})

onBeforeUnmount(() => { if (countdownTimer) clearInterval(countdownTimer) })

watch(slug, () => {
  nextTick(() => { initReveal(); applyMagnetic() })
  updateCountdown()
})
</script>

<template>
  <div v-if="sector" class="sector-page" :style="pageStyle">
    <SectorHeader
      :sector-name="sector.name"
      :sector-filiera="sector.filiera"
      :accent-color="sector.accent"
    />

    <main>
      <!-- HERO -->
      <section class="sector-hero">
        <div
          class="hero-media"
          :style="{ backgroundImage: `url('${theme.heroImage}')`, backgroundPosition: theme.heroPosition }"
          aria-hidden="true"
        ></div>
        <div class="hero-media-overlay" aria-hidden="true"></div>
        <div class="hero-particles" aria-hidden="true">
          <span v-for="i in 18" :key="i" class="particle" :style="{ '--i': i }"></span>
        </div>
        <div class="hero-grid" aria-hidden="true"></div>
        <div class="hero-glow" aria-hidden="true"></div>

        <div class="container hero-wrap">
          <div class="hero-copy" data-reveal>
            <div class="hero-eyebrow">
              <span class="dot" aria-hidden="true"></span>
              <span>{{ sector.filiera }}</span>
              <span class="eyebrow-sep" aria-hidden="true"></span>
              <span>ITS Academy</span>
            </div>

            <h1>{{ theme.headline }}</h1>

            <p class="hero-sub">
              Percorsi ITS altamente specializzati collegati alle aziende leader del territorio.
              <strong>{{ theme.subline }}</strong>
            </p>

            <div class="hero-cta-row">
              <a href="#overview-story" class="btn btn-primary">
                Scopri il percorso <span class="arrow">→</span>
              </a>
              <a href="#open-day-live" class="btn btn-ghost">
                Prenota Open Day
              </a>
              
            </div>
          </div>

          <div class="hero-panel" data-reveal>
            <div class="panel-tag">
              <span class="panel-dot" aria-hidden="true"></span>
              {{ theme.visualTag }}
            </div>
            <div class="stat-grid">
              <article class="stat-cell">
                <span class="stat-label">Placement</span>
                <strong class="stat-num">92%</strong>
                <span class="stat-sub">entro 12 mesi</span>
              </article>
              <article class="stat-cell">
                <span class="stat-label">Ore laboratorio</span>
                <strong class="stat-num">700<small>+</small></strong>
                <span class="stat-sub">su progetti reali</span>
              </article>
              <article class="stat-cell">
                <span class="stat-label">Aziende partner</span>
                <strong class="stat-num">{{ theme.companies.length }}<small>+</small></strong>
                <span class="stat-sub">nel network</span>
              </article>
              <article class="stat-cell">
                <span class="stat-label">Territorio</span>
                <strong class="stat-num">BG · BS · MI</strong>
                <span class="stat-sub">Lombardia</span>
              </article>
            </div>
            <div class="panel-bar">
              <div class="panel-bar-fill" :style="{ background: `linear-gradient(90deg, ${sector.accent}, ${theme.accent2})` }"></div>
            </div>
            <p class="panel-footnote">Dati medi su coorti ITS · fonte: MIUR 2024</p>
          </div>
        </div>

        <div class="hero-scroll" aria-hidden="true">
          <span></span>
          <span class="scroll-label">Scroll</span>
        </div>
      </section>

      <!-- IL SETTORE -->
      <section id="overview-story" class="sector-overview">
        <div class="container">
          <div class="section-head left" data-reveal>
            <span class="eyebrow">Il Settore</span>
            <h2>Un settore ad alta richiesta,<br>con sbocchi reali.</h2>
            <p class="lead">{{ theme.mood }}. Una formazione progettata con le imprese, per entrare in ruoli tecnici ad alta occupabilità.</p>
          </div>

          <div class="overview-grid reveal-stagger" data-reveal-stagger>
            <article v-for="card in theme.sectorCards" :key="card.title" class="overview-card">
              <div class="card-accent-line" aria-hidden="true"></div>
              <h3>{{ card.title }}</h3>
              <p>{{ card.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <!-- AZIENDE -->
      <section class="companies-wall">
        <div class="container">
          <div class="section-head" data-reveal>
            <span class="eyebrow">Aziende Collegate</span>
            <h2>Le aziende che cercano i professionisti di domani.</h2>
            <p class="lead">Il network industriale del territorio — imprese reali, stage reali, contratti reali.</p>
          </div>
          <div class="logos-grid reveal-stagger" data-reveal-stagger>
            <article v-for="name in theme.companies" :key="name" class="logo-chip">
              <div class="chip-inner">
                <img v-if="getCompanyLogo(name)" :src="getCompanyLogo(name)!" :alt="name" class="company-logo" />
                <span v-else class="company-text">{{ name }}</span>
              </div>
            </article>
          </div>
          <p class="companies-note" data-reveal>
            Accordi di partnership attivi per stage, project work e inserimento professionale.
          </p>
        </div>
      </section>

      <!-- COSA IMPARERAI -->
      <section id="learning-story" class="learning-section">
        <div class="container">
          <div class="section-head left" data-reveal>
            <span class="eyebrow">Cosa Imparerai</span>
            <h2>Laboratori, tecnologie e strumenti da industria avanzata.</h2>
          </div>

          <div class="learning-grid reveal-stagger" data-reveal-stagger>
            <article v-for="block in theme.learning" :key="block.title" class="learning-card">
              <div class="learning-num">{{ block.icon }}</div>
              <h3>{{ block.title }}</h3>
              <p>{{ block.desc }}</p>
              <div class="tech-pill">
                <span aria-label="Tecnologie utilizzate">{{ block.tech }}</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- ESPERIENZA REALE -->
      <section id="experience-story" class="experience-section">
        <div class="container">
          <div class="section-head" data-reveal>
            <span class="eyebrow">Esperienza Reale</span>
            <h2>Non una simulazione.<br>Un percorso professionale concreto.</h2>
            <p class="lead">Ogni fase del percorso ITS è progettata con le aziende partner per garantire un'esperienza professionale autentica.</p>
          </div>

          <div class="timeline" data-reveal>
            <div class="timeline-line" aria-hidden="true"></div>
            <article v-for="item in theme.experience" :key="item.title" class="timeline-item reveal-stagger" data-reveal-stagger>
              <div class="tl-step">{{ item.step }}</div>
              <div class="tl-body">
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- TESTIMONIANZE -->
      <section id="testimonials-story" class="testimonials-section">
        <div class="container">
          <div class="section-head left" data-reveal>
            <span class="eyebrow">Testimonianze</span>
            <h2>Storie vere.<br>Risultati reali.</h2>
          </div>

          <div class="reels-row reveal-stagger" data-reveal-stagger>
            <article v-for="item in theme.testimonials" :key="item.name" class="reel-card">
              <div class="reel-header">
                <div class="reel-avatar" aria-hidden="true">
                  {{ item.name.charAt(0) }}
                </div>
                <div class="reel-meta">
                  <span class="reel-role">{{ item.role }}</span>
                  <span class="reel-name">{{ item.name }}</span>
                </div>
                <div class="reel-play" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M8 5.14v13.72L19 12 8 5.14z" fill="currentColor" />
                  </svg>
                </div>
              </div>
              <blockquote>"{{ item.quote }}"</blockquote>
            </article>
          </div>
        </div>
      </section>

      <!-- B2B SECTIONS -->
      <PartnersSection :logos="sector.partners.logos" />
      <EcosystemSection :sector="sector" />
      <PricingSection :sector="sector" />
      <KpiSection :sector="sector" />
      <MaintenanceSection :sector="sector" />
      <ScenarioSection :sector="sector" />

      <!-- BOTTOM CTA -->
      <section class="bottom-cta">
        <div class="container">
          <div class="bottom-cta-card" data-reveal>
            <div class="bottom-tag">ITS Academy · Bergamo · Brescia · Milano · Lombardia</div>
            <h3>Accesso diretto al mondo industriale avanzato.</h3>
            <p>Il percorso che connette i tuoi obiettivi alle imprese che costruiscono il futuro del territorio.</p>
              <div class="bottom-actions">
              <a href="#open-day-live" class="btn btn-primary">Prenota Open Day</a>
            </div>
          </div>
        </div>
      </section>

      <section id="open-day-live" class="open-day-section">
        <div class="open-day-bg" aria-hidden="true"></div>
        <div class="container open-day-wrap">
          <div class="open-day-copy" data-reveal>
            <span class="eyebrow">Open Day</span>
            <h2>Scopri il tuo futuro<br>dal vivo.</h2>
            <p>Incontra coordinatori, studenti e aziende partner. Vedi i laboratori, prova tecnologie reali e ricevi orientamento personalizzato.</p>

            <div class="open-day-date-row">
              <div class="date-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.5" fill="none" />
                  <path d="M16 3v4M8 3v4M3 11h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div>
                <span class="date-label">Prossima data</span>
                <strong class="date-val">{{ formattedOpenDayDate }}</strong>
              </div>
            </div>

            <div class="countdown-grid" aria-live="polite">
              <article v-for="(val, key) in countdown" :key="key" class="cd-cell">
                <span class="cd-num">{{ val < 10 ? '0' + val : val }}</span>
                <small>{{ key === 'days' ? 'Giorni' : key === 'hours' ? 'Ore' : key === 'minutes' ? 'Min' : 'Sec' }}</small>
              </article>
            </div>

            <div class="open-day-perks">
              <div class="perk"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="perk-icon" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Tour dei laboratori</div>
              <div class="perk"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="perk-icon" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Orientamento individuale</div>
              <div class="perk"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="perk-icon" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Incontro con aziende partner</div>
              <div class="perk"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="perk-icon" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Q&A con studenti e coordinatori</div>
            </div>
          </div>

          <form class="open-day-form" data-reveal @submit.prevent>
            <div class="form-header">
              <h3>Prenota il tuo posto</h3>
              <p>Gratuito · Posti limitati</p>
            </div>

            <label>
              Nome e cognome
              <input type="text" name="name" placeholder="Es. Marco Rossi" required autocomplete="name" />
            </label>
            <label>
              Email
              <input type="email" name="email" placeholder="nome@email.it" required autocomplete="email" />
            </label>
            <label>
              Telefono
              <input type="tel" name="phone" placeholder="+39 333 0000000" required autocomplete="tel" />
            </label>
            <label>
              Settore di interesse
              <input type="text" :value="sector.name" readonly />
            </label>

            <button type="submit" class="btn btn-electric">
              Conferma iscrizione <span class="arrow">→</span>
            </button>
            
          </form>
        </div>
      </section>

      <OurWorksSection />
      <DownloadSection :sector="sector" />
    </main>

    <SectorFooter :sector-name="sector.name" :accent-color="sector.accent" />

    
  </div>
</template>

<style scoped>
/* ── Page Shell ─────────────────────────────────────────── */
.sector-page {
  background: #05080f;
  color: #fff;
  overflow-x: hidden;
}

/* ── B2B Sections Dark Override ─────────────────────────── */

/* PartnersSection */
:deep(.partners-section) {
  background: #07090f !important;
  border-top: 1px solid rgba(255,255,255,0.06);
}
:deep(.partners-section .section-head h2),
:deep(.partners-section h2) { color: #fff !important; }
:deep(.partners-section .eyebrow) { color: var(--sector-accent) !important; }
:deep(.logo-text) { color: rgba(235,244,255,0.65) !important; }
:deep(.logo-item) { opacity: 0.7; filter: brightness(2) !important; }
:deep(.logo-item:hover) { opacity: 1 !important; }

/* EcosystemSection — already dark, just accent + subtitle override */
:deep(.ecosystem) { background: #07090f !important; }
:deep(.ecosystem .eyebrow) { color: var(--sector-accent) !important; }
:deep(.ecosystem h2) { color: #fff !important; }
:deep(.ecosystem .section-subtitle),
:deep(.ecosystem p) { color: rgba(235,244,255,0.6) !important; }

/* PricingSection */
:deep(.pricing) { background: #07090f !important; }
:deep(.pricing h2),
:deep(.pricing .section-head h2) { color: #fff !important; }
:deep(.pricing .eyebrow) { color: var(--sector-accent) !important; }
:deep(.pricing .lead) { color: rgba(235,244,255,0.65) !important; }
:deep(.price-card) {
  background: rgba(255,255,255,0.04) !important;
  border-color: rgba(255,255,255,0.08) !important;
  color: rgba(235,244,255,0.85) !important;
}
:deep(.price-card:hover) {
  border-color: var(--sector-accent) !important;
  background: rgba(255,255,255,0.07) !important;
}
:deep(.price-card.featured) {
  background: linear-gradient(160deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%) !important;
  border-color: var(--sector-accent) !important;
}
:deep(.price-tag) { background: rgba(255,255,255,0.06) !important; color: rgba(235,244,255,0.5) !important; }
:deep(.price-card.featured .price-tag) { background: rgba(255,255,255,0.12) !important; color: var(--sector-accent) !important; }
:deep(.price-name) { color: rgba(235,244,255,0.9) !important; }
:deep(.price-card:not(.featured) .price-amount) { color: #fff !important; }
:deep(.price-period) { color: rgba(235,244,255,0.5) !important; }
:deep(.price-features li) { color: rgba(235,244,255,0.75) !important; border-color: rgba(255,255,255,0.08) !important; }
:deep(.price-card.featured .price-features li) { border-color: rgba(255,255,255,0.12) !important; }
:deep(.feat-label) { color: rgba(235,244,255,0.45) !important; }
:deep(.pricing .pricing-note),
:deep(.pricing .iva-note) { color: rgba(235,244,255,0.4) !important; }

/* KpiSection */
:deep(.kpi) { background: #07090f !important; }
:deep(.kpi h2),
:deep(.kpi .section-head h2) { color: #fff !important; }
:deep(.kpi .eyebrow) { color: var(--sector-accent) !important; }
:deep(.kpi .lead) { color: rgba(235,244,255,0.65) !important; }
:deep(.kpi-dashboard) {
  background: rgba(255,255,255,0.03) !important;
  border-color: rgba(255,255,255,0.07) !important;
}
:deep(.dashboard-head h3) { color: #fff !important; }
:deep(.live-indicator) { color: rgba(235,244,255,0.45) !important; }
:deep(.kpi-table thead th) {
  color: rgba(235,244,255,0.45) !important;
  border-color: rgba(255,255,255,0.08) !important;
}
:deep(.kpi-table tbody tr) { border-color: rgba(255,255,255,0.06) !important; }
:deep(.kpi-table tbody tr:hover) { background: rgba(255,255,255,0.04) !important; }
:deep(.kpi-table td) { color: rgba(235,244,255,0.8) !important; }
:deep(.budget-cell) { color: #fff !important; }
:deep(.iscritti-result) { color: rgba(235,244,255,0.85) !important; }
:deep(.iscritti-result .num) { color: var(--sector-accent) !important; }
:deep(.platform-val) { color: rgba(235,244,255,0.8) !important; }
:deep(.platform-label.meta) { background: rgba(24,119,242,0.2) !important; color: #90c3ff !important; }
:deep(.platform-label.tiktok) { background: rgba(255,255,255,0.1) !important; color: #eee !important; }
:deep(.platform-label.google) { background: rgba(30,142,62,0.2) !important; color: #86efac !important; }
:deep(.roi-tag) { background: rgba(255,255,255,0.08) !important; color: rgba(235,244,255,0.7) !important; }
:deep(.roi-tag.high) { background: rgba(255,255,255,0.1) !important; color: var(--sector-accent) !important; }
:deep(.kpi-disclaimer) {
  background: rgba(255,255,255,0.04) !important;
  border-color: var(--sector-accent) !important;
  color: rgba(235,244,255,0.55) !important;
}
:deep(.kpi-disclaimer strong) { color: rgba(235,244,255,0.9) !important; }
:deep(.kpi-iva) { color: rgba(235,244,255,0.35) !important; }

/* MaintenanceSection */
:deep(.maintenance) { background: #07090f !important; }
:deep(.maintenance h2),
:deep(.maintenance .section-head h2) { color: #fff !important; }
:deep(.maintenance .eyebrow) { color: var(--sector-accent) !important; }
:deep(.maintenance .lead) { color: rgba(235,244,255,0.65) !important; }
:deep(.maint-card) {
  background: rgba(255,255,255,0.04) !important;
  border-color: rgba(255,255,255,0.08) !important;
  color: rgba(235,244,255,0.85) !important;
}
:deep(.maint-card:hover) {
  background: rgba(255,255,255,0.07) !important;
}
:deep(.maint-card.featured) {
  background: linear-gradient(160deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%) !important;
  border-color: var(--sector-accent) !important;
}
:deep(.maint-name) { color: rgba(235,244,255,0.5) !important; }
:deep(.maint-card.featured .maint-name) { color: var(--sector-accent) !important; opacity: 1 !important; }
:deep(.maint-price .amount) { color: #fff !important; }
:deep(.maint-list li) { border-color: rgba(255,255,255,0.08) !important; color: rgba(235,244,255,0.8) !important; }
:deep(.maint-label) { color: rgba(235,244,255,0.45) !important; }
:deep(.video-notes) {
  background: rgba(255,255,255,0.04) !important;
  border-left-color: var(--sector-accent) !important;
}
:deep(.video-notes-title) { color: var(--sector-accent) !important; }
:deep(.video-notes li) { color: rgba(235,244,255,0.75) !important; }
:deep(.video-notes li strong) { color: #fff !important; }
:deep(.ads-maint-block) {
  background: rgba(255,255,255,0.04) !important;
  border-color: rgba(255,255,255,0.08) !important;
}
:deep(.ads-maint-head h3) { color: #fff !important; }
:deep(.ads-maint-head p) { color: rgba(235,244,255,0.65) !important; }
:deep(.ads-table thead th) { color: rgba(235,244,255,0.45) !important; border-color: rgba(255,255,255,0.08) !important; }
:deep(.ads-table tbody tr) { border-color: rgba(255,255,255,0.06) !important; }
:deep(.ads-table tbody tr:hover) { background: rgba(255,255,255,0.04) !important; }
:deep(.tier-label) { color: rgba(235,244,255,0.9) !important; }
:deep(.ads-amount) { color: #fff !important; }
:deep(.ads-amount-sm) { color: rgba(235,244,255,0.55) !important; }
:deep(.ads-views) { color: rgba(235,244,255,0.85) !important; }
:deep(.iva-note),
:deep(.ads-maint-note) { color: rgba(235,244,255,0.35) !important; }
/* platform-badges in maintenance dark */
:deep(.maint-card:not(.featured) .platform-badge.facebook) { background: rgba(24,119,242,0.2) !important; color: #90c3ff !important; }
:deep(.maint-card:not(.featured) .platform-badge.instagram) { background: rgba(194,24,91,0.2) !important; color: #f48fb1 !important; }
:deep(.maint-card:not(.featured) .platform-badge.tiktok) { background: rgba(255,255,255,0.1) !important; color: #eee !important; }
:deep(.maint-card:not(.featured) .platform-badge.youtube-shorts) { background: rgba(255,107,26,0.2) !important; color: #ffb38a !important; }
:deep(.maint-card:not(.featured) .platform-badge.google) { background: rgba(30,142,62,0.2) !important; color: #86efac !important; }

/* OurWorksSection */
:deep(.our-works) { background: #07090f !important; }
:deep(.our-works h2),
:deep(.our-works .section-head h2) { color: #fff !important; }
:deep(.our-works .eyebrow) { color: var(--sector-accent) !important; }
:deep(.our-works .lead) { color: rgba(235,244,255,0.65) !important; }
:deep(.video-card) {
  background: rgba(255,255,255,0.04) !important;
  border-color: rgba(255,255,255,0.08) !important;
}
:deep(.video-card:hover) { border-color: var(--sector-accent) !important; box-shadow: 0 12px 32px rgba(0,0,0,0.4) !important; }
:deep(.video-info) { background: rgba(255,255,255,0.02) !important; }
:deep(.video-title) { color: #fff !important; }
:deep(.video-link) {
  color: rgba(235,244,255,0.65) !important;
  border-color: rgba(255,255,255,0.12) !important;
}
:deep(.video-link:hover) {
  background: var(--sector-accent) !important;
  border-color: var(--sector-accent) !important;
  color: #fff !important;
}

.container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 clamp(16px, 2.4vw, 32px);
}

section { padding: clamp(60px, 9vw, 110px) 0; position: relative; }

.section-head { margin-bottom: clamp(30px, 4.5vw, 56px); }
.section-head h2 { color: #fff; max-width: 16ch; }
.section-head.left { text-align: left; }
.section-head:not(.left) { text-align: center; margin-left: auto; margin-right: auto; max-width: 840px; }
.section-head:not(.left) h2 { margin: 0 auto; }

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 700;
  color: var(--sector-accent-2);
  margin-bottom: 20px;
}
.eyebrow::before {
  content: '';
  width: 20px;
  height: 1px;
  background: var(--sector-accent-2);
}

.lead {
  color: rgba(235, 244, 255, 0.68);
  font-size: clamp(1rem, 1.3vw, 1.15rem);
  max-width: 62ch;
  line-height: 1.7;
  margin-top: 14px;
}
.section-head:not(.left) .lead { margin-left: auto; margin-right: auto; max-width: 56ch; }

/* ── Hero ───────────────────────────────────────────────── */
.sector-hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-top: 140px;
  position: relative;
}

.hero-media,
.hero-media-overlay,
.hero-particles,
.hero-grid,
.hero-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-media {
  background-size: cover;
  background-repeat: no-repeat;
  filter: var(--hero-image-filter);
  transform: scale(1.04);
  transition: transform 8s ease-out;
}

.hero-media-overlay { background: var(--hero-image-overlay); }

.hero-grid {
  background-image:
    linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 78%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 78%);
}

.hero-glow {
  background:
    radial-gradient(circle at 80% 22%, var(--sector-glow), transparent 46%),
    radial-gradient(circle at 14% 80%, rgba(255,255,255,0.06), transparent 38%);
}

.hero-particles { overflow: hidden; }
.particle {
  position: absolute;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: var(--sector-accent-2);
  opacity: 0;
  left: calc(var(--i) * 5.7%);
  top: calc(var(--i) * 4.3% + 10%);
  animation: float-particle calc(4s + var(--i) * 0.3s) ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.22s);
  box-shadow: 0 0 6px var(--sector-accent-2);
}

@keyframes float-particle {
  0%, 100% { opacity: 0; transform: translateY(0) scale(1); }
  30% { opacity: 0.7; }
  60% { opacity: 0.4; transform: translateY(-40px) scale(1.5); }
}

.hero-wrap {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 56px;
  align-items: end;
  position: relative;
  z-index: 2;
  padding-bottom: 60px;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(12px);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: rgba(255,255,255,0.82);
  margin-bottom: 24px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--sector-accent);
  box-shadow: 0 0 14px var(--sector-accent);
  animation: pulse-dot 2.4s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 8px var(--sector-accent); }
  50% { box-shadow: 0 0 22px var(--sector-accent); }
}

.eyebrow-sep {
  width: 1px;
  height: 14px;
  background: rgba(255,255,255,0.18);
}

.hero-copy h1 {
  margin: 0 0 22px;
  max-width: 13ch;
  font-size: clamp(2rem, 6vw, 5.2rem);
  line-height: 1.0;
  text-wrap: balance;
}

.hero-sub {
  color: rgba(235,244,255,0.78);
  max-width: 54ch;
  margin-bottom: clamp(22px, 4vw, 36px);
  font-size: clamp(0.95rem, 1.2vw, 1.1rem);
  line-height: 1.65;
}
.hero-sub strong { color: #fff; font-weight: 600; }

.hero-cta-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-wa {
  background: rgba(34,197,94,0.14);
  border: 1px solid rgba(34,197,94,0.3);
  color: #4ade80;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 22px;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}
.btn-wa:hover { background: rgba(34,197,94,0.22); color: #86efac; transform: translateY(-2px); }

/* Hero panel */
.hero-panel {
  border-radius: 24px;
  border: 1px solid rgba(255,255,255,0.14);
  background: linear-gradient(160deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  padding: 24px;
}

.panel-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--sector-accent-2);
  margin-bottom: 20px;
}
.panel-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--sector-accent-2);
  box-shadow: 0 0 8px var(--sector-accent-2);
}

.stat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 18px;
}

.stat-cell {
  padding: 14px 16px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-label {
  display: block;
  color: rgba(229,238,255,0.55);
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.stat-num {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.7rem;
  letter-spacing: -0.04em;
  line-height: 1;
  margin: 4px 0 2px;
  color: #fff;
}
.stat-num small { font-size: 1rem; opacity: 0.7; }

.stat-sub {
  display: block;
  font-size: 0.68rem;
  color: rgba(255,255,255,0.45);
}

.panel-bar {
  height: 3px;
  background: rgba(255,255,255,0.08);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 10px;
}
.panel-bar-fill {
  height: 100%;
  width: 92%;
  border-radius: 999px;
  animation: bar-in 1.2s cubic-bezier(0.22,1,0.36,1) 0.5s both;
}
@keyframes bar-in { from { width: 0; } }

.panel-footnote {
  font-size: 0.66rem;
  color: rgba(255,255,255,0.32);
  text-align: right;
}

/* Scroll indicator */
.hero-scroll {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 3;
}
.hero-scroll span:first-child {
  width: 1px;
  height: 48px;
  background: linear-gradient(180deg, transparent, rgba(255,255,255,0.5));
  animation: scroll-line 2s ease-in-out infinite;
}
.scroll-label {
  font-size: 0.6rem !important;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.38);
  height: auto !important;
}
@keyframes scroll-line {
  0%, 100% { opacity: 0.3; transform: scaleY(0.6); transform-origin: top; }
  50% { opacity: 1; transform: scaleY(1); }
}

/* ── Overview ───────────────────────────────────────────── */
.sector-overview {
  background: linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.01) 100%);
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.overview-card {
  padding: clamp(20px, 3vw, 28px);
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.1);
  background: linear-gradient(140deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%);
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s ease, transform 0.3s ease;
}
.overview-card:hover { border-color: rgba(255,255,255,0.2); transform: translateY(-3px); }

.card-accent-line {
  position: absolute;
  top: 0; left: 0;
  width: 48px;
  height: 2px;
  background: linear-gradient(90deg, var(--sector-accent), transparent);
  border-radius: 0 0 2px 0;
}

.overview-card h3 {
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: #fff;
}
.overview-card p { color: rgba(235,244,255,0.7); font-size: 0.9375rem; }

/* ── Companies ──────────────────────────────────────────── */
.companies-wall { background: #04070e; }
.companies-wall .section-head h2 { max-width: 22ch; }

.logos-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

.logo-chip {
  min-height: clamp(84px, 12vw, 100px);
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.96);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.35s ease;
  cursor: default;
}
.logo-chip:hover {
  border-color: var(--sector-accent);
  background: #fff;
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.35);
}

.chip-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px 24px;
  box-sizing: border-box;
}
.company-logo {
  width: 100%;
  height: 100%;
  max-width: 160px;
  max-height: 60px;
  object-fit: contain;
  opacity: 0.9;
  transition: opacity 0.3s ease;
}
.logo-chip:hover .company-logo {
  opacity: 1;
}
.company-text {
  color: rgba(255,255,255,0.88);
  font-weight: 600;
  letter-spacing: 0.02em;
  font-size: 0.95rem;
  text-align: center;
  line-height: 1.3;
}

.companies-note {
  text-align: center;
  color: rgba(255,255,255,0.35);
  font-size: 0.84rem;
}

/* ── Learning ───────────────────────────────────────────── */
.learning-section {
  background: linear-gradient(180deg, #04070e 0%, #06101e 100%);
}

.learning-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.learning-card {
  padding: clamp(20px, 3vw, 28px);
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.03);
  transition: all 0.35s ease;
}
.learning-card:hover {
  border-color: rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.06);
  transform: translateY(-3px);
}

.learning-num {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  color: var(--sector-accent-2);
  opacity: 0.5;
  margin-bottom: 14px;
  line-height: 1;
}

.learning-card h3 { font-size: 1.15rem; margin-bottom: 10px; color: #fff; }
.learning-card p { color: rgba(235,244,255,0.68); font-size: 0.9375rem; margin-bottom: 14px; }

.tech-pill {
  display: inline-flex;
  padding: 5px 12px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.04);
}
.tech-pill span {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.55);
}

/* ── Experience ─────────────────────────────────────────── */
.experience-section { background: #060c18; }
.experience-section .section-head h2 { max-width: 20ch; margin-left: auto; margin-right: auto; }

.timeline {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  position: relative;
}

.timeline-line {
  position: absolute;
  top: 24px;
  left: 12%;
  right: 12%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--sector-accent), transparent);
  opacity: 0.25;
}

.timeline-item {
  padding: clamp(18px, 2.8vw, 24px);
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.03);
  transition: all 0.35s ease;
}
.timeline-item:hover { border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.06); }

.tl-step {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: var(--sector-accent-2);
  margin-bottom: 12px;
}

.tl-body h3 { font-size: 1rem; margin-bottom: 8px; color: #fff; }
.tl-body p { color: rgba(235,244,255,0.68); font-size: 0.9rem; }

/* ── Testimonials ───────────────────────────────────────── */
.testimonials-section {
  background: linear-gradient(180deg, #060c18 0%, #030609 100%);
}

.reels-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.reel-card {
  border-radius: 22px;
  border: 1px solid rgba(255,255,255,0.14);
  background:
    linear-gradient(165deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 60%),
    radial-gradient(circle at 80% 20%, var(--sector-glow), transparent 40%);
  padding: clamp(18px, 2.8vw, 22px);
  display: flex;
  flex-direction: column;
  gap: 18px;
  transition: transform 0.35s ease, border-color 0.35s ease;
  min-height: 240px;
}
.reel-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.24); }

.reel-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.reel-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--sector-accent), var(--sector-accent-2));
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  color: #fff;
  flex-shrink: 0;
}

.reel-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}
.reel-role {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.5);
}
.reel-name { font-size: 0.875rem; font-weight: 600; color: rgba(255,255,255,0.9); }

.reel-play {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.07);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.7);
  flex-shrink: 0;
}

.reel-card blockquote {
  font-size: 1rem;
  line-height: 1.55;
  color: rgba(255,255,255,0.88);
  font-style: italic;
  flex: 1;
}

/* ── Open Day ───────────────────────────────────────────── */
.open-day-section {
  background: #030609;
  padding-bottom: clamp(52px, 7vw, 92px);
  overflow: hidden;
}

.open-day-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 50%, var(--sector-accent-glow, rgba(0,102,255,0.08)), transparent 50%),
    radial-gradient(circle at 80% 50%, rgba(255,255,255,0.02), transparent 50%);
  pointer-events: none;
}

.open-day-wrap {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 20px;
  position: relative;
  z-index: 1;
}

.open-day-copy, .open-day-form {
  border-radius: 24px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.03);
  padding: clamp(18px, 3vw, 28px);
}

.open-day-copy .eyebrow { margin-bottom: 14px; }
.open-day-copy h2 { color: #fff; margin-bottom: 14px; font-size: clamp(1.8rem, 3.5vw, 3rem); }
.open-day-copy > p { color: rgba(235,244,255,0.72); margin-bottom: 22px; font-size: 0.9375rem; }

.open-day-date-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.04);
  margin-bottom: 20px;
}
.date-icon { display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 50%; background: var(--sector-accent); flex-shrink: 0; }
.date-icon svg { width: 20px; height: 20px; color: #fff; stroke-width: 2; }
.date-label {
  display: block;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(255,255,255,0.45);
}
.date-val {
  display: block;
  font-size: 0.9375rem;
  color: rgba(255,255,255,0.9);
  font-weight: 600;
}

.countdown-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 24px;
}

.cd-cell {
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  padding: 14px 8px;
  text-align: center;
}

.cd-num {
  display: block;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  color: var(--sector-accent-2);
}

.cd-cell small {
  display: block;
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: rgba(255,255,255,0.45);
  margin-top: 4px;
}

.open-day-perks {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.perk {
  font-size: 0.84rem;
  color: rgba(255,255,255,0.8);
  display: flex;
  align-items: center;
  gap: 10px;
}
.perk-icon { width: 20px; height: 20px; min-width: 20px; flex-shrink: 0; stroke-width: 2.5; color: rgba(255,255,255,0.95); background: var(--sector-accent); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; padding: 2px; }
.reel-play { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; background: rgba(255,255,255,0.12); border-radius: 50%; }
.reel-play svg { width: 14px; height: 14px; color: #fff; }

/* Form */
.open-day-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-header { margin-bottom: 4px; }
.form-header h3 { color: #fff; margin-bottom: 4px; }
.form-header p {
  font-size: 0.78rem;
  color: rgba(255,255,255,0.4);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.open-day-form label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.82rem;
  color: rgba(255,255,255,0.65);
}

.open-day-form input {
  height: 48px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  color: #fff;
  padding: 0 14px;
  outline: none;
  font-size: 0.9375rem;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}
.open-day-form input:focus {
  border-color: var(--sector-accent);
  box-shadow: 0 0 0 3px var(--sector-accent-soft, rgba(0,102,255,0.15));
}
.open-day-form input[readonly] {
  color: rgba(255,255,255,0.45);
  cursor: default;
}

.wa-alt {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  color: rgba(255,255,255,0.45);
  font-size: 0.82rem;
  text-decoration: none;
  transition: color 0.2s;
}
.wa-alt:hover { color: #4ade80; }

/* ── Bottom CTA ─────────────────────────────────────────── */
.bottom-cta {
  background: #030609;
  padding-top: clamp(28px, 4.5vw, 56px);
  padding-bottom: clamp(48px, 7vw, 96px);
}

.bottom-cta-card {
  border-radius: 24px;
  border: 1px solid rgba(255,255,255,0.12);
  background: linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%);
  padding: clamp(24px, 4.2vw, 48px);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.bottom-cta-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0%, var(--sector-glow), transparent 50%);
  pointer-events: none;
}

.bottom-tag {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: rgba(255,255,255,0.4);
  margin-bottom: 14px;
}

.bottom-cta-card h3 {
  font-size: clamp(1.5rem, 3.5vw, 2.5rem);
  color: #fff;
  margin-bottom: 12px;
  max-width: 20ch;
  margin-left: auto;
  margin-right: auto;
  text-wrap: balance;
}

.bottom-cta-card > p {
  color: rgba(235,244,255,0.6);
  font-size: 1rem;
  max-width: 48ch;
  margin: 0 auto 28px;
}

.bottom-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  position: relative;
}

/* ── Responsive ─────────────────────────────────────────── */
@media (max-width: 1100px) {
  .hero-wrap,
  .open-day-wrap { grid-template-columns: 1fr; }

  .timeline { grid-template-columns: 1fr 1fr; }
  .reels-row { grid-template-columns: 1fr 1fr; }
  .logos-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 760px) {
  .container { padding: 0 clamp(16px, 5vw, 24px); }
  section { padding: clamp(48px, 8vw, 72px) 0; }
  .sector-hero { min-height: auto; padding-top: 110px; }
  .open-day-section { padding-bottom: 48px; }
  .bottom-cta { padding-top: 24px; padding-bottom: 56px; }

  .hero-copy h1 { font-size: clamp(1.9rem, 9vw, 2.6rem); }
  .hero-sub { font-size: 0.9375rem; }
  .hero-cta-row { flex-direction: column; }
  .hero-cta-row .btn { width: 100%; justify-content: center; }

  .overview-grid { grid-template-columns: 1fr; gap: 12px; }
  .learning-grid { grid-template-columns: 1fr; gap: 12px; }

  .timeline { grid-template-columns: 1fr 1fr; gap: 10px; }
  .timeline-line { display: none; }

  .reels-row { grid-template-columns: 1fr; gap: 12px; }
  .logos-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
  .countdown-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
  .cd-num { font-size: 1.5rem; }

  .open-day-perks { grid-template-columns: 1fr; gap: 6px; }
  .open-day-copy h2 { font-size: clamp(1.5rem, 6vw, 2rem); }

  .stat-grid { grid-template-columns: 1fr 1fr; }

  .bottom-cta-card { padding: clamp(20px, 5vw, 28px); }
  .bottom-actions { flex-direction: column; align-items: center; }

  .section-head { margin-bottom: clamp(24px, 5vw, 40px); }
  .lead { font-size: 0.9375rem; }
}

@media (max-width: 480px) {
  .hero-eyebrow .eyebrow-sep,
  .hero-eyebrow span:last-child { display: none; }
  .hero-panel { padding: 16px; }
  .stat-grid { grid-template-columns: 1fr; gap: 8px; }
  .logo-chip { min-height: 72px; }
  .chip-inner { padding: 12px 16px; }
  .logos-grid { grid-template-columns: 1fr; gap: 8px; }
  .timeline { grid-template-columns: 1fr; }
  .tl-body h3 { font-size: 0.9375rem; }
  .reel-card blockquote { font-size: 0.9375rem; }
  .open-day-copy h2 { font-size: clamp(1.35rem, 7vw, 1.75rem); }
  .countdown-grid { gap: 6px; }
  .cd-num { font-size: 1.3rem; }
  .bottom-cta-card h3 { font-size: clamp(1.25rem, 6vw, 1.75rem); }
}
</style>
