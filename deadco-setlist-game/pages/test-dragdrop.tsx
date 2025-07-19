import React, { useState } from 'react';
import SetlistDragDropPicker from '../components/SetlistDragDropPicker';

const sampleSongs = [
  { id: 1, name: 'Bertha' },
  { id: 2, name: 'Althea' },
  { id: 3, name: 'Ripple' },
  { id: 4, name: 'Scarlet Begonias' },
  { id: 5, name: 'Fire on the Mountain' },
  { id: 6, name: 'Truckin' },
  { id: 7, name: 'Shakedown Street' },
];

export default function TestDragDrop() {
  const [setlist, setSetlist] = useState<number[] | null>(null);
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1 className="text-3xl font-bold mb-4">Test Drag & Drop Setlist Picker</h1>
      <SetlistDragDropPicker availableSongs={sampleSongs} numSlots={5} onSubmit={setSetlist} />
      {setlist && (
        <div className="text-xl text-white font-bold mt-4">Setlist: {setlist.map(id => sampleSongs.find(s => s.id === id)?.name).join(', ')}</div>
      )}
    </main>
  );
} 