function slugify(s){
  return (s||'').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
}
function qs(name){
  const m = new URLSearchParams(location.search).get(name);
  return m ? decodeURIComponent(m) : '';
}
function pill(label, value){
  return value!=null && value!=='' ? `<span class="badge" style="margin-right:6px">${label}: ${value}</span>` : '';
}
async function loadSeed(){
  const res = await fetch('seed.sample.json', {cache:'no-store'});
  return res.json();
}
function render(place){
  const $root = document.getElementById('content');
  if(!place){
    $root.innerHTML = `<p>Lieu introuvable.</p>`;
    return;
  }
  const vibes = place.vibe_meters || {};
  const qs = place.quality_scores || {};
  const tips = (place.pro_tips||[]).map(t=>`<li>${t}</li>`).join('');
  const tags = (place.tags||[]).map(t=>`<span class="badge" style="margin-right:6px">${t}</span>`).join('');
  const forms = (place.formulas||[]).map(t=>`<span class="badge" style="margin-right:6px">${t}</span>`).join('');

  $root.innerHTML = `
    <div class="card" style="padding:24px">
      <div style="display:flex; gap:18px; align-items:flex-start; flex-wrap:wrap">
        <div style="flex:1 1 320px; min-width:280px">
          ${place.featured ? '<div class="badge" style="background:#0f2a18;border-color:#1e6a3f;color:#7ff1b1;margin-bottom:10px;display:inline-block">Featured</div>' : ''}
          <h2 style="margin:0 0 6px;font-size:24px">${place.name}</h2>
          <p style="margin:0 0 12px;color:#cfd6e3">${place.destination} • ${place.category} • ${place.level_local}</p>
          <p style="margin:0 0 16px">${place.short_pitch||''}</p>

          <div style="margin:8px 0">${tags} ${forms}</div>
          <div style="margin:10px 0">${pill('Budget', place.budget_local)} ${pill('Quartier', place.neighborhood)} ${pill('Prix', place.price_level)}</div>

          <h3 style="margin:16px 0 8px;font-size:18px">Pro-tips</h3>
          <ul class="list">${tips || '<li>—</li>'}</ul>

          <h3 style="margin:16px 0 8px;font-size:18px">Vibes</h3>
          <div class="tags">
            <span class="badge">Romance ${vibes.romance??0}/5</span>
            <span class="badge">Fête ${vibes.fete??0}/5</span>
            <span class="badge">Opulence ${vibes.opulence??0}/5</span>
            <span class="badge">Calme ${vibes.calme??0}/5</span>
            <span class="badge">Valeur ${vibes.valeur??0}/5</span>
          </div>

          <h3 style="margin:16px 0 8px;font-size:18px">Scores qualité</h3>
          <div class="tags">
            <span class="badge">Service ${qs.service??0}/5</span>
            <span class="badge">Cadre ${qs.cadre??0}/5</span>
            <span class="badge">Produit ${qs.produit??0}/5</span>
            <span class="badge">Public ${qs.public??0}/5</span>
            <span class="badge">Fiabilité ${qs.fiabilite??0}/5</span>
            <span class="badge">Signature ${qs.signature??0}/5</span>
          </div>

          <div style="margin-top:18px">
            ${place.website ? `<a class="btn" href="${place.website}" target="_blank" rel="noopener">Site</a>` : ''}
            ${place.reservation_link ? `<a class="btn primary" href="${place.reservation_link}" target="_blank" rel="noopener">Réserver</a>` : ''}
          </div>
        </div>
      </div>
    </div>
  `;
}
(async function(){
  const slug = qs('id'); // ex: place.html?id=le-celeste
  const seed = await loadSeed();
  // on tente match exact sur "id" si présent, sinon slug(name)
  const found = seed.find(p => (p.id && p.id===slug) || slugify(p.name)===slug);
  render(found);
})();
