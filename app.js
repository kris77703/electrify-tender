// ─── CONFIG ── aizstāj ar savām Supabase vērtībām ─────────────────────────
const SUPABASE_URL = 'https://dowrwswqoyfhakbdaegr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvd3J3c3dxb3lmaGFrYmRhZWdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwODc3MjAsImV4cCI6MjA5NDY2MzcyMH0.tXlNJOCbwxXU4C-QtYM3C6HE21OfH1uP5UqgGH9IP4I';
const APP_PASSWORD = 'electrify2025'; // maini uz savu paroli!

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── PRODUCT KNOWLEDGE BASE ───────────────────────────────────────────────
const PRODUCTS = [
  { name:"Electrify InterCity", type:"city", seats:"8-16", range:200, motor:"150kW", battery:"100kWh", features:["Zemā grīda","Ramps","Telemetrija","CE sertifikāts"], useCase:"Pilsētas sabiedriskais transports", color:"#00d4ff" },
  { name:"Electrify MetroMidi", type:"midi", seats:"16-22", range:180, motor:"180kW", battery:"120kWh", features:["Midi formāts","Augsta ietilpība","Ātra uzlāde"], useCase:"Pilsētu maģistrāles un midi maršruti", color:"#00e5a0" },
  { name:"Electrify Elite", type:"taxi", seats:"6-8", range:220, motor:"120kW", battery:"90kWh", features:["Premium apdare","Klimata kontrole","VIP konfigurācija"], useCase:"VIP, taksi, lidostas transfers", color:"#a78bfa" },
  { name:"Electrify FlexiAccess", type:"wheelchair", seats:"8-12", range:150, motor:"100kW", battery:"75kWh", features:["Ratiņkrēslu nodalījums","Elektriskais lifts","Platas durvis"], useCase:"Invalīdi un personas ar mobilitātes traucējumiem", color:"#ffb800" },
  { name:"Electrify AccessLift", type:"mobility", seats:"6-10", range:160, motor:"100kW", battery:"80kWh", features:["Lifts","Medicīnas transports","Pārveidojams salons"], useCase:"Veselības aprūpe, sociālais transports", color:"#ff9f40" },
  { name:"Electrify TourMidi", type:"tour", seats:"18-24", range:250, motor:"200kW", battery:"150kWh", features:["Tūrisma apdare","Panorāmas logi","Bagāžas telpa"], useCase:"Tūrisms, starppilsētu maršruti", color:"#00d4ff" },
];

const CANNOT = [
  "Vairāk par 24 sēdvietām",
  "Dieseļa vai hibrīda autobusi",
  "Pilna izmēra autobusi (12m+)",
  "Autonomija virs 280 km bez uzlādes",
  "Militārais vai speciālais transports",
];

const COMPETITORS = [
  { name:"Mellor Coachcraft", country:"🇬🇧 UK", segment:"Mini/Midi", price:"Vidējs", strength:"high" },
  { name:"Karsan", country:"🇹🇷 Turcija", segment:"Mini/Midi", price:"Zems", strength:"mid" },
  { name:"BYD", country:"🇨🇳 Ķīna", segment:"Visi izmēri", price:"Zems", strength:"high" },
  { name:"Solaris", country:"🇵🇱 Polija", segment:"Midi/Pilnizmēra", price:"Vidējs", strength:"mid" },
  { name:"Ebusco", country:"🇳🇱 Nīderlande", segment:"Pilnizmēra", price:"Augsts", strength:"mid" },
  { name:"Vectia (CAF)", country:"🇪🇸 Spānija", segment:"Mini/Midi", price:"Vidējs", strength:"mid" },
  { name:"Alstom / Aptis", country:"🇫🇷 Francija", segment:"Pilsētas", price:"Augsts", strength:"high" },
];

const ADVANTAGES = [
  { icon:"🔧", title:"Mercedes Sprinter bāze", desc:"Uzticama platforma, plaša apkopes tīkls Eiropā" },
  { icon:"🇪🇺", title:"ES ražots produkts", desc:"Priekšrocība ES publiskajos iepirkumos" },
  { icon:"📡", title:"Reāllaika telemetrija", desc:"Iebūvēta uzraudzības sistēma — papildu vērtība" },
  { icon:"♿", title:"Universāla pieejamība", desc:"Ramps un lifts visās konfigurācijās kā standarts" },
  { icon:"⚡", title:"Ātra piegāde", desc:"Īsāks piegādes laiks vs lieliem ražotājiem" },
  { icon:"🤝", title:"Personalizēts serviss", desc:"Tiešs kontakts ar ražotāju, nav starpnieku" },
];

// ─── STATE ────────────────────────────────────────────────────────────────
let tenders = [];
let contacts = [];
let currentId = null;

// ─── LOGIN ────────────────────────────────────────────────────────────────
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

function doLogout() {
  sessionStorage.removeItem('ef_auth');
  location.reload();
}

// ─── INIT ─────────────────────────────────────────────────────────────────
async function initApp() {
  showLoading(true);
  await loadTenders();
  await loadContacts();
  showLoading(false);
  populateCountries();
  renderDashboard();
  updateStats();
  updateCalc();
  renderCompetitors();
}

function showLoading(on) {
  document.getElementById('loading').classList.toggle('hidden', !on);
}

// ─── SUPABASE CRUD ────────────────────────────────────────────────────────
async function loadTenders() {
  const { data, error } = await db.from('tenders').select('*').order('created_at', { ascending: false });
  if (error) { console.error(error); return; }
  tenders = data || [];
}

async function loadContacts() {
  const { data, error } = await db.from('contacts').select('*').order('created_at', { ascending: false });
  if (error) { console.error(error); return; }
  contacts = data || [];
}

async function saveTenderToDB(t) {
  const { error } = await db.from('tenders').upsert(t);
  if (error) console.error('Save error:', error);
}

async function deleteTenderFromDB(id) {
  const { error } = await db.from('tenders').delete().eq('id', id);
  if (error) console.error('Delete error:', error);
}

async function saveContactToDB(c) {
  const { error } = await db.from('contacts').insert(c);
  if (error) console.error('Contact save error:', error);
}

async function deleteContactFromDB(id) {
  const { error } = await db.from('contacts').delete().eq('id', id);
  if (error) console.error('Contact delete error:', error);
}

// ─── NAVIGATION ───────────────────────────────────────────────────────────
const pageTitles = {
  dashboard:'📊 Pārskats', tenders:'📋 Visi tenderi', saved:'⭐ Saglabātie',
  applied:'🚀 Pieteikumi', crm:'👥 CRM Kontakti', finance:'💰 Finanšu kalkulators',
  competitors:'🎯 Konkurenti', add:'➕ Pievienot tenderi'
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

// ─── STATS ────────────────────────────────────────────────────────────────
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

// ─── DASHBOARD ────────────────────────────────────────────────────────────
function renderDashboard() {
  updateStats();
  const scored = [...tenders].filter(t => t.ai_score).sort((a, b) => b.ai_score - a.ai_score).slice(0, 3);
  const top = document.getElementById('top-tenders');
  if (scored.length === 0) {
    top.innerHTML = '<div style="color:var(--muted);font-size:13px;">Vēl nav AI analīzes — atveriet tenderi un cilnē "AI Analīze" tā tiks ģenerēta automātiski.</div>';
  } else {
    top.innerHTML = scored.map((t, i) => `
      <div onclick="openModal(${t.id})" style="display:flex;align-items:center;gap:14px;padding:12px;background:var(--s2);border:1px solid var(--border);border-radius:8px;margin-bottom:8px;cursor:pointer;transition:all .15s;" onmouseover="this.style.borderColor='var(--cyan)'" onmouseout="this.style.borderColor='var(--border)'">
        <div style="font-family:var(--head);font-size:20px;font-weight:800;color:var(--muted);width:24px;">#${i + 1}</div>
        <div style="flex:1;"><div style="font-size:13px;font-weight:500;">${t.flag || ''} ${t.title}</div><div style="font-size:11px;color:var(--muted2);margin-top:2px;">${t.country} · ${t.buyer}</div></div>
        <div class="score-pill ${scClass(t.ai_score)}">${t.ai_score}%</div>
      </div>`).join('');
  }
  document.getElementById('product-grid').innerHTML = PRODUCTS.map(p => `
    <div class="product-card" style="border-top-color:${p.color}">
      <div class="product-card-name">${p.name}</div>
      <div class="product-card-spec">🪑 ${p.seats} · ⚡ ${p.range}km</div>
      <div class="product-card-use">${p.useCase}</div>
    </div>`).join('');
}

// ─── TABLE ────────────────────────────────────────────────────────────────
function scClass(s) { return s >= 70 ? 'high' : s >= 45 ? 'mid' : 'low'; }
function statusLabel(s) { return { new: 'Jauns', open: 'Atvērts', applied: 'Pieteikts', won: 'Uzvarēts', lost: 'Zaudēts' }[s] || s; }
function daysLeft(d) { return Math.ceil((new Date(d) - new Date()) / 86400000); }
function fmtVal(v) { if (!v) return '—'; return v >= 1e6 ? '€' + (v / 1e6).toFixed(1) + 'M' : '€' + (v / 1000).toFixed(0) + 'K'; }

function renderRow(t) {
  const days = daysLeft(t.deadline);
  const dColor = days < 0 ? 'var(--red)' : days <= 14 ? 'var(--amber)' : 'var(--muted2)';
  return `<div class="table-row ${t.ai_score >= 70 ? 'highlight' : ''}" onclick="openModal(${t.id})">
    <div><div class="td-title">${t.flag || ''} ${t.title.length > 52 ? t.title.slice(0, 52) + '…' : t.title}</div><div class="td-sub">${t.buyer}</div></div>
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

// ─── MODAL ────────────────────────────────────────────────────────────────
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

// ─── AI ANALYSIS ──────────────────────────────────────────────────────────
async function loadAI(t) {
  const el = document.getElementById('ai-content');
  if (t.ai_data) { renderAIResult(t.ai_data, t.ai_score); return; }
  el.innerHTML = '<div class="ai-loading"><div class="spinner"></div>AI analizē tenderi...</div>';
  try {
    const prompt = `Tu esi tenderu analītiķis uzņēmumam SIA Electrify (electricbus.lv). Uzņēmums: Mercedes Sprinter bāzes elektroautobusu retrofitēšana un piegāde.

PRODUKTI:
${PRODUCTS.map(p => `- ${p.name}: ${p.seats} sēdvietas, ${p.range}km, ${p.motor}. Piemērots: ${p.useCase}`).join('\n')}

MĒS NEVARAM: ${CANNOT.join(', ')}

TENDERIS:
Nosaukums: ${t.title}
Valsts: ${t.country}, Pasūtītājs: ${t.buyer}
Vērtība: €${t.value}, Daudzums: ${t.qty} autobusi
Apraksts: ${t.description || '—'}

Atbildi TIKAI JSON (bez markdown):
{"score":<0-100>,"verdict":"<1 teikums lv>","summary":"<2-3 teikumi lv>","can":["<3-4 punkti lv>"],"cannot":["<2-3 riski lv>"],"bestProducts":[{"name":"<produkts>","fit":"<Ideāli|Labi|Iespējams>"}],"keyRequirements":["<3-4 prasības lv>"]}`;

    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] })
    });
    const data = await resp.json();
    const text = data.content.map(i => i.text || '').join('');
    const ai = JSON.parse(text.replace(/```json|```/g, '').trim());
    t.ai_score = ai.score;
    t.ai_data = ai;
    await saveTenderToDB({ id: t.id, ai_score: ai.score, ai_data: ai });
    renderAIResult(ai, ai.score);
    updateStats();
  } catch (e) {
    el.innerHTML = `<div style="color:var(--red);font-family:var(--mono);font-size:12px;padding:16px;">AI kļūda: ${e.message}</div>`;
  }
}

function renderAIResult(ai, score) {
  const sc = scClass(score);
  const scoreColor = sc === 'high' ? 'var(--green)' : sc === 'mid' ? 'var(--amber)' : 'var(--red)';
  document.getElementById('ai-content').innerHTML = `
    <div class="ai-score-hero">
      <div class="score-circle ${sc}"><div class="score-num" style="color:${scoreColor}">${score}</div><div class="score-pct">/ 100</div></div>
      <div class="ai-verdict"><h3>${ai.verdict}</h3><p>${ai.summary}</p></div>
    </div>
    <div class="ai-grid">
      <div class="ai-box"><div class="ai-box-label">✅ Ko mēs varam piedāvāt</div><ul>${(ai.can || []).map(c => `<li>${c}</li>`).join('')}</ul></div>
      <div class="ai-box cant"><div class="ai-box-label">⚠️ Riski / ierobežojumi</div><ul>${(ai.cannot || []).map(c => `<li style="color:var(--muted2);">${c}</li>`).join('')}</ul></div>
    </div>
    <div class="ai-products-rec">
      <div class="ai-box-label" style="margin-bottom:8px;">🚌 Ieteicamie produkti</div>
      ${(ai.bestProducts || []).map(p => `<div class="product-rec-item"><div style="font-weight:500;">${p.name}</div><div class="product-fit ${p.fit === 'Ideāli' ? 'best' : 'ok'}">${p.fit === 'Ideāli' ? '★ Ideāli' : p.fit === 'Labi' ? '◆ Labi' : '◇ Iespējams'}</div></div>`).join('')}
    </div>
    <div class="ai-box"><div class="ai-box-label">📌 Galvenās prasības</div><ul>${(ai.keyRequirements || []).map(r => `<li>${r}</li>`).join('')}</ul></div>`;
}

// ─── PITCH ────────────────────────────────────────────────────────────────
async function loadPitch(t) {
  const el = document.getElementById('pitch-content');
  if (t.pitch_text) { el.innerHTML = `<div class="pitch-box">${t.pitch_text}</div><button class="btn btn-ghost" style="margin-top:12px;" onclick="copyPitch()">📋 Kopēt</button>`; return; }
  el.innerHTML = '<div class="ai-loading"><div class="spinner"></div>Ģenerē pieteikuma tekstu...</div>';
  try {
    const prompt = `Uzraksti profesionālu pieteikuma ievadtekstu latviešu valodā uzņēmumam SIA Electrify (electricbus.lv).

Tenderis: ${t.title}
Pasūtītājs: ${t.buyer}, ${t.country}
Daudzums: ${t.qty} autobusi, Vērtība: €${t.value}
Apraksts: ${t.description || '—'}

Par mums: Mercedes Sprinter bāzes elektroautobusu retrofitēšana. Produkti: ${PRODUCTS.map(p => p.name).join(', ')}.
Priekšrocības: ES ražots, ISO 9001, telemetrija, universāla pieejamība, ātra piegāde.

Raksti ~180 vārdus, profesionāli, iekļauj konkrētu produktu ieteikumu. Beidz ar aicinājumu tikties. Tikai teksts, bez virsrakstiem.`;

    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 600, messages: [{ role: "user", content: prompt }] })
    });
    const data = await resp.json();
    const text = data.content.map(i => i.text || '').join('');
    t.pitch_text = text;
    await saveTenderToDB({ id: t.id, pitch_text: text });
    el.innerHTML = `<div class="pitch-box">${text}</div><button class="btn btn-ghost" style="margin-top:12px;" onclick="copyPitch()">📋 Kopēt</button>`;
  } catch (e) {
    el.innerHTML = `<div style="color:var(--red);font-family:var(--mono);font-size:12px;padding:16px;">Kļūda: ${e.message}</div>`;
  }
}

function copyPitch() {
  const t = tenders.find(t => t.id === currentId);
  if (t?.pitch_text) { navigator.clipboard.writeText(t.pitch_text); showToast('📋 Nokopēts!'); }
}

// ─── DOCS ─────────────────────────────────────────────────────────────────
const DEFAULT_DOCS = [
  { id: 'd1', name: 'Uzņēmuma reģistrācijas apliecība', req: 'must', done: false },
  { id: 'd2', name: 'Finanšu pārskati (pēdējie 2 gadi)', req: 'must', done: false },
  { id: 'd3', name: 'CE sertifikāts (transporta līdzeklim)', req: 'must', done: false },
  { id: 'd4', name: 'ISO 9001 sertifikāts', req: 'must', done: false },
  { id: 'd5', name: 'Produkta tehniskā specifikācija', req: 'must', done: false },
  { id: 'd6', name: 'Garantijas nosacījumi (min. 2 gadi)', req: 'must', done: false },
  { id: 'd7', name: 'Elektrodrošības sertifikāts (IEC)', req: 'must', done: false },
  { id: 'd8', name: 'Iepriekšējo piegāžu atsauces (3+)', req: 'should', done: false },
  { id: 'd9', name: 'Piegādes grafiks un laika plāns', req: 'should', done: false },
  { id: 'd10', name: 'Apkopes un servisa plāns', req: 'should', done: false },
  { id: 'd11', name: 'Apdrošināšanas polise', req: 'should', done: false },
  { id: 'd12', name: 'Pieteikuma vēstule (cover letter)', req: 'opt', done: false },
  { id: 'd13', name: 'Prezentācija par uzņēmumu', req: 'opt', done: false },
];

function loadDocs(t) {
  if (!t.docs) t.docs = JSON.parse(JSON.stringify(DEFAULT_DOCS));
  renderDocs(t);
}

function renderDocs(t) {
  const labels = { must: 'Obligāts', should: 'Ieteicams', opt: 'Papildu' };
  document.getElementById('docs-content').innerHTML = `
    <div class="doc-list">
      ${t.docs.map(d => `
        <div class="doc-item">
          <div class="doc-check ${d.done ? 'done' : ''}" onclick="toggleDoc('${d.id}')">${d.done ? '✓' : ''}</div>
          <div class="doc-name" style="${d.done ? 'text-decoration:line-through;color:var(--muted)' : ''}">${d.name}</div>
          <span class="doc-required ${d.req}">${labels[d.req]}</span>
        </div>`).join('')}
    </div>
    <div style="margin-top:12px;font-family:var(--mono);font-size:11px;color:var(--muted);">
      Sagatavoti: ${t.docs.filter(d => d.done).length} / ${t.docs.length}
    </div>`;
}

async function toggleDoc(docId) {
  const t = tenders.find(t => t.id === currentId);
  if (!t) return;
  const d = t.docs.find(d => d.id === docId);
  if (d) {
    d.done = !d.done;
    await saveTenderToDB({ id: t.id, docs: t.docs });
    renderDocs(t);
  }
}

// ─── STATUS & NOTES ───────────────────────────────────────────────────────
async function updateStatus() {
  const t = tenders.find(t => t.id === currentId);
  if (!t) return;
  t.status = document.getElementById('m-status').value;
  await saveTenderToDB({ id: t.id, status: t.status });
  updateStats();
  showToast('✅ Statuss saglabāts');
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
  updateStats();
  renderTable('all');
  showToast(t.saved ? '⭐ Saglabāts!' : 'Noņemts');
}

async function toggleStarModal() {
  const t = tenders.find(t => t.id === currentId);
  if (!t) return;
  t.saved = !t.saved;
  await saveTenderToDB({ id: t.id, saved: t.saved });
  document.getElementById('m-star').textContent = t.saved ? '⭐ Saglabāts' : '☆ Saglabāt';
  updateStats();
  showToast(t.saved ? '⭐ Saglabāts!' : 'Noņemts');
}

async function deleteTender() {
  if (!confirm('Dzēst šo tenderi?')) return;
  await deleteTenderFromDB(currentId);
  tenders = tenders.filter(t => t.id !== currentId);
  updateStats();
  closeModal();
  renderTable('all');
  showToast('🗑 Dzēsts');
}

// ─── ADD TENDER ───────────────────────────────────────────────────────────
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
    notes: '', ai_score: null, ai_data: null, pitch_text: null, docs: null
  };
  const { data, error } = await db.from('tenders').insert(newT).select().single();
  showLoading(false);
  if (error) { showToast('❌ Kļūda saglabājot'); console.error(error); return; }
  tenders.unshift(data);
  populateCountries();
  updateStats();
  ['f-title', 'f-country', 'f-flag', 'f-buyer', 'f-value', 'f-qty', 'f-deadline', 'f-url', 'f-desc'].forEach(id => document.getElementById(id).value = '');
  showToast('⚡ Tenderis pievienots!');
  showPanel('tenders');
}

// ─── CRM ──────────────────────────────────────────────────────────────────
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
  renderCRM();
  showToast('👤 Kontakts pievienots!');
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
  await deleteContactFromDB(id);
  contacts = contacts.filter(c => c.id !== id);
  renderCRM();
}

// ─── FINANCE ──────────────────────────────────────────────────────────────
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

// ─── COMPETITORS ──────────────────────────────────────────────────────────
function renderCompetitors() {
  document.getElementById('comp-list').innerHTML = COMPETITORS.map(c => `
    <div class="comp-row">
      <div><strong>${c.name}</strong></div>
      <div>${c.country}</div>
      <div>${c.segment}</div>
      <div>${c.price}</div>
      <div><span class="strength ${c.strength === 'high' ? 'str-high' : c.strength === 'mid' ? 'str-mid' : 'str-low'}">${c.strength === 'high' ? 'Augsts' : c.strength === 'mid' ? 'Vidējs' : 'Zems'}</span></div>
    </div>`).join('');
  document.getElementById('advantages-grid').innerHTML = ADVANTAGES.map(a => `
    <div style="background:var(--s2);border:1px solid var(--border);border-radius:8px;padding:12px;display:flex;gap:10px;">
      <div style="font-size:20px;">${a.icon}</div>
      <div><div style="font-size:12px;font-weight:600;margin-bottom:3px;">${a.title}</div><div style="font-size:11px;color:var(--muted2);">${a.desc}</div></div>
    </div>`).join('');
}

// ─── TOAST ────────────────────────────────────────────────────────────────
function showToast(msg) {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t); setTimeout(() => t.remove(), 3000);
}

// ─── AUTO LOGIN CHECK ─────────────────────────────────────────────────────
if (sessionStorage.getItem('ef_auth') === '1') {
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('app').style.display = 'grid';
  initApp();
}
