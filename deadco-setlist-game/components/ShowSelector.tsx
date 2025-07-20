import React, { useState } from 'react';

interface Show {
  id: string;
  date: string;
  venue: string;
  city: string;
  state: string;
}

interface ShowSelectorProps {
  onShowSelect?: (show: Show) => void;
  selectedShow?: Show;
}

export default function ShowSelector({ onShowSelect, selectedShow }: ShowSelectorProps) {
  const [show, setShow] = useState<Show | null>(selectedShow || null);

  // Mock upcoming shows
  const upcomingShows: Show[] = [
    {
      id: '1',
      date: '2025-08-01',
      venue: 'Sphere Las Vegas',
      city: 'Las Vegas',
      state: 'NV'
    },
    {
      id: '2', 
      date: '2025-08-02',
      venue: 'Sphere Las Vegas',
      city: 'Las Vegas',
      state: 'NV'
    },
    {
      id: '3',
      date: '2025-08-03',
      venue: 'Sphere Las Vegas', 
      city: 'Las Vegas',
      state: 'NV'
    },
    {
      id: '4',
      date: '2025-08-15',
      venue: 'Madison Square Garden',
      city: 'New York',
      state: 'NY'
    }
  ];

  const handleShowSelect = (selectedShow: Show) => {
    setShow(selectedShow);
    onShowSelect?.(selectedShow);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Choose Your Show
      </h3>
      
      <div className="space-y-3">
        {upcomingShows.map((showOption) => (
          <button
            key={showOption.id}
            onClick={() => handleShowSelect(showOption)}
            className={`
              w-full text-left p-4 border rounded-lg transition-all
              ${show?.id === showOption.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:bg-gray-50'
              }
            `}
          >
            <div className="font-medium text-gray-900">
              {formatDate(showOption.date)}
            </div>
            <div className="text-sm text-gray-600">
              {showOption.venue}
            </div>
            <div className="text-sm text-gray-500">
              {showOption.city}, {showOption.state}
            </div>
          </button>
        ))}
      </div>

      {show && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-sm font-medium text-green-800">
            Selected: {formatDate(show.date)}
          </div>
          <div className="text-sm text-green-600">
            {show.venue}, {show.city}, {show.state}
          </div>
        </div>
      )}
    </div>
  );
} 