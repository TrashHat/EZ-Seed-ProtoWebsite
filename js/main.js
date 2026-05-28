// ── SEED DATA ──────────────────────────────────────────────────────────────
const SEEDS = [
  // Inbred
  {
    id: 'rc222', name: 'NSIC RC 222 (Tubigan 18)', type: 'Inbred',
    mao: true, pao: true, board: true, stockSacks: 110,
    shortDesc: 'A proven high-yielding inbred variety ideal for both dry and wet seasons.',
    fullDesc: 'NSIC RC-222, or Tubigan 18, is a "subok na" (proven) variety designed to help you get a much bigger harvest from your irrigated fields. It normally yields around 5.2 to 6.2 cavans per hectare, but with good management, it can reach as high as 200 cavans. This variety stands strong against common enemies like bacterial leaf blight and tungro, and it isn\'t easily damaged by pests like brown planthopper. Whether you plant during the dry or wet season, Tubigan 18 adapts well and produces heavy, long grains that mill well.'
  },
  {
    id: 'rc216', name: 'NSIC RC 216 (Tubigan 17)', type: 'Inbred',
    mao: true, pao: true, board: true, stockSacks: 110,
    shortDesc: 'A high-yielding inbred variety adapted to irrigated lowland conditions with consistent performance.',
    fullDesc: 'NSIC RC 216, or Tubigan 17, is a high-yielding inbred variety well-suited for irrigated lowland conditions. It is known for its consistent performance across both wet and dry seasons, making it a dependable choice for rice farmers seeking stable and reliable harvests year after year. Its strong disease tolerance and adaptability make it one of the most widely planted inbred varieties in the region.'
  },
  {
    id: 'rc402', name: 'NSIC RC 402 (Tubigan 36)', type: 'Inbred',
    mao: true, pao: true, board: true, stockSacks: 110,
    shortDesc: 'An inbred variety with strong blast resistance and good grain quality for irrigated lowlands.',
    fullDesc: 'NSIC RC 402, or Tubigan 36, is an inbred variety with strong resistance to blast disease and good overall grain quality. Well-adapted to irrigated lowland environments in both wet and dry seasons, it provides farmers with a reliable harvest option backed by solid disease tolerance and good milling recovery.'
  },
  {
    id: 'rc436', name: 'NSIC RC 436 (Tubigan 37)', type: 'Inbred',
    mao: true, pao: true, board: false, stockSacks: 110,
    shortDesc: 'A newer inbred variety with improved yield potential and broad adaptability for irrigated lowlands.',
    fullDesc: 'NSIC RC 436, or Tubigan 37, is a newer inbred variety offering improved yield potential and broad adaptability. It performs well in irrigated lowland conditions across both wet and dry seasons, making it a competitive option for farmers looking to try newer, higher-performing varieties with good disease resistance.'
  },
  {
    id: 'rc480', name: 'NSIC RC 480 (SGR 8)', type: 'Inbred',
    mao: true, pao: false, board: false, stockSacks: 110,
    shortDesc: 'An inbred variety developed for irrigated lowland areas with stable yield and good milling recovery.',
    fullDesc: 'NSIC RC 480, or SGR 8, is an inbred variety developed for irrigated lowland areas. It offers stable yield performance with good milling recovery and grain quality, making it a practical option for farmers who prioritize quality output alongside reliable yields.'
  },
  // Hybrid
  {
    id: 'rc72h', name: 'PSB RC 72H (Mestizo 1)', type: 'Hybrid',
    mao: true, pao: true, board: true, stockSacks: 110,
    shortDesc: 'A widely adopted hybrid variety known for vigorous growth and high yield potential.',
    fullDesc: 'PSB RC 72H, or Mestizo 1, is a widely adopted hybrid rice variety known for its vigorous growth and high yield potential. As a hybrid, it typically outperforms inbred varieties in grain production. It is well-suited for irrigated lowland environments and is a strong option for farmers aiming to maximize output per hectare.'
  },
  {
    id: 'rc204h', name: 'NSIC RC 204H (Mestiso 20)', type: 'Hybrid',
    mao: true, pao: true, board: true, stockSacks: 110,
    shortDesc: 'A hybrid variety with broad adaptability and strong yield performance for irrigated lowlands.',
    fullDesc: 'NSIC RC 204H, or Mestiso 20, is a hybrid rice variety with broad adaptability and strong yield performance. Well-suited for irrigated lowlands, it combines high yield with good grain quality, offering farmers an effective option for maximizing production in both wet and dry seasons.'
  },
  {
    id: 'rc446h', name: 'NSIC RC 446H (Mestiso 73)', type: 'Hybrid',
    mao: true, pao: true, board: false, stockSacks: 110,
    shortDesc: 'A newer hybrid with improved lodging and pest resistance for irrigated lowland production.',
    fullDesc: 'NSIC RC 446H, or Mestiso 73, is a newer hybrid variety with improved resistance to lodging and pests. It offers high yield potential under proper management in irrigated lowland conditions, making it a compelling option for farmers seeking the benefits of a modern hybrid variety.'
  }
];

// ── KNOWN FARMERS ─────────────────────────────────────────────────────────
const KNOWN_FARMERS = ['FarmerA', 'FarmerB'];

// ── FARMER PROFILES (set by registration system, read-only in app) ─────────
const FARMER_PROFILES = {
  FarmerA: {
    name:     'Juan dela Cruz',
    location: 'Calauan, Laguna',
    contact:  '0917-123-4567',
    hectares: '2.5 ha'
  },
  FarmerB: {
    name:     'Maria Santos',
    location: 'Sta. Cruz, Laguna',
    contact:  '0928-765-4321',
    hectares: '1.8 ha'
  }
};

// ── DEFAULT ORDERS (hardcoded, shown only for FarmerA) ────────────────────
const DEFAULT_ORDERS = [
  {
    id: 'ds2026', season: '2026 Dry Season', status: 'delivered',
    seeds: [{ id: 'rc216', sacks: 20 }]
  },
  {
    id: 'ws2026', season: '2026 Wet Season', status: 'arrived_pao',
    seeds: [{ id: 'rc216', sacks: 20 }]
  }
];

const STATUS_LABELS = {
  decision_pending: 'Decision Pending',
  decision_made:    'Decision Made',
  shipping_pao:     'Shipping to PAO',
  arrived_pao:      'Arrived at PAO',
  for_pickup:       'For Pick-Up',
  delivered:        'Delivered'
};
const STATUS_CLASS = {
  decision_pending: 'status-pending',
  decision_made:    'status-germination',
  shipping_pao:     'status-pickup',
  arrived_pao:      'status-pickup',
  for_pickup:       'status-allocated',
  delivered:        'status-allocated'
};

// ── SESSION / USER HELPERS ─────────────────────────────────────────────────
function currentUser() { return localStorage.getItem('ezseed_user') || 'FarmerA'; }
function farmerKey(k)  { return `ezseed_${currentUser()}_${k}`; }

// ── STOCK HELPERS ──────────────────────────────────────────────────────────
function getStock() {
  const stored = localStorage.getItem('ezseed_stock');
  if (stored) return JSON.parse(stored);
  const stock = {};
  SEEDS.forEach(s => { stock[s.id] = s.stockSacks; });
  localStorage.setItem('ezseed_stock', JSON.stringify(stock));
  return stock;
}
function saveStock(stock) { localStorage.setItem('ezseed_stock', JSON.stringify(stock)); }

// ── ORDER HELPERS ──────────────────────────────────────────────────────────
function applyStatusOverrides(orders) {
  const overrides = JSON.parse(localStorage.getItem('ezseed_order_statuses') || '{}');
  return orders.map(o => overrides[o.id] ? { ...o, status: overrides[o.id] } : o);
}

function getAllOrders() {
  const dynamic = applyStatusOverrides(JSON.parse(localStorage.getItem(farmerKey('orders')) || '[]'));
  if (currentUser() === 'FarmerA') return [...applyStatusOverrides(DEFAULT_ORDERS), ...dynamic];
  return dynamic;
}

function getAllFarmerOrders() {
  const result = [];
  applyStatusOverrides(DEFAULT_ORDERS).forEach(o => result.push({ ...o, farmer: 'FarmerA' }));
  KNOWN_FARMERS.forEach(farmer => {
    const orders = applyStatusOverrides(JSON.parse(localStorage.getItem(`ezseed_${farmer}_orders`) || '[]'));
    orders.forEach(o => result.push({ ...o, farmer }));
  });
  return result;
}

function setOrderStatus(farmer, orderId, newStatus) {
  const dynamic = JSON.parse(localStorage.getItem(`ezseed_${farmer}_orders`) || '[]');
  const idx = dynamic.findIndex(o => o.id === orderId);
  if (idx !== -1) {
    dynamic[idx].status = newStatus;
    localStorage.setItem(`ezseed_${farmer}_orders`, JSON.stringify(dynamic));
  } else {
    const overrides = JSON.parse(localStorage.getItem('ezseed_order_statuses') || '{}');
    overrides[orderId] = newStatus;
    localStorage.setItem('ezseed_order_statuses', JSON.stringify(overrides));
  }
}

function getSurveyVotes() {
  const votes = {};
  KNOWN_FARMERS.forEach(farmer => {
    if (localStorage.getItem(`ezseed_${farmer}_survey_submitted`) !== 'true') return;
    const inbred = JSON.parse(localStorage.getItem(`ezseed_${farmer}_survey_inbred`) || '[]');
    const hybrid = JSON.parse(localStorage.getItem(`ezseed_${farmer}_survey_hybrid`) || '[]');
    [...inbred, ...hybrid].forEach(id => { votes[id] = (votes[id] || 0) + 1; });
  });
  return votes;
}

function initSeedVotes() {
  const stored = localStorage.getItem('ezseed_seed_votes');
  if (stored && JSON.parse(stored).pairs) return;
  localStorage.removeItem('ezseed_seed_votes');
  const inbred = {}, hybrid = {}, pairs = {};
  const inbredSeeds = SEEDS.filter(s => s.type === 'Inbred');
  const hybridSeeds = SEEDS.filter(s => s.type === 'Hybrid');
  inbredSeeds.forEach(s => { inbred[s.id] = Math.floor(Math.random() * 16) + 5; });
  hybridSeeds.forEach(s => { hybrid[s.id] = Math.floor(Math.random() * 12) + 4; });
  inbredSeeds.forEach(i => hybridSeeds.forEach(h => {
    if (Math.random() > 0.35) pairs[`${i.id}||${h.id}`] = Math.floor(Math.random() * 8) + 2;
  }));
  localStorage.setItem('ezseed_seed_votes', JSON.stringify({ inbred, hybrid, pairs }));
}

function getSurveyVotesDetailed() {
  initSeedVotes();
  const base  = JSON.parse(localStorage.getItem('ezseed_seed_votes'));
  const inbred = { ...base.inbred };
  const hybrid = { ...base.hybrid };
  const pairs  = { ...(base.pairs || {}) };
  KNOWN_FARMERS.forEach(farmer => {
    if (localStorage.getItem(`ezseed_${farmer}_survey_submitted`) !== 'true') return;
    const inbredIds = JSON.parse(localStorage.getItem(`ezseed_${farmer}_survey_inbred`) || '[]');
    const hybridIds = JSON.parse(localStorage.getItem(`ezseed_${farmer}_survey_hybrid`) || '[]');
    inbredIds.forEach(id => { inbred[id] = (inbred[id] || 0) + 1; });
    hybridIds.forEach(id => { hybrid[id] = (hybrid[id] || 0) + 1; });
    inbredIds.forEach(i => hybridIds.forEach(h => {
      const key = `${i}||${h}`;
      pairs[key] = (pairs[key] || 0) + 1;
    }));
  });
  return { inbred, hybrid, pairs };
}

const STATUS_NEXT = {
  decision_pending: 'decision_made',
  decision_made:    'shipping_pao',
  shipping_pao:     'arrived_pao',
  arrived_pao:      'for_pickup',
  for_pickup:       'delivered'
};

function getOrderById(id) {
  return getAllOrders().find(o => o.id === id);
}

function generateSeasonLabel() {
  const now   = new Date();
  const month = now.getMonth() + 1;
  const year  = now.getFullYear();
  return `${year} ${(month >= 5 && month <= 10) ? 'Wet' : 'Dry'} Season`;
}

// ── RESET HELPERS ──────────────────────────────────────────────────────────
function resetAllData() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith('ezseed_')) keys.push(k);
  }
  keys.forEach(k => localStorage.removeItem(k));
  initSeedVotes();
}

function resetFarmerData() {
  const prefix = `ezseed_${currentUser()}_`;
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(prefix)) keys.push(k);
  }
  keys.forEach(k => localStorage.removeItem(k));
}

// ── SEED / ORDER LOOKUPS ───────────────────────────────────────────────────
function getSeed(id)  { return SEEDS.find(s => s.id === id); }

// Returns submitted recommendations (empty if board hasn't confirmed yet)
function getRecommendations() {
  if (localStorage.getItem('ezseed_board_submitted') !== 'true') return { mao: [], pao: [], board: [] };
  return {
    mao:   JSON.parse(localStorage.getItem('ezseed_board_mao')   || '[]'),
    pao:   JSON.parse(localStorage.getItem('ezseed_board_pao')   || '[]'),
    board: JSON.parse(localStorage.getItem('ezseed_board_board') || '[]')
  };
}

// Returns in-progress selections regardless of submission state
function getCurrentSelections() {
  return {
    mao:   JSON.parse(localStorage.getItem('ezseed_board_mao')   || '[]'),
    pao:   JSON.parse(localStorage.getItem('ezseed_board_pao')   || '[]'),
    board: JSON.parse(localStorage.getItem('ezseed_board_board') || '[]')
  };
}

function buildStars(seed) {
  const recs = getRecommendations();
  const s = [];
  if (recs.mao.includes(seed.id))   s.push('<span class="star star-mao">★</span>');
  if (recs.pao.includes(seed.id))   s.push('<span class="star star-pao">★</span>');
  if (recs.board.includes(seed.id)) s.push('<span class="star star-board">★</span>');
  return s.join('');
}

function injectDynamicStars() {
  document.querySelectorAll('[data-seed-id]').forEach(container => {
    const id = container.dataset.seedId;
    const seed = getSeed(id);
    if (!seed) return;
    const starsContainer = container.querySelector('.seed-row-right, .seed-order-card');
    if (!starsContainer) return;
    starsContainer.querySelectorAll('.star').forEach(s => s.remove());
    const starsHtml = buildStars(seed);
    if (!starsHtml) return;
    const temp = document.createElement('span');
    temp.innerHTML = starsHtml;
    const infoBtn = starsContainer.querySelector('.info-btn-v2');
    while (temp.firstChild) {
      starsContainer.insertBefore(temp.firstChild, infoBtn || null);
    }
  });
}

function buildBadges(seed) {
  const recs = getRecommendations();
  const p = [`<span class="badge badge-filled">${seed.type}</span>`];
  if (recs.mao.includes(seed.id))   p.push('<span class="badge badge-outline">MAO Recommended</span>');
  if (recs.pao.includes(seed.id))   p.push('<span class="badge badge-outline">PAO Recommended</span>');
  if (recs.board.includes(seed.id)) p.push('<span class="badge badge-outline">Board Recommended</span>');
  return p.join('');
}

// ── NAV GREETING ───────────────────────────────────────────────────────────
function updateNavGreeting() {
  document.querySelectorAll('.navbar-greeting').forEach(el => {
    el.textContent = `Welcome, ${currentUser()}!`;
  });
}

// ── MODAL ──────────────────────────────────────────────────────────────────
function openModal(seedId) {
  const seed = getSeed(seedId);
  if (!seed) return;
  const overlay = document.getElementById('seed-modal');
  if (!overlay) return;
  document.getElementById('modal-title').textContent = seed.name;
  document.getElementById('modal-desc').textContent  = seed.fullDesc;
  document.getElementById('modal-badges').innerHTML  = buildBadges(seed);
  const img = document.getElementById('modal-img');
  if (img) {
    if (seedId === 'rc222') { img.src = 'assets/nsic rc 222.jpg'; img.style.display = 'block'; }
    else { img.style.display = 'none'; }
  }
  overlay.classList.add('open');
}

function closeModal() {
  document.getElementById('seed-modal')?.classList.remove('open');
}

function initModal() {
  const overlay = document.getElementById('seed-modal');
  if (!overlay) return;
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document.querySelectorAll('.info-btn-v2[data-seed-id]').forEach(btn => {
    btn.addEventListener('click', e => { e.stopPropagation(); openModal(btn.dataset.seedId); });
  });
}

// ── LOGIN ──────────────────────────────────────────────────────────────────
function initLogin() {
  const form = document.getElementById('login-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const user = document.getElementById('login-user').value.trim();
    const pass = document.getElementById('login-pass').value;
    const err  = document.getElementById('login-error');
    err.style.display = 'none';
    if ((user === 'FarmerA' || user === 'FarmerB') && pass === 'IAmTheFarmerNow') {
      localStorage.setItem('ezseed_user', user);
      localStorage.setItem('ezseed_role', 'farmer');
      window.location.href = 'dashboard.html';
    } else if (user === 'DAOfficer' && pass === 'IAmTheDANow') {
      localStorage.setItem('ezseed_user', user);
      localStorage.setItem('ezseed_role', 'daofficer');
      window.location.href = 'da-index.html';
    } else if (user === 'DABoard' && pass === 'IAmTheDANow') {
      localStorage.setItem('ezseed_user', user);
      localStorage.setItem('ezseed_role', 'daboard');
      window.location.href = 'board-index.html';
    } else {
      err.style.display = 'block';
    }
  });

  document.getElementById('toggle-pass')?.addEventListener('click', () => {
    const pass = document.getElementById('login-pass');
    pass.type = pass.type === 'password' ? 'text' : 'password';
  });

  document.getElementById('reset-all-btn')?.addEventListener('click', () => {
    if (confirm('Reset ALL data for all users? This cannot be undone.')) {
      resetAllData();
      document.getElementById('login-user').value = '';
      document.getElementById('login-pass').value = '';
    }
  });
}

// ── FARMER HOME ────────────────────────────────────────────────────────────
function initFarmerHome() {
  updateNavGreeting();
  const verified = localStorage.getItem(farmerKey('verified')) === 'true';

  if (!verified) {
    document.querySelectorAll('.bento-card-v2[data-requires-verified]').forEach(card => {
      card.classList.add('disabled');
      card.removeAttribute('href');
    });
    return;
  }

  const surveyCard = document.querySelector('.bento-card-v2[data-card="seed-survey"]');
  if (surveyCard && localStorage.getItem(farmerKey('survey_submitted')) === 'true') {
    surveyCard.href = 'survey-view.html';
  }
}

// ── V2 FILTER LOGIC ────────────────────────────────────────────────────────
const activeFilters = new Set();

function initSeedFilterV2() {
  updateFilterChipsV2();
  applyFiltersV2();
  document.querySelectorAll('.filter-chip-v2').forEach(chip => {
    chip.addEventListener('click', () => {
      const f = chip.dataset.filter;
      if (f === 'all') { activeFilters.clear(); }
      else { activeFilters.has(f) ? activeFilters.delete(f) : activeFilters.add(f); }
      updateFilterChipsV2();
      applyFiltersV2();
    });
  });
}

function updateFilterChipsV2() {
  document.querySelectorAll('.filter-chip-v2').forEach(chip => {
    const f = chip.dataset.filter;
    chip.classList.toggle('active', f === 'all' ? activeFilters.size === 0 : activeFilters.has(f));
  });
}

function applyFiltersV2() {
  const recs = getRecommendations();
  document.querySelectorAll('.seed-row[data-seed-id]').forEach(row => {
    const id = row.dataset.seedId;
    if (activeFilters.size === 0) { row.style.display = ''; return; }
    let show = true;
    if (activeFilters.has('mao')   && !recs.mao.includes(id))   show = false;
    if (activeFilters.has('pao')   && !recs.pao.includes(id))   show = false;
    if (activeFilters.has('board') && !recs.board.includes(id)) show = false;
    row.style.display = show ? '' : 'none';
  });
}

// ── SURVEY: INBRED SELECTION (single-select) ───────────────────────────────
let surveyInbred = '';

function initSurveyInbred() {
  updateNavGreeting();
  initSeedFilterV2();
  initModal();
  injectDynamicStars();
  const { inbred } = getSurveyVotesDetailed();
  const seeds = SEEDS.filter(s => s.type === 'Inbred');
  makePieChart('chart-inbred-survey', seeds.map(s => s.name.replace(/.*\(/, '').replace(')', '')), seeds.map(s => inbred[s.id] || 0), CHART_COLORS_OLIVE);
  document.querySelectorAll('.seed-row[data-seed-id]').forEach(row => {
    row.addEventListener('click', e => {
      if (e.target.closest('.info-btn-v2')) return;
      const id = row.dataset.seedId;
      surveyInbred = (surveyInbred === id) ? '' : id;
      refreshSurveyInbredUI();
    });
  });
  refreshSurveyInbredUI();
  document.getElementById('add-btn')?.addEventListener('click', () => {
    if (surveyInbred) {
      localStorage.setItem(farmerKey('survey_inbred'), JSON.stringify([surveyInbred]));
      window.location.href = 'seedselect-hybrid.html';
    }
  });
}

function refreshSurveyInbredUI() {
  document.querySelectorAll('.seed-row[data-seed-id]').forEach(row => {
    row.classList.toggle('selected', row.dataset.seedId === surveyInbred);
  });
  const btn = document.getElementById('add-btn');
  if (btn) btn.disabled = !surveyInbred;
}

// ── SURVEY: HYBRID SELECTION (single-select) ───────────────────────────────
let surveyHybrid = '';

function initSurveyHybrid() {
  updateNavGreeting();
  initSeedFilterV2();
  initModal();
  injectDynamicStars();
  const { hybrid } = getSurveyVotesDetailed();
  const seeds = SEEDS.filter(s => s.type === 'Hybrid');
  makePieChart('chart-hybrid-survey', seeds.map(s => s.name.replace(/.*\(/, '').replace(')', '')), seeds.map(s => hybrid[s.id] || 0), CHART_COLORS_BLUE);
  document.querySelectorAll('.seed-row[data-seed-id]').forEach(row => {
    row.addEventListener('click', e => {
      if (e.target.closest('.info-btn-v2')) return;
      const id = row.dataset.seedId;
      surveyHybrid = (surveyHybrid === id) ? '' : id;
      refreshSurveyHybridUI();
    });
  });
  refreshSurveyHybridUI();
  document.getElementById('add-btn')?.addEventListener('click', () => {
    if (surveyHybrid) {
      localStorage.setItem(farmerKey('survey_hybrid'), JSON.stringify([surveyHybrid]));
      window.location.href = 'survey-summary.html';
    }
  });
}

function refreshSurveyHybridUI() {
  document.querySelectorAll('.seed-row[data-seed-id]').forEach(row => {
    row.classList.toggle('selected', row.dataset.seedId === surveyHybrid);
  });
  const btn = document.getElementById('add-btn');
  if (btn) btn.disabled = !surveyHybrid;
}

// ── SURVEY SUMMARY ─────────────────────────────────────────────────────────
function initSurveySummary() {
  updateNavGreeting();
  initModal();
  const inbred = JSON.parse(localStorage.getItem(farmerKey('survey_inbred')) || '[]');
  const hybrid = JSON.parse(localStorage.getItem(farmerKey('survey_hybrid')) || '[]');
  const all    = [...inbred, ...hybrid];
  const list   = document.getElementById('summary-list');
  if (list) {
    list.innerHTML = all.map(id => {
      const seed = getSeed(id);
      if (!seed) return '';
      return `
        <div class="sum-row">
          <div class="sum-row-left">
            <span class="sum-row-name">${seed.name}</span>
            <span class="badge badge-filled">${seed.type}</span>
            ${buildStars(seed)}
          </div>
          <button class="info-btn-v2" data-seed-id="${id}">i</button>
        </div>`;
    }).join('');
    list.querySelectorAll('.info-btn-v2[data-seed-id]').forEach(btn => {
      btn.addEventListener('click', e => { e.stopPropagation(); openModal(btn.dataset.seedId); });
    });
  }
  document.getElementById('confirm-btn')?.addEventListener('click', () => {
    const orders = JSON.parse(localStorage.getItem(farmerKey('orders')) || '[]');
    orders.push({
      id:     'order_' + Date.now(),
      season: generateSeasonLabel(),
      status: 'decision_pending',
      seeds:  []
    });
    localStorage.setItem(farmerKey('orders'), JSON.stringify(orders));
    localStorage.setItem(farmerKey('survey_submitted'), 'true');
    window.location.href = 'survey-confirm.html';
  });
  document.getElementById('back-btn')?.addEventListener('click', () => { window.location.href = 'seedselect-hybrid.html'; });
}

// ── SURVEY VIEW (read-only after submission) ────────────────────────────────
function initSurveyView() {
  updateNavGreeting();
  initModal();
  const inbred = JSON.parse(localStorage.getItem(farmerKey('survey_inbred')) || '[]');
  const hybrid = JSON.parse(localStorage.getItem(farmerKey('survey_hybrid')) || '[]');
  const all    = [...inbred, ...hybrid];
  const list   = document.getElementById('summary-list');
  if (list) {
    list.innerHTML = all.map(id => {
      const seed = getSeed(id);
      if (!seed) return '';
      return `
        <div class="sum-row">
          <div class="sum-row-left">
            <span class="sum-row-name">${seed.name}</span>
            <span class="badge badge-filled">${seed.type}</span>
            ${buildStars(seed)}
          </div>
          <button class="info-btn-v2" data-seed-id="${id}">i</button>
        </div>`;
    }).join('');
    list.querySelectorAll('.info-btn-v2[data-seed-id]').forEach(btn => {
      btn.addEventListener('click', e => { e.stopPropagation(); openModal(btn.dataset.seedId); });
    });
  }

  // Status + allocated seed
  const orders  = getAllOrders();
  const active  = orders.slice().reverse().find(o => o.status !== 'delivered') || orders[orders.length - 1];
  const statusEl = document.getElementById('survey-status-badge');
  if (statusEl && active) {
    statusEl.innerHTML = `<span class="${STATUS_CLASS[active.status] || ''}">${STATUS_LABELS[active.status] || active.status}</span>`;
  }
  const allocEl = document.getElementById('survey-allocated');
  if (allocEl && active && active.seeds && active.seeds.length > 0) {
    allocEl.innerHTML = active.seeds.map(({ id, sacks }) => {
      const seed = getSeed(id); if (!seed) return '';
      return `<div class="sum-row">
        <div class="sum-row-left">
          <span class="sum-row-name">${seed.name}</span>
          <span class="badge badge-filled">${seed.type}</span>
        </div>
        <span class="sack-pill-dark">${sacks} sacks</span>
      </div>`;
    }).join('');
    allocEl.style.display = '';
  } else if (allocEl) {
    allocEl.style.display = 'none';
  }

  // 4 aggregate pie charts
  const { inbred: iv, hybrid: hv, pairs: pv } = getSurveyVotesDetailed();
  const inbredSeeds = SEEDS.filter(s => s.type === 'Inbred');
  const hybridSeeds = SEEDS.filter(s => s.type === 'Hybrid');

  function shortName(seed) { return seed.name.replace(/.*\(/, '').replace(')', ''); }

  makePieChart('chart-sv-inbred', inbredSeeds.map(shortName), inbredSeeds.map(s => iv[s.id] || 0), CHART_COLORS_OLIVE);
  makePieChart('chart-sv-hybrid', hybridSeeds.map(shortName), hybridSeeds.map(s => hv[s.id] || 0), CHART_COLORS_BLUE);
  makePieChart('chart-sv-all',    SEEDS.map(shortName),       SEEDS.map(s => (iv[s.id] || 0) + (hv[s.id] || 0)), CHART_COLORS_MIXED);

  const pairEntries = Object.entries(pv).sort(([,a],[,b]) => b - a);
  if (pairEntries.length > 0) {
    const pairLabels = pairEntries.map(([key]) => {
      const [i, h] = key.split('||');
      const si = getSeed(i), sh = getSeed(h);
      return `${si ? shortName(si) : i} + ${sh ? shortName(sh) : h}`;
    });
    makePieChart('chart-sv-pairs', pairLabels, pairEntries.map(([,v]) => v), CHART_COLORS_MIXED);
  } else {
    makePieChart('chart-sv-pairs', [], [], []);
  }

  const hiddenBar = document.getElementById('hidden-charts-bar');

  function updateHiddenBar() {
    if (!hiddenBar) return;
    hiddenBar.style.display = hiddenBar.children.length > 0 ? '' : 'none';
  }

  function restoreChart(wrap, chip) {
    wrap.style.display = '';
    chip?.remove();
    updateHiddenBar();
  }

  // Individual chart hide buttons
  document.querySelectorAll('#survey-charts-section .da-chart-wrap').forEach(wrap => {
    const titleText = wrap.querySelector('.da-chart-title')?.textContent || 'Chart';
    const btn = document.createElement('button');
    btn.className = 'chart-hide-btn';
    btn.textContent = '−';
    wrap.appendChild(btn);
    btn.addEventListener('click', () => {
      wrap.style.display = 'none';
      if (hiddenBar) {
        const chip = document.createElement('button');
        chip.className = 'hidden-chart-chip';
        chip.textContent = '+ ' + titleText;
        chip.addEventListener('click', () => restoreChart(wrap, chip));
        hiddenBar.appendChild(chip);
        updateHiddenBar();
      }
    });
  });

  // Master hide/show all — restores individually hidden charts too
  const section   = document.getElementById('survey-charts-section');
  const toggleBtn = document.getElementById('toggle-charts-btn');
  let visible = true;
  toggleBtn?.addEventListener('click', () => {
    visible = !visible;
    section.style.display = visible ? '' : 'none';
    toggleBtn.textContent = visible ? 'Hide Charts' : 'Show Charts';
    if (visible) {
      document.querySelectorAll('#survey-charts-section .da-chart-wrap').forEach(w => { w.style.display = ''; });
      if (hiddenBar) { hiddenBar.innerHTML = ''; hiddenBar.style.display = 'none'; }
    }
  });
}

// ── SEED ORDER ─────────────────────────────────────────────────────────────
const ALLOTTED_SACKS = 20;
let orderQty = {};

function initSeedOrder() {
  updateNavGreeting();

  const allocated = JSON.parse(localStorage.getItem('ezseed_da_allocated_seeds') || 'null');
  const farmerPicks = new Set([
    ...JSON.parse(localStorage.getItem(farmerKey('survey_inbred')) || '[]'),
    ...JSON.parse(localStorage.getItem(farmerKey('survey_hybrid')) || '[]')
  ]);
  const ids = (allocated && allocated.length > 0) ? allocated : SEEDS.map(s => s.id);

  const container = document.getElementById('seed-order-rows-container');
  if (container) {
    container.innerHTML = ids.map(id => {
      const seed = getSeed(id);
      if (!seed) return '';
      const yourPick = farmerPicks.has(id) ? '<span class="badge badge-your-pick">✓ Your Pick</span>' : '';
      return `
        <div class="seed-order-row" data-seed-id="${id}">
          <div class="qty-counter">
            <button class="qty-btn" data-dir="-1">&#8722;</button>
            <span class="qty-display">0</span>
            <button class="qty-btn" data-dir="1">&#43;</button>
          </div>
          <div class="seed-order-card">
            <span class="seed-row-name">${seed.name}</span>
            <span class="badge badge-filled">${seed.type}</span>
            ${buildStars(seed)}
            ${yourPick}
            <button class="info-btn-v2" data-seed-id="${id}">i</button>
          </div>
          <span class="sack-avail"></span>
        </div>`;
    }).join('');
  }

  initModal();

  SEEDS.forEach(s => { orderQty[s.id] = 0; });
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id    = btn.closest('.seed-order-row').dataset.seedId;
      const dir   = parseInt(btn.dataset.dir);
      const stock = getStock();
      const total = Object.values(orderQty).reduce((a, b) => a + b, 0);
      if (dir === 1  && total >= ALLOTTED_SACKS)         return;
      if (dir === 1  && orderQty[id] >= (stock[id] || 0)) return;
      if (dir === -1 && orderQty[id] <= 0)               return;
      orderQty[id] += dir;
      refreshOrderUI();
    });
  });
  refreshOrderUI();
  document.getElementById('add-btn')?.addEventListener('click', () => {
    const total = Object.values(orderQty).reduce((a, b) => a + b, 0);
    if (total > 0) {
      localStorage.setItem(farmerKey('order_qty'), JSON.stringify(orderQty));
      window.location.href = 'order-summary.html';
    }
  });
}

function refreshOrderUI() {
  const stock     = getStock();
  const total     = Object.values(orderQty).reduce((a, b) => a + b, 0);
  const remaining = ALLOTTED_SACKS - total;
  const budgetEl  = document.getElementById('budget-display');
  if (budgetEl) budgetEl.textContent = `Number of Allotted Sacks Left: ${remaining}`;

  document.querySelectorAll('.seed-order-row[data-seed-id]').forEach(row => {
    const id      = row.dataset.seedId;
    const qty     = orderQty[id] ?? 0;
    const avail   = (stock[id] || 0) - qty;

    const display = row.querySelector('.qty-display');
    if (display) display.textContent = qty;

    const minus = row.querySelector('.qty-btn[data-dir="-1"]');
    if (minus) minus.disabled = qty <= 0;

    const plus = row.querySelector('.qty-btn[data-dir="1"]');
    if (plus) plus.disabled = total >= ALLOTTED_SACKS || qty >= (stock[id] || 0);

    const sackAvail = row.querySelector('.sack-avail');
    if (sackAvail) sackAvail.textContent = `${Math.max(0, avail)} sacks left`;
  });

  const btn = document.getElementById('add-btn');
  if (btn) btn.disabled = total === 0;
}

// ── ORDER SUMMARY ──────────────────────────────────────────────────────────
function initOrderSummary() {
  updateNavGreeting();
  initModal();
  const qty  = JSON.parse(localStorage.getItem(farmerKey('order_qty')) || '{}');
  const list = document.getElementById('order-summary-list');
  if (list) {
    const entries = Object.entries(qty).filter(([, q]) => q > 0);
    list.innerHTML = entries.map(([id, q]) => {
      const seed = getSeed(id);
      if (!seed) return '';
      return `
        <div class="sum-row">
          <div class="sum-row-left">
            <span class="sum-row-name">${seed.name}</span>
            <span class="badge badge-filled">${seed.type}</span>
            ${buildStars(seed)}
            <button class="info-btn-v2" data-seed-id="${id}">i</button>
          </div>
          <span class="sack-pill-dark">${q} sacks</span>
        </div>`;
    }).join('');
    list.querySelectorAll('.info-btn-v2[data-seed-id]').forEach(btn => {
      btn.addEventListener('click', e => { e.stopPropagation(); openModal(btn.dataset.seedId); });
    });
  }

  document.getElementById('confirm-btn')?.addEventListener('click', () => {
    const qty = JSON.parse(localStorage.getItem(farmerKey('order_qty')) || '{}');
    const entries = Object.entries(qty).filter(([, q]) => q > 0);
    if (entries.length === 0) return;

    // Deduct from shared stock
    const stock = getStock();
    entries.forEach(([id, q]) => {
      if (stock[id] !== undefined) stock[id] = Math.max(0, stock[id] - q);
    });
    saveStock(stock);

    // Save order to farmer's order history
    const orders = JSON.parse(localStorage.getItem(farmerKey('orders')) || '[]');
    const newOrder = {
      id:     'order_' + Date.now(),
      season: generateSeasonLabel(),
      status: 'pending',
      seeds:  entries.map(([id, sacks]) => ({ id, sacks }))
    };
    orders.push(newOrder);
    localStorage.setItem(farmerKey('orders'), JSON.stringify(orders));

    // Clear staging qty
    localStorage.removeItem(farmerKey('order_qty'));

    window.location.href = 'order-confirm.html';
  });

  document.getElementById('back-btn')?.addEventListener('click', () => { window.location.href = 'seedorder.html'; });
}

// ── TRACK ORDERS ───────────────────────────────────────────────────────────
function initTrackOrders() {
  updateNavGreeting();
  const list   = document.getElementById('orders-list');
  if (!list) return;
  const orders = getAllOrders();
  if (orders.length === 0) {
    list.innerHTML = '<p style="text-align:center; color:#888;">No orders yet.</p>';
    return;
  }
  list.innerHTML = orders.map(o => `
    <div class="request-row">
      <span class="request-season">${o.season}</span>
      <span class="${STATUS_CLASS[o.status]}">${STATUS_LABELS[o.status]}</span>
      <a href="orderdetail.html?id=${o.id}" class="btn-details">See Details</a>
    </div>`).join('');
}

// ── ORDER DETAIL ───────────────────────────────────────────────────────────
function initOrderDetail() {
  updateNavGreeting();
  const params = new URLSearchParams(window.location.search);
  const order  = getOrderById(params.get('id') || 'ds2026');
  if (!order) return;

  const seasonEl = document.getElementById('detail-season');
  if (seasonEl) seasonEl.textContent = order.season;

  const list = document.getElementById('detail-list');
  if (list) {
    if (order.seeds && order.seeds.length > 0) {
      list.innerHTML = order.seeds.map(({ id, sacks }) => {
        const seed = getSeed(id);
        if (!seed) return '';
        return `
          <div class="sum-row">
            <div class="sum-row-left">
              <span class="sum-row-name">${seed.name}</span>
              <span class="badge badge-filled">${seed.type}</span>
            </div>
            <span class="sack-pill-dark">${sacks} sacks</span>
          </div>`;
      }).join('');
    } else {
      list.innerHTML = '<p style="text-align:center; color:#888; padding:1rem 0;">Awaiting DA allocation.</p>';
    }
  }

  const statusEl = document.getElementById('detail-status');
  if (statusEl) statusEl.innerHTML = `<span class="${STATUS_CLASS[order.status] || ''}">${STATUS_LABELS[order.status] || order.status}</span>`;

  const receiveBtn = document.getElementById('receive-btn');
  if (receiveBtn) {
    receiveBtn.style.display = order.status === 'for_pickup' ? 'inline-block' : 'none';
    receiveBtn.addEventListener('click', () => {
      window.location.href = `farmer-qr-scan.html?id=${order.id}`;
    });
  }
}

// ── SATISFACTION ───────────────────────────────────────────────────────────
function initSatisfaction() {
  updateNavGreeting();
  document.getElementById('send-btn')?.addEventListener('click', () => {
    window.location.href = 'satisfaction-confirm.html';
  });
}

// ── FARMER PROFILE ─────────────────────────────────────────────────────────
function getProfile(farmer) {
  const regStatus = localStorage.getItem(`ezseed_${farmer}_reg_status`);
  const regData   = JSON.parse(localStorage.getItem(`ezseed_${farmer}_registration`) || 'null');
  if (regStatus === 'approved' && regData) return regData;
  return FARMER_PROFILES[farmer] || {};
}

function initFarmerProfile() {
  updateNavGreeting();
  const user    = currentUser();
  const profile = getProfile(user);

  const headEl = document.getElementById('profile-heading');
  if (headEl) headEl.textContent = `${profile.name || user}'s Profile`;
  const nameEl = document.getElementById('profile-name');
  if (nameEl) nameEl.textContent = profile.name || '—';
  const locEl = document.getElementById('profile-location');
  if (locEl) locEl.textContent = profile.location || '—';
  const telEl = document.getElementById('profile-contact');
  if (telEl) telEl.textContent = profile.contact || '—';
  const haEl = document.getElementById('profile-hectares');
  if (haEl) haEl.textContent = profile.hectares || '—';

  const area      = document.getElementById('reg-status-area');
  const regStatus = localStorage.getItem(farmerKey('reg_status'));

  if (area) {
    if (!regStatus) {
      area.innerHTML = `
        <p class="reg-status-text reg-none">Not yet registered.</p>
        <a href="farmer-register.html" class="btn btn-primary" style="display:inline-block; margin-top:0.5rem;">Submit Registration</a>`;
    } else if (regStatus === 'pending') {
      area.innerHTML = `<p class="reg-status-text reg-pending">&#9203; Registration Pending — awaiting DA review.</p>`;
    } else if (regStatus === 'rejected') {
      const reasons = JSON.parse(localStorage.getItem(farmerKey('reg_rejection')) || '[]');
      const reasonList = reasons.length > 0
        ? `<ul class="reg-rejection-list">${reasons.map(r => `<li>${r}</li>`).join('')}</ul>` : '';
      area.innerHTML = `
        <p class="reg-status-text reg-rejected">&#10007; Registration Rejected</p>
        ${reasonList}
        <a href="farmer-register.html" class="btn btn-primary" style="display:inline-block; margin-top:0.75rem;">Resubmit Registration</a>`;
    } else if (regStatus === 'approved') {
      area.innerHTML = `<p class="reg-status-text reg-approved">&#10003; Verified</p>`;
    }
  }

  document.getElementById('reset-my-data-btn')?.addEventListener('click', () => {
    if (confirm(`Reset all data for ${user}? This cannot be undone.`)) {
      resetFarmerData();
      window.location.reload();
    }
  });
}

// ── FARMER REGISTRATION FORM ───────────────────────────────────────────────
function initFarmerRegister() {
  updateNavGreeting();
  const regStatus = localStorage.getItem(farmerKey('reg_status'));
  if (regStatus === 'rejected') {
    const existing = JSON.parse(localStorage.getItem(farmerKey('registration')) || 'null');
    if (existing) {
      const n = document.getElementById('reg-name');
      const l = document.getElementById('reg-location');
      const c = document.getElementById('reg-contact');
      const h = document.getElementById('reg-hectares');
      if (n) n.value = existing.name || '';
      if (l) l.value = existing.location || '';
      if (c) c.value = existing.contact || '';
      if (h) h.value = existing.hectares || '';
    }
  }
  document.getElementById('reg-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const data = {
      name:     document.getElementById('reg-name').value.trim(),
      location: document.getElementById('reg-location').value.trim(),
      contact:  document.getElementById('reg-contact').value.trim(),
      hectares: document.getElementById('reg-hectares').value.trim()
    };
    localStorage.setItem(farmerKey('registration'), JSON.stringify(data));
    localStorage.setItem(farmerKey('reg_status'), 'pending');
    localStorage.removeItem(farmerKey('reg_rejection'));
    window.location.href = 'viewprofile.html';
  });
}

// ── FARMER YIELD SURVEY ────────────────────────────────────────────────────
const PLANTING_METHODS = ['Direct Seeding (Sabog Tanim)', 'Transplanting (Lipat Tanim)', 'Other'];
const WATER_SOURCES    = ['Rain-fed', 'Irrigation', 'Other'];
const WHY_NOT_PLANTED  = ['Received late', 'Bad weather', 'Pest infestation', 'Land preparation issues', 'Financial constraints', 'Other'];
const WHAT_WAS_DONE    = ['Sell the seeds', 'Store for next season', 'Return to DA', 'Donate', 'Other'];

function initFarmerYieldSurvey() {
  updateNavGreeting();
  let planted = true;

  function buildOptions(arr) {
    return arr.map(v => `<option value="${v}">${v}</option>`).join('');
  }

  function render() {
    const yesFields = document.getElementById('yes-fields');
    const noFields  = document.getElementById('no-fields');
    document.getElementById('yn-yes').classList.toggle('active', planted);
    document.getElementById('yn-no').classList.toggle('active', !planted);
    if (yesFields) yesFields.style.display = planted ? '' : 'none';
    if (noFields)  noFields.style.display  = planted ? 'none' : '';
  }

  document.getElementById('yn-yes')?.addEventListener('click', () => { planted = true;  render(); });
  document.getElementById('yn-no')?.addEventListener('click',  () => { planted = false; render(); });

  const methodSel = document.getElementById('planting-method');
  const waterSel  = document.getElementById('water-source');
  const whySel    = document.getElementById('why-not-planted');
  const whatSel   = document.getElementById('what-was-done');
  if (methodSel) methodSel.innerHTML = buildOptions(PLANTING_METHODS);
  if (waterSel)  waterSel.innerHTML  = buildOptions(WATER_SOURCES);
  if (whySel)    whySel.innerHTML    = buildOptions(WHY_NOT_PLANTED);
  if (whatSel)   whatSel.innerHTML   = buildOptions(WHAT_WAS_DONE);

  render();

  const kabanInput = document.getElementById('kaban-count');
  document.getElementById('kaban-minus')?.addEventListener('click', () => {
    const v = parseInt(kabanInput?.value || '0');
    if (kabanInput && v > 0) kabanInput.value = v - 1;
  });
  document.getElementById('kaban-plus')?.addEventListener('click', () => {
    const v = parseInt(kabanInput?.value || '0');
    if (kabanInput) kabanInput.value = v + 1;
  });

  document.getElementById('yield-next-btn')?.addEventListener('click', () => {
    const kabans = parseInt(document.getElementById('kaban-count')?.value || '0');
    const data = planted
      ? { planted: true,  kabans, method: methodSel?.value, water: waterSel?.value }
      : { planted: false, whyNot: whySel?.value, whatDone: whatSel?.value };
    localStorage.setItem(farmerKey('yield_survey'), JSON.stringify(data));
    window.location.href = 'farmer-survey-yield-summary.html';
  });
}

// ── FARMER YIELD SURVEY SUMMARY ────────────────────────────────────────────
function initFarmerYieldSummary() {
  updateNavGreeting();
  const data = JSON.parse(localStorage.getItem(farmerKey('yield_survey')) || '{}');
  const list = document.getElementById('yield-summary-list');
  if (list) {
    const rows = data.planted
      ? [
          ['Did you plant the last allocated seeds?', 'Yes'],
          ['How many kabans harvested?', `${data.kabans || 0} kabans`],
          ['Planting method', data.method || '—'],
          ['Water source', data.water || '—']
        ]
      : [
          ['Did you plant the last allocated seeds?', 'No'],
          ['Why were the seeds not planted?', data.whyNot || '—'],
          ['What was done with the unplanted seeds?', data.whatDone || '—']
        ];
    list.innerHTML = rows.map(([q, a]) => `
      <div class="yield-summary-row">
        <div class="yield-summary-q">${q}</div>
        <div class="yield-summary-a">${a}</div>
      </div>`).join('');
  }
  document.getElementById('back-btn')?.addEventListener('click', () => { window.location.href = 'farmer-survey-yield.html'; });
  document.getElementById('confirm-btn')?.addEventListener('click', () => {
    localStorage.setItem(farmerKey('yield_submitted'), 'true');
    window.location.href = 'seedselect-inbred.html';
  });
}

// ── FARMER QR SCAN ─────────────────────────────────────────────────────────
function initFarmerQRScan() {
  updateNavGreeting();
  const params  = new URLSearchParams(window.location.search);
  const orderId = params.get('id');
  document.getElementById('qr-next-btn')?.addEventListener('click', () => {
    if (orderId) {
      const dynamic = JSON.parse(localStorage.getItem(farmerKey('orders')) || '[]');
      const idx = dynamic.findIndex(o => o.id === orderId);
      if (idx !== -1) {
        dynamic[idx].status = 'delivered';
        localStorage.setItem(farmerKey('orders'), JSON.stringify(dynamic));
      } else {
        const overrides = JSON.parse(localStorage.getItem('ezseed_order_statuses') || '{}');
        overrides[orderId] = 'delivered';
        localStorage.setItem('ezseed_order_statuses', JSON.stringify(overrides));
      }
    }
    window.location.href = `satisfaction.html?id=${orderId || ''}`;
  });
}

// ── DA HOME ────────────────────────────────────────────────────────────────
function initDAHome() {
  updateNavGreeting();
  const pending = KNOWN_FARMERS.filter(f => localStorage.getItem(`ezseed_${f}_reg_status`) === 'pending').length;
  const badge = document.getElementById('reg-pending-badge');
  if (badge && pending > 0) {
    badge.textContent = pending;
    badge.style.display = '';
  }
}

// ── DA REGISTRATIONS LIST ──────────────────────────────────────────────────
function initDARegistrations() {
  updateNavGreeting();
  const list = document.getElementById('reg-list');
  if (!list) return;

  const REG_LABEL = { pending: 'Pending', approved: 'Approved', rejected: 'Rejected' };
  const REG_CLASS = { pending: 'status-pending', approved: 'status-allocated', rejected: 'status-germination' };

  const rows = KNOWN_FARMERS.map(farmer => {
    const status = localStorage.getItem(`ezseed_${farmer}_reg_status`);
    const data   = JSON.parse(localStorage.getItem(`ezseed_${farmer}_registration`) || 'null');
    return { farmer, status, data };
  }).filter(r => r.status);

  if (rows.length === 0) {
    list.innerHTML = '<p style="text-align:center; color:#888; margin-top:2rem;">No registration applications yet.</p>';
    return;
  }

  list.innerHTML = rows.map(({ farmer, status, data }) => `
    <div class="request-row">
      <span class="request-season">${data ? data.name : farmer} <span style="font-weight:400;font-size:0.82rem;">(${farmer})</span></span>
      <span class="${REG_CLASS[status]}">${REG_LABEL[status]}</span>
      <a href="da-registrationdetail.html?farmer=${farmer}" class="btn-details">Review</a>
    </div>`).join('');
}

// ── DA REGISTRATION DETAIL ─────────────────────────────────────────────────
function initDARegistrationDetail() {
  updateNavGreeting();
  const params  = new URLSearchParams(window.location.search);
  const farmer  = params.get('farmer') || 'FarmerA';
  const data    = JSON.parse(localStorage.getItem(`ezseed_${farmer}_registration`) || 'null');
  const status  = localStorage.getItem(`ezseed_${farmer}_reg_status`) || 'pending';

  const bodyEl = document.getElementById('reg-detail-body');
  if (bodyEl && data) {
    const REG_LABEL = { pending: 'Pending Review', approved: 'Approved', rejected: 'Rejected' };
    bodyEl.innerHTML = `
      <div class="da-order-info">
        <div class="da-order-info-row"><span class="da-order-info-label">Farmer ID</span><span class="da-order-info-value">${farmer}</span></div>
        <div class="da-order-info-row"><span class="da-order-info-label">Full Name</span><span class="da-order-info-value">${data.name}</span></div>
        <div class="da-order-info-row"><span class="da-order-info-label">Location</span><span class="da-order-info-value">${data.location}</span></div>
        <div class="da-order-info-row"><span class="da-order-info-label">Contact</span><span class="da-order-info-value">${data.contact}</span></div>
        <div class="da-order-info-row"><span class="da-order-info-label">Farm Size</span><span class="da-order-info-value">${data.hectares}</span></div>
        <div class="da-order-info-row"><span class="da-order-info-label">Status</span><span class="da-order-info-value">${REG_LABEL[status] || status}</span></div>
      </div>`;
  }

  const actionEl = document.getElementById('reg-action-area');
  if (!actionEl) return;

  if (status !== 'pending') {
    const msg = status === 'approved' ? 'This application has been approved.' : 'This application has been rejected.';
    actionEl.innerHTML = `<p style="text-align:center; margin-top:1.5rem; color:#888;">${msg}</p>`;
    return;
  }

  actionEl.innerHTML = `
    <div class="btn-row-v2" style="margin-top:1.5rem;">
      <button id="approve-btn" class="btn btn-primary">Approve</button>
      <button id="reject-btn"  class="btn btn-danger">Reject</button>
    </div>`;

  document.getElementById('approve-btn')?.addEventListener('click', () => {
    localStorage.setItem(`ezseed_${farmer}_reg_status`, 'approved');
    localStorage.setItem(`ezseed_${farmer}_verified`, 'true');
    window.location.href = 'da-registrations.html';
  });

  const rejectModal = document.getElementById('reject-modal');
  document.getElementById('reject-btn')?.addEventListener('click', () => rejectModal?.classList.add('open'));
  document.getElementById('reject-modal-close')?.addEventListener('click', () => rejectModal?.classList.remove('open'));

  document.getElementById('reject-others-check')?.addEventListener('change', e => {
    const ta = document.getElementById('reject-others-text');
    if (ta) ta.style.display = e.target.checked ? 'block' : 'none';
  });

  document.getElementById('confirm-reject-btn')?.addEventListener('click', () => {
    const reasons = [];
    document.querySelectorAll('.reject-reasons input[type="checkbox"]:not(#reject-others-check)').forEach(cb => {
      if (cb.checked) reasons.push(cb.value);
    });
    const othersCheck = document.getElementById('reject-others-check');
    const othersText  = document.getElementById('reject-others-text');
    if (othersCheck?.checked && othersText?.value.trim()) reasons.push(othersText.value.trim());
    localStorage.setItem(`ezseed_${farmer}_reg_status`, 'rejected');
    localStorage.setItem(`ezseed_${farmer}_reg_rejection`, JSON.stringify(reasons));
    localStorage.removeItem(`ezseed_${farmer}_verified`);
    window.location.href = 'da-registrations.html';
  });
}

// ── DA SURVEY ──────────────────────────────────────────────────────────────
const CHART_COLORS_OLIVE = ['#3B4A0A','#6b8a1f','#9ab84a','#c5d68a','#dde8b0'];
const CHART_COLORS_BLUE  = ['#1565c0','#42a5f5','#90caf9'];
const CHART_COLORS_MIXED = ['#3B4A0A','#1565c0','#6b8a1f','#42a5f5','#9ab84a','#90caf9','#c5d68a','#ffb74d'];

function makePieChart(canvasId, labels, data, colors) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;
  const hasData = data.some(v => v > 0);
  if (!hasData) {
    const empty = document.createElement('p');
    empty.className = 'da-chart-empty';
    empty.textContent = 'No responses yet.';
    ctx.parentElement.appendChild(empty);
    ctx.style.display = 'none';
    return;
  }
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{ data, backgroundColor: colors, borderWidth: 2, borderColor: '#fff' }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom', labels: { font: { size: 10 }, boxWidth: 12, padding: 8 } }
      }
    }
  });
}

function initDASurvey() {
  updateNavGreeting();
  const { inbred: inbredVotes, hybrid: hybridVotes, pairs: pairVotes } = getSurveyVotesDetailed();
  const INBRED_SEEDS = SEEDS.filter(s => s.type === 'Inbred');
  const HYBRID_SEEDS = SEEDS.filter(s => s.type === 'Hybrid');

  function shortName(seed) {
    return seed.name.replace(/.*\(/, '').replace(')', '');
  }

  makePieChart(
    'chart-inbred',
    INBRED_SEEDS.map(shortName),
    INBRED_SEEDS.map(s => inbredVotes[s.id] || 0),
    CHART_COLORS_OLIVE
  );

  makePieChart(
    'chart-hybrid',
    HYBRID_SEEDS.map(shortName),
    HYBRID_SEEDS.map(s => hybridVotes[s.id] || 0),
    CHART_COLORS_BLUE
  );

  const pairEntries = Object.entries(pairVotes);
  if (pairEntries.length > 0) {
    const pairLabels = pairEntries.map(([key]) => {
      const [i, h] = key.split('||');
      const si = getSeed(i), sh = getSeed(h);
      return `${si ? shortName(si) : i} + ${sh ? shortName(sh) : h}`;
    });
    makePieChart('chart-pair', pairLabels, pairEntries.map(([, v]) => v), CHART_COLORS_MIXED);
  } else {
    makePieChart('chart-pair', [], [], []);
  }

  // Board recommendations
  const recs = getRecommendations();
  const allRecIds = [...new Set([...recs.mao, ...recs.pao, ...recs.board])];
  const recEl = document.getElementById('board-recs');
  if (recEl) {
    if (allRecIds.length === 0) {
      recEl.innerHTML = '<p style="color:#888;">No board recommendations set yet.</p>';
    } else {
      recEl.innerHTML = allRecIds.map(id => {
        const seed = getSeed(id); if (!seed) return '';
        return `<div class="da-survey-row">
          <div class="da-survey-row-left">
            <span class="sum-row-name">${seed.name}</span>
            <span class="badge badge-filled">${seed.type}</span>
            ${buildStars(seed)}
          </div>
        </div>`;
      }).join('');
    }
  }

  document.getElementById('allocate-btn')?.addEventListener('click', () => {
    window.location.href = 'da-selectvarieties.html';
  });
}

// ── DA SELECT VARIETIES ────────────────────────────────────────────────────
const DA_MAX = 5;
let daSelected = [];

function initDASelectVarieties() {
  updateNavGreeting();
  const saved = JSON.parse(localStorage.getItem('ezseed_da_allocated_seeds') || '[]');

  if (saved.length > 0) {
    // Summary mode: already allocated
    const formEl = document.getElementById('da-variety-form');
    if (formEl) formEl.style.display = 'none';
    const summaryEl = document.getElementById('da-variety-summary');
    if (summaryEl) {
      summaryEl.style.display = '';
      const list = document.getElementById('da-variety-summary-list');
      if (list) {
        list.innerHTML = saved.map(id => {
          const seed = getSeed(id); if (!seed) return '';
          return `
            <div class="sum-row">
              <div class="sum-row-left">
                <span class="sum-row-name">${seed.name}</span>
                <span class="badge badge-filled">${seed.type}</span>
                ${buildStars(seed)}
              </div>
            </div>`;
        }).join('');
      }
    }
    document.getElementById('da-change-alloc-btn')?.addEventListener('click', () => {
      localStorage.removeItem('ezseed_da_allocated_seeds');
      window.location.reload();
    });
    return;
  }

  // Selection mode
  daSelected = [];
  injectDynamicStars();
  document.querySelectorAll('.da-variety-row[data-seed-id]').forEach(row => {
    row.addEventListener('click', () => {
      const id = row.dataset.seedId;
      const idx = daSelected.indexOf(id);
      if (idx !== -1) {
        daSelected.splice(idx, 1);
      } else {
        if (daSelected.length >= DA_MAX) return;
        daSelected.push(id);
      }
      refreshDAVarietyUI();
    });
  });

  refreshDAVarietyUI();

  document.getElementById('da-confirm-btn')?.addEventListener('click', () => {
    if (daSelected.length === 0) return;
    localStorage.setItem('ezseed_da_allocated_seeds', JSON.stringify(daSelected));
    window.location.href = 'da-varietiesset.html';
  });
}

function refreshDAVarietyUI() {
  document.querySelectorAll('.da-variety-row[data-seed-id]').forEach(row => {
    const sel = daSelected.includes(row.dataset.seedId);
    row.classList.toggle('selected', sel);
    const chk = row.querySelector('.da-variety-check');
    if (chk) chk.textContent = sel ? '✓' : '';
  });
  const pill = document.getElementById('da-selected-count');
  if (pill) pill.textContent = `${daSelected.length} of ${DA_MAX} selected`;
  const btn = document.getElementById('da-confirm-btn');
  if (btn) btn.disabled = daSelected.length === 0;
}

// ── DA TRACK REQUESTS ──────────────────────────────────────────────────────
function initDATrackRequests() {
  updateNavGreeting();
  let allOrders = getAllFarmerOrders();
  let statusFilter = 'all';
  let seasonFilter = 'all';
  const list = document.getElementById('da-orders-list');

  function getSeasons() {
    return [...new Set(allOrders.map(o => o.season))];
  }

  function populateSeasonFilter() {
    const sel = document.getElementById('da-season-filter');
    if (!sel) return;
    getSeasons().forEach(s => {
      const opt = document.createElement('option');
      opt.value = s; opt.textContent = s;
      sel.appendChild(opt);
    });
    sel.addEventListener('change', () => { seasonFilter = sel.value; renderDAOrders(); });
  }


  function renderDAOrders() {
    let filtered = allOrders;
    if (statusFilter !== 'all') filtered = filtered.filter(o => o.status === statusFilter);
    if (seasonFilter !== 'all') filtered = filtered.filter(o => o.season === seasonFilter);
    if (!list) return;
    if (filtered.length === 0) {
      list.innerHTML = '<p style="text-align:center; color:#888; margin-top:1rem;">No orders match the filter.</p>';
      return;
    }
    list.innerHTML = filtered.map(o => `
      <div class="request-row">
        <span class="request-season">${o.farmer} — ${o.season}</span>
        <span class="${STATUS_CLASS[o.status]}">${STATUS_LABELS[o.status]}</span>
        <a href="da-orderdetail.html?farmer=${o.farmer}&id=${o.id}" class="btn-details">See Details</a>
      </div>`).join('');
  }

  populateSeasonFilter();
  renderDAOrders();

  document.getElementById('da-status-filter')?.addEventListener('change', e => {
    statusFilter = e.target.value;
    renderDAOrders();
  });
}

// ── DA ORDER DETAIL ────────────────────────────────────────────────────────
function initDAOrderDetail() {
  updateNavGreeting();
  const params = new URLSearchParams(window.location.search);
  const farmer  = params.get('farmer') || 'FarmerA';
  const orderId = params.get('id');
  const order   = getAllFarmerOrders().find(o => o.farmer === farmer && o.id === orderId);
  if (!order) return;

  const seasonEl = document.getElementById('detail-season');
  if (seasonEl) seasonEl.textContent = order.season;

  // Farmer info fields
  const parts = order.season.split(' ');
  const year = parts[0] || '';
  const seasonName = parts.slice(1).join(' ') || order.season;

  const profile = FARMER_PROFILES[farmer] || {};
  const infoFarmer = document.getElementById('info-farmer');
  if (infoFarmer) infoFarmer.textContent = profile.name || farmer;
  const infoLocation = document.getElementById('info-location');
  if (infoLocation) infoLocation.textContent = profile.location || '—';
  const infoSeason = document.getElementById('info-season');
  if (infoSeason) infoSeason.textContent = seasonName;
  const infoYear = document.getElementById('info-year');
  if (infoYear) infoYear.textContent = year;

  const list = document.getElementById('detail-list');
  if (list) {
    list.innerHTML = order.seeds.map(({ id, sacks }) => {
      const seed = getSeed(id); if (!seed) return '';
      return `
        <div class="sum-row">
          <div class="sum-row-left">
            <span class="sum-row-name">${seed.name}</span>
            <span class="badge badge-filled">${seed.type}</span>
          </div>
          <span class="sack-pill-dark">${sacks} sacks</span>
        </div>`;
    }).join('');
  }

  const statusEl = document.getElementById('detail-status');
  if (statusEl) statusEl.innerHTML = `<span class="${STATUS_CLASS[order.status]}">${STATUS_LABELS[order.status]}</span>`;

  const updateBtn = document.getElementById('da-update-status-btn');
  if (updateBtn) {
    const nextStatus = STATUS_NEXT[order.status];
    if (!nextStatus) {
      updateBtn.style.display = 'none';
    } else {
      updateBtn.textContent = `Mark as: ${STATUS_LABELS[nextStatus]}`;
      updateBtn.addEventListener('click', () => {
        setOrderStatus(farmer, orderId, nextStatus);
        window.location.href = `da-orderdetail.html?farmer=${farmer}&id=${orderId}`;
      });
    }
  }
}

// ── DA VIEW PROFILE ────────────────────────────────────────────────────────
function initDAViewProfile() {
  updateNavGreeting();
}

// ── BOARD HOME ─────────────────────────────────────────────────────────────
function initBoardHome() {
  updateNavGreeting();
  if (localStorage.getItem('ezseed_board_submitted') === 'true') {
    const card = document.querySelector('.bento-card-v2[data-card="board-recs"]');
    if (card) card.href = 'board-view.html';
  }
}

// ── BOARD SELECTION SHARED HELPER ──────────────────────────────────────────
function initBoardSelectionPage(storageKey, nextHref) {
  updateNavGreeting();
  if (localStorage.getItem('ezseed_board_submitted') === 'true') {
    window.location.href = 'board-view.html'; return;
  }
  initModal();
  let sel = JSON.parse(localStorage.getItem(storageKey) || '[]');

  function refresh() {
    document.querySelectorAll('.seed-row[data-seed-id]').forEach(row => {
      const id = row.dataset.seedId;
      const isSelected = sel.includes(id);
      row.classList.toggle('selected', isSelected);
      const star = row.querySelector('.board-sel-star');
      if (star) star.style.visibility = isSelected ? 'visible' : 'hidden';
    });
  }

  document.querySelectorAll('.seed-row[data-seed-id]').forEach(row => {
    row.addEventListener('click', e => {
      if (e.target.closest('.info-btn-v2')) return;
      const id = row.dataset.seedId;
      const idx = sel.indexOf(id);
      if (idx !== -1) { sel.splice(idx, 1); } else { sel.push(id); }
      refresh();
    });
  });
  refresh();

  document.getElementById('next-btn')?.addEventListener('click', () => {
    localStorage.setItem(storageKey, JSON.stringify(sel));
    window.location.href = nextHref;
  });
}

// ── BOARD MAO PAGE ─────────────────────────────────────────────────────────
function initBoardMAO() {
  initBoardSelectionPage('ezseed_board_mao', 'board-pao.html');
}

// ── BOARD PAO PAGE ─────────────────────────────────────────────────────────
function initBoardPAO() {
  initBoardSelectionPage('ezseed_board_pao', 'board-board.html');
}

// ── BOARD BOARD PAGE ───────────────────────────────────────────────────────
function initBoardBoard() {
  initBoardSelectionPage('ezseed_board_board', 'board-summary.html');
}

// ── BOARD SUMMARY (confirm flow) ───────────────────────────────────────────
function initBoardSummary() {
  updateNavGreeting();
  initModal();
  const sels = getCurrentSelections();
  const allIds = [...new Set([...sels.mao, ...sels.pao, ...sels.board])];
  renderBoardSummaryList(allIds, sels);
  document.getElementById('confirm-btn')?.addEventListener('click', () => {
    localStorage.setItem('ezseed_board_submitted', 'true');
    window.location.href = 'board-confirmed.html';
  });
  document.getElementById('back-btn')?.addEventListener('click', () => {
    window.location.href = 'board-board.html';
  });
}

// ── BOARD VIEW (read-only after submission) ────────────────────────────────
function initBoardView() {
  updateNavGreeting();
  initModal();
  const recs = getRecommendations();
  const allIds = [...new Set([...recs.mao, ...recs.pao, ...recs.board])];
  renderBoardSummaryList(allIds, recs);
}

function renderBoardSummaryList(ids, recs) {
  const list = document.getElementById('board-summary-list');
  if (!list) return;
  const r = recs || getRecommendations();
  list.innerHTML = ids.map(id => {
    const seed = getSeed(id);
    if (!seed) return '';
    const stars = [];
    if (r.mao.includes(id))   stars.push('<span class="star star-mao">★</span>');
    if (r.pao.includes(id))   stars.push('<span class="star star-pao">★</span>');
    if (r.board.includes(id)) stars.push('<span class="star star-board">★</span>');
    return `
      <div class="sum-row">
        <div class="sum-row-left">
          <span class="sum-row-name">${seed.name}</span>
          <span class="badge badge-filled">${seed.type}</span>
          ${stars.join('')}
        </div>
        <button class="info-btn-v2" data-seed-id="${id}">i</button>
      </div>`;
  }).join('');
  list.querySelectorAll('.info-btn-v2[data-seed-id]').forEach(btn => {
    btn.addEventListener('click', e => { e.stopPropagation(); openModal(btn.dataset.seedId); });
  });
}

// ── BOARD VIEW PROFILE ─────────────────────────────────────────────────────
function initBoardViewProfile() {
  updateNavGreeting();
}

// ── LEGACY (old pages backward compat) ────────────────────────────────────
function initDropdowns() {
  document.querySelectorAll('.dropdown-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card   = btn.closest('.seed-card');
      const panel  = card.nextElementSibling;
      const isOpen = panel.classList.contains('open');
      document.querySelectorAll('.seed-dropdown.open').forEach(p => p.classList.remove('open'));
      document.querySelectorAll('.seed-card.dropdown-open').forEach(c => c.classList.remove('dropdown-open'));
      document.querySelectorAll('.dropdown-btn.open').forEach(b => b.classList.remove('open'));
      if (!isOpen) { panel.classList.add('open'); card.classList.add('dropdown-open'); btn.classList.add('open'); }
    });
  });
}

let ranked = [];
function initSeedSelection() {
  const btn = document.getElementById('add-btn');
  document.querySelectorAll('.seed-card[data-seed-id]').forEach(card => {
    card.addEventListener('click', () => {
      const id   = card.dataset.seedId;
      const seed = getSeed(id);
      const idx  = ranked.indexOf(id);
      if (idx !== -1) { ranked.splice(idx, 1); }
      else {
        if (ranked.length >= 3) return;
        if (seed && seed.type === 'Hybrid' && ranked.some(sid => { const s = getSeed(sid); return s && s.type === 'Hybrid'; })) {
          alert('You may select at most one hybrid variety.'); return;
        }
        ranked.push(id);
      }
      refreshSelectionUI();
    });
  });
  refreshSelectionUI();
  btn?.addEventListener('click', () => {
    if (ranked.length === 3) { localStorage.setItem('ezseed_selection', JSON.stringify(ranked)); window.location.href = 'requestsummary.html'; }
  });
}

function refreshSelectionUI() {
  document.querySelectorAll('.seed-card[data-seed-id]').forEach(card => {
    const id = card.dataset.seedId; const idx = ranked.indexOf(id);
    const rankEl = card.querySelector('.seed-card-rank');
    if (idx !== -1) { card.classList.add('selected'); if (rankEl) rankEl.textContent = (idx + 1) + '.'; }
    else { card.classList.remove('selected'); if (rankEl) rankEl.textContent = ''; }
  });
  const btn = document.getElementById('add-btn');
  if (btn) btn.disabled = ranked.length !== 3;
}

let summaryIds = [];
function renderSummary() {
  const list = document.getElementById('summary-list');
  if (!list) return;
  list.innerHTML = summaryIds.map((id, i) => {
    const seed = getSeed(id); if (!seed) return '';
    return `<div class="summary-card">
      <div class="reorder-btns">
        <button class="reorder-btn" data-idx="${i}" data-dir="-1" ${i === 0 ? 'disabled' : ''}>&#9650;</button>
        <button class="reorder-btn" data-idx="${i}" data-dir="1" ${i === summaryIds.length-1 ? 'disabled' : ''}>&#9660;</button>
      </div>
      <span class="summary-num">${i+1}.</span>
      <span class="summary-name">${seed.name}</span>
      <div class="seed-card-badges">${buildBadges(seed)}</div>
    </div>`;
  }).join('');
  list.querySelectorAll('.reorder-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx); const newIdx = idx + parseInt(btn.dataset.dir);
      if (newIdx < 0 || newIdx >= summaryIds.length) return;
      [summaryIds[idx], summaryIds[newIdx]] = [summaryIds[newIdx], summaryIds[idx]];
      localStorage.setItem('ezseed_selection', JSON.stringify(summaryIds)); renderSummary();
    });
  });
}
function initRequestSummary() {
  summaryIds = JSON.parse(localStorage.getItem('ezseed_selection') || '["rc222","rc72h","rc204h"]');
  renderSummary();
}

function initSeedDetail() {
  const params = new URLSearchParams(window.location.search);
  const seed   = getSeed(params.get('id') || 'rc222');
  if (!seed) return;
  const el = id => document.getElementById(id);
  if (el('detail-title'))  el('detail-title').textContent = seed.name;
  if (el('detail-desc'))   el('detail-desc').textContent  = seed.fullDesc;
  if (el('detail-badges')) el('detail-badges').innerHTML  = buildBadges(seed);
}

function initRequestDetail() {
  const params = new URLSearchParams(window.location.search);
  const req    = DEFAULT_ORDERS.find(r => r.id === (params.get('id') || 'ws2026'));
  if (!req) return;
  const el = id => document.getElementById(id);
  if (el('wsreq-season')) el('wsreq-season').textContent = req.season;
  if (el('wsreq-list')) {
    el('wsreq-list').innerHTML = req.seeds.map((item, i) => {
      const seed = getSeed(item.id || item); if (!seed) return '';
      return `<div class="summary-card"><span class="summary-num">${i+1}.</span><span class="summary-name">${seed.name}</span><div class="seed-card-badges">${buildBadges(seed)}</div></div>`;
    }).join('');
  }
  if (el('wsreq-status')) {
    el('wsreq-status').innerHTML = `<span class="${STATUS_CLASS[req.status]}">${STATUS_LABELS[req.status]}</span>`;
  }
}

function initSeedFilter() {
  const saved = localStorage.getItem('ezseed_filters');
  if (saved) JSON.parse(saved).forEach(f => activeFilters.add(f));
  updateLegacyFilterChips(); applyLegacyFilters();
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const f = chip.dataset.filter;
      if (f === 'all') { activeFilters.clear(); } else { activeFilters.has(f) ? activeFilters.delete(f) : activeFilters.add(f); }
      localStorage.setItem('ezseed_filters', JSON.stringify([...activeFilters]));
      updateLegacyFilterChips(); applyLegacyFilters();
    });
  });
}
function updateLegacyFilterChips() {
  document.querySelectorAll('.filter-chip').forEach(chip => {
    const f = chip.dataset.filter;
    chip.classList.toggle('active', f === 'all' ? activeFilters.size === 0 : activeFilters.has(f));
  });
}
function applyLegacyFilters() {
  document.querySelectorAll('.seed-card-wrapper').forEach(wrapper => {
    if (activeFilters.size === 0) { wrapper.style.display = ''; return; }
    let show = true;
    if (activeFilters.has('inbred') && wrapper.dataset.type  !== 'inbred') show = false;
    if (activeFilters.has('hybrid') && wrapper.dataset.type  !== 'hybrid') show = false;
    if (activeFilters.has('mao')    && wrapper.dataset.mao   !== 'true')   show = false;
    if (activeFilters.has('pao')    && wrapper.dataset.pao   !== 'true')   show = false;
    if (activeFilters.has('board')  && wrapper.dataset.board !== 'true')   show = false;
    wrapper.style.display = show ? '' : 'none';
  });
}

// ── AUTO-INIT ──────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  if (page === 'login')          initLogin();
  if (page === 'farmer-home')    initFarmerHome();
  if (page === 'survey-inbred')  initSurveyInbred();
  if (page === 'survey-hybrid')  initSurveyHybrid();
  if (page === 'survey-summary') initSurveySummary();
  if (page === 'survey-view')    initSurveyView();
  if (page === 'seed-order')     initSeedOrder();
  if (page === 'order-summary')  initOrderSummary();
  if (page === 'track-orders')   initTrackOrders();
  if (page === 'order-detail')   initOrderDetail();
  if (page === 'satisfaction')   { initSatisfaction(); }
  if (page === 'farmer-profile')       initFarmerProfile();
  if (page === 'farmer-register')      initFarmerRegister();
  if (page === 'farmer-yield-survey')  initFarmerYieldSurvey();
  if (page === 'farmer-yield-summary') initFarmerYieldSummary();
  if (page === 'farmer-qr-scan')       initFarmerQRScan();
  // DA pages
  if (page === 'da-home')                initDAHome();
  if (page === 'da-survey')              initDASurvey();
  if (page === 'da-selectvarieties')     initDASelectVarieties();
  if (page === 'da-trackrequests')       initDATrackRequests();
  if (page === 'da-orderdetail')         initDAOrderDetail();
  if (page === 'da-viewprofile')         initDAViewProfile();
  if (page === 'da-registrations')       initDARegistrations();
  if (page === 'da-registrationdetail')  initDARegistrationDetail();
  // Board pages
  if (page === 'board-home')         initBoardHome();
  if (page === 'board-mao')          initBoardMAO();
  if (page === 'board-pao')          initBoardPAO();
  if (page === 'board-board')        initBoardBoard();
  if (page === 'board-summary')      initBoardSummary();
  if (page === 'board-view')         initBoardView();
  if (page === 'board-viewprofile')  initBoardViewProfile();
  // Legacy pages
  if (page === 'seedselect')     { initDropdowns(); initSeedFilter(); }
  if (page === 'seedselect2')    { initSeedFilter(); initSeedSelection(); }
  if (page === 'requestsummary') initRequestSummary();
  if (page === 'seeddetail')     initSeedDetail();
  if (page === 'wsreq')          initRequestDetail();
});
