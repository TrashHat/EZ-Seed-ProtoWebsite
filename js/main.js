// ── SEED DATA ──────────────────────────────────────────────────────────────
const SEEDS = [
  {
    id: 'rc222',
    name: 'NSIC RC 222 (Tubigan 18)',
    type: 'Inbred',
    mao: true, pao: true, board: true,
    demand: 'Low Demand',
    shortDesc: 'A proven high-yielding inbred variety ideal for both dry and wet seasons. Resistant to bacterial leaf blight and brown planthopper.',
    fullDesc: 'NSIC RC-222, or Tubigan 18, is a "subok na" (proven) variety designed to help you get a much bigger harvest from your irrigated fields. It\'s an inbred variety which normally yields around 5.2 to 6.2 cavans per hectare, but with good management, it can reach as high as 200 cavans. This variety is a hardy choice because it stands strong against common enemies like bacterial leaf blight and tungro, and it isn\'t easily damaged by pests like brown planthopper. Whether you plant during the dry or wet season, Tubigan 18 adapts well to the weather and produces heavy, long grains that mill well, ensuring you have more high-quality rice to sell.'
  },
  {
    id: 'rc200',
    name: 'NSIC RC 200 (Tubigan 17)',
    type: 'Inbred',
    mao: true, pao: false, board: true,
    demand: 'High Demand',
    shortDesc: 'A reliable inbred variety with consistently high yields in irrigated lowland conditions across both wet and dry seasons.',
    fullDesc: 'NSIC RC 200, or Tubigan 17, is a high-yielding inbred variety well-suited for irrigated lowland conditions. It is known for its consistent performance across both wet and dry seasons, making it a dependable choice for rice farmers seeking stable and reliable harvests year after year.'
  },
  {
    id: 'rc460',
    name: 'NSIC RC 460 (SGR 222)',
    type: 'Hybrid',
    mao: true, pao: true, board: false,
    demand: 'Medium Demand',
    shortDesc: 'A high-performance hybrid variety with exceptional yield potential suited for irrigated lowland environments.',
    fullDesc: 'NSIC RC 460, or SGR 222, is a hybrid rice variety known for its exceptional yield potential and broad adaptability. As a hybrid, it typically outperforms inbred varieties in terms of grain yield, making it a strong option for farmers looking to maximize production. Please note: at most one hybrid variety may be included in your seed request.'
  },
  {
    id: 'rc240',
    name: 'NSIC RC 240 (Tubigan 20)',
    type: 'Inbred',
    mao: false, pao: true, board: true,
    demand: 'Low Demand',
    shortDesc: 'A sturdy inbred variety with good disease resistance and quality grain output, suited for irrigated lowland areas.',
    fullDesc: 'NSIC RC 240, or Tubigan 20, is a proven inbred variety with good resistance to common rice diseases including bacterial leaf blight. It produces high-quality grains with good milling recovery, making it a practical choice for farmers who prioritize grain quality alongside a reliable yield.'
  }
];

// Hardcoded past requests for track request pages
const REQUESTS = [
  {
    id: 'ds2026',
    season: '2026 Dry Season',
    status: 'allocation',
    seeds: ['rc222', 'rc460', 'rc240']
  },
  {
    id: 'ws2026',
    season: '2026 Wet Season',
    status: 'pending',
    seeds: ['rc222', 'rc200', 'rc240']
  }
];

// ── HELPERS ────────────────────────────────────────────────────────────────
function getSeed(id) {
  return SEEDS.find(s => s.id === id);
}

function buildBadges(seed) {
  const parts = [];
  parts.push(`<span class="badge badge-filled">${seed.type}</span>`);
  if (seed.mao)   parts.push(`<span class="badge badge-outline">MAO Recommended</span>`);
  if (seed.pao)   parts.push(`<span class="badge badge-outline">PAO Recommended</span>`);
  if (seed.board) parts.push(`<span class="badge badge-outline">Board Recommended</span>`);
  return parts.join('');
}

// ── DROPDOWN LOGIC — seedselect.html ───────────────────────────────────────
function initDropdowns() {
  document.querySelectorAll('.dropdown-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card    = btn.closest('.seed-card');
      const panel   = card.nextElementSibling; // .seed-dropdown
      const isOpen  = panel.classList.contains('open');

      // close all
      document.querySelectorAll('.seed-dropdown.open').forEach(p => p.classList.remove('open'));
      document.querySelectorAll('.seed-card.dropdown-open').forEach(c => c.classList.remove('dropdown-open'));
      document.querySelectorAll('.dropdown-btn.open').forEach(b => b.classList.remove('open'));

      if (!isOpen) {
        panel.classList.add('open');
        card.classList.add('dropdown-open');
        btn.classList.add('open');
      }
    });
  });
}

// ── FILTER LOGIC — seedselect.html ────────────────────────────────────────
const activeFilters = new Set();

function initSeedFilter() {
  // Restore saved filters from previous page
  const saved = localStorage.getItem('ezseed_filters');
  if (saved) JSON.parse(saved).forEach(f => activeFilters.add(f));

  updateFilterChips();
  applyFilters();

  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const f = chip.dataset.filter;
      if (f === 'all') {
        activeFilters.clear();
      } else {
        activeFilters.has(f) ? activeFilters.delete(f) : activeFilters.add(f);
      }
      localStorage.setItem('ezseed_filters', JSON.stringify([...activeFilters]));
      updateFilterChips();
      applyFilters();
    });
  });
}

function updateFilterChips() {
  document.querySelectorAll('.filter-chip').forEach(chip => {
    const f = chip.dataset.filter;
    chip.classList.toggle('active', f === 'all' ? activeFilters.size === 0 : activeFilters.has(f));
  });
}

function applyFilters() {
  document.querySelectorAll('.seed-card-wrapper').forEach(wrapper => {
    if (activeFilters.size === 0) { wrapper.style.display = ''; return; }
    let show = true;
    if (activeFilters.has('inbred')  && wrapper.dataset.type  !== 'inbred')  show = false;
    if (activeFilters.has('hybrid')  && wrapper.dataset.type  !== 'hybrid')  show = false;
    if (activeFilters.has('mao')     && wrapper.dataset.mao   !== 'true')    show = false;
    if (activeFilters.has('pao')     && wrapper.dataset.pao   !== 'true')    show = false;
    if (activeFilters.has('board')   && wrapper.dataset.board !== 'true')    show = false;
    wrapper.style.display = show ? '' : 'none';
  });
}

// ── SELECTION LOGIC — seedselect2.html ────────────────────────────────────
let ranked = []; // ordered array of seed ids (index 0 = rank 1)

function initSeedSelection() {
  const btn = document.getElementById('add-btn');

  document.querySelectorAll('.seed-card[data-seed-id]').forEach(card => {
    card.addEventListener('click', () => {
      const id   = card.dataset.seedId;
      const seed = getSeed(id);
      const idx  = ranked.indexOf(id);

      if (idx !== -1) {
        ranked.splice(idx, 1); // deselect
      } else {
        if (ranked.length >= 3) return;
        if (seed.type === 'Hybrid') {
          const alreadyHasHybrid = ranked.some(sid => getSeed(sid).type === 'Hybrid');
          if (alreadyHasHybrid) {
            alert('You may select at most one hybrid variety.');
            return;
          }
        }
        ranked.push(id);
      }
      refreshSelectionUI();
    });
  });

  refreshSelectionUI();

  btn.addEventListener('click', () => {
    if (ranked.length === 3) {
      localStorage.setItem('ezseed_selection', JSON.stringify(ranked));
      window.location.href = 'requestsummary.html';
    }
  });
}

function refreshSelectionUI() {
  const btn = document.getElementById('add-btn');
  document.querySelectorAll('.seed-card[data-seed-id]').forEach(card => {
    const id    = card.dataset.seedId;
    const idx   = ranked.indexOf(id);
    const rankEl = card.querySelector('.seed-card-rank');
    if (idx !== -1) {
      card.classList.add('selected');
      if (rankEl) rankEl.textContent = (idx + 1) + '.';
    } else {
      card.classList.remove('selected');
      if (rankEl) rankEl.textContent = '';
    }
  });
  if (btn) btn.disabled = ranked.length !== 3;
}

// ── REQUEST SUMMARY — requestsummary.html ─────────────────────────────────
let summaryIds = [];

function renderSummary() {
  const list = document.getElementById('summary-list');
  if (!list) return;
  list.innerHTML = summaryIds.map((id, i) => {
    const seed = getSeed(id);
    if (!seed) return '';
    return `
      <div class="summary-card">
        <div class="reorder-btns">
          <button class="reorder-btn" data-idx="${i}" data-dir="-1" ${i === 0 ? 'disabled' : ''}>&#9650;</button>
          <button class="reorder-btn" data-idx="${i}" data-dir="1"  ${i === summaryIds.length - 1 ? 'disabled' : ''}>&#9660;</button>
        </div>
        <span class="summary-num">${i + 1}.</span>
        <span class="summary-name">${seed.name}</span>
        <div class="seed-card-badges">${buildBadges(seed)}</div>
      </div>`;
  }).join('');

  list.querySelectorAll('.reorder-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx    = parseInt(btn.dataset.idx);
      const newIdx = idx + parseInt(btn.dataset.dir);
      if (newIdx < 0 || newIdx >= summaryIds.length) return;
      [summaryIds[idx], summaryIds[newIdx]] = [summaryIds[newIdx], summaryIds[idx]];
      localStorage.setItem('ezseed_selection', JSON.stringify(summaryIds));
      renderSummary();
    });
  });
}

function initRequestSummary() {
  const raw = localStorage.getItem('ezseed_selection');
  summaryIds = raw ? JSON.parse(raw) : ['rc222', 'rc460', 'rc240'];
  renderSummary();
}

// ── SEED DETAIL — rc222.html ──────────────────────────────────────────────
function initSeedDetail() {
  const params = new URLSearchParams(window.location.search);
  const seed   = getSeed(params.get('id') || 'rc222');
  if (!seed) return;

  const el = id => document.getElementById(id);
  if (el('detail-title'))  el('detail-title').textContent  = seed.name;
  if (el('detail-desc'))   el('detail-desc').textContent   = seed.fullDesc;
  if (el('detail-badges')) el('detail-badges').innerHTML   =
    buildBadges(seed) + ` <span class="badge badge-outline">${seed.demand}</span>`;
}

// ── REQUEST DETAIL — wsreq.html ───────────────────────────────────────────
function initRequestDetail() {
  const params = new URLSearchParams(window.location.search);
  const req    = REQUESTS.find(r => r.id === (params.get('id') || 'ws2026'));
  if (!req) return;

  const el = id => document.getElementById(id);
  if (el('wsreq-season')) el('wsreq-season').textContent = req.season;
  if (el('wsreq-list')) {
    el('wsreq-list').innerHTML = req.seeds.map((sid, i) => {
      const seed = getSeed(sid);
      return `
        <div class="summary-card">
          <span class="summary-num">${i + 1}.</span>
          <span class="summary-name">${seed.name}</span>
          <div class="seed-card-badges">${buildBadges(seed)}</div>
        </div>`;
    }).join('');
  }
  if (el('wsreq-status')) {
    el('wsreq-status').innerHTML = req.status === 'allocation'
      ? `<span class="status-allocated">Allocation Received</span>`
      : `<span class="status-pending">Request Pending</span>`;
  }
}

// ── AUTO-INIT ──────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  if (page === 'seedselect')     { initDropdowns(); initSeedFilter(); }
  if (page === 'seedselect2')    { initSeedFilter(); initSeedSelection(); }
  if (page === 'requestsummary') initRequestSummary();
  if (page === 'seeddetail')     initSeedDetail();
  if (page === 'wsreq')          initRequestDetail();
});
