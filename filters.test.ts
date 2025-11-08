import { describe, expect, it } from 'vitest';
import type { Place } from './types';
import { selectPlaces } from './filters';

const basePlace: Omit<Place, 'name' | 'destination' | 'category' | 'short_pitch'> = {
  level_local: 'core',
  cases: ['date_night'],
  formulas: ['smart_luxury'],
  pro_tips: ['Tip'],
  budget_local: '€€',
  vibe_meters: { romance: 4, fete: 2, opulence: 3, calme: 3, valeur: 4 },
  when_to_go: 'Evening',
  access_booking: 'Book ahead',
  quality_scores: { service: 4, cadre: 4, produit: 4, public: 4, fiabilite: 4, signature: 4 },
};

const places: Place[] = [
  {
    ...basePlace,
    name: 'Le Céleste',
    destination: 'Paris',
    category: 'restaurant',
    short_pitch: 'Cuisine française contemporaine',
    formulas: ['smart_luxury', 'romantique'],
    quality_scores: { ...basePlace.quality_scores, service: 5 },
    featured: true,
  },
  {
    ...basePlace,
    name: 'Skyline',
    destination: 'Paris',
    category: 'bar_rooftop',
    short_pitch: 'Vue spectaculaire et cocktails',
    formulas: ['teuf_vip', 'ouvert_tard'],
    quality_scores: { ...basePlace.quality_scores, service: 4 },
    featured: false,
  },
  {
    ...basePlace,
    name: 'Villa Alba',
    destination: 'Ibiza',
    category: 'hotel',
    short_pitch: 'Retraite luxe vue mer',
    formulas: ['ultra_luxe', 'romantique', 'ouvert_tard'],
    quality_scores: { ...basePlace.quality_scores, service: 5 },
    featured: false,
  },
  {
    ...basePlace,
    name: 'Club Eclipse',
    destination: 'Paris',
    category: 'club',
    short_pitch: 'Nightlife haut de gamme',
    formulas: ['teuf_vip', 'ouvert_tard', 'smart_luxury'],
    quality_scores: { ...basePlace.quality_scores, service: 3 },
    featured: true,
  },
  {
    ...basePlace,
    name: 'Business Hub',
    destination: 'Paris',
    category: 'restaurant',
    short_pitch: 'Parfait pour réunions',
    formulas: ['business', 'smart_luxury'],
    quality_scores: { ...basePlace.quality_scores, service: 4 },
    featured: false,
  },
];

describe('selectPlaces', () => {
  it('returns all places sorted by featured then service when no filters are provided', () => {
    const result = selectPlaces(places);
    expect(result.map((place) => place.name)).toEqual([
      'Le Céleste',
      'Club Eclipse',
      'Skyline',
      'Business Hub',
      'Villa Alba',
    ]);
  });

  it('filters by destination', () => {
    const result = selectPlaces(places, { destination: 'Ibiza' });
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe('Villa Alba');
  });

  it('applies category and formula filters together', () => {
    const result = selectPlaces(places, {
      destination: 'Paris',
      categories: ['restaurant'],
      formulas: ['smart_luxury'],
    });
    expect(result.map((place) => place.name)).toEqual(['Le Céleste', 'Business Hub']);
  });

  it('filters on openLate by requiring the ouvert_tard formula', () => {
    const result = selectPlaces(places, { destination: 'Paris', openLate: true });
    expect(result.map((place) => place.name)).toEqual(['Skyline', 'Club Eclipse']);
  });

  it('matches the free-text query across name, short_pitch and formulas then sorts', () => {
    const result = selectPlaces(places, { q: 'romantique' });
    expect(result.map((place) => place.name)).toEqual(['Le Céleste', 'Villa Alba']);
  });
});
