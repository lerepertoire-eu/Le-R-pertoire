import React from 'react';
import type { Place } from './types';

interface PlaceCardProps {
  place: Place;
}

const cardStyle: React.CSSProperties = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '12px',
  backgroundColor: '#fff',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
};

const titleStyle: React.CSSProperties = {
  margin: '0 0 8px',
  fontSize: '18px',
  fontWeight: 600,
};

const textStyle: React.CSSProperties = {
  margin: '4px 0',
  fontSize: '14px',
};

const badgeStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '2px 6px',
  marginLeft: '8px',
  backgroundColor: '#222',
  color: '#fff',
  borderRadius: '4px',
  fontSize: '12px',
  textTransform: 'uppercase',
};

const listLabelStyle: React.CSSProperties = {
  margin: '8px 0 4px',
  fontSize: '13px',
  fontWeight: 600,
  textTransform: 'uppercase',
};

const listStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
  margin: '0 0 12px',
  padding: 0,
  listStyleType: 'none',
};

const tagStyle: React.CSSProperties = {
  padding: '4px 8px',
  backgroundColor: '#f2f2f2',
  borderRadius: '12px',
  fontSize: '12px',
};

export const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
  const { name, destination, category, formulas, budget_local, pro_tips, featured } = place;
  const firstProTip = pro_tips && pro_tips.length > 0 ? pro_tips[0] : undefined;

  return (
    <article style={cardStyle}>
      <h2 style={titleStyle}>
        {name}
        {featured ? <span style={badgeStyle}>Featured</span> : null}
      </h2>
      <p style={textStyle}>
        <strong>Destination:</strong> {destination}
      </p>
      <p style={textStyle}>
        <strong>Catégorie:</strong> {category}
      </p>
      {formulas.length > 0 && (
        <>
          <div style={listLabelStyle}>Formules</div>
          <ul style={listStyle}>
            {formulas.map((formula) => (
              <li key={formula} style={tagStyle}>
                {formula}
              </li>
            ))}
          </ul>
        </>
      )}
      <p style={textStyle}>
        <strong>Budget local:</strong> {budget_local}
      </p>
      {firstProTip && (
        <p style={textStyle}>
          <strong>Pro tip:</strong> {firstProTip}
        </p>
      )}
    </article>
  );
};

export default PlaceCard;
