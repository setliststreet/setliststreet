import React, { useState } from 'react';

interface SongPickerProps {
  onSongSelect?: (song: string) => void;
  selectedSong?: string;
}

export default function SongPicker({ onSongSelect, selectedSong }: SongPickerProps) {
  const [song, setSong] = useState(selectedSong || '');

  const handleSongSelect = (selectedSong: string) => {
    setSong(selectedSong);
    onSongSelect?.(selectedSong);
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Select Song
      </h3>
      <div className="space-y-2">
        <input
          type="text"
          value={song}
          onChange={(e) => handleSongSelect(e.target.value)}
          placeholder="Search for a song..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        {song && (
          <div className="text-sm text-gray-600">
            Selected: {song}
          </div>
        )}
      </div>
    </div>
  );
}
