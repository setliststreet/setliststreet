import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';
import SetlistDragDropPicker from '../components/SetlistDragDropPicker';

const sampleSongs = [
  'Bertha',
  'Althea', 
  'Ripple',
  'Scarlet Begonias',
  'Fire on the Mountain',
  'Truckin\'',
  'Shakedown Street',
  'Casey Jones',
  'Sugar Magnolia',
  'Uncle John\'s Band',
  'Friend of the Devil',
  'Tennessee Jed',
  'Eyes of the World',
  'Deal',
  'Touch of Grey'
];

export default function TestDragDrop() {
  const [setlist, setSetlist] = useState<string[]>([]);
  
  return (
    <MainLayout>
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Test Drag & Drop Setlist Picker</h1>
            <p className="text-gray-600">Test the drag and drop functionality for setlist building</p>
          </div>
          
          <SetlistDragDropPicker 
            availableSongs={sampleSongs} 
            maxSongs={10}
            onSetlistChange={setSetlist} 
          />
          
          {setlist.length > 0 && (
            <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Current Setlist:</h2>
              <p className="text-gray-600">{setlist.join(' → ')}</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
} 