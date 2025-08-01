import React, { useState } from 'react';

const ITEMS_PER_PAGE = 10;

const SongSelector = ({
  availableSongs,
  setlist,
  handleDragStart,
  addSongByClick,
}: {
  availableSongs: { name: string }[];
  setlist: string[];
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, song: string) => void;
  addSongByClick: (song: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredSongs = availableSongs
    .filter(
      (songObj) =>
        songObj.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !setlist.includes(songObj.name)
    );

  const totalPages = Math.ceil(filteredSongs.length / ITEMS_PER_PAGE);

  const paginatedSongs = filteredSongs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="space-y-2">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for a song..."
        className="w-full p-2 border rounded text-sm"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />

      {/* Song List */}
      <div className="max-h-64 overflow-y-auto space-y-1">
        {paginatedSongs.map((songObj, index) => (
          <div
            key={`${songObj.name}-${index}`}
            draggable
            onDragStart={(e) => handleDragStart(e, songObj.name)}
            onClick={() => addSongByClick(songObj.name)}
            className="p-2 bg-white border border-gray-200 rounded cursor-pointer hover:bg-blue-50 hover:border-blue-300 text-xs shadow-sm"
          >
            {songObj.name}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center pt-2 text-sm">
          <button
            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SongSelector;
