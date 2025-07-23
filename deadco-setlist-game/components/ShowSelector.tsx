import React, { useState } from 'react';

export interface Show {
  id: string;
  date: string;
  venue: string;
  city: string;
  state: string;
  guest?: string;
}

interface ShowSelectorProps {
  onShowSelect?: (show: Show) => void;
  selectedShow?: Show;
}

export default function ShowSelector({ onShowSelect, selectedShow }: ShowSelectorProps) {
  const [show, setShow] = useState<Show | null>(selectedShow || null);

  const upcomingShows: Show[] = [
    {
      id: '1',
      date: '2025-08-01',
      venue: 'Golden Gate Park',
      city: 'San Francisco',
      state: 'CA',
      guest: 'Billy Strings'
    },
    {
      id: '2',
      date: '2025-08-02',
      venue: 'Golden Gate Park',
      city: 'San Francisco',
      state: 'CA',
      guest: 'Sturgill “Johnny Blue Skies” Simpson'
    },
    {
      id: '3',
      date: '2025-08-03',
      venue: 'Golden Gate Park',
      city: 'San Francisco',
      state: 'CA',
      guest: 'Trey Anastasio Band'
    }
  ];

  const handleShowSelect = (selectedShow: Show) => {
    setShow(selectedShow);
    onShowSelect?.(selectedShow);
  };

  const formatShowDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="mt-6 mb-6 bg-white p-6 rounded-lg border border-gray-200">
      {/* Center the Choose Your Show header */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        Choose Your Show
      </h3>
      <div className="grid grid-cols-[minmax(100px,1fr)_minmax(120px,150px)_minmax(120px,150px)_minmax(120px,150px)_minmax(100px,1fr)] items-center w-full gap-x-2">
        {/* Left margin column */}
        <div></div>
        {/* Show 1 Button */}
        <button
          onClick={() => handleShowSelect(upcomingShows[0])}
          className={`w-full min-h-[140px] flex flex-col items-center justify-center p-3 rounded-lg border border-gray-300 hover:border-blue-300 transition-colors ${show?.id === '1' ? 'bg-blue-50 border-blue-200' : ''}`}
        >
          <div className="font-semibold text-base mb-0.5">Friday</div>
          <div className="text-sm mb-0.5">August 1, 2025</div>
          <div className="h-2"></div>
          <div className="text-xs text-blue-700 font-semibold mb-0.5">Guest: Billy Strings</div>
          <div className="h-2"></div>
          <div className="text-xs text-gray-500 mb-0.5">Music starts 4 pm</div>
          <div className="text-xs text-gray-500">Golden Gate Park, San Francisco</div>
        </button>
        {/* Show 2 Button */}
        <button
          onClick={() => handleShowSelect(upcomingShows[1])}
          className={`w-full min-h-[140px] flex flex-col items-center justify-center p-3 rounded-lg border border-gray-300 hover:border-blue-300 transition-colors ${show?.id === '2' ? 'bg-blue-50 border-blue-200' : ''}`}
        >
          <div className="font-semibold text-base mb-0.5">Saturday</div>
          <div className="text-sm mb-0.5">August 2, 2025</div>
          <div className="h-2"></div>
          <div className="text-xs text-blue-700 font-semibold mb-0.5">Guest: Sturgill “Johnny Blue Skies” Simpson</div>
          <div className="h-2"></div>
          <div className="text-xs text-gray-500 mb-0.5">Music starts 4 pm</div>
          <div className="text-xs text-gray-500">Golden Gate Park, San Francisco</div>
        </button>
        {/* Show 3 Button */}
        <button
          onClick={() => handleShowSelect(upcomingShows[2])}
          className={`w-full min-h-[140px] flex flex-col items-center justify-center p-3 rounded-lg border border-gray-300 hover:border-blue-300 transition-colors ${show?.id === '3' ? 'bg-blue-50 border-blue-200' : ''}`}
        >
          <div className="font-semibold text-base mb-0.5">Sunday</div>
          <div className="text-sm mb-0.5">August 3, 2025</div>
          <div className="h-2"></div>
          <div className="text-xs text-blue-700 font-semibold mb-0.5">Guest: Trey Anastasio Band</div>
          <div className="h-2"></div>
          <div className="text-xs text-gray-500 mb-0.5">Music starts 4 pm</div>
          <div className="text-xs text-gray-500">Golden Gate Park, San Francisco</div>
        </button>
        {/* Right margin column */}
        <div></div>
      </div>
      {/* Remove the selected show text section at the bottom */}
      {/* {show && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-sm font-medium text-green-800">
            Selected: {formatShowDate(show.date)}
          </div>
          <div className="text-sm text-green-600">
            {show.venue}, {show.city}, {show.state}
          </div>
        </div>
      )} */}
    </div>
  );
} 