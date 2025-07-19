import React from 'react';

const svgs = [
  { src: '/lightning.svg', label: 'Lightning' },
  { src: '/skull.svg', label: 'Skull' },
  { src: '/turtle.svg', label: 'Turtle' },
  { src: '/guitar.svg', label: 'Guitar' },
  { src: '/bear.svg', label: 'Bear' },
];

export default function TestSVGs() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8 bg-gradient-to-br from-[#C8102E] to-[#005BAC]">
      <h1 className="text-3xl font-bold mb-4 text-white">Test SVGs</h1>
      <div className="flex flex-wrap gap-8 justify-center">
        {svgs.map(svg => (
          <div key={svg.src} className="flex flex-col items-center">
            <img src={svg.src} alt={svg.label} className="w-32 h-32 mb-2 drop-shadow-lg" />
            <span className="text-white font-bold">{svg.label}</span>
          </div>
        ))}
      </div>
    </main>
  );
} 