import { describe, expect, it } from 'vitest';
import type { Place } from './types';
import { buildShortlist } from './shortlist';

const basePlace: Omit<
  Place,
  | 'name'
  | 'destination'
  | 'level_local'
  | 'short_pitch'
  | 'formulas'
  | 'quality_scores'
> = {
  category: 'restaurant',
  cases: ['date_night'],
  pro_tips: ['Tip'],
  budget_local: '€€',
  vibe_meters: { romance: 4, fete: 2, opulence: 3, calme: 3, valeur: 4 },
  when_to_go: 'Evening',
  access_booking: 'Book ahead',
  website: 'https://example.com',
};

const places: Place[] = [
  {
    ...basePlace,
    name: 'Paris Lumina',
    destination: 'Paris',
    level_local: 'core',
    short_pitch: 'Signature parisienne',
    formulas: ['smart_luxury', 'romantique'],
    quality_scores: { service: 5, cadre: 5, produit: 4, public: 4, fiabilite: 4, signature: 4 },
    featured: true,
  },
  {
    ...basePlace,
    name: 'Paris Nightfall',
    destination: 'Paris',
    level_local: 'core',
    short_pitch: 'Vue rooftop',
    formulas: ['teuf_vip', 'ouvert_tard', 'smart_luxury'],
    quality_scores: { service: 4, cadre: 4, produit: 4, public: 4, fiabilite: 4, signature: 4 },
    featured: true,
  },
  {
    ...basePlace,
    name: 'Paris Brio',
    destination: 'Paris',
    level_local: 'smart',
    short_pitch: 'Casual chic',
    formulas: ['smart_luxury'],
    quality_scores: { service: 4, cadre: 4, produit: 5, public: 4, fiabilite: 4, signature: 4 },
  },
  {
    ...basePlace,
    name: 'Ibiza Sol',
    destination: 'Ibiza',
    level_local: 'ultra',
    short_pitch: 'Vue mer',
    formulas: ['ultra_luxe', 'vue_wow'],
    quality_scores: { service: 5, cadre: 5, produit: 5, public: 4, fiabilite: 4, signature: 4 },
  },
  {
    ...basePlace,
    name: 'Lyon Bistro',
    destination: 'Lyon',
    level_local: 'smart',
    short_pitch: 'Cuisine locale',
    formulas: ['business'],
    quality_scores: { service: 4, cadre: 3, produit: 3, public: 4, fiabilite: 4, signature: 4 },
  },
  {
    ...basePlace,
    name: 'Rome Trattoria',
    destination: 'Rome',
    level_local: 'core',
    short_pitch: 'Tradition',
    formulas: ['romantique'],
    quality_scores: { service: 3, cadre: 3, produit: 4, public: 4, fiabilite: 4, signature: 4 },
  },
];

describe('buildShortlist', () => {
  it('returns up to five places sorted by score and featured when brief is empty', () => {
    const shortlist = buildShortlist(places);
    expect(shortlist.map((place) => place.name)).toEqual([
      'Paris Lumina',
      'Ibiza Sol',
      'Paris Nightfall',
      'Paris Brio',
      'Lyon Bistro',
    ]);
  });

  it('filters by destination when provided', () => {
    const shortlist = buildShortlist(places, { destination: 'Paris' });
    expect(shortlist.map((place) => place.name)).toEqual([
      'Paris Lumina',
      'Paris Nightfall',
      'Paris Brio',
    ]);
  });

  it('requires all formulas from the brief to be present', () => {
    const shortlist = buildShortlist(places, { formulas: ['teuf_vip', 'ouvert_tard'] });
    expect(shortlist.map((place) => place.name)).toEqual(['Paris Nightfall']);
  });

  it('filters by local level when specified', () => {
    const shortlist = buildShortlist(places, { level_local: 'ultra' });
    expect(shortlist.map((place) => place.name)).toEqual(['Ibiza Sol']);
  });

  it('keeps featured places ahead when scores are equal', () => {
    const shortlist = buildShortlist(places, { destination: 'Paris', max: 2 });
    expect(shortlist.map((place) => place.name)).toEqual(['Paris Lumina', 'Paris Nightfall']);
  });
});
