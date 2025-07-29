import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cxfyeuwosrplubgaluwv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZnlldXdvc3JwbHViZ2FsdXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTczNDUsImV4cCI6MjA2ODM5MzM0NX0.vvmhblExlhQu8QAd8NwAGxbu-eJzjsaRA6912XuQgTM';
const supabase = createClient(supabaseUrl, supabaseKey);



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

const ShowSelector: React.FC<ShowSelectorProps> = ({ onShowSelect, selectedShow }) => {
  const [show, setShow] = useState<Show | null>(selectedShow || null);
  const [isLoading, setIsLoading] = useState(false);

  const upcomingShows: Show[] = [
    {
      id: '1',
      date: '2025-05-15',
      venue: 'Sphere at The Venetian Resort',
      city: 'Las Vegas',
      state: 'NV',
      guest: 'Dead & Company',
    },
    {
      id: '2',
      date: '2025-05-16',
      venue: 'Sphere at The Venetian Resort',
      city: 'Las Vegas',
      state: 'NV',
      guest: 'Dead & Company',
    },
    {
      id: '3',
      date: '2025-05-17',
      venue: 'Sphere at The Venetian Resort',
      city: 'Las Vegas',
      state: 'NV',
      guest: 'Dead & Company',
    },
    // {
    //   id: '2',
    //   date: '2025-08-02',
    //   venue: 'Golden Gate Park',
    //   city: 'San Francisco',
    //   state: 'CA',
    //   guest: 'Sturgill “Johnny Blue Skies” Simpson',
    // },
    // {
    //   id: '3',
    //   date: '2025-08-03',
    //   venue: 'Golden Gate Park',
    //   city: 'San Francisco',
    //   state: 'CA',
    //   guest: 'Trey Anastasio Band',
    // },
  ];

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 10);
  }, []);

  const handleShowSelect = async (selectedShow: Show) => {
    setShow(selectedShow);
    onShowSelect?.(selectedShow);
  
  };

  const formatShowDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="mt-6 mb-6 bg-white p-4 sm:p-6 rounded-lg border border-gray-200 max-w-full mx-auto">
      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin h-5 w-5 border-2 border-t-blue-500 rounded-full"></div>
        </div>
      ) : (
        <>
        <div className='countdown-outer'></div>
          <h3 className="logo-extra-small-text  text-center">
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
                <div className="text-xs text-blue-700 font-semibold mb-0.5">{upcomingShow.guest}</div>
                <div className="h-1"></div>
                <div className="text-xs text-gray-500">4 pm</div>
                <div className="text-xs text-gray-500">{upcomingShow.city}</div>
              </button>
            ))}
          </div>
            <div className='countdown-outer'></div>
        </>
      )}
    </div>
  );
};

export default ShowSelector;