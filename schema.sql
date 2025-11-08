-- Schema for “Le Répertoire” aligned with SPEC v0.1.

CREATE TABLE destinations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    country TEXT NOT NULL,
    region TEXT NOT NULL,
    description TEXT NOT NULL,
    hero_image_url TEXT
);

CREATE TABLE places (
    id SERIAL PRIMARY KEY,
    destination_id INTEGER NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    level_local TEXT NOT NULL,
    short_pitch TEXT NOT NULL CHECK (char_length(short_pitch) <= 300),
    budget_local TEXT NOT NULL,
    when_to_go TEXT NOT NULL,
    access_booking TEXT NOT NULL,
    dress_code TEXT,
    website TEXT,
    phone TEXT,
    reservation_link TEXT,
    hero_image_url TEXT,
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    vibe_romance SMALLINT NOT NULL,
    vibe_fete SMALLINT NOT NULL,
    vibe_opulence SMALLINT NOT NULL,
    vibe_calme SMALLINT NOT NULL,
    vibe_valeur SMALLINT NOT NULL,
    score_service SMALLINT NOT NULL,
    score_cadre SMALLINT NOT NULL,
    score_produit SMALLINT NOT NULL,
    score_public SMALLINT NOT NULL,
    score_fiabilite SMALLINT NOT NULL,
    score_signature SMALLINT NOT NULL,
    CHECK (category IN ('hotel', 'restaurant', 'bar_rooftop', 'club', 'spa_wellness', 'experience', 'transfer')),
    CHECK (level_local IN ('smart', 'core', 'ultra')),
    CHECK (vibe_romance BETWEEN 0 AND 5),
    CHECK (vibe_fete BETWEEN 0 AND 5),
    CHECK (vibe_opulence BETWEEN 0 AND 5),
    CHECK (vibe_calme BETWEEN 0 AND 5),
    CHECK (vibe_valeur BETWEEN 0 AND 5),
    CHECK (score_service BETWEEN 4 AND 5), -- Règle éditoriale : service ≥ 4.
    CHECK (score_cadre BETWEEN 0 AND 5),
    CHECK (score_produit BETWEEN 0 AND 5),
    CHECK (score_public BETWEEN 0 AND 5),
    CHECK (score_fiabilite BETWEEN 0 AND 5),
    CHECK (score_signature BETWEEN 0 AND 5)
);

CREATE UNIQUE INDEX idx_places_destination_name ON places(destination_id, name);
CREATE INDEX idx_places_destination_featured_service ON places(destination_id, featured DESC, score_service DESC);

CREATE TABLE place_cases (
    place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE,
    usage_case TEXT NOT NULL,
    PRIMARY KEY (place_id, usage_case),
    CHECK (usage_case IN ('date_night', 'after_work', 'celebration', 'business'))
);

CREATE TABLE place_formulas (
    place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE,
    formula_tag TEXT NOT NULL,
    PRIMARY KEY (place_id, formula_tag),
    CHECK (formula_tag IN ('ultra_luxe', 'smart_luxury', 'romantique', 'teuf_vip', 'business', 'nature', 'vue_wow', 'ouvert_tard', 'kids_friendly'))
);

CREATE TABLE place_pro_tips (
    place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE,
    tip_order SMALLINT NOT NULL,
    tip_text TEXT NOT NULL,
    PRIMARY KEY (place_id, tip_order),
    CHECK (tip_order BETWEEN 1 AND 4)
);

CREATE TABLE shortlists (
    id SERIAL PRIMARY KEY,
    destination_id INTEGER NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
    level_local TEXT NOT NULL,
    when_to_go TEXT,
    CHECK (level_local IN ('smart', 'core', 'ultra'))
);

CREATE TABLE shortlist_cases (
    shortlist_id INTEGER NOT NULL REFERENCES shortlists(id) ON DELETE CASCADE,
    usage_case TEXT NOT NULL,
    PRIMARY KEY (shortlist_id, usage_case),
    CHECK (usage_case IN ('date_night', 'after_work', 'celebration', 'business'))
);

CREATE TABLE shortlist_formulas (
    shortlist_id INTEGER NOT NULL REFERENCES shortlists(id) ON DELETE CASCADE,
    formula_tag TEXT NOT NULL,
    PRIMARY KEY (shortlist_id, formula_tag),
    CHECK (formula_tag IN ('ultra_luxe', 'smart_luxury', 'romantique', 'teuf_vip', 'business', 'nature', 'vue_wow', 'ouvert_tard', 'kids_friendly'))
);

CREATE TABLE shortlist_places (
    shortlist_id INTEGER NOT NULL REFERENCES shortlists(id) ON DELETE CASCADE,
    place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE,
    PRIMARY KEY (shortlist_id, place_id)
);

CREATE INDEX idx_shortlists_destination_level ON shortlists(destination_id, level_local);
