import { mkdirSync, writeFileSync } from 'fs';
import { buildShortlist } from './shortlist';
import type { Place } from './types';

const places: Place[] = [
  {
    name: 'La Verrière du Canal',
    destination: 'Paris',
    category: 'restaurant',
    level_local: 'smart',
    short_pitch:
      'Bistronomique du 10e avec cuisine ouverte, carte courte et vins nature soignés, parfait pour un dîner détendu mais calibré.',
    cases: ['date_night', 'after_work'],
    formulas: ['smart_luxury', 'romantique'],
    pro_tips: [
      'Réserver pour 19h45 et demander la table près de la verrière pour le calme.',
      'Plat signature : quasi de veau rôti à partager.',
      'Arriver par le métro Jacques Bonsergent puis 4 minutes à pied.',
    ],
    budget_local: '€€ (menu 48€)',
    vibe_meters: {
      romance: 4,
      fete: 2,
      opulence: 2,
      calme: 3,
      valeur: 5,
    },
    when_to_go: "Jeudi à samedi, premier service pour profiter de la lumière.",
    access_booking:
      "Réserver 5 jours à l'avance via email ; métro République ou Jacques Bonsergent.",
    quality_scores: {
      service: 4,
      cadre: 3,
      produit: 5,
      public: 4,
      fiabilite: 4,
      signature: 4,
    },
    dress_code: 'Casual chic',
  },
  {
    name: 'Atelier Miroir',
    destination: 'Paris',
    category: 'restaurant',
    level_local: 'smart',
    short_pitch:
      'Table cachée dans le Haut-Marais, menu dégustation aux touches végétales et lumière tamisée pour conversations intimes.',
    cases: ['date_night', 'celebration'],
    formulas: ['romantique', 'smart_luxury'],
    pro_tips: [
      'Bloquer le comptoir à deux places côté cuisine ouverte avant 20h30.',
      'Demander le supplément pairing kombucha maison pour surprendre.',
      'Prévoir un détour par la galerie voisine avant le dîner, ouverte jusqu’à 19h.',
    ],
    budget_local: '€€€ (menu dégustation 68€)',
    vibe_meters: {
      romance: 5,
      fete: 2,
      opulence: 3,
      calme: 3,
      valeur: 4,
    },
    when_to_go: 'Jeudi et vendredi pour l’énergie en salle tout en gardant le confort sonore.',
    access_booking:
      "Liste d'attente libérée la veille à midi par SMS ; métro Filles du Calvaire.",
    quality_scores: {
      service: 5,
      cadre: 4,
      produit: 5,
      public: 4,
      fiabilite: 4,
      signature: 5,
    },
    featured: true,
  },
  {
    name: 'Jardin Secret des Archives',
    destination: 'Paris',
    category: 'bar_rooftop',
    level_local: 'smart',
    short_pitch:
      'Rooftop intimiste sur cour classée, cocktails botaniques et playlist soul discrète à deux pas de la rue Vieille-du-Temple.',
    cases: ['date_night', 'after_work'],
    formulas: ['romantique', 'smart_luxury'],
    pro_tips: [
      "Réserver la banquette côté verrière pour profiter du coucher de soleil.",
      'Commander le spritz aux herbes fraîches, en série limitée chaque semaine.',
      'Arriver avant 19h pour éviter la file de l’ascenseur.',
    ],
    budget_local: '€€ (cocktails 16-18€)',
    vibe_meters: {
      romance: 4,
      fete: 3,
      opulence: 3,
      calme: 4,
      valeur: 4,
    },
    when_to_go: 'Mai à septembre, coucher de soleil du dimanche pour ambiance cosy.',
    access_booking: 'Réserver 72h avant via l’application interne ; digicode communiqué le jour même.',
    quality_scores: {
      service: 4,
      cadre: 5,
      produit: 4,
      public: 4,
      fiabilite: 4,
      signature: 4,
    },
  },
];

const brief = {
  destination: 'paris',
  formulas: ['romantique'],
  level_local: 'smart' as const,
  max: 3,
};

const normalizedPlaces: Place[] = places.map((place) => ({
  ...place,
  destination: place.destination.toLowerCase(),
}));

const shortlist = buildShortlist(normalizedPlaces, brief);

const markdownLines: string[] = [];
markdownLines.push('# Shortlist — Paris (Romantique • Smart)');

shortlist.forEach((place, index) => {
  const proTip = place.pro_tips[0];
  const vibes = place.vibe_meters;
  markdownLines.push(
    `${index + 1}) **${place.name}**`,
  );
  markdownLines.push(`   - Pro-tip : ${proTip}`);
  markdownLines.push(`   - Budget : ${place.budget_local}`);
  markdownLines.push(
    `   - Vibes : Romance ${vibes.romance}/5 • Fête ${vibes.fete}/5 • Opulence ${vibes.opulence}/5 • Calme ${vibes.calme}/5 • Valeur ${vibes.valeur}/5`,
  );
  markdownLines.push('');
});

const markdown = markdownLines.join('\n').trimEnd() + '\n';

mkdirSync('examples', { recursive: true });
writeFileSync('examples/shortlist_paris_romantique.md', markdown, 'utf8');

console.log(markdown);
