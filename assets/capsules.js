// assets/capsules.js

// 1) DATA : toutes les capsules au même format
const LR_CAPSULES = [
  {
    id: "paris-3j-romantique-core",
    city: "Paris",
    country: "France",
    title: "Paris — 3 jours romantiques",
    type: "City trip • 3 jours",
    level: "Core",
    audience: "Couple",
    vibe: "Balades le long de la Seine, bistrots à bougies, vues sur les toits",
    budget: "600–900 € / personne (hors transport)",
    areas: ["Saint-Germain", "Marais", "Île Saint-Louis"],
    stay: [
      {
        name: "Hôtel de charme – Rive gauche",
        type: "Hôtel",
        bullets: [
          "Boutique-hôtel dans une rue calme, à 5–10 minutes à pied de la Seine",
          "Chambres cosy, bonne literie, quelques chambres avec vue sur les toits",
          "Idéal pour tout faire à pied (café, bistrots, musées)"
        ]
      },
      {
        name: "Appartement haussmannien",
        type: "Appartement",
        bullets: [
          "Appartement lumineux, étage élevé, proche métro",
          "Parfait si vous voulez prendre les petits-déjeuners “à la maison”",
          "Plus intime, plus flexible sur les horaires"
        ]
      }
    ],
    food: [
      {
        name: "Café de quartier – Petit-déj / brunch",
        bullets: ["Parfait pour café + croissant avant de partir se balader"]
      },
      {
        name: "Bistrot le midi – Cuisine simple, plat du jour",
        bullets: ["Près d’un jardin (Luxembourg / Tuileries) pour enchaîner avec une balade"]
      },
      {
        name: "Resto romantique – Dîner à la bougie",
        bullets: ["À garder pour le soir “signature” du séjour"]
      },
      {
        name: "Bistrot plus chill",
        bullets: ["Ambiance vivante, tables serrées, parfait pour un soir sans prise de tête"]
      },
      {
        name: "Bar à vin / cocktails",
        bullets: ["Pour un verre avant ou après le resto"]
      },
      {
        name: "Rooftop / vue sur la ville",
        bullets: ["Pour un coucher de soleil avec vue sur Paris"]
      }
    ],
    activities: [
      "Balade le long de la Seine (fin d’après-midi ou soirée)",
      "Visite d’un grand musée : Louvre ou Orsay",
      "Jardin romantique : Jardin du Luxembourg ou Tuileries",
      "Vue sur Paris : Montmartre / Sacré-Cœur ou terrasse panoramique",
      "Croisière sur la Seine en soirée",
      "Flâner dans le Marais / Saint-Germain, s’arrêter en terrasse",
      "Option chill : spa / hammam en fin de journée"
    ],
    logistics: [
      "Arrivée : train ou avion (CDG / Orly)",
      "Déplacements : métro + marche, VTC le soir si besoin",
      "Hôtel / appart : le plus tôt possible, surtout week-ends",
      "Resto romantique : 1–2 semaines à l’avance"
    ]
  }
];

// petit helper pour générer une carte capsule
function renderCapsuleCard(capsule) {
  return `
    <article class="card capsule">
      <header class="card-header">
        <p class="capsule-city">${capsule.city}</p>
        <h3 class="capsule-title">${capsule.title}</h3>
      </header>

      <p class="capsule-meta">
        ${capsule.type} • Niveau ${capsule.level} • ${capsule.audience}
      </p>

      <p class="capsule-vibe">${capsule.vibe}</p>
      <p class="capsule-budget">${capsule.budget}</p>
      <p class="capsule-areas">
        Quartiers conseillés : ${capsule.areas.join(", ")}
      </p>

      <a class="capsule-link" href="capsule-${capsule.id}.html">
        Voir la capsule
      </a>
    </article>
  `;
}

// 2) ACCUEIL : remplit #capsules si présent
function renderHomeCapsules() {
  const container = document.getElementById("capsules");
  if (!container) return;

  container.innerHTML = LR_CAPSULES.map(renderCapsuleCard).join("");
}

// 3) DESTINATIONS : liste + filtres de base
function renderDestinationsPage() {
  const grid = document.getElementById("destinations-grid");
  if (!grid) return; // on n'est pas sur la page destinations

  const selectCity = document.getElementById("filter-city");
  const selectLevel = document.getElementById("filter-level");
  const inputSearch = document.getElementById("filter-search");
  const countBadge = document.getElementById("destinations-count");

  // remplir les listes déroulantes à partir des données
  const uniqueCities = [...new Set(LR_CAPSULES.map(c => c.city))];
  const uniqueLevels = [...new Set(LR_CAPSULES.map(c => c.level))];

  uniqueCities.forEach(city => {
    const opt = document.createElement("option");
    opt.value = city;
    opt.textContent = city;
    selectCity.appendChild(opt);
  });

  uniqueLevels.forEach(level => {
    const opt = document.createElement("option");
    opt.value = level;
    opt.textContent = level;
    selectLevel.appendChild(opt);
  });

  function applyFilters() {
    const city = selectCity.value;
    const level = selectLevel.value;
    const term = inputSearch.value.trim().toLowerCase();

    const filtered = LR_CAPSULES.filter(c => {
      if (city && c.city !== city) return false;
      if (level && c.level !== level) return false;

      if (term) {
        const haystack = [
          c.city,
          c.title,
          c.vibe,
          (c.areas || []).join(" ")
        ].join(" ").toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      return true;
    });

    grid.innerHTML = filtered.map(renderCapsuleCard).join("");

    if (countBadge) {
      const n = filtered.length;
      countBadge.textContent = n + (n > 1 ? " lieux" : " lieu");
    }
  }

  // événements filtres
  selectCity.addEventListener("change", applyFilters);
  selectLevel.addEventListener("change", applyFilters);
  inputSearch.addEventListener("input", applyFilters);

  // rendu initial
  applyFilters();
}

document.addEventListener("DOMContentLoaded", () => {
  renderHomeCapsules();
  renderDestinationsPage();
});
