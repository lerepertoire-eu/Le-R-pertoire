async function loadSeed(){
  const res = await fetch('seed.sample.json', {cache:'no-store'});
  return res.json();
}
function cardHTML(p){
  const tags = (p.tags||[]).slice(0,4).map(t=>`<span class="badge" style="margin-right:6px">${t}</span>`).join('');
  const pro = (p.pro_tips&&p.pro_tips[0]) ? p.pro_tips[0] : '';
  return `
    <div class="card">
      ${p.featured ? '<div class="badge" style="background:#0f2a18;border-color:#1e6a3f;color:#7ff1b1;margin-bottom:10px;display:inline-block">Featured</div>' : ''}
      <h3 style="margin-bottom:6px">${p.name}</h3>
      <p style="margin:0 0 10px;color:#cfd6e3">${p.destination} • ${p.category} • ${p.level_local}</p>
      <p style="margin:0 0 10px">${p.short_pitch || ''}</p>
      ${pro ? `<p style="margin:0 0 6px;color:#9fb2ff"><strong>Pro-tip:</strong> ${pro}</p>` : ''}
      <div style="margin-top:10px">${tags}</div>
    </div>`;
}
function match(q, p){
  const hay = `${p.name} ${p.short_pitch||''} ${ (p.tags||[]).join(' ') }`.toLowerCase();
  return hay.includes(q.trim().toLowerCase());
}
(async function(){
  const seed = await loadSeed();
  const $cards = document.getElementById('cards');
  const $dest = document.getElementById('destSelect');
  const $level = document.getElementById('levelSelect');
  const $q = document.getElementById('q');
  const $apply = document.getElementById('apply');
  const $count = document.getElementById('count');

  function render(){
    let list = seed.slice();
    if ($dest.value) list = list.filter(p => (p.destination||'').toLowerCase() === $dest.value);
    if ($level.value) list = list.filter(p => (p.level_local||'').toLowerCase() === $level.value);
    if ($q.value.trim()) list = list.filter(p => match($q.value, p));
    // tri: featured puis service
    list.sort((a,b)=> (b.featured?1:0)-(a.featured?1:0) || (b.quality_scores?.service||0)-(a.quality_scores?.service||0));
    $cards.innerHTML = list.map(cardHTML).join('');
    $count.textContent = `${list.length} ${list.length>1?'lieux':'lieu'}`;
  }

  $apply.addEventListener('click', render);
  $q.addEventListener('keydown', e => { if(e.key==='Enter') render(); });
  render();
})();
