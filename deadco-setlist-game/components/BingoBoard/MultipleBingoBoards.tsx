import React, { useState } from 'react';

export default function MultipleBingoBoards() {
  const [boards, setBoards] = useState(1);

  const addBoard = () => setBoards(boards + 1);
  const removeBoard = () => setBoards(Math.max(1, boards - 1));

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Bingo Boards ({boards})
        </h3>
        <div className="space-x-2">
          <button 
            onClick={removeBoard}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            -
          </button>
          <button 
            onClick={addBoard}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            +
          </button>
        </div>
      </div>
      
      <div className="grid gap-4">
        {Array.from({ length: boards }, (_, i) => (
          <div key={i} className="border border-gray-300 rounded p-4">
            <h4 className="font-medium mb-2">Board {i + 1}</h4>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 25 }, (_, j) => (
                <div 
                  key={j}
                  className="aspect-square border border-gray-200 rounded text-xs flex items-center justify-center"
                >
                  {j === 12 ? 'FREE' : j + 1}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
