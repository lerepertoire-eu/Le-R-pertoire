import type { Place } from './types';

interface ShortlistBrief {
  destination?: string;
  formulas?: string[];
  level_local?: 'smart' | 'core' | 'ultra';
  max?: number;
}

function matchesFormulas(place: Place, formulas?: string[]): boolean {
  if (!formulas || formulas.length === 0) {
    return true;
  }
  return formulas.every((formula) => place.formulas.includes(formula));
}

function computeScore(place: Place): number {
  const { service, produit, cadre } = place.quality_scores;
  const featuredBonus = place.featured ? 1 : 0;
  return service * 2 + produit + cadre + featuredBonus;
}

export function buildShortlist(
  places: Place[],
  brief: ShortlistBrief = {},
): Place[] {
  const { destination, formulas, level_local, max } = brief;
  const filtered = places.filter((place) => {
    if (destination && place.destination !== destination) {
      return false;
    }

    if (level_local && place.level_local !== level_local) {
      return false;
    }

    if (!matchesFormulas(place, formulas)) {
      return false;
    }

    return true;
  });

  const scored = filtered.map((place, index) => ({
    place,
    score: computeScore(place),
    index,
  }));

  scored.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score;
    }

    const aFeatured = a.place.featured ? 1 : 0;
    const bFeatured = b.place.featured ? 1 : 0;

    if (aFeatured !== bFeatured) {
      return bFeatured - aFeatured;
    }

    return a.index - b.index;
  });

  const limit = typeof max === 'number' && max >= 0 ? max : 5;
  return scored.slice(0, limit).map((entry) => entry.place);
}
