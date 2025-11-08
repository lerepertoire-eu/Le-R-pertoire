SPEC.md — Guide “Le Répertoire’” (Source de vérité)
Version: v0.1 (brouillon)
 Statut: En cours
 Auteur: Calvin Pénard
 Objectif du doc: Décrire précisément le périmètre, le modèle éditorial et les règles de qualité. Toute livraison (code, contenu, tests) doit s’y conformer.

1) Mission (2–3 phrases)
Un guide européen “Le Répertoire” qui, pour chaque destination, propose des adresses fiables et désirables à trois niveaux relatifs (Smart/Core/Ultra), avec des pro-tips actionnables.
 L’objectif est d’aider à composer des moments haut de gamme (couple, friends, business, fête) sans se perdre dans le bruit.
 La promesse : clair, concret, crédible — pas de superlatifs creux, des choix assumés.

2) Périmètre & Audience
Géographie initiale : Europe (villes iconiques, Méditerranée festive/mer, Alpes romantiques).


Audience : public premium + classes moyennes aspirantes + voyageurs fortunés pressés.


Cas d’usage (exemples) : date night, célébration, after-work, business dinner, week-end fête, retraite calme.



3) Taxonomie (nomenclature de navigation)
Destinations (obligatoire)


Unité éditoriale: ville ou zone cohérente (ex. Paris, Ibiza, Zermatt).


Champs clés: name, country, region, description, hero_image_url.


Catégories (valeurs fermées)


hotel, restaurant, bar_rooftop, club, spa_wellness, experience, transfer (chauffeur/boat/helico).


Formules / Tags (évolutifs, multi-valeurs)


Formules initiales: ultra_luxe, smart_luxury, romantique, teuf_vip, business, nature, vue_wow, ouvert_tard, kids_friendly


Rôle: filtres + mise en scène éditoriale (ce ne sont pas des positions rigides).


Niveaux budgétaires (relatifs à la destination)


smart = meilleur rapport qualité/prix local


core = valeur sûre / signature accessible


ultra = icône / exclusif


Toujours relatif à la ville (éviter Paris vs Lisbonne en valeur absolue).




4) Modèle éditorial (gabarit de fiche)
Chaque fiche lieu doit respecter ce format et ces champs.
4.1 Champs obligatoires (données)
name (string) — nom officiel


destination (ref) — ex. Paris


category (enum) — cf. Catégories


level_local (enum) — smart | core | ultra (relatif à la ville)


short_pitch (string, max ~300 chars) — 2–3 lignes concrètes (sans bla-bla touristique)


cases (list of enum) — cas d’usage principaux (ex. date_night, after_work, celebration, business)


pro_tips (list of strings, 1–4) — table/heure/tenue/plat/cocktail/astuce résa, actionnables


budget_local (string court) — fourchette indicative relative (ex. “€€ à €€€” ou “CHF 25–40 / cocktail”)


vibe_meters (0–5 chacun) — romance, fete, opulence, calme, valeur


when_to_go (string) — saison / jour / créneau / événements


access_booking (string) — comment venir + lead time résa conseillé (ex. “Réserver 7–10 j à l’avance”)


quality_scores (0–5 chacun) — service*, cadre, produit, public, fiabilite, signature


service doit être ≥ 4 pour être publiable (cf. règles d’acceptation)


4.2 Champs facultatifs
dress_code (string) — ex. “Smart casual, no sneakers”


website (url), phone (string), reservation_link (url)


hero_image_url (url)


featured (bool) — mise en avant locale


4.3 Ton & style (charte)
Écriture claire, directe, élégante.


Interdits: superlatifs vagues, clichés touristiques, listes interminables.


Obligatoire: au moins 1 pro-tip concret qui change l’expérience.



5) Barème Qualité & Vibe-meters
5.1 Barème Qualité (0–5)
service (obligatoire ≥4) — constance, soin, détail


cadre — design, vue, acoustique


produit — cuisine/mixologie/wellness


public — mix clientèle & ambiance


fiabilite — stabilité sur 12 derniers mois


signature — élément unique mémorable


Seuil d’inclusion: au moins 4/6 critères ≥4, dont service ≥ 4.
5.2 Vibe-meters (0–5)
romance • fete • opulence • calme • valeur


Échelle relative à la destination ; cohérence > précision pseudo-scientifique.

6) Règles d’acceptation (qualité & éthique)
Pas de “pièges à touristes” (incohérence prix/qualité).


Lieux ouverts < 3 mois → label Bêta jusqu’à validation (retour terrain).


Max 20% d’adresses “purement hype” non confirmées.


Transparence si partenariat/affiliation (label clair Partenaire vérifié).


Pas de contenu mensonger ; actualiser si changement majeur (chef, direction, carte).



7) Newsletter (format éditorial)
Hebdo — “Luxe Aspir’ Weekly”
3 PICKS (1 Smart, 1 Core, 1 Ultra) → mini-pitch 2 lignes + 1 pro-tip chacun


1 MINI-ITINÉRAIRE (soirée complète) → Apéro → Dîner → Rooftop/Club (ou Spa → Dîner romantique)


1 INSIDER TIP (résa/table/horaire/tenue)


CTA : “Besoin d’une shortlist personnalisée ? Répondez à ce mail.”



8) Process conciergerie (référence)
Brief (budget, ambiance, date, contraintes)


Shortlist (3–5 options + pro-tips + créneaux)


Validation (client choisit)


Réservations (si fourni)


Récap (itinéraire + contacts)


Feedback (amélioration continue)



9) Conventions & Contraintes (pour futures implémentations)
Nommage


Slugs en kebab-case (ex. paris, bar-rooftop).


Tags/formules en snake_case (smart_luxury, teuf_vip).


Scores: entiers 0–5 ; service ≥ 4 requis.


Niveaux budgétaires: smart / core / ultra sont relatifs à la destination.


Tri par défaut (si non précisé) : featured desc, puis quality_scores.service desc.



10) Exemples canoniques
10.1 Exemple de fiche (restaurant, Paris)
name : Le Céleste


destination : Paris


category : restaurant


level_local : core


short_pitch : “Cuisine française contemporaine, service millimétré, carte vins précise ; parfait pour dîner business ou date sans fausse note.”


cases : [date_night, business, celebration]


pro_tips :


“Demander la table 12 près de la verrière (acoustique ok).”


“Réserver 7–10 jours à l’avance pour jeudi–samedi 20h.”


“Plat signature: pigeon rôti, partageable.”


budget_local : “€€€ (menu 95–125€)”


vibe_meters : romance 4, fete 2, opulence 3, calme 4, valeur 4


when_to_go : “Semaine pour éviter le rush ; 19h45 pour un service fluide.”


access_booking : “Métro Opéra + 6 min ; vestiaire. Email > téléphone pour confirmation.”


quality_scores : service 5, cadre 4, produit 4, public 4, fiabilite 4, signature 4


dress_code : “Smart casual”


featured : true


10.2 Exemple — ce qu’on ne veut pas
Pitch vague (“meilleur de la ville !!!”), pas de pro-tip, pas de cas d’usage, pas de budget, vibe-meters absents. → Refusé.



11) Process de changement (pour ne pas “se perdre”)
Toute évolution passe d’abord par ce document (SPEC).


Règles :


Modifier la section concernée (ex. ajouter dress_code obligatoire).


Mettre à jour CHANGELOG.md (date, quoi/pourquoi/impact).


Demander à Codex un diff minimal pour appliquer ces changements (types, filtres, tests).


Non-objectifs (pour éviter les dérives) : pas de classements “Top 100”, pas d’UGC non modéré, pas de notation purement chiffrée sans contexte.



12) Qualité & Validation
Triangulation des sources (guides reconnus, bouche-à-oreille, retours clients, test IRL).


Mise à jour en cas de changement notable (chef, politique d’accès, carte, fermeture).


Cohérence des vibe-meters au sein d’une même destination.



13) Annexes (facultatif)
Glossaire:


Smart Luxury: chic, qualitatif, prix intelligents vs destination.


Core: valeur sûre, signature, cœur de cible luxe.


Ultra: icône / exclusif / signature de destination.


Jeux de tests éditoriaux (quand on codera):


Filtrer “romantique + smart + ouvert tard” à Paris → au moins 2 résultats.


Shortlist pour “samedi 21h / date night / budget core” → 3 options avec pro-tips.



Rappel d’usage : à chaque itération produit/contenu, mettre à jour ce SPEC en premier, puis demander tout livrable “conforme au SPEC”. Si ambiguïté, arrêt & options (Codex doit proposer 2–3 options au lieu d’inventer).

