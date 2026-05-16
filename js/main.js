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

// ── DEFAULT ORDERS (hardcoded, shown only for FarmerA) ────────────────────
const DEFAULT_ORDERS = [
  {
    id: 'ds2026', season: '2026 Dry Season', status: 'received',
    seeds: [{ id: 'rc216', sacks: 10 }, { id: 'rc72h', sacks: 5 }, { id: 'rc204h', sacks: 5 }]
  },
  {
    id: 'ws2026', season: '2026 Wet Season', status: 'pickup',
    seeds: [{ id: 'rc216', sacks: 10 }, { id: 'rc72h', sacks: 5 }, { id: 'rc204h', sacks: 5 }]
  }
];

const STATUS_LABELS = {
  pending:     'Request Pending',
  germination: 'Under Germination Test',
  pickup:      'For Pick-Up',
  received:    'Order Received'
};
const STATUS_CLASS = {
  pending:     'status-pending',
  germination: 'status-germination',
  pickup:      'status-pickup',
  received:    'status-allocated'
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

const STATUS_NEXT = { pending: 'germination', germination: 'pickup' };

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

function buildStars(seed) {
  const s = [];
  if (seed.mao)   s.push('<span class="star star-mao">★</span>');
  if (seed.pao)   s.push('<span class="star star-pao">★</span>');
  if (seed.board) s.push('<span class="star star-board">★</span>');
  return s.join('');
}

function buildBadges(seed) {
  const p = [`<span class="badge badge-filled">${seed.type}</span>`];
  if (seed.mao)   p.push('<span class="badge badge-outline">MAO Recommended</span>');
  if (seed.pao)   p.push('<span class="badge badge-outline">PAO Recommended</span>');
  if (seed.board) p.push('<span class="badge badge-outline">Board Recommended</span>');
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

  // If survey already submitted, redirect Request Seeds card to read-only view
  if (localStorage.getItem(farmerKey('survey_submitted')) === 'true') {
    const reqCard = document.querySelector('.bento-card-v2[data-card="request-seeds"]');
    if (reqCard) reqCard.href = 'survey-view.html';
  }

  // Check remaining allotment from dynamic (non-received) orders only
  const dynamicOrders = JSON.parse(localStorage.getItem(farmerKey('orders')) || '[]');
  const usedSacks = dynamicOrders
    .filter(o => o.status !== 'received')
    .reduce((total, o) => total + o.seeds.reduce((sum, s) => sum + s.sacks, 0), 0);

  if (usedSacks >= ALLOTTED_SACKS) {
    const orderCard = document.querySelector('.bento-card-v2[data-card="order-seeds"]');
    if (orderCard) {
      orderCard.classList.add('disabled');
      orderCard.removeAttribute('href');
    }
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
  document.querySelectorAll('.seed-row[data-seed-id]').forEach(row => {
    const seed = getSeed(row.dataset.seedId);
    if (!seed) return;
    if (activeFilters.size === 0) { row.style.display = ''; return; }
    let show = true;
    if (activeFilters.has('mao')   && !seed.mao)   show = false;
    if (activeFilters.has('pao')   && !seed.pao)   show = false;
    if (activeFilters.has('board') && !seed.board) show = false;
    row.style.display = show ? '' : 'none';
  });
}

// ── SURVEY: INBRED SELECTION (single-select) ───────────────────────────────
let surveyInbred = '';

function initSurveyInbred() {
  updateNavGreeting();
  initSeedFilterV2();
  initModal();
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
}

// ── SEED ORDER ─────────────────────────────────────────────────────────────
const ALLOTTED_SACKS = 20;
let orderQty = {};

function initSeedOrder() {
  updateNavGreeting();
  initModal();
  // Hide seeds not in DA allocation (if allocation is set)
  const allocated = JSON.parse(localStorage.getItem('ezseed_da_allocated_seeds') || 'null');
  if (allocated) {
    document.querySelectorAll('.seed-order-row[data-seed-id]').forEach(row => {
      if (!allocated.includes(row.dataset.seedId)) row.style.display = 'none';
    });
  }
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
  }

  const statusEl = document.getElementById('detail-status');
  if (statusEl) statusEl.innerHTML = `<span class="${STATUS_CLASS[order.status]}">${STATUS_LABELS[order.status]}</span>`;

  const receiveBtn = document.getElementById('receive-btn');
  if (receiveBtn) {
    receiveBtn.style.display = order.status === 'pickup' ? 'inline-block' : 'none';
    receiveBtn.addEventListener('click', () => {
      // Update status for dynamic orders only
      const dynamic = JSON.parse(localStorage.getItem(farmerKey('orders')) || '[]');
      const idx = dynamic.findIndex(o => o.id === order.id);
      if (idx !== -1) {
        dynamic[idx].status = 'received';
        localStorage.setItem(farmerKey('orders'), JSON.stringify(dynamic));
      }
      window.location.href = `satisfaction.html?id=${order.id}`;
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
function initFarmerProfile() {
  updateNavGreeting();
  const checkbox    = document.getElementById('verified-checkbox');
  const registerBtn = document.getElementById('register-btn');
  const statusText  = document.getElementById('verified-status');

  function updateStatus(v) {
    if (statusText) statusText.textContent = v ? 'Verified' : 'Unverified';
    if (checkbox)   checkbox.checked = v;
  }

  updateStatus(localStorage.getItem(farmerKey('verified')) === 'true');

  checkbox?.addEventListener('change', () => {
    localStorage.setItem(farmerKey('verified'), checkbox.checked ? 'true' : 'false');
    updateStatus(checkbox.checked);
  });

  registerBtn?.addEventListener('click', () => {
    const next = localStorage.getItem(farmerKey('verified')) !== 'true';
    localStorage.setItem(farmerKey('verified'), next ? 'true' : 'false');
    updateStatus(next);
  });

  document.getElementById('reset-my-data-btn')?.addEventListener('click', () => {
    if (confirm(`Reset all data for ${currentUser()}? This cannot be undone.`)) {
      resetFarmerData();
      updateStatus(false);
    }
  });
}

// ── DA HOME ────────────────────────────────────────────────────────────────
function initDAHome() {
  updateNavGreeting();
}

// ── DA SURVEY ──────────────────────────────────────────────────────────────
function initDASurvey() {
  updateNavGreeting();
  const votes = getSurveyVotes();
  const totalVoters = KNOWN_FARMERS.filter(f => localStorage.getItem(`ezseed_${f}_survey_submitted`) === 'true').length;

  let typeFilter = 'all';
  const list = document.getElementById('da-survey-list');

  function renderSurveyList() {
    const sorted = SEEDS
      .filter(s => typeFilter === 'all' || s.type.toLowerCase() === typeFilter)
      .sort((a, b) => (votes[b.id] || 0) - (votes[a.id] || 0));

    if (list) {
      list.innerHTML = sorted.map(seed => {
        const v = votes[seed.id] || 0;
        const pct = totalVoters > 0 ? Math.round((v / totalVoters) * 100) : 0;
        return `
          <div class="da-survey-row">
            <div class="da-survey-row-left">
              <span class="sum-row-name">${seed.name}</span>
              <span class="badge badge-filled">${seed.type}</span>
              ${buildStars(seed)}
            </div>
            <div class="da-vote-wrap">
              <div class="da-vote-bar" style="width:${pct}%"></div>
              <span class="da-vote-count">${v} vote${v !== 1 ? 's' : ''}</span>
            </div>
          </div>`;
      }).join('') || '<p style="color:#888; text-align:center;">No survey responses yet.</p>';
    }
  }

  renderSurveyList();

  document.querySelectorAll('.da-type-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      typeFilter = chip.dataset.type;
      document.querySelectorAll('.da-type-chip').forEach(c => c.classList.toggle('active', c.dataset.type === typeFilter));
      renderSurveyList();
    });
  });

  // Board recommendations
  const boardInbred = JSON.parse(localStorage.getItem('ezseed_board_inbred') || 'null');
  const boardHybrid = JSON.parse(localStorage.getItem('ezseed_board_hybrid') || 'null');
  const recEl = document.getElementById('board-recs');
  if (recEl) {
    if (!boardInbred && !boardHybrid) {
      recEl.innerHTML = '<p style="color:#888;">No board recommendations set yet.</p>';
    } else {
      const ids = [...(boardInbred || []), ...(boardHybrid || [])];
      recEl.innerHTML = ids.map(id => {
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
  daSelected = [...saved];

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

  document.querySelectorAll('.da-status-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      statusFilter = chip.dataset.status;
      document.querySelectorAll('.da-status-chip').forEach(c => c.classList.toggle('active', c.dataset.status === statusFilter));
      renderDAOrders();
    });
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
  if (seasonEl) seasonEl.textContent = `${farmer} — ${order.season}`;

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
  if (page === 'farmer-profile') initFarmerProfile();
  // DA pages
  if (page === 'da-home')            initDAHome();
  if (page === 'da-survey')          initDASurvey();
  if (page === 'da-selectvarieties') initDASelectVarieties();
  if (page === 'da-trackrequests')   initDATrackRequests();
  if (page === 'da-orderdetail')     initDAOrderDetail();
  if (page === 'da-viewprofile')     initDAViewProfile();
  // Legacy pages
  if (page === 'seedselect')     { initDropdowns(); initSeedFilter(); }
  if (page === 'seedselect2')    { initSeedFilter(); initSeedSelection(); }
  if (page === 'requestsummary') initRequestSummary();
  if (page === 'seeddetail')     initSeedDetail();
  if (page === 'wsreq')          initRequestDetail();
});
