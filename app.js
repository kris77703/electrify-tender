// ─── CONFIG ───────────────────────────────────────────────────────────────
const SUPABASE_URL = 'https://dowrwswqoyfhakbdaegr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvd3J3c3dxb3lmaGFrYmRhZWdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwODc3MjAsImV4cCI6MjA5NDY2MzcyMH0.tXlNJOCbwxXU4C-QtYM3C6HE21OfH1uP5UqgGH9IP4I';
const APP_PASSWORD = 'electrify2025';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ═══════════════════════════════════════════════════════════════════════════
// ELECTRIFY ZINĀŠANU BĀZE — PILNA VERSIJA
// ═══════════════════════════════════════════════════════════════════════════

const COMPANY = {
  name: 'SIA Electrify',
  reg: '44103126791',
  address: 'Grostonas iela 17-20, Rīga, LV-1013, Latvija',
  production: 'Akmens iela 66, Ogre, Latvija',
  email: 'info@electricbus.lv',
  web: 'electricbus.lv',
  phone: '+371 26567650',
  contacts: {
    ceo: 'Agris Amoliņš',
    technical: 'Kristaps Dambis',
    bids: 'Evija Melne (bid@electricbus.lv)',
    pm: 'Egons Flinters'
  },
  certifications: ['ISO 9001:2015', 'ISO 14001:2015', 'ISO 45001:2018', 'CE tipa apstiprinājums ES'],
  partners: ['SIA Veho (Mercedes-Benz ģenerālpārstāvis Latvijā)', 'eO SIA (montāža)', 'NextStep Latvia SIA (iepirkumi)'],
  bank: 'Citadele banka, SWIFT: PARXLV22, LV42PARX0022775290001',
  size: 'Mazs uzņēmums (<50 darbinieki)',
  description: 'Mercedes eSprinter bāzes elektroautobusu ražotājs un piegādātājs. Pilns serviss: projektēšana, ražošana, programmēšana, piegāde, garantijas apkope.'
};

const PRODUCT = {
  name: 'Electrify eSprinter Electric Bus',
  base: 'Mercedes-Benz eSprinter',
  basePrice: 84462, // EUR bez PVN (furgons bez karosēšanas)
  bodyBuilder: 'Electrify SIA',
  categories: ['M2 B klase', 'M3 A klase'],
  seatsRange: { min: 8, max: 22 },
  motor: { power: 155, unit: 'kW', type: 'elektriskais' },
  battery: {
    capacity: 116,
    unit: 'kWh',
    brand: 'Mercedes-Benz',
    chemistry: 'NMC (lithium-nickel-manganese-cobalt)',
    warranty: '8 gadi (pēc 4g min 80% kapacitāte)',
    chargingAC: '22 kW (11 kW standarts)',
    chargingDC: 'līdz 115 kW',
    timeAC: '8 stundas (10-100%)',
    timeDC: '1.5 stundas (10-100%)'
  },
  autonomy: {
    sort2: 401,
    sort2_note: 'WLTP 441km (furgons), passenger variant ~350-400km',
    consumption: '28.5 kWh/100km (WLTP furgons)',
    guaranteed150: 'Pēc 48 mēnešiem min 150km garantētā autonomija'
  },
  dimensions: {
    length: 6967,
    width: 2020,
    height: 2950,
    wheelbase: 4325,
    floorHeight: 340,
    grossWeight: 4600
  },
  warranty: {
    vehicle: '6 gadi vai 350,000 km',
    battery: '8 gadi (min 80% pēc 4g)',
    antiRust: '8 gadi',
    deliveryMonths: 7
  },
  certifications: ['CE tipa apstiprinājums ES', 'M2 B klase / M3 A klase', 'EN 60721-2-1:2014', 'CCS Type 2'],
  safety: ['ESP', 'ABS', 'EBS', 'ASR/TCR', 'Hill start assist', 'DISTRONIC', 'Lane Keeping Assist', 'BSIS', 'Airbagi'],
  connectivity: ['GPS/telemetrija', 'WiFi', 'MBUX multivide', 'Apple CarPlay/Android Auto', 'LTE modulis', 'Remote diagnostics'],
  accessibility: 'Ramps standartā visiem modeļiem. Elektriskais lifts pēc pasūtījuma.',
  operatingTemp: '-30°C līdz +45°C',
  speed: '70/90/100 km/h (iestatāms)',
  customizable: [
    'Sēdvietu skaits (8-22)',
    'Sēdvietu veids (skolēnu jostas, invalīdu, VIP, sabiedriskais)',
    'Autonomija (baterijas kapacitāte)',
    'Lifts/ramps konfigurācija',
    'Ārējā krāsa un dizains',
    'Informācijas displeja valoda',
    'Uzlādes sistēmas iekļaušana',
    'Telemetrijas sistēma'
  ],
  cannotDo: [
    'M3 I klase (virs 22 sēdvietām / pilnizmēra autobusi)',
    'Cita ražotāja bāze (tikai Mercedes eSprinter)',
    'Autonomija virs ~450km bez bāzes maiņas',
    'Dīzeļa vai hibrīda autobusi',
    'Militārais vai speciālais transports',
    'Ātrums virs 100 km/h'
  ]
};

const EXPERIENCE = [
  {
    client: 'Ventspils reiss SIA',
    country: 'Latvija',
    year: '2020-2021',
    product: '4 elektroautobusi M3 I klase + 18 uzlādes stacijas',
    contract: 'VR2019/12-KF',
    value: null,
    category: 'M3 I klase',
    notes: 'Pilna infrastruktūra, ES tipa apstiprinājums'
  },
  {
    client: 'AS Liepājas Autobusu Parks',
    country: 'Latvija',
    year: '2020-2021',
    product: '3 elektroautobusi M3 I klase',
    contract: '09/2020-01',
    value: 703260,
    category: 'M3 I klase'
  },
  {
    client: 'AS Liepājas Autobusu Parks',
    country: 'Latvija',
    year: '2020-2021',
    product: '4 elektroautobusi M3 I klase (no 6 plānotajiem)',
    contract: '10/2020-01',
    value: 1377000,
    category: 'M3 I klase'
  },
  {
    client: 'VTU Valmiera SIA + SEB līzings',
    country: 'Latvija',
    year: '2023-2024',
    product: '3x M2 A (19 sēdv.) + 3x M3 A (22 sēdv.)',
    contract: '31.05.2023',
    value: 1441800,
    category: 'M2+M3 A klase',
    notes: 'Jaunākais projekts, tuvākais mūsu pašreizējam produktam'
  },
  {
    client: 'Saldus novada pašvaldība',
    country: 'Latvija',
    year: '2023-2024',
    product: '2x M3 (1+19 sēdv.) + 2x 50kW uzlādes iekārtas',
    contract: '12.10.2023',
    value: null,
    category: 'M3 A klase'
  },
  {
    client: 'Ventspils reiss SIA',
    country: 'Latvija',
    year: '2026 (aktīvs)',
    product: 'Jauns pieteikums VR2026/1',
    contract: 'VR2026/1',
    value: null,
    category: 'aktīvs',
    notes: 'Pieteikts 05.02.2026, termiņš 7 mēneši'
  },
  {
    client: 'Universitatea Stefan cel Mare Suceava',
    country: 'Rumānija',
    year: '2026 (aktīvs)',
    product: '1x M2 mikroautobuss ≥19 sēdv., PNRR finansēts',
    contract: '4244423202434',
    value: 182000,
    category: 'M2 aktīvs',
    notes: 'CPV 34114400-3. Vērtēšana: Cena 40%, Garantija 20%, Autonomija 15%, Efektivitāte 15%, Apkope 10%'
  },
  {
    client: 'Primăria Vicovu de Sus',
    country: 'Rumānija',
    year: '2025-2026 (aktīvs)',
    product: 'Skolēnu mikroautobusi, 2 loti',
    contract: 'CN1084895/25.08.2025',
    value: null,
    category: 'aktīvs',
    notes: 'Jautāja par zemām cenām (51.72% no vērtības) — labs precedents cenu argumentācijai'
  }
];

const COMPETITORS = [
  { name: 'Karsan e-Jest/e-Atak', country: '🇹🇷 Turcija', segment: 'Mini/Midi', price: 'Zems', threat: 'high', note: 'Galvenais konkurents mini segmentā' },
  { name: 'Mellor Coachcraft', country: '🇬🇧 UK', segment: 'Mini/Midi', price: 'Vidējs', threat: 'high', note: 'Liels tirgus daļa Rietumeiropā' },
  { name: 'BYD', country: '🇨🇳 Ķīna', segment: 'Visi', price: 'Zems', threat: 'high', note: 'Cenu konkurence, sertifikācijas jautājumi' },
  { name: 'Solaris', country: '🇵🇱 Polija', segment: 'Midi+', price: 'Vidējs', threat: 'mid', note: 'Spēcīgs Austrumeiropā, lielāki izmēri' },
  { name: 'Ebusco', country: '🇳🇱 Nīderlande', segment: 'Pilnizmēra', price: 'Augsts', threat: 'low', note: 'Cits segments' },
  { name: 'Vectia (CAF)', country: '🇪🇸 Spānija', segment: 'Mini/Midi', price: 'Vidējs', threat: 'mid', note: 'Augoša klātbūtne ES' }
];

const ADVANTAGES = [
  { icon: '🇪🇺', title: 'ES ražots', desc: 'Latvija, ES — priekšrocība publiskajos iepirkumos (vietējais ražotājs)' },
  { icon: '⭐', title: 'Mercedes bāze', desc: 'Pasaulē pazīstams zīmols, uzticams servisa tīkls visā Eiropā (SIA Veho partneris)' },
  { icon: '📜', title: '3x ISO sertificēts', desc: 'ISO 9001, 14001, 45001 — bieži obligāta prasība tenderēs' },
  { icon: '📡', title: 'Iebūvēta telemetrija', desc: 'GPS, WiFi, LTE, remote diagnostics — standartā, bez piemaksas' },
  { icon: '⚡', title: '401km autonomija', desc: 'SORT2 sertificēta — virs lielākās daļas tenderu minimuma (250km)' },
  { icon: '🔧', title: '6g/350,000km garantija', desc: 'Viena no garākajām garantijām tirgū' },
  { icon: '♿', title: 'Ramps standartā', desc: 'Pieejamība iebūvēta, lifts pēc pasūtījuma' },
  { icon: '🏭', title: 'Pierādīta pieredze', desc: 'Ventspils, Liepāja, Valmiera, Saldus, Rumānija — reālas references' }
];

// ═══════════════════════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════════════════════
let tenders = [];
let contacts = [];
let currentId = null;

// ═══════════════════════════════════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════════════════════════════════
function doLogin() {
  const pass = document.getElementById('login-pass').value;
  if (pass === APP_PASSWORD) {
    sessionStorage.setItem('ef_auth', '1');
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('app').style.display = 'grid';
    initApp();
  } else {
    document.getElementById('login-err').textContent = 'Nepareiza parole';
    document.getElementById('login-pass').value = '';
  }
}
function doLogout() { sessionStorage.removeItem('ef_auth'); location.reload(); }

// ═══════════════════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════════════════
async function initApp() {
  showLoading(true);
  await loadTenders();
  await loadContacts();
  if (tenders.length === 0) await seedTenders();
  showLoading(false);
  populateCountries();
  renderDashboard();
  updateStats();
  updateCalc();
  renderCompetitors();
}

async function seedTenders() {
  const seed = [
    { title: 'Elektrisko mikroautobusu piegāde — 2 vienības ar uzlādes stacijām', country: 'Rumānija', flag: '🇷🇴', buyer: 'Pašvaldība Osica de Sus, Olt', value: 320000, qty: 2, deadline: '2026-06-15', status: 'new', saved: false, url: 'https://ted.europa.eu/', description: '2 elektriskie mikroautobusi kopienas transportam. ES fondu finansēts. CPV 34114400. CE sertifikācija obligāta. Min autonomija 200km.', notes: '', ai_score: null, ai_data: null, pitch_text: null, docs: null, requirements: null },
    { title: 'Elektriska Midi Low-Floor autobusu piegāde', country: 'Horvātija', flag: '🇭🇷', buyer: 'ZET Zagreb Electric Tram', value: 850000, qty: 3, deadline: '2026-07-10', status: 'new', saved: false, url: 'https://ted.europa.eu/', description: '3 elektriskie midi zemas grīdas autobusi Zagrebai. Zemā grīda, ramps, ≥150km autonomija, M3 kategorija.', notes: '', ai_score: null, ai_data: null, pitch_text: null, docs: null, requirements: null },
    { title: 'Elektrisko mikroautobusu iegāde skolēniem — 2 loti', country: 'Rumānija', flag: '🇷🇴', buyer: 'Primăria Vicovu de Sus, Suceava', value: 0, qty: 4, deadline: '2026-06-30', status: 'applied', saved: true, url: 'https://ted.europa.eu/', description: 'Skolēnu elektromikroautobusi, 2 loti. Jau pieteicāmies — jautāja par zemām cenām (51.72%). PNRR finansēts.', notes: 'Pieteikts. Saņēmām clarification request par cenu.', ai_score: null, ai_data: null, pitch_text: null, docs: null, requirements: null },
    { title: 'Elektrisko autobusu iegāde sabiedriskajam transportam', country: 'Bulgārija', flag: '🇧🇬', buyer: 'Stolichen Avtotransport, Sofija', value: 14000000, qty: 52, deadline: '2026-08-30', status: 'new', saved: true, url: 'https://ted.europa.eu/', description: '52 autobusi (2 loti): Lot1 — 30 vienības 5-7.5m (M2 segments!), Lot2 — 22 vienības 7.6-9.6m. ES fondu finansēts. Lielākais projekts.', notes: 'LOT 1 mūsu segments! 30 x M2 autobusi.', ai_score: null, ai_data: null, pitch_text: null, docs: null, requirements: null },
    { title: 'Autobusu piegāde — VR2026/1 2.daļa', country: 'Latvija', flag: '🇱🇻', buyer: 'Pašvaldības SIA Ventspils reiss', value: 0, qty: 0, deadline: '2026-09-01', status: 'applied', saved: true, url: 'https://ted.europa.eu/', description: 'Pieteikts 05.02.2026. Garantijas termiņš saskaņā ar Tehnisko specifikāciju. Piegāde 7 mēnešu laikā.', notes: 'Mūsu mājas klients! Pieteikts Evija Melne vārdā.', ai_score: null, ai_data: null, pitch_text: null, docs: null, requirements: null },
    { title: 'Elektrisko mikroautobusu iegāde — universitāte', country: 'Rumānija', flag: '🇷🇴', buyer: 'Universitatea Stefan cel Mare Suceava', value: 182000, qty: 1, deadline: '2026-07-15', status: 'applied', saved: true, url: 'https://ted.europa.eu/', description: 'CPV 34114400-3. 1x M2 mikroautobuss ≥19 sēdv., 100% elektrisks. Autonomija ≥250km SORT2. Garantija ≥24 mēn. PNRR finansēts. Vērtēšana: Cena 40%, Garantija 20%, Autonomija 15%, Efektivitāte 15%, Apkope 10%.', notes: 'Mūsu modelis atbilst! Mums ir 401km SORT2.', ai_score: null, ai_data: null, pitch_text: null, docs: null, requirements: null },
    { title: 'Invalīdu transports — elektriskais lifts, 6 autobusi', country: 'Beļģija', flag: '🇧🇪', buyer: 'Brussels Health Network', value: 720000, qty: 6, deadline: '2026-08-20', status: 'new', saved: false, url: 'https://ted.europa.eu/', description: '6 elektriskie autobusi invalīdiem. Elektriskais lifts obligāts, ratiņkrēslu nodalījums, medicīnas aprīkojums. M2 vai M3 A klase.', notes: '', ai_score: null, ai_data: null, pitch_text: null, docs: null, requirements: null },
    { title: 'Elektrisko mikroautobusu iegāde personu ar invaliditāti pārvadāšanai', country: 'Lietuva', flag: '🇱🇹', buyer: 'Kaunas City Municipality', value: 680000, qty: 4, deadline: '2026-09-01', status: 'new', saved: false, url: 'https://ted.europa.eu/', description: '4 elektriskie mikroautobusi invalīdiem. Lifts obligāts, ratiņkrēslu nodalījums. Baltijas tirgus — mūsu spēcīgā zona.', notes: '', ai_score: null, ai_data: null, pitch_text: null, docs: null, requirements: null },
    { title: 'Elektroautobusu flote skolēniem — 8 vienības', country: 'Polija', flag: '🇵🇱', buyer: 'Gmina Wieliczka, Maopolska', value: 2100000, qty: 8, deadline: '2026-07-30', status: 'new', saved: true, url: 'https://ted.europa.eu/', description: '8 elektriskie skolēnu autobusi. Drošības jostas, zemais trokšņu līmenis, CE, M kategorija. ES fondu finansēts.', notes: '', ai_score: null, ai_data: null, pitch_text: null, docs: null, requirements: null },
    { title: 'Elektroautobusu piegāde tūrismam — Alpi reģions', country: 'Austrija', flag: '🇦🇹', buyer: 'Salzburger Verkehrsverbund GmbH', value: 1750000, qty: 6, deadline: '2026-08-15', status: 'new', saved: false, url: 'https://ted.europa.eu/', description: '6 elektriskie tūrisma autobusi kalnu apvidiem. ≥200km, panorāmas logi, 16-22 sēdvietas, klimata kontrole. M2/M3A.', notes: '', ai_score: null, ai_data: null, pitch_text: null, docs: null, requirements: null }
  ];
  const { data, error } = await db.from('tenders').insert(seed).select();
  if (!error && data) tenders = data;
}

function showLoading(on) { document.getElementById('loading').classList.toggle('hidden', !on); }

// ═══════════════════════════════════════════════════════════════════════════
// DB
// ═══════════════════════════════════════════════════════════════════════════
async function loadTenders() {
  const { data } = await db.from('tenders').select('*').order('created_at', { ascending: false });
  tenders = data || [];
}
async function loadContacts() {
  const { data } = await db.from('contacts').select('*').order('created_at', { ascending: false });
  contacts = data || [];
}
async function saveTenderToDB(t) { await db.from('tenders').upsert(t); }
async function deleteTenderFromDB(id) { await db.from('tenders').delete().eq('id', id); }

// ═══════════════════════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════════════════════
const pageTitles = {
  dashboard: '📊 Pārskats', tenders: '📋 Visi tenderi', saved: '⭐ Saglabātie',
  applied: '🚀 Pieteikumi', crm: '👥 CRM Kontakti', finance: '💰 Finanšu kalkulators',
  competitors: '🎯 Konkurenti', add: '➕ Pievienot tenderi'
};

function showPanel(id) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('panel-' + id).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(item => {
    if (item.getAttribute('onclick')?.includes("'" + id + "'")) item.classList.add('active');
  });
  document.getElementById('page-title').textContent = pageTitles[id] || '';
  if (id === 'tenders') renderTable('all');
  if (id === 'saved') renderTable('saved');
  if (id === 'applied') renderTable('applied');
  if (id === 'dashboard') renderDashboard();
  if (id === 'crm') renderCRM();
  if (id === 'finance') updateCalc();
}

// ═══════════════════════════════════════════════════════════════════════════
// STATS
// ═══════════════════════════════════════════════════════════════════════════
function updateStats() {
  const active = tenders.filter(t => ['new', 'open'].includes(t.status));
  const saved = tenders.filter(t => t.saved);
  const applied = tenders.filter(t => t.status === 'applied');
  const totalVal = tenders.reduce((s, t) => s + (t.value || 0), 0);
  const scores = tenders.filter(t => t.ai_score).map(t => t.ai_score);
  const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
  const deadlines = tenders.filter(t => ['new', 'open'].includes(t.status)).map(t => t.deadline).sort();
  document.getElementById('nb-all').textContent = tenders.length;
  document.getElementById('nb-saved').textContent = saved.length;
  document.getElementById('nb-applied').textContent = applied.length;
  document.getElementById('kpi-active').textContent = active.length;
  document.getElementById('kpi-value').textContent = totalVal >= 1e6 ? (totalVal / 1e6).toFixed(1) + 'M' : (totalVal / 1000).toFixed(0) + 'K';
  document.getElementById('kpi-applied').textContent = applied.length;
  document.getElementById('kpi-score').textContent = avgScore ? avgScore + '%' : '—';
  document.getElementById('ss-total').textContent = totalVal ? '€' + (totalVal / 1e6).toFixed(1) + 'M' : '—';
  document.getElementById('ss-score').textContent = avgScore ? avgScore + '%' : '—';
  document.getElementById('ss-next').textContent = deadlines[0] || '—';
}

// ═══════════════════════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════
function renderDashboard() {
  updateStats();
  const scored = [...tenders].filter(t => t.ai_score).sort((a, b) => b.ai_score - a.ai_score).slice(0, 4);
  const top = document.getElementById('top-tenders');
  if (scored.length === 0) {
    top.innerHTML = '<div style="color:var(--muted);font-size:13px;">Atveriet tenderi → "AI Analīze" cilne → sistēma automātiski analizēs piemērotību un izveidos prasību karti!</div>';
  } else {
    top.innerHTML = scored.map((t, i) => `
      <div onclick="openModal(${t.id})" style="display:flex;align-items:center;gap:14px;padding:12px;background:var(--s2);border:1px solid var(--border);border-radius:8px;margin-bottom:8px;cursor:pointer;transition:all .15s;" onmouseover="this.style.borderColor='var(--cyan)'" onmouseout="this.style.borderColor='var(--border)'">
        <div style="font-family:var(--head);font-size:20px;font-weight:800;color:var(--muted);width:24px;">#${i + 1}</div>
        <div style="flex:1;"><div style="font-size:13px;font-weight:500;">${t.flag || ''} ${t.title}</div><div style="font-size:11px;color:var(--muted2);margin-top:2px;">${t.country} · ${t.buyer}</div></div>
        <div class="score-pill ${scClass(t.ai_score)}">${t.ai_score}%</div>
      </div>`).join('');
  }
  document.getElementById('product-grid').innerHTML = `
    <div class="product-card" style="border-top-color:var(--cyan)">
      <div class="product-card-name">Mercedes eSprinter M2</div>
      <div class="product-card-spec">🪑 8-16 sēdv · ⚡ 401km · 155kW</div>
      <div class="product-card-use">Pilsētas transports, VIP, skolēni, invalīdi</div>
    </div>
    <div class="product-card" style="border-top-color:var(--green)">
      <div class="product-card-name">Mercedes eSprinter M3 A</div>
      <div class="product-card-spec">🪑 17-22 sēdv · ⚡ 401km · 155kW</div>
      <div class="product-card-use">Sabiedriskais transports, maršruti</div>
    </div>
    <div class="product-card" style="border-top-color:var(--amber)">
      <div class="product-card-name">Pielāgota konfigurācija</div>
      <div class="product-card-spec">♿ Lifts/ramps · 🔋 116kWh · 🌡 -30°C</div>
      <div class="product-card-use">Jebkura M2/M3A konfigurācija pēc pasūtījuma</div>
    </div>
    <div class="product-card" style="border-top-color:var(--purple)">
      <div class="product-card-name">Uzlādes infrastruktūra</div>
      <div class="product-card-spec">⚡ AC 22kW · DC 115kW · CCS Type 2</div>
      <div class="product-card-use">Uzlādes stacijas komplektā ar autobusu</div>
    </div>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// TABLE
// ═══════════════════════════════════════════════════════════════════════════
function scClass(s) { return s >= 70 ? 'high' : s >= 45 ? 'mid' : 'low'; }
function statusLabel(s) { return { new: 'Jauns', open: 'Atvērts', applied: 'Pieteikts', won: 'Uzvarēts', lost: 'Zaudēts' }[s] || s; }
function daysLeft(d) { return Math.ceil((new Date(d) - new Date()) / 86400000); }
function fmtVal(v) { if (!v) return '—'; return v >= 1e6 ? '€' + (v / 1e6).toFixed(1) + 'M' : '€' + (v / 1000).toFixed(0) + 'K'; }

function renderRow(t) {
  const days = daysLeft(t.deadline);
  const dColor = days < 0 ? 'var(--red)' : days <= 14 ? 'var(--amber)' : 'var(--muted2)';
  const hasReq = t.requirements ? '📋 ' : '';
  return `<div class="table-row ${t.ai_score >= 70 ? 'highlight' : ''}" onclick="openModal(${t.id})">
    <div><div class="td-title">${t.flag || ''} ${(hasReq + t.title).length > 55 ? (hasReq + t.title).slice(0, 55) + '…' : hasReq + t.title}</div><div class="td-sub">${t.buyer}</div></div>
    <div class="td"><strong>${t.country}</strong></div>
    <div class="td"><strong style="color:var(--green);">${fmtVal(t.value)}</strong></div>
    <div>${t.ai_score !== null && t.ai_score !== undefined ? `<span class="score-pill ${scClass(t.ai_score)}">${t.ai_score}%</span>` : '<span style="color:var(--muted);font-size:11px;font-family:var(--mono);">—</span>'}</div>
    <div class="td" style="color:${dColor};">${days < 0 ? 'Beidzies' : days + 'd.'}</div>
    <div class="td"><span class="status-dot dot-${t.status}"></span>${statusLabel(t.status)}</div>
    <div><button class="star-btn ${t.saved ? 'on' : ''}" onclick="event.stopPropagation();toggleStar(${t.id})">${t.saved ? '⭐' : '☆'}</button></div>
  </div>`;
}

function getFiltered(mode) {
  let arr = [...tenders];
  if (mode === 'saved') return arr.filter(t => t.saved);
  if (mode === 'applied') return arr.filter(t => t.status === 'applied');
  const q = document.getElementById('s-search')?.value?.toLowerCase() || '';
  const country = document.getElementById('s-country')?.value || '';
  const status = document.getElementById('s-status')?.value || '';
  const sort = document.getElementById('s-sort')?.value || 'score';
  if (q) arr = arr.filter(t => t.title.toLowerCase().includes(q) || t.buyer.toLowerCase().includes(q) || t.country.toLowerCase().includes(q));
  if (country) arr = arr.filter(t => t.country === country);
  if (status) arr = arr.filter(t => t.status === status);
  if (sort === 'score') arr.sort((a, b) => (b.ai_score || 0) - (a.ai_score || 0));
  else if (sort === 'deadline') arr.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  else arr.sort((a, b) => (b.value || 0) - (a.value || 0));
  return arr;
}

function renderTable(mode) {
  const arr = getFiltered(mode);
  const bodyId = mode === 'saved' ? 'saved-body' : mode === 'applied' ? 'applied-body' : 'table-body';
  const el = document.getElementById(bodyId);
  if (!el) return;
  el.innerHTML = arr.length === 0
    ? `<div class="empty"><div class="ico">📋</div><p>Nav ierakstu</p></div>`
    : arr.map(renderRow).join('');
}

function populateCountries() {
  const sel = document.getElementById('s-country');
  if (!sel) return;
  const countries = [...new Set(tenders.map(t => t.country))].sort();
  sel.innerHTML = '<option value="">Visas valstis</option>' + countries.map(c => `<option value="${c}">${c}</option>`).join('');
}

// ═══════════════════════════════════════════════════════════════════════════
// MODAL
// ═══════════════════════════════════════════════════════════════════════════
function openModal(id) {
  currentId = id;
  const t = tenders.find(t => t.id === id);
  if (!t) return;
  document.getElementById('m-title').textContent = `${t.flag || ''} ${t.title}`;
  document.getElementById('m-badge').innerHTML = `<span class="score-pill ${t.status === 'applied' ? 'mid' : 'high'}">${statusLabel(t.status)}</span>`;
  document.getElementById('m-status').value = t.status;
  document.getElementById('m-notes').value = t.notes || '';
  document.getElementById('m-star').textContent = t.saved ? '⭐ Saglabāts' : '☆ Saglabāt';
  const link = document.getElementById('m-link');
  link.href = t.url || '#';
  link.style.display = t.url ? 'inline-flex' : 'none';
  const days = daysLeft(t.deadline);
  const dColor = days < 0 ? 'red' : days <= 14 ? 'amber' : 'green';
  document.getElementById('m-info-grid').innerHTML = `
    <div class="info-box"><div class="info-label">Pasūtītājs</div><div class="info-val">${t.buyer}</div></div>
    <div class="info-box"><div class="info-label">Valsts</div><div class="info-val">${t.flag || ''} ${t.country}</div></div>
    <div class="info-box"><div class="info-label">Vērtība</div><div class="info-val green">${fmtVal(t.value)}</div></div>
    <div class="info-box"><div class="info-label">Autobusi</div><div class="info-val">${t.qty || '—'}</div></div>
    <div class="info-box"><div class="info-label">Termiņš</div><div class="info-val">${t.deadline}</div></div>
    <div class="info-box"><div class="info-label">Atlicis</div><div class="info-val ${dColor}">${days < 0 ? 'Beidzies' : days + ' dienas'}</div></div>`;
  switchMTab('ai');
  document.getElementById('modal-bg').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  loadAI(t);
}

function closeModal() { document.getElementById('modal-bg').classList.add('hidden'); document.body.style.overflow = ''; }
function closeModalBg(e) { if (e.target === document.getElementById('modal-bg')) closeModal(); }

function switchMTab(tab) {
  document.querySelectorAll('.mtab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.mtab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.mtab')[['ai', 'docs', 'info', 'pitch'].indexOf(tab)].classList.add('active');
  document.getElementById('mt-' + tab).classList.add('active');
  const t = tenders.find(t => t.id === currentId);
  if (tab === 'pitch' && t) loadPitch(t);
  if (tab === 'docs' && t) loadDocs(t);
}

// ═══════════════════════════════════════════════════════════════════════════
// AI ANALĪZE — PILNA VERSIJA AR PRASĪBU IZVILKŠANU
// ═══════════════════════════════════════════════════════════════════════════
async function loadAI(t) {
  const el = document.getElementById('ai-content');
  if (t.ai_data) { renderAIResult(t.ai_data, t.ai_score); return; }
  el.innerHTML = '<div class="ai-loading"><div class="spinner"></div>AI analizē tenderi ar pilno Electrify zināšanu bāzi...</div>';

  const prompt = `Tu esi eksperts tenderu analītiķis uzņēmumam ${COMPANY.name}.

═══ MŪSU UZŅĒMUMS ═══
${COMPANY.description}
Sertifikāti: ${COMPANY.certifications.join(', ')}
Partneri: ${COMPANY.partners.join(', ')}

═══ MŪSU PRODUKTS ═══
Bāze: ${PRODUCT.base}
Kategorijas: ${PRODUCT.categories.join(', ')}
Sēdvietas: ${PRODUCT.seatsRange.min}-${PRODUCT.seatsRange.max}
Motors: ${PRODUCT.motor.power}kW
Baterija: ${PRODUCT.battery.capacity}kWh, uzlāde DC līdz ${PRODUCT.battery.chargingDC}
Autonomija: ${PRODUCT.autonomy.sort2}km (SORT2 sertificēta)
Patēriņš: ${PRODUCT.autonomy.consumption}
Izmēri: ${PRODUCT.dimensions.length}mm garš, ${PRODUCT.dimensions.width}mm plats, svars ${PRODUCT.dimensions.grossWeight}kg
Grīdas augstums: ${PRODUCT.dimensions.floorHeight}mm
Garantija: ${PRODUCT.warranty.vehicle} (baterija ${PRODUCT.warranty.battery})
Piegādes laiks: ${PRODUCT.warranty.deliveryMonths} mēneši
Sertifikāti: ${PRODUCT.certifications.join(', ')}
Pielāgojams: ${PRODUCT.customizable.join(', ')}
NEVARAM: ${PRODUCT.cannotDo.join(', ')}
Pieejamība: ${PRODUCT.accessibility}
Darbības temperatūra: ${PRODUCT.operatingTemp}

═══ MŪSU PIEREDZE ═══
${EXPERIENCE.map(e => `- ${e.client} (${e.country}, ${e.year}): ${e.product}${e.value ? ', €' + e.value : ''}${e.notes ? ' — ' + e.notes : ''}`).join('\n')}

═══ TENDERIS KO ANALIZĒT ═══
Nosaukums: ${t.title}
Valsts: ${t.country}
Pasūtītājs: ${t.buyer}
Vērtība: €${t.value || 'nav norādīts'}
Daudzums: ${t.qty || 'nav norādīts'} autobusi
Termiņš: ${t.deadline}
Apraksts: ${t.description || '—'}

Atbildi TIKAI JSON formātā (bez markdown, bez komentāriem):
{
  "score": <0-100>,
  "eligible": <true/false>,
  "verdict": "<1 teikums LV — vai varam un vai vajadzētu piedalīties>",
  "summary": "<2-3 teikumi LV — pamatojums score>",
  "requirements": {
    "seats": "<prasītais sēdvietu skaits vai diapazons, vai 'nav norādīts'>",
    "category": "<M2/M3A/M3I vai 'nav norādīts'>",
    "autonomy_min": "<minimālā km prasība vai null>",
    "autonomy_unit": "<SORT2/WLTP/nav norādīts>",
    "weight_max": "<max svars kg vai null>",
    "length_max": "<max garums mm vai null>",
    "floor_max": "<max grīdas augstums mm vai null>",
    "warranty_min": "<min garantija mēnešos vai null>",
    "certifications": ["<prasītie sertifikāti>"],
    "accessibility": "<ramps/lifts/nav prasīts>",
    "charging_included": <true/false/null>,
    "delivery_months": <mēneši vai null>,
    "financial_turnover": "<min apgrozījums EUR vai null>",
    "evaluation_criteria": {"price": <%, vai null>, "quality": <%, vai null>, "warranty": <%, vai null>, "autonomy": <%, vai null>, "other": "<apraksts vai null>"},
    "funding": "<ES fondi/PNRR/pašvaldības budžets/nav norādīts>",
    "language": "<dokumentu valoda>",
    "notes": "<citas svarīgas prasības>"
  },
  "can": ["<3-5 punkti LV — ko mēs varam piedāvāt>"],
  "cannot": ["<2-3 punkti LV — riski vai neatbilstības>"],
  "bestConfig": "<ieteicamā mūsu konfigurācija šim tenderim>",
  "competitiveAdvantage": "<mūsu galvenā priekšrocība šajā tenderī>",
  "keyRisks": ["<1-3 galvenie riski>"],
  "recommendation": "<PIEDALĪTIES/APSVĒRT/IZLAIST> — <īss pamatojums>"
}`;

  try {
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1500, messages: [{ role: "user", content: prompt }] })
    });
    const data = await resp.json();
    const text = data.content.map(i => i.text || '').join('');
    const ai = JSON.parse(text.replace(/```json|```/g, '').trim());
    t.ai_score = ai.score;
    t.ai_data = ai;
    t.requirements = ai.requirements;
    await saveTenderToDB({ id: t.id, ai_score: ai.score, ai_data: ai, requirements: ai.requirements });
    renderAIResult(ai, ai.score);
    updateStats();
  } catch (e) {
    el.innerHTML = renderLocalAnalysis(t);
  }
}

function renderAIResult(ai, score) {
  const sc = scClass(score);
  const scoreColor = sc === 'high' ? 'var(--green)' : sc === 'mid' ? 'var(--amber)' : 'var(--red)';
  const rec = ai.recommendation || '';
  const recColor = rec.startsWith('PIEDALĪTIES') ? 'var(--green)' : rec.startsWith('APSVĒRT') ? 'var(--amber)' : 'var(--red)';
  const req = ai.requirements || {};

  document.getElementById('ai-content').innerHTML = `
    <div class="ai-score-hero">
      <div class="score-circle ${sc}"><div class="score-num" style="color:${scoreColor}">${score}</div><div class="score-pct">/ 100</div></div>
      <div class="ai-verdict">
        <h3>${ai.verdict}</h3>
        <p>${ai.summary}</p>
        ${rec ? `<div style="margin-top:8px;padding:6px 12px;background:rgba(0,0,0,.2);border-radius:6px;font-family:var(--mono);font-size:12px;color:${recColor};font-weight:700;">${rec}</div>` : ''}
      </div>
    </div>

    ${req && Object.keys(req).length > 0 ? `
    <div style="background:var(--s2);border:1px solid var(--border2);border-radius:8px;padding:14px;margin-bottom:14px;">
      <div class="ai-box-label" style="margin-bottom:10px;">📋 TENDERA PRASĪBU KARTE</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
        ${req.seats ? `<div style="background:var(--s3);border-radius:6px;padding:8px 10px;"><div style="font-size:10px;color:var(--muted);font-family:var(--mono);text-transform:uppercase;">Sēdvietas</div><div style="font-size:13px;font-weight:500;margin-top:2px;color:${checkReq('seats', req.seats)}">${req.seats}</div></div>` : ''}
        ${req.category ? `<div style="background:var(--s3);border-radius:6px;padding:8px 10px;"><div style="font-size:10px;color:var(--muted);font-family:var(--mono);text-transform:uppercase;">Kategorija</div><div style="font-size:13px;font-weight:500;margin-top:2px;color:${checkReq('category', req.category)}">${req.category}</div></div>` : ''}
        ${req.autonomy_min ? `<div style="background:var(--s3);border-radius:6px;padding:8px 10px;"><div style="font-size:10px;color:var(--muted);font-family:var(--mono);text-transform:uppercase;">Autonomija min</div><div style="font-size:13px;font-weight:500;margin-top:2px;color:${PRODUCT.autonomy.sort2 >= req.autonomy_min ? 'var(--green)' : 'var(--red)'}">${req.autonomy_min}km ${req.autonomy_unit || ''} <span style="font-size:11px;">(mums: ${PRODUCT.autonomy.sort2}km ✓)</span></div></div>` : ''}
        ${req.weight_max ? `<div style="background:var(--s3);border-radius:6px;padding:8px 10px;"><div style="font-size:10px;color:var(--muted);font-family:var(--mono);text-transform:uppercase;">Max svars</div><div style="font-size:13px;font-weight:500;margin-top:2px;color:${PRODUCT.dimensions.grossWeight <= req.weight_max ? 'var(--green)' : 'var(--red)'}">${req.weight_max}kg <span style="font-size:11px;">(mums: ${PRODUCT.dimensions.grossWeight}kg)</span></div></div>` : ''}
        ${req.warranty_min ? `<div style="background:var(--s3);border-radius:6px;padding:8px 10px;"><div style="font-size:10px;color:var(--muted);font-family:var(--mono);text-transform:uppercase;">Garantija min</div><div style="font-size:13px;font-weight:500;margin-top:2px;color:var(--green)">${req.warranty_min} mēn. <span style="font-size:11px;">(mums: 72 mēn. ✓)</span></div></div>` : ''}
        ${req.delivery_months ? `<div style="background:var(--s3);border-radius:6px;padding:8px 10px;"><div style="font-size:10px;color:var(--muted);font-family:var(--mono);text-transform:uppercase;">Piegādes laiks</div><div style="font-size:13px;font-weight:500;margin-top:2px;color:${PRODUCT.warranty.deliveryMonths <= req.delivery_months ? 'var(--green)' : 'var(--amber)'}">${req.delivery_months} mēn. <span style="font-size:11px;">(mums: ${PRODUCT.warranty.deliveryMonths}m)</span></div></div>` : ''}
        ${req.accessibility ? `<div style="background:var(--s3);border-radius:6px;padding:8px 10px;"><div style="font-size:10px;color:var(--muted);font-family:var(--mono);text-transform:uppercase;">Pieejamība</div><div style="font-size:13px;font-weight:500;margin-top:2px;color:var(--green)">${req.accessibility} ✓</div></div>` : ''}
        ${req.funding ? `<div style="background:var(--s3);border-radius:6px;padding:8px 10px;"><div style="font-size:10px;color:var(--muted);font-family:var(--mono);text-transform:uppercase;">Finansējums</div><div style="font-size:13px;font-weight:500;margin-top:2px;color:var(--purple)">${req.funding}</div></div>` : ''}
      </div>
      ${req.evaluation_criteria && (req.evaluation_criteria.price || req.evaluation_criteria.quality) ? `
      <div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--border);">
        <div style="font-size:10px;color:var(--muted);font-family:var(--mono);text-transform:uppercase;margin-bottom:6px;">Vērtēšanas kritēriji</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${req.evaluation_criteria.price ? `<span style="background:rgba(0,212,255,.1);color:var(--cyan);border:1px solid rgba(0,212,255,.2);padding:3px 10px;border-radius:100px;font-family:var(--mono);font-size:11px;">Cena ${req.evaluation_criteria.price}%</span>` : ''}
          ${req.evaluation_criteria.quality ? `<span style="background:rgba(0,229,160,.1);color:var(--green);border:1px solid rgba(0,229,160,.2);padding:3px 10px;border-radius:100px;font-family:var(--mono);font-size:11px;">Kvalitāte ${req.evaluation_criteria.quality}%</span>` : ''}
          ${req.evaluation_criteria.warranty ? `<span style="background:rgba(167,139,250,.1);color:var(--purple);border:1px solid rgba(167,139,250,.2);padding:3px 10px;border-radius:100px;font-family:var(--mono);font-size:11px;">Garantija ${req.evaluation_criteria.warranty}%</span>` : ''}
          ${req.evaluation_criteria.autonomy ? `<span style="background:rgba(255,184,0,.1);color:var(--amber);border:1px solid rgba(255,184,0,.2);padding:3px 10px;border-radius:100px;font-family:var(--mono);font-size:11px;">Autonomija ${req.evaluation_criteria.autonomy}%</span>` : ''}
        </div>
      </div>` : ''}
      ${req.certifications && req.certifications.length ? `<div style="margin-top:8px;font-size:11px;color:var(--muted2);">Sertifikāti: ${req.certifications.join(', ')}</div>` : ''}
      ${req.notes ? `<div style="margin-top:6px;font-size:11px;color:var(--muted2);">📌 ${req.notes}</div>` : ''}
    </div>` : ''}

    <div class="ai-grid">
      <div class="ai-box"><div class="ai-box-label">✅ Ko mēs piedāvājam</div><ul>${(ai.can || []).map(c => `<li>${c}</li>`).join('')}</ul></div>
      <div class="ai-box cant"><div class="ai-box-label">⚠️ Riski</div><ul>${(ai.cannot || []).map(c => `<li style="color:var(--muted2);">${c}</li>`).join('')}</ul></div>
    </div>
    ${ai.bestConfig ? `<div class="ai-box" style="margin-bottom:12px;"><div class="ai-box-label">🚌 Ieteicamā konfigurācija</div><div style="font-size:13px;margin-top:4px;">${ai.bestConfig}</div></div>` : ''}
    ${ai.competitiveAdvantage ? `<div class="ai-box" style="margin-bottom:0;border-color:rgba(0,229,160,.2);background:rgba(0,229,160,.04);"><div class="ai-box-label">🏆 Mūsu konkurences priekšrocība</div><div style="font-size:13px;margin-top:4px;color:var(--accent2);">${ai.competitiveAdvantage}</div></div>` : ''}`;
}

function checkReq(type, val) {
  if (!val || val === 'nav norādīts') return 'var(--muted2)';
  if (type === 'category') {
    if (val.includes('I klase') || val.includes('M3 I')) return 'var(--red)';
    return 'var(--green)';
  }
  return 'var(--muted2)';
}

// Lokālā analīze (rezerves variants bez AI)
function renderLocalAnalysis(t) {
  const desc = (t.description || '').toLowerCase();
  let score = 55;
  let can = ['CE sertificēti M2/M3A autobusi atbilst ES prasībām', 'Mercedes bāze — uzticamība un plašs servisa tīkls', '401km SORT2 autonomija — virs lielākās daļas prasību'];
  let cannot = [];
  if (desc.includes('i klase') || (t.qty > 25)) { score -= 20; cannot.push('Iespējams M3 I klase — mūsu maksimums ir 22 sēdvietas'); }
  if (desc.includes('ramp') || desc.includes('lifts') || desc.includes('invalid')) { score += 10; can.push('Ramps standartā, lifts pēc pasūtījuma'); }
  if (desc.includes('skol') || desc.includes('student')) { score += 8; can.push('Skolēnu konfigurācija — jostas, speciālie sēdekļi'); }
  if (t.qty && t.qty <= 22) { score += 10; can.push(`${t.qty} autobusi — mūsu ražošanas kapacitātē`); }
  score = Math.max(20, Math.min(90, score));
  return `<div style="background:var(--s2);border:1px solid var(--amber);border-radius:8px;padding:10px 14px;margin-bottom:14px;font-family:var(--mono);font-size:11px;color:var(--amber);">⚠ Lokālā analīze — AI savienojums nav pieejams</div>
    <div class="ai-score-hero"><div class="score-circle ${scClass(score)}"><div class="score-num" style="color:${scClass(score)==='high'?'var(--green)':scClass(score)==='mid'?'var(--amber)':'var(--red)'}">${score}</div><div class="score-pct">/ 100</div></div>
    <div class="ai-verdict"><h3>${score>=70?'Ieteicams piedalīties.':score>=45?'Izvērtēt pirms pieteikšanās.':'Zems piemērotības līmenis.'}</h3><p>Analīze balstīta uz tendera aprakstu un Electrify produktu specifikācijām.</p></div></div>
    <div class="ai-grid"><div class="ai-box"><div class="ai-box-label">✅ Ko mēs varam</div><ul>${can.map(c=>`<li>${c}</li>`).join('')}</ul></div>
    <div class="ai-box cant"><div class="ai-box-label">⚠️ Riski</div><ul>${cannot.length?cannot.map(c=>`<li style="color:var(--muted2);">${c}</li>`).join(''):'<li style="color:var(--muted2);">Nav identificētu kritisku risku</li>'}</ul></div></div>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// PITCH
// ═══════════════════════════════════════════════════════════════════════════
async function loadPitch(t) {
  const el = document.getElementById('pitch-content');
  if (t.pitch_text) { el.innerHTML = `<div class="pitch-box">${t.pitch_text}</div><button class="btn btn-ghost" style="margin-top:12px;" onclick="copyPitch()">📋 Kopēt</button>`; return; }
  el.innerHTML = '<div class="ai-loading"><div class="spinner"></div>Ģenerē profesionālu pieteikuma tekstu...</div>';
  try {
    const req = t.requirements || {};
    const prompt = `Uzraksti profesionālu pieteikuma cover letter latviešu valodā no ${COMPANY.name} šādam tenderim.

TENDERIS: ${t.title}
Pasūtītājs: ${t.buyer}, ${t.country}
Daudzums: ${t.qty} autobusi, Vērtība: €${t.value || 'nav norādīts'}
Prasības: ${t.description || '—'}
${req.seats ? `Sēdvietas: ${req.seats}` : ''}
${req.autonomy_min ? `Min autonomija: ${req.autonomy_min}km` : ''}
${req.warranty_min ? `Min garantija: ${req.warranty_min} mēneši` : ''}

PAR MUMS:
${COMPANY.description}
Sertifikāti: ${COMPANY.certifications.join(', ')}
Mūsu produkts: Mercedes eSprinter, ${PRODUCT.autonomy.sort2}km SORT2, ${PRODUCT.battery.capacity}kWh, ${PRODUCT.warranty.vehicle} garantija
Pieredze: ${EXPERIENCE.filter(e=>!e.notes?.includes('aktīvs')).map(e=>`${e.client} (${e.product})`).join('; ')}

Raksti ~200 vārdus, profesionāli un pārliecinoši. Iekļauj:
1. Kas mēs esam un kāpēc piedāvājam šo tenderi
2. Kādas konkrētas specifikācijas atbilst prasībām (piemini skaitļus)
3. Pierādīta pieredze
4. Aicinājums uz sadarbību
Tikai teksts, bez virsrakstiem.`;

    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 700, messages: [{ role: "user", content: prompt }] })
    });
    const data = await resp.json();
    const text = data.content.map(i => i.text || '').join('');
    t.pitch_text = text;
    await saveTenderToDB({ id: t.id, pitch_text: text });
    el.innerHTML = `<div class="pitch-box">${text}</div><button class="btn btn-ghost" style="margin-top:12px;" onclick="copyPitch()">📋 Kopēt</button>`;
  } catch (e) {
    // Lokālais fallback
    const pitch = `Cienījamie ${t.buyer} pārstāvji,

Ar šo vēlamies izteikt SIA Electrify interesi piedalīties jūsu izsludinātajā iepirkumā "${t.title}".

SIA Electrify (www.electricbus.lv) ir Latvijā bāzēts elektroautobusu ražotājs ar pierādītu pieredzi publiskā transporta elektrobusu piegādē Baltijā un Eiropā. Mūsu produkts balstās uz Mercedes-Benz eSprinter platformu — pasaulē atzītu, uzticamu un plaši apkalpotu transportlīdzekli.

Jūsu iepirkumam piedāvājam mūsu elektrisko autobusu ar šādām galvenajām specifikācijām: 155 kW elektromotors, 116 kWh baterija, 401 km reālā autonomija (SORT2 sertificēta), 6 gadu / 350,000 km garantija. Visi mūsu transportlīdzekļi ir sertificēti atbilstoši ES prasībām (CE tipa apstiprinājums) un aprīkoti ar rampām un telemetriju kā standartu.

Mūsu pieredze ietver veiksmīgas piegādes Ventspils, Liepājas, Valmieras un Saldus pašvaldībām, kā arī aktīvu darbību Rumānijas tirgū. Esam ISO 9001:2015, ISO 14001:2015 un ISO 45001:2018 sertificēts uzņēmums.

Būsim priecīgi tikties un prezentēt risinājumu sīkāk.

Ar cieņu,
Agris Amoliņš, SIA Electrify
info@electricbus.lv | +371 26567650 | www.electricbus.lv`;
    t.pitch_text = pitch;
    await saveTenderToDB({ id: t.id, pitch_text: pitch });
    el.innerHTML = `<div class="pitch-box">${pitch}</div><button class="btn btn-ghost" style="margin-top:12px;" onclick="copyPitch()">📋 Kopēt</button>`;
  }
}

function copyPitch() {
  const t = tenders.find(t => t.id === currentId);
  if (t?.pitch_text) { navigator.clipboard.writeText(t.pitch_text); showToast('📋 Nokopēts!'); }
}

// ═══════════════════════════════════════════════════════════════════════════
// DOCS
// ═══════════════════════════════════════════════════════════════════════════
const DEFAULT_DOCS = [
  { id: 'd1', name: 'Uzņēmuma reģistrācijas apliecība (ONRC/LURSOFT)', req: 'must', done: false },
  { id: 'd2', name: 'Finanšu pārskati (pēdējie 2 gadi)', req: 'must', done: false },
  { id: 'd3', name: 'CE tipa apstiprinājuma sertifikāts', req: 'must', done: false },
  { id: 'd4', name: 'ISO 9001:2015 sertifikāts (TÜV Rheinland)', req: 'must', done: false },
  { id: 'd5', name: 'ISO 14001:2015 sertifikāts', req: 'must', done: false },
  { id: 'd6', name: 'ISO 45001:2018 sertifikāts', req: 'must', done: false },
  { id: 'd7', name: 'Produkta tehniskā specifikācija (eSprinter)', req: 'must', done: false },
  { id: 'd8', name: 'Garantijas deklarācija (6g/350,000km)', req: 'must', done: false },
  { id: 'd9', name: 'SORT2 autonomijas tests (sertificēts)', req: 'must', done: false },
  { id: 'd10', name: 'Iepriekšējo piegāžu atsauksmes (Ventspils/Liepāja/Valmiera)', req: 'should', done: false },
  { id: 'd11', name: 'Piegādes grafiks un laika plāns', req: 'should', done: false },
  { id: 'd12', name: 'Apkopes un servisa plāns', req: 'should', done: false },
  { id: 'd13', name: 'Apdrošināšanas polise (civiltiesiskā atbildība)', req: 'should', done: false },
  { id: 'd14', name: 'SIA Veho sadarbības apliecinājums (serviss)', req: 'should', done: false },
  { id: 'd15', name: 'Pieteikuma vēstule (cover letter)', req: 'opt', done: false },
  { id: 'd16', name: 'DUAE / ESPD forma', req: 'opt', done: false },
];

function loadDocs(t) {
  if (!t.docs) t.docs = JSON.parse(JSON.stringify(DEFAULT_DOCS));
  renderDocs(t);
}

function renderDocs(t) {
  const labels = { must: 'Obligāts', should: 'Ieteicams', opt: 'Papildu' };
  const done = t.docs.filter(d => d.done).length;
  const mustDone = t.docs.filter(d => d.req === 'must' && d.done).length;
  const mustTotal = t.docs.filter(d => d.req === 'must').length;
  const pct = Math.round(done / t.docs.length * 100);
  document.getElementById('docs-content').innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
      <div style="font-size:12px;color:var(--muted2);">Gatavība: <strong style="color:var(--text)">${pct}%</strong> · Obligātie: <strong style="color:${mustDone===mustTotal?'var(--green)':'var(--amber)'}">${mustDone}/${mustTotal}</strong></div>
      <div style="height:6px;width:120px;background:var(--border);border-radius:3px;overflow:hidden;"><div style="height:100%;width:${pct}%;background:linear-gradient(90deg,var(--cyan),var(--green));border-radius:3px;"></div></div>
    </div>
    <div class="doc-list">
      ${t.docs.map(d => `
        <div class="doc-item">
          <div class="doc-check ${d.done ? 'done' : ''}" onclick="toggleDoc('${d.id}')">${d.done ? '✓' : ''}</div>
          <div class="doc-name" style="${d.done ? 'text-decoration:line-through;color:var(--muted)' : ''}">${d.name}</div>
          <span class="doc-required ${d.req}">${labels[d.req]}</span>
        </div>`).join('')}
    </div>`;
}

async function toggleDoc(docId) {
  const t = tenders.find(t => t.id === currentId);
  if (!t) return;
  const d = t.docs.find(d => d.id === docId);
  if (d) { d.done = !d.done; await saveTenderToDB({ id: t.id, docs: t.docs }); renderDocs(t); }
}

// ═══════════════════════════════════════════════════════════════════════════
// STATUS & NOTES
// ═══════════════════════════════════════════════════════════════════════════
async function updateStatus() {
  const t = tenders.find(t => t.id === currentId);
  if (!t) return;
  t.status = document.getElementById('m-status').value;
  await saveTenderToDB({ id: t.id, status: t.status });
  updateStats(); showToast('✅ Statuss saglabāts');
}

async function saveNotes() {
  const t = tenders.find(t => t.id === currentId);
  if (!t) return;
  t.notes = document.getElementById('m-notes').value;
  await saveTenderToDB({ id: t.id, notes: t.notes });
}

async function toggleStar(id) {
  const t = tenders.find(t => t.id === id);
  if (!t) return;
  t.saved = !t.saved;
  await saveTenderToDB({ id: t.id, saved: t.saved });
  updateStats(); renderTable('all');
  showToast(t.saved ? '⭐ Saglabāts!' : 'Noņemts');
}

async function toggleStarModal() {
  const t = tenders.find(t => t.id === currentId);
  if (!t) return;
  t.saved = !t.saved;
  await saveTenderToDB({ id: t.id, saved: t.saved });
  document.getElementById('m-star').textContent = t.saved ? '⭐ Saglabāts' : '☆ Saglabāt';
  updateStats(); showToast(t.saved ? '⭐ Saglabāts!' : 'Noņemts');
}

async function deleteTender() {
  if (!confirm('Dzēst šo tenderi?')) return;
  await deleteTenderFromDB(currentId);
  tenders = tenders.filter(t => t.id !== currentId);
  updateStats(); closeModal(); renderTable('all'); showToast('🗑 Dzēsts');
}

// ═══════════════════════════════════════════════════════════════════════════
// ADD TENDER
// ═══════════════════════════════════════════════════════════════════════════
async function addTender() {
  const title = document.getElementById('f-title').value.trim();
  const country = document.getElementById('f-country').value.trim();
  const deadline = document.getElementById('f-deadline').value;
  if (!title || !country || !deadline) { showToast('⚠ Obligātie lauki!'); return; }
  showLoading(true);
  const newT = {
    title, country, flag: document.getElementById('f-flag').value || '🏳',
    buyer: document.getElementById('f-buyer').value || '—',
    value: parseInt(document.getElementById('f-value').value) || 0,
    qty: parseInt(document.getElementById('f-qty').value) || 0,
    deadline, status: 'new', saved: false,
    url: document.getElementById('f-url').value || '',
    description: document.getElementById('f-desc').value || '',
    notes: '', ai_score: null, ai_data: null, pitch_text: null, docs: null, requirements: null
  };
  const { data, error } = await db.from('tenders').insert(newT).select().single();
  showLoading(false);
  if (error) { showToast('❌ Kļūda saglabājot'); return; }
  tenders.unshift(data);
  populateCountries(); updateStats();
  ['f-title', 'f-country', 'f-flag', 'f-buyer', 'f-value', 'f-qty', 'f-deadline', 'f-url', 'f-desc'].forEach(id => document.getElementById(id).value = '');
  showToast('⚡ Pievienots! Atveriet tenderi → AI automātiski analizēs.');
  showPanel('tenders');
}

// ═══════════════════════════════════════════════════════════════════════════
// CRM
// ═══════════════════════════════════════════════════════════════════════════
async function addContact() {
  const name = document.getElementById('crm-name').value.trim();
  if (!name) return;
  const c = {
    name, org: document.getElementById('crm-org').value,
    email: document.getElementById('crm-email').value,
    country: document.getElementById('crm-country').value,
    tags: document.getElementById('crm-tags').value.split(',').map(s => s.trim()).filter(Boolean),
  };
  const { data, error } = await db.from('contacts').insert(c).select().single();
  if (error) { showToast('❌ Kļūda'); return; }
  contacts.unshift(data);
  ['crm-name', 'crm-org', 'crm-email', 'crm-country', 'crm-tags'].forEach(id => document.getElementById(id).value = '');
  renderCRM(); showToast('👤 Kontakts pievienots!');
}

function renderCRM() {
  const el = document.getElementById('crm-list');
  if (contacts.length === 0) { el.innerHTML = '<div class="empty"><div class="ico">👥</div><p>Nav kontaktu</p></div>'; return; }
  el.innerHTML = contacts.map(c => `
    <div class="crm-card">
      <div style="flex:1;">
        <div class="crm-name">${c.name}</div>
        <div class="crm-org">${c.org || '—'} ${c.country ? '· ' + c.country : ''}</div>
        <div class="crm-meta">${c.email ? `<span>✉ ${c.email}</span>` : ''}</div>
        ${c.tags?.length ? `<div class="crm-tags">${c.tags.map(t => `<span class="crm-tag">${t}</span>`).join('')}</div>` : ''}
      </div>
      <div class="crm-actions">
        ${c.email ? `<button class="crm-btn" onclick="window.location='mailto:${c.email}'">✉</button>` : ''}
        <button class="crm-btn" style="color:var(--red);" onclick="rmContact(${c.id})">🗑</button>
      </div>
    </div>`).join('');
}

async function rmContact(id) {
  await db.from('contacts').delete().eq('id', id);
  contacts = contacts.filter(c => c.id !== id);
  renderCRM();
}

// ═══════════════════════════════════════════════════════════════════════════
// FINANCE
// ═══════════════════════════════════════════════════════════════════════════
function fmtEur(n) { return '€' + Math.round(n).toLocaleString('de-DE'); }

function updateCalc() {
  const contract = +document.getElementById('r-contract').value;
  const qty = +document.getElementById('r-qty').value;
  const prep = +document.getElementById('r-prep').value;
  const prob = +document.getElementById('r-prob').value;
  const costPer = +document.getElementById('r-cost').value;
  const logistics = +document.getElementById('r-log').value;
  const warrantyPct = +document.getElementById('r-war').value;
  document.getElementById('rv-contract').textContent = fmtEur(contract).replace('€', '');
  document.getElementById('rv-qty').textContent = qty;
  document.getElementById('rv-prep').textContent = fmtEur(prep).replace('€', '');
  document.getElementById('rv-prob').textContent = prob + '%';
  document.getElementById('rv-cost').textContent = fmtEur(costPer).replace('€', '');
  document.getElementById('rv-log').textContent = fmtEur(logistics).replace('€', '');
  document.getElementById('rv-war').textContent = warrantyPct + '%';
  const totalCost = qty * costPer + logistics + prep + (contract * warrantyPct / 100);
  const profit = contract - totalCost;
  const margin = contract > 0 ? (profit / contract * 100) : 0;
  const ev = (prob / 100) * profit - (1 - prob / 100) * prep;
  const profEl = document.getElementById('r-profit');
  profEl.textContent = fmtEur(profit);
  profEl.className = 'result-big ' + (profit >= 0 ? 'pos' : 'neg');
  document.getElementById('r-margin').textContent = `Bruto marža: ${margin.toFixed(1)}%`;
  document.getElementById('r-bar').style.width = Math.max(0, Math.min(100, margin)) + '%';
  document.getElementById('r-ev').textContent = fmtEur(ev);
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPETITORS
// ═══════════════════════════════════════════════════════════════════════════
function renderCompetitors() {
  document.getElementById('comp-list').innerHTML = COMPETITORS.map(c => `
    <div class="comp-row">
      <div><strong>${c.name}</strong><div style="font-size:11px;color:var(--muted);margin-top:2px;">${c.note}</div></div>
      <div>${c.country}</div>
      <div>${c.segment}</div>
      <div>${c.price}</div>
      <div><span class="strength ${c.threat === 'high' ? 'str-high' : c.threat === 'mid' ? 'str-mid' : 'str-low'}">${c.threat === 'high' ? 'Augsts' : 'Vidējs'}</span></div>
    </div>`).join('');
  document.getElementById('advantages-grid').innerHTML = ADVANTAGES.map(a => `
    <div style="background:var(--s2);border:1px solid var(--border);border-radius:8px;padding:12px;display:flex;gap:10px;">
      <div style="font-size:20px;">${a.icon}</div>
      <div><div style="font-size:12px;font-weight:600;margin-bottom:3px;">${a.title}</div><div style="font-size:11px;color:var(--muted2);">${a.desc}</div></div>
    </div>`).join('');
}

// ═══════════════════════════════════════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════════════════════════════════════
function showToast(msg) {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t); setTimeout(() => t.remove(), 3000);
}

// ═══════════════════════════════════════════════════════════════════════════
// AUTO LOGIN
// ═══════════════════════════════════════════════════════════════════════════
if (sessionStorage.getItem('ef_auth') === '1') {
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('app').style.display = 'grid';
  initApp();
}
