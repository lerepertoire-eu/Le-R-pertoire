export type DestinationCategory =
  | 'hotel'
  | 'restaurant'
  | 'bar_rooftop'
  | 'club'
  | 'spa_wellness'
  | 'experience'
  | 'transfer';

export type FormulaTag =
  | 'ultra_luxe'
  | 'smart_luxury'
  | 'romantique'
  | 'teuf_vip'
  | 'business'
  | 'nature'
  | 'vue_wow'
  | 'ouvert_tard'
  | 'kids_friendly';

export type BudgetLevel = 'smart' | 'core' | 'ultra';

export type UsageCase = 'date_night' | 'after_work' | 'celebration' | 'business';

export type Score = 0 | 1 | 2 | 3 | 4 | 5;

export interface VibeMeters {
  romance: Score;
  fete: Score;
  opulence: Score;
  calme: Score;
  valeur: Score;
}

export interface QualityScores {
  service: Score;
  cadre: Score;
  produit: Score;
  public: Score;
  fiabilite: Score;
  signature: Score;
}

export interface Destination {
  name: string;
  country: string;
  region: string;
  description: string;
  hero_image_url?: string;
}

export type ProTips =
  | [string]
  | [string, string]
  | [string, string, string]
  | [string, string, string, string];

export interface Place {
  name: string;
  destination: string;
  category: DestinationCategory;
  level_local: BudgetLevel;
  short_pitch: string;
  cases: UsageCase[];
  formulas: FormulaTag[];
  pro_tips: ProTips;
  budget_local: string;
  vibe_meters: VibeMeters;
  when_to_go: string;
  access_booking: string;
  quality_scores: QualityScores;
  dress_code?: string;
  website?: string;
  phone?: string;
  reservation_link?: string;
  hero_image_url?: string;
  featured?: boolean;
}

export interface Shortlist {
  destination: string;
  cases: UsageCase[];
  level_local: BudgetLevel;
  when_to_go?: string;
  formulas?: FormulaTag[];
  places: Place[];
}
