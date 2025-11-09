function slugify(s){
  return (s||'').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
}
function qs(name){const v=new URLSearchParams(location.search).get(name);return v?decodeURIComponent(v):'';}
async function loadSeed(){const r=await fetch('seed.sample.json',{cache:'no-store'});return r.json();}
function fallbackImage(){
  // petit visuel neutre beige/gris (data URI)
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700"><rect width="100%" height="100%" fill="#efe8db"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#9a8f79" font-family="Inter" font-size="32">Le Répertoire</text></svg>`
  );
}
function render(place){
  const $root=document.getElementById('content');
  if(!place){$root.innerHTML=`<p>Lieu introuvable.</p>`;return;}
  const vibes=place.vibe_meters||{}, qs=place.quality_scores||{};
  const tips=(place.pro_tips||[]).map(t=>`<li>${t}</li>`).join('') || '<li>—</li>';
  const tags=(place.tags||[]).map(t=>`<span class="tag">${t}</span>`).join(' ');
  const forms=(place.formulas||[]).map(t=>`<span class="tag">${t}</span>`).join(' ');
  const gallery=(place.photos||[]).slice(0,5);
  const hero=place.hero_image_url || gallery[0] || fallbackImage();
  const budget=place.budget_local?`<span class="badge">Budget ${place.budget_local}</span>`:'';
  const quartier=place.neighborhood?`<span class="badge">Quartier ${place.neighborhood}</span>`:'';
  const prix=place.price_level?`<span class="badge">Prix ${place.price_level}</span>`:'';

  $root.innerHTML=`
    <div class="card" style="padding:0;overflow:hidden">
      <img src="${hero}" alt="" style="width:100%;height:320px;object-fit:cover;border-bottom:1px solid var(--line)"/>
      <div style="padding:22px">
        <h1 style="margin:0 0 6px">${place.name}</h1>
        <p style="margin:0 0 12px;color:var(--muted)">${place.destination} • ${place.category} • ${place.level_local}</p>
        <p style="margin:0 0 16px">${place.short_pitch||''}</p>

        <div class="tags">${tags} ${forms}</div>
        <div class="tags" style="margin-top:10px">${budget}${quartier}${prix}</div>

        <h3 style="margin:18px 0 8px">Pro-tips</h3>
        <ul class="list">${tips}</ul>

        <h3 style="margin:18px 0 8px">Vibes</h3>
        <div class="tags">
          <span class="badge">Romance ${vibes.romance??0}/5</span>
          <span class="badge">Fête ${vibes.fete??0}/5</span>
          <span class="badge">Opulence ${vibes.opulence??0}/5</span>
          <span class="badge">Calme ${vibes.calme??0}/5</span>
          <span class="badge">Valeur ${vibes.valeur??0}/5</span>
        </div>

        <h3 style="margin:18px 0 8px">Scores qualité</h3>
        <div class="tags">
          <span class="badge">Service ${qs.service??0}/5</span>
          <span class="badge">Cadre ${qs.cadre??0}/5</span>
          <span class="badge">Produit ${qs.produit??0}/5</span>
          <span class="badge">Public ${qs.public??0}/5</span>
          <span class="badge">Fiabilité ${qs.fiabilite??0}/5</span>
          <span class="badge">Signature ${qs.signature??0}/5</span>
        </div>

        <div style="margin-top:18px">
          ${place.website?`<a class="btn" href="${place.website}" target="_blank" rel="noopener">Site</a>`:''}
          ${place.reservation_link?`<a class="btn primary" href="${place.reservation_link}" target="_blank" rel="noopener">Réserver cette expérience</a>`:''}
          <a class="btn" href="contact.html?topic=${encodeURIComponent('Capsule: '+place.name)}">Demander la capsule</a>
        </div>

        ${gallery.length>1?`<h3 style="margin:18px 0 8px">Galerie</h3>
        <div class="gallery">
          ${gallery.slice(0,5).map(src=>`<img src="${src}" alt="">`).join('')}
        </div>`:''}
      </div>
    </div>
  `;
}
(async function(){
  const slug=qs('id'); const seed=await loadSeed();
  const found=seed.find(p => (p.id && p.id===slug) || slugify(p.name)===slug);
  render(found);
})();
