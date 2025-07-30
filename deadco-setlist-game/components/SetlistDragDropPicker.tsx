import React, { useState, useRef, useCallback } from 'react';

interface SetlistDragDropPickerProps {
  onSetlistChange?: (setlist: string[]) => void;
    availableSongs?: { name: string }[]; // Changed here ✅

  maxSongs?: number;
}

interface DragItem {
  type: 'song';
  songName: string;
  index?: number;
}

export default function SetlistDragDropPicker({ 
  onSetlistChange, 
  availableSongs = [], 
  maxSongs = 20 
}: SetlistDragDropPickerProps) {
  const [setlist, setSetlist] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

const filteredSongs = availableSongs
  .filter(song =>
    song.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !setlist.includes(song)
  );





  const updateSetlist = useCallback((newSetlist: string[]) => {
    setSetlist(newSetlist);
    onSetlistChange?.(newSetlist);
  }, [onSetlistChange]);

  const handleDragStart = (e: React.DragEvent, songName: string, index?: number) => {
    const dragData: DragItem = { type: 'song', songName, index };
    setDraggedItem(dragData);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', JSON.stringify(dragData));
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    setDragOverIndex(null);

    if (!draggedItem) return;

    const newSetlist = [...setlist];

    if (draggedItem.index !== undefined) {
      // Reordering within setlist
      const [removed] = newSetlist.splice(draggedItem.index, 1);
      newSetlist.splice(dropIndex, 0, removed);
    } else {
      // Adding from available songs
      newSetlist.splice(dropIndex, 0, draggedItem.songName);
    }

    updateSetlist(newSetlist.slice(0, maxSongs));
    setDraggedItem(null);
  };

  const handleDropOnList = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverIndex(null);

    if (!draggedItem || draggedItem.index !== undefined) return;

    if (setlist.length < maxSongs) {
      updateSetlist([...setlist, draggedItem.songName]);
    }
    setDraggedItem(null);
  };

  const addSongByClick = (songName: string) => {
    if (setlist.length < maxSongs && !setlist.includes(songName)) {
      updateSetlist([...setlist, songName]);
    }
  };

  const removeSong = (index: number) => {
    const newSetlist = [...setlist];
    newSetlist.splice(index, 1);
    updateSetlist(newSetlist);
  };

  const clearSetlist = () => {
    updateSetlist([]);
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Build Your Setlist ({setlist.length}/{maxSongs})
        </h3>
        {setlist.length > 0 && (
          <button
            onClick={clearSetlist}
            className="text-sm text-red-600 hover:text-red-800 font-medium px-3 py-1 rounded border border-red-200 hover:border-red-300 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-5 gap-4">
        {/* Available Songs - Left Side (2/5 width) */}
        <div className="col-span-2">
          <h4 className="font-medium text-gray-800 mb-3 text-sm">Available Songs</h4>
        
          
          {/* Limited Song Display - Show only 5 at a time */}
          <div className="h-48 overflow-y-auto border border-gray-200 rounded-lg p-2 bg-gray-50">
            {filteredSongs.length === 0 ? (
              <p className="text-gray-500 text-xs text-center py-8">
                {searchTerm ? 'No songs found' : 'No available songs'}
              </p>
            ) : (
              <div className="space-y-1">
                {filteredSongs.slice(0, 5).map((song, index) => (
                  <div
                    key={`${song}-${index}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, song)}
                    onClick={() => addSongByClick(song)}
                    className="p-2 bg-white border border-gray-200 rounded cursor-move hover:bg-blue-50 hover:border-blue-300 text-xs transition-all shadow-sm"
                  >
                    {song}
                  </div>
                ))}
               
              </div>
            )}
          </div>
        </div>

        {/* Setlist Builder - Right Side (3/5 width) */}
        <div className="col-span-3">
          <h4 className="font-medium text-gray-800 mb-3 text-sm">Your Setlist → Drag Songs Here</h4>
          <div
            className={`h-64 border-2 border-dashed rounded-lg p-3 transition-colors ${
              dragOverIndex === null && draggedItem ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-50'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
            }}
            onDrop={handleDropOnList}
          >
            {setlist.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <p className="text-sm mb-2">← Drag songs from left or click to add</p>
                <p className="text-xs">Songs will be played in order from top to bottom</p>
              </div>
            ) : (
              <div className="space-y-2">
                {setlist.map((song, index) => (
                  <div
                    key={`${song}-${index}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, song, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, index)}
                    className={`flex items-center justify-between p-2 border rounded cursor-move transition-all ${
                      dragOverIndex === index ? 'border-blue-400 bg-blue-50 shadow-md' : 'border-gray-200 bg-white hover:bg-gray-50 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center flex-1">
                      <span className="text-xs text-purple-600 mr-2 w-6 font-bold">{index + 1}.</span>
                      <span className="text-sm text-gray-800 font-medium">{song}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSong(index);
                      }}
                      className="text-red-500 hover:text-red-700 text-lg ml-2 px-1 rounded hover:bg-red-50 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
                
                {/* Drop zone at the end */}
                <div
                  onDragOver={(e) => handleDragOver(e, setlist.length)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, setlist.length)}
                  className={`h-8 border-2 border-dashed rounded transition-colors ${
                    dragOverIndex === setlist.length ? 'border-blue-400 bg-blue-50' : 'border-transparent'
                  }`}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {setlist.length > 0 && (
        <div className="mt-4 p-3 bg-purple-50 rounded-lg text-sm border border-purple-200">
          <h5 className="font-medium text-purple-800 mb-2">Current Order:</h5>
          <p className="text-purple-700 leading-relaxed">
            {setlist.slice(0, 4).join(' → ')}
            {setlist.length > 4 && ` → ... (+${setlist.length - 4} more)`}
          </p>
        </div>
      )}
    </div>
  );
}
