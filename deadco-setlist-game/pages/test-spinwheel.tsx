import React, { useState } from 'react';
import SpinWheelSongPicker from '../components/SpinWheelSongPicker';

const sampleSongs = [
  { id: 1, name: 'Bertha' },
  { id: 2, name: 'Althea' },
  { id: 3, name: 'Ripple' },
  { id: 4, name: 'Scarlet Begonias' },
  { id: 5, name: 'Fire on the Mountain' },
  { id: 6, name: 'Truckin' },
  { id: 7, name: 'Shakedown Street' },
];

export default function TestSpinWheel() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1 className="text-3xl font-bold mb-4">Test Spin Wheel Song Picker</h1>
      <SpinWheelSongPicker songs={sampleSongs} onSubmit={setSelected} />
      {selected !== null && (
        <div className="text-xl text-white font-bold mt-4">Selected: {sampleSongs.find(s => s.id === selected)?.name}</div>
      )}
    </main>
  );
} 