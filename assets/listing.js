function slugify(s){
  return (s||'').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
}
async function loadSeed(){
  const res = await fetch('seed.sample.json', {cache:'no-store'});
  return res.json();
}
function cardHTML(p){
  const id = p.id || slugify(p.name);
  const pro = (p.pro_tips&&p.pro_tips[0]) ? p.pro_tips[0] : '';
  const budget = p.budget_local ? `<span class="badge">Budget ${p.budget_local}</span>` : '';
  return `
    <div class="card">
      ${p.featured ? '<div class="badge" style="margin-bottom:10px;display:inline-block">Featured</div>' : ''}
      <h3 style="margin-bottom:6px"><a href="place.html?id=${id}" style="text-decoration:none;color:inherit">${p.name}</a></h3>
      <p style="margin:0 0 10px;color:var(--muted)">${p.destination} • ${p.level_local}</p>
      <p style="margin:0 0 10px">${p.short_pitch || ''}</p>
      ${pro ? `<p style="margin:0 0 10px;color:var(--muted)"><strong>Pro-tip :</strong> ${pro}</p>` : ''}
      <div class="tags">${budget}</div>
    </div>`;
}
function match(q, p){
  const hay = `${p.name} ${p.short_pitch||''} ${(p.tags||[]).join(' ')}`.toLowerCase();
  return q ? hay.includes(q.trim().toLowerCase()) : true;
}
(async function(){
  const seed = await loadSeed();
  const $cards = document.getElementById('cards');
  const $dest = document.getElementById('destSelect');
  const $level = document.getElementById('levelSelect');
  const $tag = document.getElementById('tagSelect');
  const $q = document.getElementById('q');
  const $apply = document.getElementById('apply');
  const $count = document.getElementById('count');

  function render(){
    let list = seed.slice();
    if ($dest.value) list = list.filter(p => (p.destination||'').toLowerCase() === $dest.value);
    if ($level.value) list = list.filter(p => (p.level_local||'').toLowerCase() === $level.value);
    if ($tag.value) list = list.filter(p => (p.tags||[]).map(t=>t.toLowerCase()).includes($tag.value));
    if ($q.value.trim()) list = list.filter(p => match($q.value, p));
    list.sort((a,b)=> (b.featured?1:0)-(a.featured?1:0) || (b.quality_scores?.service||0)-(a.quality_scores?.service||0) || a.name.localeCompare(b.name));
    $cards.innerHTML = list.map(cardHTML).join('');
    $count.textContent = `${list.length} ${list.length>1?'lieux':'lieu'}`;
  }

  $apply.addEventListener('click', render);
  $q.addEventListener('keydown', e => { if(e.key==='Enter') render(); });
  render();
})();
