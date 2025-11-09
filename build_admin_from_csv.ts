import { parsePlacesCsv } from './import_csv';
import { Place } from './types';

const csv = `name,destination,category,level_local,short_pitch,cases|list,pro_tips|list,budget_local,vibe_romance,vibe_fete,vibe_opulence,vibe_calme,vibe_valeur,when_to_go,access_booking,quality_service,quality_cadre,quality_produit,quality_public,quality_fiabilite,quality_signature,dress_code,website,phone,reservation_link,hero_image_url,featured,tags|list,formulas|list,open_late,neighborhood,price_level
Le Céleste,paris,restaurant,core,"Cuisine française contemporaine, service millimétré ; parfait pour dîner business ou date.",date_night|business|celebration,"Demander la table 12 près de la verrière.|Réserver 7–10 jours à l’avance (jeu–sam 20h).|Plat signature: pigeon rôti.",€€€ (menu 95–125€),4,2,3,4,4,"Semaine pour éviter le rush ; 19h45 idéal.","Métro Opéra + 6 min ; vestiaire. Email > téléphone pour confirmation.",5,4,4,4,4,4,Smart casual,https://exemple.com,+33123456789,https://exemple.com/reserver,https://exemple.com/photo.jpg,true,vue_wow|calme,romantique|business,false,opera,3
`;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderPlaceRow(place: Place): string {
  const formulas = place.formulas.join(', ');
  const proTip = place.pro_tips[0] ?? '';
  return `      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; vertical-align: top;">${escapeHtml(place.destination)}</td>
        <td style="padding: 8px; border: 1px solid #ddd; vertical-align: top; font-weight: 600;">${escapeHtml(place.name)}</td>
        <td style="padding: 8px; border: 1px solid #ddd; vertical-align: top;">${escapeHtml(place.category)}</td>
        <td style="padding: 8px; border: 1px solid #ddd; vertical-align: top; text-transform: capitalize;">${escapeHtml(place.level_local)}</td>
        <td style="padding: 8px; border: 1px solid #ddd; vertical-align: top;">${escapeHtml(place.budget_local)}</td>
        <td style="padding: 8px; border: 1px solid #ddd; vertical-align: top;">${escapeHtml(formulas)}</td>
        <td style="padding: 8px; border: 1px solid #ddd; vertical-align: top;">${escapeHtml(proTip)}</td>
        <td style="padding: 8px; border: 1px solid #ddd; vertical-align: top; text-align: center;">${escapeHtml(String(place.quality_scores.service))}</td>
      </tr>`;
}

const places: Place[] = parsePlacesCsv(csv);

const rowsHtml = places.map((place) => renderPlaceRow(place)).join('\n');

const html = `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>Le Répertoire — Admin (depuis CSV)</title>
  </head>
  <body style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 24px;">
    <div style="max-width: 1100px; margin: 0 auto; background-color: #ffffff; padding: 24px 28px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
      <h1 style="margin-top: 0; font-size: 28px;">Le Répertoire — Admin (depuis CSV)</h1>
      <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
        <thead>
          <tr>
            <th style="text-align: left; padding: 10px 8px; border: 1px solid #ddd; background-color: #fafafa;">Destination</th>
            <th style="text-align: left; padding: 10px 8px; border: 1px solid #ddd; background-color: #fafafa;">Name</th>
            <th style="text-align: left; padding: 10px 8px; border: 1px solid #ddd; background-color: #fafafa;">Category</th>
            <th style="text-align: left; padding: 10px 8px; border: 1px solid #ddd; background-color: #fafafa;">Level (local)</th>
            <th style="text-align: left; padding: 10px 8px; border: 1px solid #ddd; background-color: #fafafa;">Budget (local)</th>
            <th style="text-align: left; padding: 10px 8px; border: 1px solid #ddd; background-color: #fafafa;">Tags / Formulas</th>
            <th style="text-align: left; padding: 10px 8px; border: 1px solid #ddd; background-color: #fafafa;">Premier pro tip</th>
            <th style="text-align: center; padding: 10px 8px; border: 1px solid #ddd; background-color: #fafafa;">Qualité service</th>
          </tr>
        </thead>
        <tbody>
${rowsHtml}
        </tbody>
      </table>
    </div>
  </body>
</html>
`;

console.log(html);
