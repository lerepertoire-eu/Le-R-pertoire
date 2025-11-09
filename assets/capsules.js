function slugify(s){
  return (s||'').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
}
async function loadSeed(){const r=await fetch('seed.sample.json',{cache:'no-store'});return r.json();}
function fallbackImage(){
  return 'data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700"><rect width="100%" height="100%" fill="#efe8db"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#9a8f79" font-family="Inter" font-size="32">Le Répertoire</text></svg>');
}
function card(p){
  const id = p.id || slugify(p.name);
  const img = p.hero_image_url || (p.photos && p.photos[0]) || fallbackImage();
  const budget = p.budget_local ? `<span class="badge">Budget ${p.budget_local}</span>` : '';
  return `
    <div class="card" style="padding:0;overflow:hidden">
      <img src="${img}" alt="" style="width:100%;height:180px;object-fit:cover;border-bottom:1px solid var(--line)"/>
      <div style="padding:14px">
        <h3 style="margin:0 0 6px;font-size:18px"><a href="place.html?id=${id}" style="text-decoration:none;color:inherit">${p.name}</a></h3>
        <div class="meta">${p.destination} • ${p.level_local}</div>
        <p style="margin:0 0 12px">${p.short_pitch || ''}</p>
        <div class="tags">${budget}</div>
        <p style="margin-top:12px"><a class="btn inline" href="place.html?id=${id}">
          <svg><use href="assets/icons.svg#icon-arrow"></use></svg> Voir la capsule
        </a></p>
      </div>
    </div>`;
}
(async function(){
  const target = document.getElementById('capsules');
  if(!target) return;
  const seed = await loadSeed();
  // choix : d'abord featured, puis meilleurs services, limite 3
  const list = seed
    .slice()
    .sort((a,b)=> (b.featured?1:0)-(a.featured?1:0) || (b.quality_scores?.service||0)-(a.quality_scores?.service||0))
    .slice(0,3);
  target.innerHTML = list.map(card).join('');
})();
