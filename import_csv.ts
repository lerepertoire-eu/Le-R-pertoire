import {
  Place,
  DestinationCategory,
  UsageCase,
  BudgetLevel,
  FormulaTag,
  Score,
  ProTips,
} from './types';

const CATEGORY_VALUES: DestinationCategory[] = [
  'hotel',
  'restaurant',
  'bar_rooftop',
  'club',
  'spa_wellness',
  'experience',
  'transfer',
];

const LEVEL_VALUES: BudgetLevel[] = ['smart', 'core', 'ultra'];

const USAGE_CASE_VALUES: UsageCase[] = [
  'date_night',
  'after_work',
  'celebration',
  'business',
];

const FORMULA_VALUES: FormulaTag[] = [
  'ultra_luxe',
  'smart_luxury',
  'romantique',
  'teuf_vip',
  'business',
  'nature',
  'vue_wow',
  'ouvert_tard',
  'kids_friendly',
];

const REQUIRED_FIELDS = [
  'name',
  'destination',
  'category',
  'level_local',
  'short_pitch',
  'quality_service',
] as const;

function parseCsvRows(csv: string): string[][] {
  const rows: string[][] = [];
  let current = '';
  let row: string[] = [];
  let inQuotes = false;

  for (let i = 0; i < csv.length; i += 1) {
    const char = csv[i];

    if (inQuotes) {
      if (char === '"') {
        const nextChar = csv[i + 1];
        if (nextChar === '"') {
          current += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        current += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      continue;
    }

    if (char === ',') {
      row.push(current);
      current = '';
      continue;
    }

    if (char === '\n') {
      row.push(current);
      rows.push(row);
      row = [];
      current = '';
      continue;
    }

    if (char === '\r') {
      if (csv[i + 1] === '\n') {
        i += 1;
      }
      row.push(current);
      rows.push(row);
      row = [];
      current = '';
      continue;
    }

    current += char;
  }

  if (current.length > 0 || row.length > 0) {
    row.push(current);
    rows.push(row);
  }

  return rows;
}

function assertInSet<T extends string>(
  value: string,
  allowed: readonly T[],
  field: string,
  rowNumber: number,
): T {
  if (!allowed.includes(value as T)) {
    throw new Error(`Valeur invalide pour « ${field} » (ligne ${rowNumber}): ${value}`);
  }
  return value as T;
}

function toNonEmptyString(value: string | undefined): string {
  return (value ?? '').trim();
}

function parseScore(
  value: string,
  field: string,
  rowNumber: number,
): Score {
  if (!value.trim()) {
    throw new Error(`Champ requis manquant « ${field} » (ligne ${rowNumber})`);
  }
  const num = Number(value);
  if (!Number.isFinite(num)) {
    throw new Error(`Score invalide pour « ${field} » (ligne ${rowNumber}): ${value}`);
  }
  const intVal = Math.trunc(num);
  const clamped = Math.min(5, Math.max(0, intVal));
  return clamped as Score;
}

function parseBoolean(value: string, field: string, rowNumber: number): boolean | undefined {
  const normalized = value.trim().toLowerCase();
  if (!normalized) {
    return undefined;
  }
  if (normalized === 'true') {
    return true;
  }
  if (normalized === 'false') {
    return false;
  }
  throw new Error(`Valeur booléenne invalide pour « ${field} » (ligne ${rowNumber}): ${value}`);
}

function parseList<T extends string>(
  raw: string,
  allowed: readonly T[] | null,
  field: string,
  rowNumber: number,
): T[] {
  if (!raw.trim()) {
    return [];
  }
  const values = raw
    .split('|')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  if (!allowed) {
    return values as T[];
  }

  return values.map((item) => {
    const normalized = item.toLowerCase();
    return assertInSet(normalized as T, allowed, field, rowNumber);
  });
}

function parseProTips(raw: string, rowNumber: number): ProTips {
  const tips = parseList<string>(raw, null, 'pro_tips', rowNumber);
  if (tips.length === 0) {
    throw new Error(`Au moins un pro-tip requis (ligne ${rowNumber})`);
  }
  if (tips.length > 4) {
    throw new Error(`Maximum 4 pro-tips autorisés (ligne ${rowNumber})`);
  }
  return tips as ProTips;
}

function parsePriceLevel(value: string, rowNumber: number): number | undefined {
  if (!value.trim()) {
    return undefined;
  }
  const num = Number(value);
  if (!Number.isInteger(num)) {
    throw new Error(`price_level invalide (ligne ${rowNumber}): ${value}`);
  }
  if (num < 1 || num > 4) {
    throw new Error(`price_level doit être entre 1 et 4 (ligne ${rowNumber}): ${value}`);
  }
  return num;
}

function clampRowLength(row: string[], headerLength: number): string[] {
  if (row.length < headerLength) {
    return [...row, ...new Array(headerLength - row.length).fill('')];
  }
  if (row.length > headerLength) {
    return row.slice(0, headerLength);
  }
  return row;
}

export function parsePlacesCsv(csv: string): Place[] {
  const rows = parseCsvRows(csv);
  if (rows.length === 0) {
    return [];
  }

  const header = rows[0].map((col) => col.trim());
  const dataRows = rows.slice(1);
  const places: Place[] = [];

  dataRows.forEach((rawRow, index) => {
    const rowNumber = index + 2; // 1-based including header
    if (rawRow.every((value) => value.trim().length === 0)) {
      return;
    }
    const row = clampRowLength(rawRow, header.length);
    const record: Record<string, string> = {};
    header.forEach((column, colIndex) => {
      record[column] = row[colIndex] ?? '';
    });

    REQUIRED_FIELDS.forEach((field) => {
      if (!toNonEmptyString(record[field])) {
        throw new Error(`Champ requis manquant « ${field} » (ligne ${rowNumber})`);
      }
    });

    const name = toNonEmptyString(record['name']);
    const destination = toNonEmptyString(record['destination']);

    const category = assertInSet(
      toNonEmptyString(record['category']).toLowerCase() as DestinationCategory,
      CATEGORY_VALUES,
      'category',
      rowNumber,
    );

    const levelLocal = assertInSet(
      toNonEmptyString(record['level_local']).toLowerCase() as BudgetLevel,
      LEVEL_VALUES,
      'level_local',
      rowNumber,
    );

    const shortPitch = toNonEmptyString(record['short_pitch']);

    const cases = Array.from(
      new Set(
        parseList<UsageCase>(
          record['cases|list'] ?? '',
          USAGE_CASE_VALUES,
          'cases|list',
          rowNumber,
        ),
      ),
    );

    const formulasSet = new Set<FormulaTag>();
    ['tags|list', 'formulas|list'].forEach((field) => {
      const parsed = parseList<FormulaTag>(
        record[field] ?? '',
        FORMULA_VALUES,
        field,
        rowNumber,
      );
      parsed.forEach((value) => formulasSet.add(value));
    });
    const formulas = Array.from(formulasSet);

    const proTips = parseProTips(record['pro_tips|list'] ?? '', rowNumber);

    const budgetLocal = toNonEmptyString(record['budget_local']);
    const whenToGo = toNonEmptyString(record['when_to_go']);
    const accessBooking = toNonEmptyString(record['access_booking']);

    const vibeMeters = {
      romance: parseScore(record['vibe_romance'] ?? '', 'vibe_romance', rowNumber),
      fete: parseScore(record['vibe_fete'] ?? '', 'vibe_fete', rowNumber),
      opulence: parseScore(record['vibe_opulence'] ?? '', 'vibe_opulence', rowNumber),
      calme: parseScore(record['vibe_calme'] ?? '', 'vibe_calme', rowNumber),
      valeur: parseScore(record['vibe_valeur'] ?? '', 'vibe_valeur', rowNumber),
    };

    const qualityScores = {
      service: parseScore(record['quality_service'] ?? '', 'quality_service', rowNumber),
      cadre: parseScore(record['quality_cadre'] ?? '', 'quality_cadre', rowNumber),
      produit: parseScore(record['quality_produit'] ?? '', 'quality_produit', rowNumber),
      public: parseScore(record['quality_public'] ?? '', 'quality_public', rowNumber),
      fiabilite: parseScore(record['quality_fiabilite'] ?? '', 'quality_fiabilite', rowNumber),
      signature: parseScore(record['quality_signature'] ?? '', 'quality_signature', rowNumber),
    };

    const featured = parseBoolean(record['featured'] ?? '', 'featured', rowNumber);
    parseBoolean(record['open_late'] ?? '', 'open_late', rowNumber);
    parsePriceLevel(record['price_level'] ?? '', rowNumber);

    const place: Place = {
      name,
      destination,
      category,
      level_local: levelLocal,
      short_pitch: shortPitch,
      cases,
      formulas,
      pro_tips: proTips,
      budget_local: budgetLocal,
      vibe_meters: vibeMeters,
      when_to_go: whenToGo,
      access_booking: accessBooking,
      quality_scores: qualityScores,
    };

    const optionalStringFields: Array<[keyof Place, string | undefined]> = [
      ['dress_code', record['dress_code']?.trim()],
      ['website', record['website']?.trim()],
      ['phone', record['phone']?.trim()],
      ['reservation_link', record['reservation_link']?.trim()],
      ['hero_image_url', record['hero_image_url']?.trim()],
    ];

    optionalStringFields.forEach(([key, value]) => {
      if (value) {
        place[key] = value;
      }
    });

    if (typeof featured === 'boolean') {
      place.featured = featured;
    }

    places.push(place);
  });

  return places;
}
