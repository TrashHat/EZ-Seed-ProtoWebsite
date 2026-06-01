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

// ── SEED VECTOR CACHE (loaded async from CSVs for VRS / closest-seed) ──────
let _seedVectors = null;
let _seedPrices  = null;

// ── KNOWN FARMERS ─────────────────────────────────────────────────────────
const BASE_FARMERS = ['FarmerA', 'FarmerB'];

function getKnownFarmers() {
  const regs = JSON.parse(localStorage.getItem('ezseed_pending_registrations') || '[]');
  const approved = regs.filter(r => r.status === 'approved').map(r => r.username);
  return [...BASE_FARMERS, ...approved];
}

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

// ── DEFAULT ORDERS (historical only — no active allocation hardcoded) ──────
const DEFAULT_ORDERS = [
  {
    id: 'ds2026', season: '2026 Dry Season', status: 'delivered',
    seeds: [{ id: 'rc216', sacks: 20 }]
  }
];

// ── FEEDBACK REASON LABELS ─────────────────────────────────────────────────
const FEEDBACK_REASONS = {
  wrong_variety: 'Wrong seed variety',
  not_suitable:  'Not suitable for my land',
  prefer_pick:   'Prefer my survey pick',
  other:         'Other'
};

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
  getKnownFarmers().forEach(farmer => {
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
  getKnownFarmers().forEach(farmer => {
    if (localStorage.getItem(`ezseed_${farmer}_survey_submitted`) !== 'true') return;
    const inbred = JSON.parse(localStorage.getItem(`ezseed_${farmer}_survey_inbred`) || '[]');
    const hybrid = JSON.parse(localStorage.getItem(`ezseed_${farmer}_survey_hybrid`) || '[]');
    [...inbred, ...hybrid].forEach(id => { votes[id] = (votes[id] || 0) + 1; });
  });
  return votes;
}

function initBoardDefaults() {
  if (localStorage.getItem('ezseed_board_mao')) return;
  const inbredIds = SEEDS.filter(s => s.type === 'Inbred').map(s => s.id);
  const hybridIds = SEEDS.filter(s => s.type === 'Hybrid').map(s => s.id);
  const pick = (arr, minKeep) => arr.filter((_, i) => i < minKeep || Math.random() > 0.35);
  localStorage.setItem('ezseed_board_mao',   JSON.stringify(pick(inbredIds, 2).concat(pick(hybridIds, 1))));
  localStorage.setItem('ezseed_board_pao',   JSON.stringify(pick(inbredIds, 2).concat(pick(hybridIds, 1))));
  localStorage.setItem('ezseed_board_board', JSON.stringify(pick(inbredIds, 2).concat(pick(hybridIds, 1))));
  localStorage.setItem('ezseed_board_submitted', 'true');
}

function initYieldDefaults() {
  if (localStorage.getItem('ezseed_yield_defaults')) return;
  const methods = {}, waterSources = {}, reasons = {}, whatDone = {};
  PLANTING_METHODS.forEach(m => { methods[m] = Math.floor(Math.random() * 15) + 3; });
  WATER_SOURCES.forEach(w => { waterSources[w] = Math.floor(Math.random() * 12) + 2; });
  WHY_NOT_PLANTED.slice(0, 4).forEach(r => { reasons[r] = Math.floor(Math.random() * 8) + 1; });
  WHAT_WAS_DONE.slice(0, 4).forEach(d => { whatDone[d] = Math.floor(Math.random() * 8) + 1; });
  localStorage.setItem('ezseed_yield_defaults', JSON.stringify({
    methods, waterSources, reasons, whatDone,
    plantedCount:    Math.floor(Math.random() * 20) + 30,
    notPlantedCount: Math.floor(Math.random() * 10) + 5
  }));
}

function getSurveyYieldData() {
  initYieldDefaults();
  const d = JSON.parse(localStorage.getItem('ezseed_yield_defaults') || '{}');
  let plantedCount    = d.plantedCount    || 0;
  let notPlantedCount = d.notPlantedCount || 0;
  const methods      = { ...(d.methods      || {}) };
  const waterSources = { ...(d.waterSources || {}) };
  const reasons      = { ...(d.reasons      || {}) };
  const whatDone     = { ...(d.whatDone     || {}) };
  getKnownFarmers().forEach(farmer => {
    const data = JSON.parse(localStorage.getItem(`ezseed_${farmer}_yield_survey`) || 'null');
    if (!data) return;
    if (data.planted) {
      plantedCount++;
      if (data.method) methods[data.method] = (methods[data.method] || 0) + 1;
      if (data.water)  waterSources[data.water] = (waterSources[data.water] || 0) + 1;
    } else {
      notPlantedCount++;
      if (data.whyNot)   reasons[data.whyNot]   = (reasons[data.whyNot]   || 0) + 1;
      if (data.whatDone) whatDone[data.whatDone] = (whatDone[data.whatDone] || 0) + 1;
    }
  });
  return { plantedCount, notPlantedCount, methods, waterSources, reasons, whatDone };
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
  getKnownFarmers().forEach(farmer => {
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

function getActiveAllocation() {
  return getAllOrders().slice().reverse().find(
    o => o.status !== 'delivered' && o.seeds && o.seeds.length > 0
  ) || null;
}

function buildSackAllocation(budgetSacks, availableSeeds) {
  const vrsCounts = JSON.parse(localStorage.getItem('ezseed_da_vrs_counts') || 'null');
  let votes;
  if (vrsCounts) {
    votes = availableSeeds.map(id => ({ id, v: vrsCounts[id] || 0 }));
  } else {
    const { inbred: iv, hybrid: hv } = getSurveyVotesDetailed();
    votes = availableSeeds.map(id => ({ id, v: (iv[id]||0) + (hv[id]||0) }));
  }
  const totalVotes = votes.reduce((s, x) => s + x.v, 0);
  let allocs = votes.map(({ id, v }) => {
    const exact = totalVotes > 0 ? (v / totalVotes) * budgetSacks : budgetSacks / availableSeeds.length;
    return { id, sacks: Math.floor(exact), remainder: exact - Math.floor(exact) };
  });
  let leftover = budgetSacks - allocs.reduce((s, x) => s + x.sacks, 0);
  allocs.sort((a, b) => b.remainder - a.remainder);
  for (let i = 0; i < leftover; i++) allocs[i].sacks++;
  return Object.fromEntries(allocs.map(({ id, sacks }) => [id, sacks]));
}

function buildBulkPreview() {
  const available = JSON.parse(localStorage.getItem('ezseed_da_available_seeds') || 'null');
  const seedSacks = JSON.parse(localStorage.getItem('ezseed_da_seed_sacks') || 'null');
  if (!available || available.length === 0) return null;
  const totalSacks = seedSacks
    ? Object.values(seedSacks).reduce((s, n) => s + n, 0)
    : available.length * ALLOTTED_SACKS;
  const pending = [];
  getKnownFarmers().forEach(farmer => {
    const orders = applyStatusOverrides(JSON.parse(localStorage.getItem(`ezseed_${farmer}_orders`) || '[]'));
    const order = orders.find(o => o.status === 'decision_pending' && (!o.seeds || !o.seeds.length));
    if (order) pending.push({ farmer, orderId: order.id });
  });
  if (pending.length === 0) return [];
  const maxFarmers = Math.floor(totalSacks / ALLOTTED_SACKS);
  const slotted = pending.slice(0, maxFarmers);
  const remaining = seedSacks ? { ...seedSacks } : Object.fromEntries(available.map(id => [id, ALLOTTED_SACKS]));
  return slotted.map(({ farmer, orderId }) => {
    const inbredPick  = JSON.parse(localStorage.getItem(`ezseed_${farmer}_survey_inbred`) || '[]')[0];
    const hybridPick  = JSON.parse(localStorage.getItem(`ezseed_${farmer}_survey_hybrid`) || '[]')[0];
    const primaryPick = [inbredPick, hybridPick].find(id => id && available.includes(id));
    const preferredFull = [inbredPick, hybridPick].find(id => id && available.includes(id) && (remaining[id] || 0) >= ALLOTTED_SACKS);
    if (preferredFull) {
      remaining[preferredFull] -= ALLOTTED_SACKS;
      return { farmer, orderId, seeds: [{ id: preferredFull, sacks: ALLOTTED_SACKS, isMatch: true, isClosest: false }] };
    }
    const preferredPartialSacks = primaryPick ? Math.max(0, remaining[primaryPick] || 0) : 0;
    const neededFromAlt = ALLOTTED_SACKS - preferredPartialSacks;
    const altFull = available.filter(id => id !== primaryPick && (remaining[id] || 0) >= neededFromAlt);
    const altAny  = available.filter(id => id !== primaryPick && (remaining[id] || 0) > 0);
    let altId = null;
    if (altFull.length > 0) {
      altId = primaryPick ? findClosestSeed(primaryPick, altFull) : altFull[0];
    } else if (altAny.length > 0) {
      altId = primaryPick ? findClosestSeed(primaryPick, altAny) : altAny[0];
    } else if (!primaryPick) {
      altId = available[0];
    }
    const seeds = [];
    if (preferredPartialSacks > 0 && primaryPick) {
      remaining[primaryPick] -= preferredPartialSacks;
      seeds.push({ id: primaryPick, sacks: preferredPartialSacks, isMatch: true, isClosest: false });
    }
    if (altId) {
      const altSacks = Math.min(neededFromAlt, remaining[altId] || 0);
      if (altSacks > 0) {
        remaining[altId] -= altSacks;
        seeds.push({ id: altId, sacks: altSacks, isMatch: false, isClosest: !!primaryPick });
      }
    }
    if (seeds.length === 0) {
      const fallbackId = available[0];
      const fallbackSacks = Math.min(ALLOTTED_SACKS, remaining[fallbackId] || 0);
      if (remaining[fallbackId] !== undefined) remaining[fallbackId] -= fallbackSacks;
      seeds.push({ id: fallbackId, sacks: fallbackSacks, isMatch: false, isClosest: false });
    }
    return { farmer, orderId, seeds };
  });
}

function executeBulkAllocation(preview) {
  preview.forEach(({ farmer, orderId, seeds }) => {
    const orders = JSON.parse(localStorage.getItem(`ezseed_${farmer}_orders`) || '[]');
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx === -1) return;
    orders[idx].seeds  = seeds.map(({ id, sacks }) => ({ id, sacks }));
    orders[idx].status = 'decision_made';
    localStorage.setItem(`ezseed_${farmer}_orders`, JSON.stringify(orders));
  });
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
  initBoardDefaults();
  initYieldDefaults();
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
  const role = localStorage.getItem('ezseed_role');
  const user = currentUser();
  let greeting;
  if (role === 'daofficer') {
    greeting = 'Welcome, Officer!';
  } else if (role === 'daboard') {
    greeting = 'Welcome, Board!';
  } else {
    const verified = localStorage.getItem(`ezseed_${user}_verified`) === 'true';
    if (verified) {
      const profile = getProfile(user);
      const firstName = profile.name ? profile.name.split(' ')[0] : null;
      greeting = firstName ? `Welcome, ${firstName}!` : 'Welcome, Farmer!';
    } else {
      greeting = 'Welcome, Farmer!';
    }
  }
  document.querySelectorAll('.navbar-greeting').forEach(el => {
    el.textContent = greeting;
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
      localStorage.setItem(`ezseed_${user}_verified`, 'true');
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
      const regs = JSON.parse(localStorage.getItem('ezseed_pending_registrations') || '[]');
      const reg = regs.find(r => r.username === user && r.password === pass);
      if (reg) {
        if (reg.status === 'approved') {
          localStorage.setItem('ezseed_user', user);
          localStorage.setItem('ezseed_role', 'farmer');
          localStorage.setItem(`ezseed_${user}_verified`, 'true');
          window.location.href = 'dashboard.html';
        } else if (reg.status === 'pending') {
          err.textContent = 'Your registration is pending DA approval.';
          err.style.display = 'block';
        } else {
          err.textContent = 'Your registration was rejected by the DA.';
          err.style.display = 'block';
        }
      } else {
        err.textContent = 'Invalid username or password.';
        err.style.display = 'block';
      }
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

  const allocCard = document.querySelector('.bento-card-v2[data-card="allocation"]');
  const grid = document.getElementById('farmer-bento-grid');
  if (allocCard && getActiveAllocation()) {
    allocCard.style.display = '';
    grid?.classList.remove('single-col-3');
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

  // Status
  const orders  = getAllOrders();
  const active  = orders.slice().reverse().find(o => o.status !== 'delivered') || orders[orders.length - 1];
  const statusEl = document.getElementById('survey-status-badge');
  if (statusEl && active) {
    statusEl.innerHTML = `<span class="${STATUS_CLASS[active.status] || ''}">${STATUS_LABELS[active.status] || active.status}</span>`;
  }

  // Show "View Allocated Seed" link if allocation exists
  const linkArea = document.getElementById('survey-alloc-link-area');
  if (linkArea && getActiveAllocation()) {
    linkArea.style.display = '';
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

  const allocated = JSON.parse(localStorage.getItem('ezseed_da_available_seeds') || 'null');
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
      const picks = new Set([
        ...JSON.parse(localStorage.getItem(farmerKey('survey_inbred')) || '[]'),
        ...JSON.parse(localStorage.getItem(farmerKey('survey_hybrid')) || '[]')
      ]);
      list.innerHTML = order.seeds.map(({ id, sacks }) => {
        const seed = getSeed(id);
        if (!seed) return '';
        const yourPick = picks.has(id) ? '<span class="badge badge-your-pick">&#10003; Your Pick</span>' : '';
        return `
          <div class="sum-row">
            <div class="sum-row-left">
              <span class="sum-row-name">${seed.name}</span>
              <span class="badge badge-filled">${seed.type}</span>
              ${yourPick}
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

// ── ALLOCATION VIEW ────────────────────────────────────────────────────────
function initAllocationView() {
  updateNavGreeting();
  initModal();
  const order = getActiveAllocation();
  if (!order) { window.location.href = 'dashboard.html'; return; }

  const picks = new Set([
    ...JSON.parse(localStorage.getItem(farmerKey('survey_inbred')) || '[]'),
    ...JSON.parse(localStorage.getItem(farmerKey('survey_hybrid')) || '[]')
  ]);

  const seasonEl = document.getElementById('alloc-season');
  if (seasonEl) seasonEl.textContent = order.season;

  const totalSacks = order.seeds.reduce((sum, s) => sum + s.sacks, 0);
  const sacksEl = document.getElementById('alloc-sacks');
  if (sacksEl) sacksEl.textContent = `${totalSacks} sacks`;

  const seedList = document.getElementById('alloc-seed-list');
  if (seedList) {
    seedList.innerHTML = order.seeds.map(({ id, sacks }) => {
      const seed = getSeed(id);
      if (!seed) return '';
      const yourPick = picks.has(id) ? '<span class="badge badge-your-pick">&#10003; Your Pick</span>' : '';
      return `
        <div class="sum-row">
          <div class="sum-row-left">
            <span class="sum-row-name">${seed.name}</span>
            <span class="badge badge-filled">${seed.type}</span>
            ${buildStars(seed)}
            ${yourPick}
            <button class="info-btn-v2" data-seed-id="${id}">i</button>
          </div>
          <span class="sack-pill-dark">${sacks} sacks</span>
        </div>`;
    }).join('');
    seedList.querySelectorAll('.info-btn-v2[data-seed-id]').forEach(btn => {
      btn.addEventListener('click', e => { e.stopPropagation(); openModal(btn.dataset.seedId); });
    });
  }

  const statusEl = document.getElementById('alloc-status');
  if (statusEl) statusEl.innerHTML = `<span class="${STATUS_CLASS[order.status] || ''}">${STATUS_LABELS[order.status] || order.status}</span>`;

  // Feedback form
  const existingFeedback = localStorage.getItem(farmerKey('alloc_feedback'));
  const feedbackSentEl   = document.getElementById('feedback-sent');
  const feedbackFormWrap = document.getElementById('feedback-form-wrap');
  if (existingFeedback) {
    if (feedbackSentEl)   feedbackSentEl.style.display   = '';
    if (feedbackFormWrap) feedbackFormWrap.style.display = 'none';
  }
  document.getElementById('feedback-submit-btn')?.addEventListener('click', () => {
    const reason  = document.getElementById('feedback-reason')?.value;
    const message = document.getElementById('feedback-message')?.value.trim() || '';
    localStorage.setItem(farmerKey('alloc_feedback'), JSON.stringify({ reason, message }));
    if (feedbackSentEl)   feedbackSentEl.style.display   = '';
    if (feedbackFormWrap) feedbackFormWrap.style.display = 'none';
  });
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
  if (BASE_FARMERS.includes(farmer)) return FARMER_PROFILES[farmer] || {};
  const regs = JSON.parse(localStorage.getItem('ezseed_pending_registrations') || '[]');
  const entry = regs.find(r => r.username === farmer && r.status === 'approved');
  return entry || {};
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

  document.getElementById('reset-my-data-btn')?.addEventListener('click', () => {
    if (confirm(`Reset all data for ${user}? This cannot be undone.`)) {
      resetFarmerData();
      window.location.reload();
    }
  });
}

// ── FARMER REGISTRATION FORM ───────────────────────────────────────────────
function initFarmerRegister() {
  const errEl     = document.getElementById('reg-error');
  const successEl = document.getElementById('reg-success');
  document.getElementById('reg-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('reg-username').value.trim();
    const password = document.getElementById('reg-password').value;
    const name     = document.getElementById('reg-name').value.trim();
    const location = document.getElementById('reg-location').value.trim();
    const contact  = document.getElementById('reg-contact').value.trim();
    const hectares = document.getElementById('reg-hectares').value.trim();

    const regs = JSON.parse(localStorage.getItem('ezseed_pending_registrations') || '[]');
    const allTaken = [...BASE_FARMERS, 'DAOfficer', 'DABoard', ...regs.map(r => r.username)];
    if (allTaken.map(u => u.toLowerCase()).includes(username.toLowerCase())) {
      if (errEl) { errEl.textContent = 'That username is already taken.'; errEl.style.display = ''; }
      return;
    }
    if (errEl) errEl.style.display = 'none';
    regs.push({ username, password, name, location, contact, hectares, status: 'pending' });
    localStorage.setItem('ezseed_pending_registrations', JSON.stringify(regs));
    document.getElementById('reg-form').style.display = 'none';
    if (successEl) successEl.style.display = '';
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
  const regs = JSON.parse(localStorage.getItem('ezseed_pending_registrations') || '[]');
  const pending = regs.filter(r => r.status === 'pending').length;
  const badge = document.getElementById('reg-pending-badge');
  if (badge && pending > 0) {
    badge.textContent = pending;
    badge.style.display = '';
  }
}

// ── DA REGISTRATIONS LIST ──────────────────────────────────────────────────
function initDARegistrations() {
  updateNavGreeting();

  const REG_LABEL = { pending: 'Pending', approved: 'Approved', rejected: 'Rejected' };
  const REG_CLASS = { pending: 'status-pending', approved: 'status-allocated', rejected: 'status-germination' };
  const regs = JSON.parse(localStorage.getItem('ezseed_pending_registrations') || '[]');

  // ── Pending Registrations ──────────────────────────────
  const pendingListEl = document.getElementById('pending-list');
  let pendingFilter = 'all';

  function renderPendingList() {
    if (!pendingListEl) return;
    const filtered = pendingFilter === 'all' ? regs : regs.filter(r => r.status === pendingFilter);
    if (filtered.length === 0) {
      pendingListEl.innerHTML = '<p style="text-align:center; color:#888; padding:1rem 0;">No applications match this filter.</p>';
      return;
    }
    pendingListEl.innerHTML = filtered.map(reg => `
      <div class="request-row">
        <span class="request-season">${reg.name} <span style="font-weight:400;font-size:0.82rem;">(${reg.username})</span></span>
        <span class="${REG_CLASS[reg.status] || ''}">${REG_LABEL[reg.status] || reg.status}</span>
        <a href="da-registrationdetail.html?farmer=${reg.username}" class="btn-details">Review</a>
      </div>`).join('');
  }

  document.querySelectorAll('#pending-chip-row .reg-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      pendingFilter = chip.dataset.filter;
      document.querySelectorAll('#pending-chip-row .reg-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderPendingList();
    });
  });

  renderPendingList();

  // ── Registered Farmers ────────────────────────────────
  const registeredListEl = document.getElementById('registered-list');
  const approvedDynamic  = regs.filter(r => r.status === 'approved');
  const allRegistered = [
    ...BASE_FARMERS.map(f => {
      const p = FARMER_PROFILES[f];
      return { username: f, name: p.name, location: p.location, hectares: p.hectares };
    }),
    ...approvedDynamic.map(r => ({ username: r.username, name: r.name, location: r.location, hectares: r.hectares }))
  ];

  function parseLocation(loc) {
    const parts = (loc || '').split(',').map(s => s.trim());
    return { municipality: parts[0] || '', province: parts[1] || '' };
  }

  function sizeCategory(ha) {
    const n = parseFloat((ha || '').replace(/[^0-9.]/g, ''));
    if (isNaN(n)) return '';
    return n < 1 ? 'small' : n <= 3 ? 'medium' : 'large';
  }

  const provinceSel = document.getElementById('reg-province-filter');
  const muniSel     = document.getElementById('reg-muni-filter');
  const sizeSel     = document.getElementById('reg-size-filter');

  const provinces      = [...new Set(allRegistered.map(f => parseLocation(f.location).province).filter(Boolean))];
  const municipalities = [...new Set(allRegistered.map(f => parseLocation(f.location).municipality).filter(Boolean))];

  if (provinceSel) {
    provinces.forEach(p => { const o = document.createElement('option'); o.value = p; o.textContent = p; provinceSel.appendChild(o); });
    provinceSel.addEventListener('change', renderRegisteredList);
  }
  if (muniSel) {
    municipalities.forEach(m => { const o = document.createElement('option'); o.value = m; o.textContent = m; muniSel.appendChild(o); });
    muniSel.addEventListener('change', renderRegisteredList);
  }
  if (sizeSel) sizeSel.addEventListener('change', renderRegisteredList);

  function renderRegisteredList() {
    if (!registeredListEl) return;
    const province = provinceSel?.value || '';
    const muni     = muniSel?.value || '';
    const size     = sizeSel?.value || '';

    const filtered = allRegistered.filter(f => {
      const loc = parseLocation(f.location);
      if (province && loc.province !== province)       return false;
      if (muni     && loc.municipality !== muni)       return false;
      if (size     && sizeCategory(f.hectares) !== size) return false;
      return true;
    });

    if (filtered.length === 0) {
      registeredListEl.innerHTML = '<p style="text-align:center; color:#888; padding:1rem 0;">No farmers match this filter.</p>';
      return;
    }

    registeredListEl.innerHTML = filtered.map(f => `
      <div class="request-row">
        <span class="request-season">
          ${f.name} <span style="font-weight:400;font-size:0.82rem;">(${f.username})</span>
          <span class="farmer-reg-sub">${f.location || '—'} &bull; ${f.hectares || '—'}</span>
        </span>
        <span class="status-allocated">Approved</span>
      </div>`).join('');
  }

  renderRegisteredList();

  // Auto-scroll to section from URL param
  const tab = new URLSearchParams(window.location.search).get('tab');
  if (tab === 'registered') {
    setTimeout(() => document.getElementById('section-registered')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  }
}

// ── DA REGISTRATION DETAIL ─────────────────────────────────────────────────
function initDARegistrationDetail() {
  updateNavGreeting();
  const params   = new URLSearchParams(window.location.search);
  const username = params.get('farmer') || '';

  const regs   = JSON.parse(localStorage.getItem('ezseed_pending_registrations') || '[]');
  const regIdx = regs.findIndex(r => r.username === username);

  const bodyEl = document.getElementById('reg-detail-body');
  if (regIdx === -1) {
    if (bodyEl) bodyEl.innerHTML = '<p style="color:#888;">Registration not found.</p>';
    return;
  }
  const reg = regs[regIdx];

  if (bodyEl) {
    const REG_LABEL = { pending: 'Pending Review', approved: 'Approved', rejected: 'Rejected' };
    bodyEl.innerHTML = `
      <div class="da-order-info">
        <div class="da-order-info-row"><span class="da-order-info-label">Username</span><span class="da-order-info-value">${reg.username}</span></div>
        <div class="da-order-info-row"><span class="da-order-info-label">Full Name</span><span class="da-order-info-value">${reg.name}</span></div>
        <div class="da-order-info-row"><span class="da-order-info-label">Location</span><span class="da-order-info-value">${reg.location}</span></div>
        <div class="da-order-info-row"><span class="da-order-info-label">Contact</span><span class="da-order-info-value">${reg.contact}</span></div>
        <div class="da-order-info-row"><span class="da-order-info-label">Farm Size</span><span class="da-order-info-value">${reg.hectares}</span></div>
        <div class="da-order-info-row"><span class="da-order-info-label">Status</span><span class="da-order-info-value">${REG_LABEL[reg.status] || reg.status}</span></div>
      </div>`;
  }

  const actionEl = document.getElementById('reg-action-area');
  if (!actionEl) return;

  if (reg.status !== 'pending') {
    const msg = reg.status === 'approved' ? 'This application has been approved.' : 'This application has been rejected.';
    actionEl.innerHTML = `<p style="text-align:center; margin-top:1.5rem; color:#888;">${msg}</p>`;
    return;
  }

  actionEl.innerHTML = `
    <div class="btn-row-v2" style="margin-top:1.5rem;">
      <button id="approve-btn" class="btn btn-primary">Approve</button>
      <button id="reject-btn"  class="btn btn-danger">Reject</button>
    </div>`;

  document.getElementById('approve-btn')?.addEventListener('click', () => {
    regs[regIdx].status = 'approved';
    localStorage.setItem('ezseed_pending_registrations', JSON.stringify(regs));
    localStorage.setItem(`ezseed_${username}_verified`, 'true');
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
    regs[regIdx].status = 'rejected';
    regs[regIdx].rejectionReasons = reasons;
    localStorage.setItem('ezseed_pending_registrations', JSON.stringify(regs));
    localStorage.removeItem(`ezseed_${username}_verified`);
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

function computeVRSFallback() {
  const votes = getSurveyVotes();
  const recs = getRecommendations();
  const scored = SEEDS.map(seed => {
    const v = votes[seed.id] || 0;
    const stars = (recs.mao.includes(seed.id) ? 1 : 0) +
                  (recs.pao.includes(seed.id) ? 1 : 0) +
                  (recs.board.includes(seed.id) ? 1 : 0);
    return { seed, score: v + stars * 0.5 };
  });
  const inbredTop = scored.filter(s => s.seed.type === 'Inbred')
    .sort((a, b) => b.score - a.score).slice(0, 3).map(s => s.seed.id);
  const hybridTop = scored.filter(s => s.seed.type === 'Hybrid')
    .sort((a, b) => b.score - a.score).slice(0, 2).map(s => s.seed.id);
  return [...inbredTop, ...hybridTop];
}

async function loadSeedVectors() {
  if (_seedVectors) return _seedVectors;
  const DISEASE_ENC    = { Susceptible: 0, Intermediate: 1, Resistant: 2 };
  const TENDERNESS_ENC = { Tough: 0, 'Slightly Tender': 1, Tender: 2 };
  const TASTE_ENC      = { Bland: 0, 'Slightly Tasty': 1, Tasty: 2 };
  const COLS = [
    'Grain Length (mm)', 'Cooked Tenderness', 'Cooked Taste',
    'Average yield (t/ha)', 'Maximum yield (t/ha)', 'Maturity (days)',
    'Milling Recovery (percent)', 'Reaction to Blast',
    'Reaction to Bacterial Leaf Blight (BLB)', 'Reaction to Tungro',
    'Reaction to Brown Planthopper (BPH)', 'Reaction to Green Leafhopper (GLH)',
    'Reaction to Stem Borer'
  ];
  function parseCSV(text) {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    return lines.slice(1).map(line => {
      const vals = line.split(',').map(v => v.trim());
      const row = {};
      headers.forEach((h, i) => { row[h] = vals[i] || ''; });
      return row;
    });
  }
  function encodeRow(row) {
    return COLS.map(col => {
      const raw = (row[col] || '').trim();
      if (col === 'Cooked Tenderness') return TENDERNESS_ENC[raw] !== undefined ? TENDERNESS_ENC[raw] : (parseFloat(raw) || 0);
      if (col === 'Cooked Taste')      return TASTE_ENC[raw]      !== undefined ? TASTE_ENC[raw]      : (parseFloat(raw) || 0);
      if (col.startsWith('Reaction to')) return DISEASE_ENC[raw]  !== undefined ? DISEASE_ENC[raw]   : (parseFloat(raw) || 0);
      return parseFloat(raw) || 0;
    });
  }
  const [inbredText, hybridText] = await Promise.all([
    fetch('data/inbreddata.csv').then(r => r.text()),
    fetch('data/hybriddata.csv').then(r => r.text())
  ]);
  const allRows = [...parseCSV(inbredText), ...parseCSV(hybridText)];
  const rawVecs = allRows.map(encodeRow);
  const mins = COLS.map((_, j) => Math.min(...rawVecs.map(r => r[j])));
  const maxs = COLS.map((_, j) => Math.max(...rawVecs.map(r => r[j])));
  const normalize = vec => vec.map((v, j) => maxs[j] > mins[j] ? (v - mins[j]) / (maxs[j] - mins[j]) : 0);
  const normVecs = rawVecs.map(normalize);
  const NAME_PATTERNS = {
    rc222: /RC\s*222\b/i, rc216: /RC\s*216\b/i, rc402: /RC\s*402\b/i, rc436: /RC\s*436\b/i,
    rc72h: /RC\s*72H\b/i, rc204h: /RC\s*204H\b/i, rc446h: /RC\s*446H\b/i
  };
  const vectors = {}, prices = {};
  allRows.forEach((row, i) => {
    const name = (row['Seed Variety'] || '');
    Object.entries(NAME_PATTERNS).forEach(([id, pat]) => {
      if (pat.test(name)) { vectors[id] = normVecs[i]; prices[id] = parseFloat(row['Average Price per Kilo (PHP)']) || 0; }
    });
  });
  const PROXY_IDS = ['rc216', 'rc222', 'rc402', 'rc436'].filter(id => vectors[id]);
  if (PROXY_IDS.length > 0) {
    vectors.rc480 = COLS.map((_, j) => PROXY_IDS.reduce((s, id) => s + vectors[id][j], 0) / PROXY_IDS.length);
    prices.rc480  = PROXY_IDS.reduce((s, id) => s + prices[id], 0) / PROXY_IDS.length;
  }
  _seedVectors = vectors;
  _seedPrices  = prices;
  return vectors;
}

function computeVRSRecommendationSSE(budget) {
  if (!_seedVectors) return null;
  const prefVecs = [];
  getKnownFarmers().forEach(farmer => {
    const ib = JSON.parse(localStorage.getItem(`ezseed_${farmer}_survey_inbred`) || '[]')[0];
    const hy = JSON.parse(localStorage.getItem(`ezseed_${farmer}_survey_hybrid`) || '[]')[0];
    [ib, hy].forEach(id => { if (id && _seedVectors[id]) prefVecs.push({ id, vec: _seedVectors[id] }); });
  });
  if (prefVecs.length === 0) return { seeds: computeVRSFallback(), counts: {}, cost: 0, sse: 0, overBudget: false };
  function eucSq(a, b) { return a.reduce((s, v, i) => s + (v - b[i]) ** 2, 0); }
  function combos(arr, k) {
    if (k === 0) return [[]];
    if (!arr.length) return [];
    const [h, ...t] = arr;
    return [...combos(t, k - 1).map(c => [h, ...c]), ...combos(t, k)];
  }
  const all = combos(SEEDS.map(s => s.id), 5);
  let bestSSE = Infinity, bestCombo = null, bestCounts = null, bestCost = 0;
  function evalCombo(combo) {
    const cnt = Object.fromEntries(combo.map(id => [id, 0]));
    let sse = 0;
    prefVecs.forEach(({ vec }) => {
      let near = combo[0], minD = eucSq(vec, _seedVectors[combo[0]] || vec);
      combo.forEach(id => { if (!_seedVectors[id]) return; const d = eucSq(vec, _seedVectors[id]); if (d < minD) { minD = d; near = id; } });
      cnt[near]++; sse += minD;
    });
    const cost = combo.reduce((s, id) => s + (cnt[id] * (_seedPrices[id] || 0) * 1000), 0);
    return { sse, cnt, cost };
  }
  all.forEach(combo => {
    const { sse, cnt, cost } = evalCombo(combo);
    if (cost <= budget && sse < bestSSE) { bestSSE = sse; bestCombo = combo; bestCounts = cnt; bestCost = cost; }
  });
  if (!bestCombo) {
    all.forEach(combo => {
      const { sse, cnt, cost } = evalCombo(combo);
      if (sse < bestSSE) { bestSSE = sse; bestCombo = combo; bestCounts = cnt; bestCost = cost; }
    });
  }
  return { seeds: bestCombo || computeVRSFallback(), counts: bestCounts || {}, cost: bestCost, sse: bestSSE === Infinity ? 0 : bestSSE, overBudget: bestCost > budget };
}

function findClosestSeed(farmerPickId, candidateIds) {
  if (!_seedVectors || !farmerPickId || !_seedVectors[farmerPickId]) return candidateIds[0];
  const pv = _seedVectors[farmerPickId];
  let closest = candidateIds[0], minD = Infinity;
  candidateIds.forEach(id => { if (!_seedVectors[id]) return; const d = pv.reduce((s, v, i) => s + (v - _seedVectors[id][i]) ** 2, 0); if (d < minD) { minD = d; closest = id; } });
  return closest;
}

async function initDASurvey() {
  updateNavGreeting();
  initBoardDefaults();
  try { await loadSeedVectors(); } catch(e) {}

  const { inbred: iv, hybrid: hv, pairs: pv } = getSurveyVotesDetailed();
  const INBRED_SEEDS = SEEDS.filter(s => s.type === 'Inbred');
  const HYBRID_SEEDS = SEEDS.filter(s => s.type === 'Hybrid');
  function shortName(s) { return s.name.replace(/.*\(/, '').replace(')', ''); }

  makePieChart('chart-inbred', INBRED_SEEDS.map(shortName), INBRED_SEEDS.map(s => iv[s.id] || 0), CHART_COLORS_OLIVE);
  makePieChart('chart-hybrid', HYBRID_SEEDS.map(shortName), HYBRID_SEEDS.map(s => hv[s.id] || 0), CHART_COLORS_BLUE);
  const pairEntries = Object.entries(pv).sort(([,a],[,b]) => b - a);
  if (pairEntries.length > 0) {
    const pairLabels = pairEntries.map(([key]) => { const [i,h] = key.split('||'); const si=getSeed(i),sh=getSeed(h); return `${si?shortName(si):i} + ${sh?shortName(sh):h}`; });
    makePieChart('chart-pair', pairLabels, pairEntries.map(([,v]) => v), CHART_COLORS_MIXED);
  } else { makePieChart('chart-pair', [], [], []); }

  const vrsBody = document.getElementById('vrs-table-body');
  if (vrsBody) {
    const top = pairEntries.slice(0, 5);
    const total = Object.values(iv).reduce((a,b) => a+b, 0) + Object.values(hv).reduce((a,b) => a+b, 0);
    if (top.length === 0) {
      vrsBody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:#888;">No survey data yet.</td></tr>';
    } else {
      vrsBody.innerHTML = top.map(([key, votes]) => {
        const [i,h] = key.split('||'); const si=getSeed(i),sh=getSeed(h);
        const matchPct = total > 0 ? Math.round((votes / (total / SEEDS.length)) * 100) : 0;
        return `<tr><td>${si ? si.name : i}</td><td>${sh ? sh.name : h}</td><td>Matches Survey: ${Math.min(matchPct, 100)}%<br>Cost: Php 4.0M (10% above budget)</td></tr>`;
      }).join('');
    }
  }

  const yd = getSurveyYieldData();
  makePieChart('chart-planted', ['Planted','Not Planted'], [yd.plantedCount, yd.notPlantedCount], CHART_COLORS_OLIVE);
  const mEnt = Object.entries(yd.methods);
  makePieChart('chart-method', mEnt.map(([k])=>k), mEnt.map(([,v])=>v), CHART_COLORS_OLIVE);
  const wEnt = Object.entries(yd.waterSources);
  makePieChart('chart-water', wEnt.map(([k])=>k), wEnt.map(([,v])=>v), CHART_COLORS_BLUE);
  const rEnt = Object.entries(yd.reasons);
  makePieChart('chart-reason', rEnt.map(([k])=>k), rEnt.map(([,v])=>v), CHART_COLORS_MIXED);
  const dEnt = Object.entries(yd.whatDone);
  makePieChart('chart-whatdone', dEnt.map(([k])=>k), dEnt.map(([,v])=>v), CHART_COLORS_MIXED);

  // Section 5
  const availSeeds  = JSON.parse(localStorage.getItem('ezseed_da_available_seeds') || 'null');
  const savedSacks  = JSON.parse(localStorage.getItem('ezseed_da_seed_sacks') || 'null');
  const bulkPreview = savedSacks ? buildBulkPreview() : null;
  const bulkIsDone  = Array.isArray(bulkPreview) && bulkPreview.length === 0;
  let renderSackDoneList = () => {};
  const formEl     = document.getElementById('da-allocation-form');
  const summaryEl  = document.getElementById('da-allocation-summary');

  if (availSeeds && availSeeds.length > 0) {
    if (formEl) formEl.style.display = 'none';
    if (summaryEl) {
      summaryEl.style.display = '';
      const list = document.getElementById('da-allocation-summary-list');
      if (list) list.innerHTML = availSeeds.map(id => { const seed=getSeed(id); if(!seed) return ''; return `<div class="sum-row"><div class="sum-row-left"><span class="sum-row-name">${seed.name}</span><span class="badge badge-filled">${seed.type}</span>${buildStars(seed)}</div></div>`; }).join('');
    }
    const changeAllocBtn = document.getElementById('da-change-allocation-btn');
    if (bulkIsDone && changeAllocBtn) changeAllocBtn.style.display = 'none';
    changeAllocBtn?.addEventListener('click', () => {
      localStorage.removeItem('ezseed_da_available_seeds');
      localStorage.removeItem('ezseed_da_allocated_seeds');
      localStorage.removeItem('ezseed_da_seed_sacks');
      localStorage.removeItem('ezseed_da_vrs_counts');
      localStorage.removeItem('ezseed_da_procurement_budget');
      window.location.reload();
    });
  } else {
    const loadingEl   = document.getElementById('vrs-loading');
    const costEl      = document.getElementById('vrs-cost-display');
    const budgetInput = document.getElementById('vrs-budget-input');
    const recList     = document.getElementById('vrs-rec-list');
    const confirmBtn  = document.getElementById('da-confirm-vrs-btn');
    if (loadingEl) loadingEl.style.display = '';
    if (confirmBtn) confirmBtn.disabled = true;
    let vrsResult = null;
    try {
      await loadSeedVectors();
      vrsResult = computeVRSRecommendationSSE(parseInt(budgetInput?.value || '10000000'));
    } catch (e) { vrsResult = null; }
    if (loadingEl) loadingEl.style.display = 'none';
    const vrsRec = vrsResult ? vrsResult.seeds : computeVRSFallback();
    function renderRecList(seeds) {
      if (recList) recList.innerHTML = seeds.map(id => { const seed=getSeed(id); if(!seed) return ''; return `<div class="sum-row"><div class="sum-row-left"><span class="sum-row-name">${seed.name}</span><span class="badge badge-filled">${seed.type}</span>${buildStars(seed)}</div></div>`; }).join('');
    }
    function showCost(result, budgetVal) {
      if (!result || !costEl) return;
      const fmt = n => '₱' + Math.round(n).toLocaleString();
      costEl.innerHTML = `<span class="vrs-cost-line">Projected Procurement Cost: <strong>${fmt(result.cost)}</strong></span><span class="vrs-cost-line${result.overBudget ? ' vrs-cost-over' : ''}">Budget: ${fmt(budgetVal)}&nbsp;|&nbsp;Remaining: <strong>${fmt(budgetVal - result.cost)}</strong></span>`;
      costEl.style.display = '';
    }
    renderRecList(vrsRec);
    showCost(vrsResult, parseInt(budgetInput?.value || '10000000'));
    if (confirmBtn) confirmBtn.disabled = false;
    budgetInput?.addEventListener('input', () => {
      if (!_seedVectors) return;
      const budget = parseInt(budgetInput.value || '10000000');
      vrsResult = computeVRSRecommendationSSE(budget);
      if (vrsResult) { renderRecList(vrsResult.seeds); showCost(vrsResult, budget); }
    });
    confirmBtn?.addEventListener('click', () => {
      const rec = vrsResult ? vrsResult.seeds : vrsRec;
      localStorage.setItem('ezseed_da_available_seeds', JSON.stringify(rec));
      localStorage.setItem('ezseed_da_allocated_seeds', JSON.stringify(rec));
      if (vrsResult) localStorage.setItem('ezseed_da_vrs_counts', JSON.stringify(vrsResult.counts));
      localStorage.setItem('ezseed_da_procurement_budget', budgetInput?.value || '10000000');
      window.location.reload();
    });
  }

  // Board recommendations
  const recs = getRecommendations();
  const allRecIds = [...new Set([...recs.mao, ...recs.pao, ...recs.board])];
  const recEl = document.getElementById('board-recs');
  if (recEl) {
    recEl.innerHTML = allRecIds.length === 0
      ? '<p style="color:#888;">No board recommendations set yet.</p>'
      : allRecIds.map(id => { const seed=getSeed(id); if(!seed) return ''; return `<div class="da-survey-row"><div class="da-survey-row-left"><span class="sum-row-name">${seed.name}</span><span class="badge badge-filled">${seed.type}</span>${buildStars(seed)}</div></div>`; }).join('');
  }

  // Section 6
  const sackNoSeedsEl = document.getElementById('da-sack-no-seeds');
  const sackDoneEl    = document.getElementById('da-sack-done');
  const sackFormEl    = document.getElementById('da-sack-form');

  if (!availSeeds || availSeeds.length === 0) {
    if (sackNoSeedsEl) sackNoSeedsEl.style.display = '';
    if (sackDoneEl)    sackDoneEl.style.display = 'none';
    if (sackFormEl)    sackFormEl.style.display = 'none';
  } else if (savedSacks) {
    if (sackNoSeedsEl) sackNoSeedsEl.style.display = 'none';
    if (sackDoneEl)    sackDoneEl.style.display = '';
    if (sackFormEl)    sackFormEl.style.display = 'none';
    renderSackDoneList = () => {
      const doneList  = document.getElementById('da-sack-done-list');
      const doneTotal = document.getElementById('da-sack-done-total');
      if (doneList) {
        doneList.innerHTML = availSeeds.map(id => {
          const seed = getSeed(id); if (!seed) return '';
          const tot  = savedSacks[id] || 0;
          const used = getKnownFarmers().reduce((sum, farmer) => {
            const orders = JSON.parse(localStorage.getItem(`ezseed_${farmer}_orders`) || '[]');
            return sum + orders.reduce((s, o) => { const m = o.seeds && o.seeds.find(sd => sd.id === id); return s + (m ? m.sacks : 0); }, 0);
          }, 0);
          const rem = tot - used;
          return `<div class="bulk-preview-row">
            <div class="bulk-preview-left"><span class="bulk-preview-farmer">${seed.name}</span></div>
            <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;">
              <span class="badge badge-filled">${seed.type}</span>
              <span class="sack-pill-dark">${tot} sacks</span>
              <span class="sack-remaining${rem < 0 ? ' sack-remaining-over' : ''}">${rem} / ${tot} left</span>
            </div>
          </div>`;
        }).join('');
      }
      if (doneTotal) doneTotal.textContent = `Total: ${Object.values(savedSacks).reduce((s, n) => s + n, 0)} sacks`;
    };
    renderSackDoneList();
    const changeBtn = document.getElementById('da-change-sacks-btn');
    if (changeBtn && bulkIsDone) changeBtn.style.display = 'none';
    changeBtn?.addEventListener('click', () => { localStorage.removeItem('ezseed_da_seed_sacks'); window.location.reload(); });
  } else {
    if (sackNoSeedsEl) sackNoSeedsEl.style.display = 'none';
    if (sackDoneEl)    sackDoneEl.style.display = 'none';
    if (sackFormEl)    sackFormEl.style.display = '';
    const sackKgInput   = document.getElementById('sack-kg-input');
    const sackInputsEl  = document.getElementById('sack-alloc-inputs');
    const sackTotalEl   = document.getElementById('sack-alloc-total');
    const sackWarningEl = document.getElementById('sack-over-warning');
    function deriveTotalSacks(kgPerSack) {
      const budget    = parseInt(localStorage.getItem('ezseed_da_procurement_budget') || '0');
      const vrsCounts = JSON.parse(localStorage.getItem('ezseed_da_vrs_counts') || 'null');
      if (budget > 0 && vrsCounts && _seedPrices) {
        const totalCount = Object.values(vrsCounts).reduce((a, b) => a + b, 0);
        if (totalCount > 0) {
          const wtdAvgPrice = availSeeds.reduce((sum, id) => sum + ((vrsCounts[id] || 0) / totalCount) * (_seedPrices[id] || 0), 0);
          if (wtdAvgPrice > 0) return Math.floor(budget / (wtdAvgPrice * kgPerSack));
        }
      }
      return ALLOTTED_SACKS * getKnownFarmers().length;
    }
    function renderSackInputs() {
      const kgPerSack  = parseInt(sackKgInput?.value || '50');
      const totalSacks = deriveTotalSacks(kgPerSack);
      const autoAlloc  = buildSackAllocation(totalSacks, availSeeds);
      if (!sackInputsEl) return;
      sackInputsEl.innerHTML = availSeeds.map(id => {
        const seed = getSeed(id); if (!seed) return '';
        return `<div class="bulk-preview-row" style="align-items:center;">
          <div class="bulk-preview-left">
            <span class="bulk-preview-farmer">${seed.name}</span>
            <span class="badge badge-filled" style="align-self:flex-start;">${seed.type}</span>
          </div>
          <div style="display:flex;align-items:center;gap:0.5rem;">
            <input type="number" min="0" value="${autoAlloc[id] || 0}" data-seed="${id}" class="sack-qty-input">
            <span style="font-size:0.85rem;color:#555;">sacks</span>
          </div>
        </div>`;
      }).join('');
      document.querySelectorAll('.sack-qty-input').forEach(inp => inp.addEventListener('input', updateSackTotal));
      updateSackTotal();
    }
    function updateSackTotal() {
      const kgPerSack  = parseInt(sackKgInput?.value || '50');
      const totalSacks = deriveTotalSacks(kgPerSack);
      const total      = [...document.querySelectorAll('.sack-qty-input')].reduce((s, inp) => s + (parseInt(inp.value) || 0), 0);
      if (sackTotalEl) {
        sackTotalEl.style.color = total === totalSacks ? '#16a34a' : total > totalSacks ? '#dc2626' : 'var(--text-olive)';
        sackTotalEl.textContent = `Total: ${total} / ${totalSacks} sacks`;
      }
      if (sackWarningEl) sackWarningEl.style.display = total > totalSacks ? '' : 'none';
    }
    sackKgInput?.addEventListener('input', renderSackInputs);
    renderSackInputs();
    document.getElementById('sack-confirm-btn')?.addEventListener('click', () => {
      const allocs = {};
      document.querySelectorAll('.sack-qty-input').forEach(inp => { allocs[inp.dataset.seed] = parseInt(inp.value) || 0; });
      localStorage.setItem('ezseed_da_seed_sacks', JSON.stringify(allocs));
      window.location.reload();
    });
  }

  // Section 7
  const noSeedsEl  = document.getElementById('da-bulk-no-seeds');
  const bulkFormEl = document.getElementById('da-bulk-form');
  const bulkDoneEl = document.getElementById('da-bulk-done');
  const previewEl  = document.getElementById('bulk-preview');

  if (!savedSacks) {
    if (noSeedsEl)  noSeedsEl.style.display = '';
    if (bulkFormEl) bulkFormEl.style.display = 'none';
    if (bulkDoneEl) bulkDoneEl.style.display = 'none';
  } else {
    if (noSeedsEl) noSeedsEl.style.display = 'none';
    const preview = bulkPreview;

    function renderBulkPreviewHTML(rows) {
      return rows.map(({ farmer, seeds }) => {
        const profile   = getProfile(farmer);
        const seedsHTML = seeds.map(({ id, sacks, isMatch, isClosest }) => {
          const seed = getSeed(id);
          if (!seed) return '';
          const pickBadge    = isMatch   ? '<span class="badge badge-your-pick">&#10003; Their Pick</span>' : '';
          const closestBadge = isClosest ? '<span class="badge badge-closest">~ Closest Match</span>' : '';
          return `<div style="display:flex;align-items:center;gap:0.25rem 0.5rem;flex-wrap:wrap;margin-top:0.2rem;">
            <span class="bulk-preview-seed">${seed.name}</span>
            <span class="badge badge-filled">${seed.type}</span>
            ${pickBadge}${closestBadge}
            <span class="sack-pill-dark">${sacks} sacks</span>
          </div>`;
        }).join('');
        return `<div class="bulk-preview-row">
          <div class="bulk-preview-left">
            <span class="bulk-preview-farmer">${profile.name || farmer}</span>
            ${seedsHTML}
          </div>
        </div>`;
      }).join('');
    }

    if (!preview || preview.length === 0) {
      if (bulkFormEl) bulkFormEl.style.display = 'none';
      if (bulkDoneEl) bulkDoneEl.style.display = '';
      const doneList = document.getElementById('da-bulk-done-list');
      if (doneList) doneList.innerHTML = '<p style="color:#888;text-align:center;padding:0.5rem 0;">All pending farmers have been allocated.</p>';
    } else {
      if (bulkFormEl) bulkFormEl.style.display = '';
      if (bulkDoneEl) bulkDoneEl.style.display = 'none';
      const PAGE_SIZE = 10;
      let bulkPage = 0;
      function renderBulkPage() {
        const totalPages = Math.ceil(preview.length / PAGE_SIZE);
        if (previewEl) previewEl.innerHTML = renderBulkPreviewHTML(preview.slice(bulkPage * PAGE_SIZE, (bulkPage + 1) * PAGE_SIZE));
        const pageLabelEl = document.getElementById('bulk-page-label');
        if (pageLabelEl) pageLabelEl.textContent = totalPages > 1 ? `Page ${bulkPage + 1} of ${totalPages}` : '';
        const prevBtn = document.getElementById('bulk-page-prev');
        const nextBtn = document.getElementById('bulk-page-next');
        if (prevBtn) prevBtn.disabled = bulkPage === 0;
        if (nextBtn) nextBtn.disabled = bulkPage >= totalPages - 1;
        const paginationEl = document.getElementById('bulk-pagination');
        if (paginationEl) paginationEl.style.display = totalPages > 1 ? '' : 'none';
      }
      document.getElementById('bulk-page-prev')?.addEventListener('click', () => { if (bulkPage > 0) { bulkPage--; renderBulkPage(); } });
      document.getElementById('bulk-page-next')?.addEventListener('click', () => { if (bulkPage < Math.ceil(preview.length / PAGE_SIZE) - 1) { bulkPage++; renderBulkPage(); } });
      renderBulkPage();
      document.getElementById('bulk-alloc-btn')?.addEventListener('click', () => {
        const current = buildBulkPreview();
        if (!current || current.length === 0) return;
        executeBulkAllocation(current);
        renderSackDoneList();
        if (bulkFormEl) bulkFormEl.style.display = 'none';
        if (bulkDoneEl) {
          bulkDoneEl.style.display = '';
          const doneList = document.getElementById('da-bulk-done-list');
          if (doneList) doneList.innerHTML = renderBulkPreviewHTML(current);
        }
        const changeBtn = document.getElementById('da-change-sacks-btn');
        if (changeBtn) changeBtn.style.display = 'none';
        const changeAllocBtn = document.getElementById('da-change-allocation-btn');
        if (changeAllocBtn) changeAllocBtn.style.display = 'none';
      });
    }
  }
}

// ── DA SELECT VARIETIES ────────────────────────────────────────────────────
const DA_MAX = 5;
let daSelected = [];

function initDASelectVarieties() {
  updateNavGreeting();
  const vrsRec = computeVRSFallback();

  function updateSlotBadge(sel) {
    const seed = getSeed(sel.value);
    const badge = sel.closest('.vrs-slot-row')?.querySelector('.vrs-slot-badge');
    if (badge && seed) badge.textContent = seed.type;
  }

  document.querySelectorAll('.vrs-slot-select').forEach((sel, i) => {
    sel.innerHTML = SEEDS.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
    sel.value = vrsRec[i] || SEEDS[i]?.id;
    updateSlotBadge(sel);
    sel.addEventListener('change', () => updateSlotBadge(sel));
  });

  document.getElementById('da-manual-confirm-btn')?.addEventListener('click', () => {
    const selected = [...document.querySelectorAll('.vrs-slot-select')].map(s => s.value);
    localStorage.setItem('ezseed_da_available_seeds', JSON.stringify(selected));
    localStorage.setItem('ezseed_da_allocated_seeds', JSON.stringify(selected));
    window.location.href = 'da-survey.html';
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
    list.innerHTML = filtered.map(o => {
      const hasFeedback = !!localStorage.getItem(`ezseed_${o.farmer}_alloc_feedback`);
      const badge = hasFeedback ? '<span class="feedback-badge" title="Change request pending">!</span>' : '';
      return `
      <div class="request-row">
        <span class="request-season">${o.farmer} — ${o.season}${badge}</span>
        <span class="${STATUS_CLASS[o.status]}">${STATUS_LABELS[o.status]}</span>
        <a href="da-orderdetail.html?farmer=${o.farmer}&id=${o.id}" class="btn-details">See Details</a>
      </div>`;
    }).join('');
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
  const params  = new URLSearchParams(window.location.search);
  const farmer  = params.get('farmer') || 'FarmerA';
  const orderId = params.get('id');
  const order   = getAllFarmerOrders().find(o => o.farmer === farmer && o.id === orderId);
  if (!order) return;

  const seasonEl = document.getElementById('detail-season');
  if (seasonEl) seasonEl.textContent = order.season;

  const parts = order.season.split(' ');
  const year = parts[0] || '';
  const seasonName = parts.slice(1).join(' ') || order.season;
  const profile = getProfile(farmer);

  const infoFarmer = document.getElementById('info-farmer');
  if (infoFarmer) infoFarmer.textContent = profile.name || farmer;
  const infoLocation = document.getElementById('info-location');
  if (infoLocation) infoLocation.textContent = profile.location || '—';
  const infoSeason = document.getElementById('info-season');
  if (infoSeason) infoSeason.textContent = seasonName;
  const infoYear = document.getElementById('info-year');
  if (infoYear) infoYear.textContent = year;

  // Farmer's seed preference
  const prefList = document.getElementById('farmer-pref-list');
  if (prefList) {
    const inbredPref = JSON.parse(localStorage.getItem(`ezseed_${farmer}_survey_inbred`) || '[]');
    const hybridPref = JSON.parse(localStorage.getItem(`ezseed_${farmer}_survey_hybrid`) || '[]');
    const prefs = [...inbredPref, ...hybridPref];
    prefList.innerHTML = prefs.length === 0
      ? '<p style="color:#888; padding:0.5rem 0;">No survey submitted yet.</p>'
      : prefs.map(id => { const seed = getSeed(id); if (!seed) return ''; return `<div class="sum-row"><div class="sum-row-left"><span class="sum-row-name">${seed.name}</span><span class="badge badge-filled">${seed.type}</span></div></div>`; }).join('');
  }

  // Allocated seed (if decision made)
  const list = document.getElementById('detail-list');
  if (list) {
    if (order.seeds && order.seeds.length > 0) {
      list.innerHTML = order.seeds.map(({ id, sacks }) => { const seed = getSeed(id); if (!seed) return ''; return `<div class="sum-row"><div class="sum-row-left"><span class="sum-row-name">${seed.name}</span><span class="badge badge-filled">${seed.type}</span></div><span class="sack-pill-dark">${sacks} sacks</span></div>`; }).join('');
    } else {
      list.innerHTML = '<p style="color:#888; padding:0.5rem 0;">No seed allocated yet.</p>';
    }
  }

  const statusEl = document.getElementById('detail-status');
  if (statusEl) statusEl.innerHTML = `<span class="${STATUS_CLASS[order.status] || ''}">${STATUS_LABELS[order.status] || order.status}</span>`;

  // Farmer feedback callout
  const feedback = JSON.parse(localStorage.getItem(`ezseed_${farmer}_alloc_feedback`) || 'null');
  const feedbackCallout = document.getElementById('farmer-feedback-callout');
  if (feedbackCallout && feedback) {
    feedbackCallout.style.display = '';
    const reasonEl = document.getElementById('feedback-reason-text');
    const msgEl    = document.getElementById('feedback-message-text');
    if (reasonEl) reasonEl.textContent = FEEDBACK_REASONS[feedback.reason] || feedback.reason;
    if (msgEl)    msgEl.textContent    = feedback.message || '—';
  }

  // Allocation form: initial (pending + no seeds) OR change (has seeds + not delivered)
  const isInitial  = order.status === 'decision_pending' && (!order.seeds || !order.seeds.length);
  const isChange   = order.seeds && order.seeds.length > 0 && order.status !== 'delivered';
  const decisionForm = document.getElementById('decision-form');
  if ((isInitial || isChange) && decisionForm) {
    decisionForm.style.display = '';
    const titleEl = decisionForm.querySelector('.da-section-title');
    if (titleEl) titleEl.textContent = isChange ? 'Change Allocation' : 'Make Allocation Decision';

    const seedSelect = document.getElementById('decision-seed');
    if (seedSelect) {
      const available = JSON.parse(localStorage.getItem('ezseed_da_available_seeds') || 'null') || SEEDS.map(s => s.id);
      seedSelect.innerHTML = available.map(id => {
        const seed = getSeed(id);
        const sel  = order.seeds?.[0]?.id === id ? 'selected' : '';
        return seed ? `<option value="${id}" ${sel}>${seed.name} (${seed.type})</option>` : '';
      }).join('');
    }

    const allotmentInput = document.getElementById('decision-allotment');
    if (allotmentInput && order.seeds?.[0]) allotmentInput.value = order.seeds[0].sacks;

    const confirmBtn = document.getElementById('decision-confirm-btn');
    if (confirmBtn) confirmBtn.textContent = isChange ? 'Update Allocation' : 'Confirm Decision';

    confirmBtn?.addEventListener('click', () => {
      const seedId    = seedSelect?.value;
      const allotment = parseInt(allotmentInput?.value || '20');
      if (!seedId) return;
      const dynamic = JSON.parse(localStorage.getItem(`ezseed_${farmer}_orders`) || '[]');
      const idx = dynamic.findIndex(o => o.id === orderId);
      if (idx !== -1) {
        dynamic[idx].seeds  = [{ id: seedId, sacks: allotment }];
        if (dynamic[idx].status === 'decision_pending') dynamic[idx].status = 'decision_made';
        localStorage.setItem(`ezseed_${farmer}_orders`, JSON.stringify(dynamic));
      } else {
        const overrides = JSON.parse(localStorage.getItem('ezseed_order_statuses') || '{}');
        overrides[orderId] = 'decision_made';
        localStorage.setItem('ezseed_order_statuses', JSON.stringify(overrides));
      }
      localStorage.removeItem(`ezseed_${farmer}_alloc_feedback`);
      localStorage.setItem(`ezseed_${farmer}_allotment`, allotment);
      window.location.href = `da-orderdetail.html?farmer=${farmer}&id=${orderId}`;
    });
  }

  // Update status button (only when seeds are allocated)
  const updateBtn = document.getElementById('da-update-status-btn');
  if (updateBtn) {
    const nextStatus = order.seeds?.length ? STATUS_NEXT[order.status] : null;
    if (nextStatus) {
      updateBtn.style.display = '';
      updateBtn.textContent = `Mark as: ${STATUS_LABELS[nextStatus]}`;
      updateBtn.addEventListener('click', () => {
        setOrderStatus(farmer, orderId, nextStatus);
        window.location.href = `da-orderdetail.html?farmer=${farmer}&id=${orderId}`;
      });
    } else {
      updateBtn.style.display = 'none';
    }
  }
}

// ── DA PREVIOUS SURVEYS ────────────────────────────────────────────────────
function initDAPreviousSurveys() {
  updateNavGreeting();
  const list = document.getElementById('prev-surveys-list');
  if (!list) return;
  const seasons = [...new Set(getAllFarmerOrders().map(o => o.season))];
  const staticSeasons = ['2025 Dry Season', '2025 Wet Season'];
  const allSeasons = [...new Set([...staticSeasons, ...seasons])];
  list.innerHTML = allSeasons.map(s => `
    <div class="request-row">
      <span class="request-season">${s}</span>
      <a href="da-previoussurveydetail.html?season=${encodeURIComponent(s)}" class="btn-details">See Details</a>
    </div>`).join('');
}

// ── DA PREVIOUS SURVEY DETAIL ──────────────────────────────────────────────
function initDAPreviousSurveyDetail() {
  updateNavGreeting();
  const season = decodeURIComponent(new URLSearchParams(window.location.search).get('season') || '');
  const titleEl = document.getElementById('detail-season-title');
  if (titleEl) titleEl.textContent = season ? `${season} — Survey Results` : 'Survey Results';

  const { inbred: iv, hybrid: hv, pairs: pv } = getSurveyVotesDetailed();
  const INBRED_SEEDS = SEEDS.filter(s => s.type === 'Inbred');
  const HYBRID_SEEDS = SEEDS.filter(s => s.type === 'Hybrid');
  function shortName(s) { return s.name.replace(/.*\(/, '').replace(')', ''); }

  makePieChart('chart-inbred', INBRED_SEEDS.map(shortName), INBRED_SEEDS.map(s => iv[s.id] || 0), CHART_COLORS_OLIVE);
  makePieChart('chart-hybrid', HYBRID_SEEDS.map(shortName), HYBRID_SEEDS.map(s => hv[s.id] || 0), CHART_COLORS_BLUE);
  const pairEntries = Object.entries(pv).sort(([,a],[,b]) => b - a);
  if (pairEntries.length > 0) {
    const pairLabels = pairEntries.map(([key]) => { const [i,h] = key.split('||'); const si=getSeed(i),sh=getSeed(h); return `${si?shortName(si):i} + ${sh?shortName(sh):h}`; });
    makePieChart('chart-pair', pairLabels, pairEntries.map(([,v]) => v), CHART_COLORS_MIXED);
  } else { makePieChart('chart-pair', [], [], []); }

  const vrsBody = document.getElementById('vrs-table-body');
  if (vrsBody) {
    const top = pairEntries.slice(0, 5);
    const total = Object.values(iv).reduce((a,b) => a+b, 0) + Object.values(hv).reduce((a,b) => a+b, 0);
    if (top.length === 0) {
      vrsBody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:#888;">No survey data yet.</td></tr>';
    } else {
      vrsBody.innerHTML = top.map(([key, votes]) => {
        const [i,h] = key.split('||'); const si=getSeed(i),sh=getSeed(h);
        const matchPct = total > 0 ? Math.round((votes / (total / SEEDS.length)) * 100) : 0;
        return `<tr>
          <td>${si ? si.name : i}</td>
          <td>${sh ? sh.name : h}</td>
          <td>Matches Survey: ${Math.min(matchPct, 100)}%<br>Cost: Php 4.0M (10% above budget)</td>
        </tr>`;
      }).join('');
    }
  }

  const yd = getSurveyYieldData();
  makePieChart('chart-planted',  ['Planted','Not Planted'], [yd.plantedCount, yd.notPlantedCount], CHART_COLORS_OLIVE);
  const mEnt = Object.entries(yd.methods);
  makePieChart('chart-method',   mEnt.map(([k])=>k), mEnt.map(([,v])=>v), CHART_COLORS_OLIVE);
  const wEnt = Object.entries(yd.waterSources);
  makePieChart('chart-water',    wEnt.map(([k])=>k), wEnt.map(([,v])=>v), CHART_COLORS_BLUE);
  const rEnt = Object.entries(yd.reasons);
  makePieChart('chart-reason',   rEnt.map(([k])=>k), rEnt.map(([,v])=>v), CHART_COLORS_MIXED);
  const dEnt = Object.entries(yd.whatDone);
  makePieChart('chart-whatdone', dEnt.map(([k])=>k), dEnt.map(([,v])=>v), CHART_COLORS_MIXED);

  const allocList = document.getElementById('prev-allocated-list');
  if (allocList) {
    const saved = JSON.parse(localStorage.getItem('ezseed_da_available_seeds') || 'null');
    const ids = saved && saved.length > 0 ? saved : [];
    allocList.innerHTML = ids.length === 0
      ? '<p style="color:#888; padding:0.5rem 0;">No allocation data for this season.</p>'
      : ids.map(id => { const seed = getSeed(id); if (!seed) return ''; return `<div class="sum-row"><div class="sum-row-left"><span class="sum-row-name">${seed.name}</span><span class="badge badge-filled">${seed.type}</span></div></div>`; }).join('');
  }
}

// ── DA VIEW PROFILE ────────────────────────────────────────────────────────
function initDAViewProfile() {
  updateNavGreeting();
}

// ── BOARD HOME ─────────────────────────────────────────────────────────────
function initBoardHome() {
  updateNavGreeting();
  initBoardDefaults();
  const card = document.querySelector('.bento-card-v2[data-card="board-recs"]');
  if (card && localStorage.getItem('ezseed_board_submitted') === 'true') {
    card.href = 'board-view.html';
  }
}

// ── BOARD SELECTION SHARED HELPER ──────────────────────────────────────────
function initBoardSelectionPage(storageKey, seedType, nextHref) {
  updateNavGreeting();
  if (localStorage.getItem('ezseed_board_submitted') === 'true') {
    window.location.href = 'board-view.html'; return;
  }
  initModal();
  injectDynamicStars();

  const allSel   = JSON.parse(localStorage.getItem(storageKey) || '[]');
  let typeSel    = allSel.filter(id => { const s = getSeed(id); return s && s.type === seedType; });
  const otherSel = allSel.filter(id => { const s = getSeed(id); return !s || s.type !== seedType; });

  function refresh() {
    document.querySelectorAll('.seed-row[data-seed-id]').forEach(row => {
      const id = row.dataset.seedId;
      const isSelected = typeSel.includes(id);
      row.classList.toggle('selected', isSelected);
      const star = row.querySelector('.board-sel-star');
      if (star) star.style.visibility = isSelected ? 'visible' : 'hidden';
    });
  }

  document.querySelectorAll('.seed-row[data-seed-id]').forEach(row => {
    row.addEventListener('click', e => {
      if (e.target.closest('.info-btn-v2')) return;
      const id = row.dataset.seedId;
      const idx = typeSel.indexOf(id);
      if (idx !== -1) { typeSel.splice(idx, 1); } else { typeSel.push(id); }
      refresh();
    });
  });
  refresh();

  document.getElementById('next-btn')?.addEventListener('click', () => {
    localStorage.setItem(storageKey, JSON.stringify([...typeSel, ...otherSel]));
    window.location.href = nextHref;
  });
}

function initBoardMAOInbred()   { initBoardSelectionPage('ezseed_board_mao',   'Inbred', 'board-mao-hybrid.html'); }
function initBoardMAOHybrid()   { initBoardSelectionPage('ezseed_board_mao',   'Hybrid', 'board-pao-inbred.html'); }
function initBoardPAOInbred()   { initBoardSelectionPage('ezseed_board_pao',   'Inbred', 'board-pao-hybrid.html'); }
function initBoardPAOHybrid()   { initBoardSelectionPage('ezseed_board_pao',   'Hybrid', 'board-board-inbred.html'); }
function initBoardBoardInbred() { initBoardSelectionPage('ezseed_board_board', 'Inbred', 'board-board-hybrid.html'); }
function initBoardBoardHybrid() { initBoardSelectionPage('ezseed_board_board', 'Hybrid', 'board-summary.html'); }

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
    window.location.href = 'board-board-hybrid.html';
  });
}

// ── BOARD VIEW (read-only after submission) ────────────────────────────────
function initBoardView() {
  updateNavGreeting();
  initModal();
  const recs = getRecommendations();
  const allIds = [...new Set([...recs.mao, ...recs.pao, ...recs.board])];
  renderBoardSummaryList(allIds, recs);

  document.getElementById('change-recs-btn')?.addEventListener('click', () => {
    ['ezseed_board_submitted','ezseed_board_mao','ezseed_board_pao','ezseed_board_board'].forEach(k => localStorage.removeItem(k));
    window.location.href = 'board-mao-inbred.html';
  });
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

// ── BOARD CONFIRMED ────────────────────────────────────────────────────────
function initBoardConfirmed() {
  updateNavGreeting();
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
  if (page === 'allocation-view') initAllocationView();
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
  if (page === 'da-previoussurveys')       initDAPreviousSurveys();
  if (page === 'da-previoussurveydetail')  initDAPreviousSurveyDetail();
  // Board pages
  if (page === 'board-home')          initBoardHome();
  if (page === 'board-mao-inbred')    initBoardMAOInbred();
  if (page === 'board-mao-hybrid')    initBoardMAOHybrid();
  if (page === 'board-pao-inbred')    initBoardPAOInbred();
  if (page === 'board-pao-hybrid')    initBoardPAOHybrid();
  if (page === 'board-board-inbred')  initBoardBoardInbred();
  if (page === 'board-board-hybrid')  initBoardBoardHybrid();
  if (page === 'board-summary')       initBoardSummary();
  if (page === 'board-view')          initBoardView();
  if (page === 'board-confirmed')     initBoardConfirmed();
  if (page === 'board-viewprofile')   initBoardViewProfile();
  // Legacy pages
  if (page === 'seedselect')     { initDropdowns(); initSeedFilter(); }
  if (page === 'seedselect2')    { initSeedFilter(); initSeedSelection(); }
  if (page === 'requestsummary') initRequestSummary();
  if (page === 'seeddetail')     initSeedDetail();
  if (page === 'wsreq')          initRequestDetail();
});
