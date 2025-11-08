import React from 'react';
import type { Place } from './types';
import { PlaceCard } from './PlaceCard';

interface PlaceListProps {
  places: Place[];
  title?: string;
}

const containerStyle: React.CSSProperties = {
  maxWidth: '720px',
  margin: '0 auto',
  padding: '16px',
};

const titleStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 600,
  marginBottom: '16px',
};

const emptyStateStyle: React.CSSProperties = {
  fontSize: '16px',
  color: '#555',
};

export const PlaceList: React.FC<PlaceListProps> = ({ places, title }) => {
  return (
    <section style={containerStyle}>
      {title ? <h1 style={titleStyle}>{title}</h1> : null}
      {places.length === 0 ? (
        <p style={emptyStateStyle}>Aucun lieu ne correspond.</p>
      ) : (
        places.map((place) => <PlaceCard key={place.name} place={place} />)
      )}
    </section>
  );
};

export default PlaceList;
