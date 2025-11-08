import { parsePlacesCsv } from './import_csv';

const csv = `name,destination,category,level_local,short_pitch,cases|list,pro_tips|list,budget_local,vibe_romance,vibe_fete,vibe_opulence,vibe_calme,vibe_valeur,when_to_go,access_booking,quality_service,quality_cadre,quality_produit,quality_public,quality_fiabilite,quality_signature,dress_code,website,phone,reservation_link,hero_image_url,featured,tags|list,formulas|list,open_late,neighborhood,price_level
Le Céleste,paris,restaurant,core,"Cuisine française contemporaine, service millimétré ; parfait pour dîner business ou date.",date_night|business|celebration,"Demander la table 12 près de la verrière.|Réserver 7–10 jours à l’avance (jeu–sam 20h).|Plat signature: pigeon rôti.",€€€ (menu 95–125€),4,2,3,4,4,"Semaine pour éviter le rush ; 19h45 idéal.","Métro Opéra + 6 min ; vestiaire. Email > téléphone pour confirmation.",5,4,4,4,4,4,Smart casual,https://exemple.com,+33123456789,https://exemple.com/reserver,https://exemple.com/photo.jpg,true,vue_wow|calme,romantique|business,false,opera,3`;

console.log(JSON.stringify(parsePlacesCsv(csv)[0], null, 2));
