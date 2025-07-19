import React, { useState } from 'react';

type Band = {
  name: string;
  description: string;
  slug: string;
};

const bands: Band[] = [
  { name: 'Dead & Company', description: 'Current touring band', slug: 'dead-co' },
  { name: 'Grateful Dead', description: 'Original band', slug: 'grateful-dead' },
  { name: 'Phish', description: 'Vermont jam band', slug: 'phish' },
];

export default function BandSelector() {
  const [selectedBand, setSelectedBand] = useState('dead-co');

  return (
    <div>
      <h2>Select Band</h2>
      <div>
        {bands.map((band) => (
          <div key={band.slug}>
            <input
              type="radio"
              id={band.slug}
              name="band"
              value={band.slug}
              checked={selectedBand === band.slug}
              onChange={(e) => setSelectedBand(e.target.value)}
            />
            <label htmlFor={band.slug}>
              {band.name} - {band.description}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
} 