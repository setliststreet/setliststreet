import React, { useState, useRef, useCallback } from 'react';

interface SetlistDragDropPickerProps {
  onSetlistChange?: (setlist: string[]) => void;
  availableSongs?: string[];
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

  const filteredSongs = availableSongs.filter(song => 
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
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Build Your Setlist ({setlist.length}/{maxSongs})
        </h3>
        {setlist.length > 0 && (
          <button
            onClick={clearSetlist}
            className="text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Songs */}
        <div>
          <h4 className="font-medium text-gray-800 mb-3">Available Songs</h4>
          <input
            type="text"
            placeholder="Search songs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-3 text-sm"
          />
          <div className="max-h-64 overflow-y-auto border border-gray-200 rounded p-2">
            {filteredSongs.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">
                {searchTerm ? 'No songs found' : 'No available songs'}
              </p>
            ) : (
              filteredSongs.slice(0, 50).map((song, index) => (
                <div
                  key={`${song}-${index}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, song)}
                  onClick={() => addSongByClick(song)}
                  className="p-2 mb-1 bg-gray-50 border border-gray-200 rounded cursor-move hover:bg-gray-100 text-sm transition-colors"
                >
                  {song}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Setlist */}
        <div>
          <h4 className="font-medium text-gray-800 mb-3">Your Setlist</h4>
          <div
            className={`min-h-64 border-2 border-dashed rounded p-3 transition-colors ${
              dragOverIndex === null && draggedItem ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
            }}
            onDrop={handleDropOnList}
          >
            {setlist.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">Drag songs here or click to add</p>
                <p className="text-xs mt-1">Songs will be played in order</p>
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
                    className={`flex items-center justify-between p-2 border rounded cursor-move transition-colors ${
                      dragOverIndex === index ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center flex-1">
                      <span className="text-xs text-gray-400 mr-2 w-6">{index + 1}.</span>
                      <span className="text-sm text-gray-800">{song}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSong(index);
                      }}
                      className="text-red-500 hover:text-red-700 text-xs ml-2 px-1"
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
        <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
          <h5 className="font-medium text-gray-800 mb-2">Preview:</h5>
          <p className="text-gray-600">
            {setlist.slice(0, 3).join(' → ')}
            {setlist.length > 3 && ` → ... (${setlist.length - 3} more)`}
          </p>
        </div>
      )}
    </div>
  );
}
