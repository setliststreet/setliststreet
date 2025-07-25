import React, { useState, useEffect } from 'react';

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
  const [isLoading, setIsLoading] = useState(false);

  const upcomingShows: Show[] = [
    {
      id: '1',
      date: '2025-08-01',
      venue: 'Golden Gate Park',
      city: 'San Francisco',
      state: 'CA',
      guest: 'Billy Strings',
    },
    {
      id: '2',
      date: '2025-08-02',
      venue: 'Golden Gate Park',
      city: 'San Francisco',
      state: 'CA',
      guest: 'Sturgill “Johnny Blue Skies” Simpson',
    },
    {
      id: '3',
      date: '2025-08-03',
      venue: 'Golden Gate Park',
      city: 'San Francisco',
      state: 'CA',
      guest: 'Trey Anastasio Band',
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 10);
  }, []);

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
      year: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="mt-6 mb-6 bg-white p-4 sm:p-6 rounded-lg border border-gray-200 max-w-full mx-auto">
      {isLoading ? (
        <div className="flex justify-center">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 text-center font-display">
            Choose Your Show
          </h3>
          <div className="flex flex-row justify-center gap-x-5 overflow-x-auto pb-2">
            {upcomingShows.map((upcomingShow) => (
              <button
                key={upcomingShow.id}
                onClick={() => handleShowSelect(upcomingShow)}
                className={`show-selector-button flex-shrink-0 max-w-[120px] sm:max-w-[140px] text-xs sm:text-sm ${
                  show?.id === upcomingShow.id ? 'aria-selected' : ''
                }`}
                aria-label={`Select show on ${formatShowDate(upcomingShow.date)} with ${upcomingShow.guest}`}
                aria-selected={show?.id === upcomingShow.id}
              >
                <div className="font-semibold text-sm sm:text-base mb-0.5 font-display">
                  {new Date(upcomingShow.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="text-xs sm:text-sm mb-0.5">
                  {new Date(upcomingShow.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
                <div className="h-1"></div>
                <div className="text-xs text-blue-700 font-semibold mb-0.5">
                  {upcomingShow.guest}
                </div>
                <div className="h-1"></div>
                <div className="text-xs text-gray-500">4 pm</div>
                <div className="text-xs text-gray-500">{upcomingShow.city}</div>
              </button>
            ))}
          </div>
          {/* {show && (
            <div className="mt-4 p-3 glass rounded-lg text-center">
              <div className="text-xs sm:text-sm font-medium gradient-text-deadco">
                Selected: {formatShowDate(show.date)}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                {show.venue}, {show.city}, {show.state}
              </div>
            </div>
          )} */}
        </>
      )}
    </div>
  );
}