import type { DestinationCategory, FormulaTag, Place } from './types';

export interface PlaceFilters {
  destination?: string;
  categories?: DestinationCategory[];
  formulas?: FormulaTag[];
  openLate?: boolean;
  q?: string;
}

function normalizeQuery(query: string | undefined): string | undefined {
  if (!query) {
    return undefined;
  }
  const trimmed = query.trim().toLowerCase();
  return trimmed.length > 0 ? trimmed : undefined;
}

function containsAll<T>(source: T[], required: readonly T[]): boolean {
  return required.every((item) => source.includes(item));
}

function matchesQuery(place: Place, query: string | undefined): boolean {
  if (!query) {
    return true;
  }

  const haystacks: string[] = [place.name, place.short_pitch];

  if (place.formulas && place.formulas.length > 0) {
    haystacks.push(place.formulas.join(' '));
  }

  return haystacks.some((value) => value.toLowerCase().includes(query));
}

function matchesOpenLate(place: Place, openLate?: boolean): boolean {
  if (!openLate) {
    return true;
  }
  return place.formulas.includes('ouvert_tard');
}

export function selectPlaces(places: Place[], rawFilters: PlaceFilters = {}): Place[] {
  const filters: PlaceFilters = { ...rawFilters };
  const query = normalizeQuery(filters.q);

  const filtered = places.filter((place) => {
    if (filters.destination && place.destination !== filters.destination) {
      return false;
    }

    if (
      filters.categories &&
      filters.categories.length > 0 &&
      !filters.categories.includes(place.category)
    ) {
      return false;
    }

    if (
      filters.formulas &&
      filters.formulas.length > 0 &&
      !containsAll(place.formulas, filters.formulas)
    ) {
      return false;
    }

    if (!matchesOpenLate(place, filters.openLate)) {
      return false;
    }

    if (!matchesQuery(place, query)) {
      return false;
    }

    return true;
  });

  return [...filtered].sort((a, b) => {
    const aFeatured = a.featured ? 1 : 0;
    const bFeatured = b.featured ? 1 : 0;

    if (aFeatured !== bFeatured) {
      return bFeatured - aFeatured;
    }

    const aService = a.quality_scores.service;
    const bService = b.quality_scores.service;

    if (aService !== bService) {
      return bService - aService;
    }

    return 0;
  });
}
