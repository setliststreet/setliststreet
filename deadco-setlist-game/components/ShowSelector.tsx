import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SetlistStreetTheme } from '../theme/SetlistStreetTheme';

interface Show {
  id: string;
  date: string;
  venue: string;
  city: string;
  state: string;
  isUpcoming: boolean;
  isSoldOut?: boolean;
  hasSetlist?: boolean;
  specialNotes?: string;
}

interface ShowSelectorProps {
  selectedShow: string;
  onShowChange: (showId: string) => void;
  bandId: string;
  compact?: boolean;
}

// Sample shows data - in real app this would come from API
const SHOWS: Record<string, Show[]> = {
  deadco: [
    {
      id: 'deadco-2025-08-01',
      date: '2025-08-01',
      venue: 'Sphere',
      city: 'Las Vegas',
      state: 'NV',
      isUpcoming: true,
      specialNotes: '🎰 Vegas residency opener!',
    },
    {
      id: 'deadco-2025-08-03',
      date: '2025-08-03',
      venue: 'Sphere', 
      city: 'Las Vegas',
      state: 'NV',
      isUpcoming: true,
      isSoldOut: true,
    },
    {
      id: 'deadco-2025-08-05',
      date: '2025-08-05',
      venue: 'Sphere',
      city: 'Las Vegas', 
      state: 'NV',
      isUpcoming: true,
    },
    {
      id: 'deadco-2024-07-15',
      date: '2024-07-15',
      venue: 'Wrigley Field',
      city: 'Chicago',
      state: 'IL',
      isUpcoming: false,
      hasSetlist: true,
      specialNotes: '⚾ Baseball stadium magic',
    },
  ],
  phish: [
    {
      id: 'phish-2025-08-15',
      date: '2025-08-15',
      venue: 'Madison Square Garden',
      city: 'New York',
      state: 'NY', 
      isUpcoming: true,
      specialNotes: '🏟️ The Garden return!',
    },
  ],
  // ... other bands
};

export default function ShowSelector({ selectedShow, onShowChange, bandId, compact = false }: ShowSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  
  const shows = SHOWS[bandId] || [];
  const selectedShowData = shows.find(s => s.id === selectedShow);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      date: date.getDate(),
      year: date.getFullYear(),
      full: date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
    };
  };

  const ShowCard = ({ show, isSelected = false }: { show: Show; isSelected?: boolean }) => {
    const dateInfo = formatDate(show.date);
    
    return (
      <motion.button
        onClick={() => {
          onShowChange(show.id);
          if (compact) setIsOpen(false);
        }}
        className={`relative p-4 rounded-xl border-2 transition-all backdrop-blur text-left w-full overflow-hidden
          ${isSelected 
            ? 'border-white bg-white/20 shadow-xl' 
            : 'border-white/30 bg-white/10 hover:bg-white/15 hover:border-white/50'
          }
          ${!show.isUpcoming ? 'opacity-80' : ''}
        `}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Date Badge */}
        <div className="flex items-start gap-4">
          <div 
            className="flex-shrink-0 w-16 h-16 rounded-lg flex flex-col items-center justify-center text-white font-bold shadow-lg"
            style={{
              background: show.isUpcoming 
                ? SetlistStreetTheme.gradients.sunset 
                : SetlistStreetTheme.gradients.galaxy,
            }}
          >
            <div className="text-xs">{dateInfo.month}</div>
            <div className="text-lg">{dateInfo.date}</div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-bold text-white text-lg truncate">{show.venue}</h4>
              {show.isSoldOut && (
                <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                  SOLD OUT
                </span>
              )}
              {!show.isUpcoming && show.hasSetlist && (
                <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                  SETLIST
                </span>
              )}
            </div>
            
            <div className="text-white/80 text-sm mb-2">
              {show.city}, {show.state} • {dateInfo.day}
            </div>
            
            {show.specialNotes && (
              <div className="text-white/90 text-sm bg-white/10 rounded-lg px-2 py-1 inline-block">
                {show.specialNotes}
              </div>
            )}
          </div>
        </div>

        {/* Status Indicator */}
        <div className="absolute top-2 right-2">
          {show.isUpcoming ? (
            <motion.div
              className="w-3 h-3 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          ) : (
            <div className="w-3 h-3 bg-gray-400 rounded-full" />
          )}
        </div>

        {/* Selection Indicator */}
        {isSelected && (
          <motion.div
            className="absolute bottom-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.6 }}
          >
            <div className="text-green-600 text-sm font-bold">✓</div>
          </motion.div>
        )}
      </motion.button>
    );
  };

  if (compact) {
    return (
      <div className="relative">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 px-4 py-3 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="text-lg">📅</div>
          <div>
            {selectedShowData ? (
              <div>
                <div className="font-medium">{selectedShowData.venue}</div>
                <div className="text-xs text-white/70">
                  {formatDate(selectedShowData.date).full}
                </div>
              </div>
            ) : (
              <div className="font-medium">Select Show</div>
            )}
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            ⌄
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur rounded-xl shadow-2xl border border-white/20 overflow-hidden z-50 max-h-80 overflow-y-auto"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-2 space-y-2">
                {shows.map((show, index) => (
                  <motion.div
                    key={show.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ShowCard show={show} isSelected={show.id === selectedShow} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 
            className="text-xl font-bold text-white mb-2 flex items-center gap-2"
            style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
          >
            📅 Choose Your Show
          </h3>
          <p className="text-white/80 text-sm">
            Pick a show to predict or review the setlist!
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-lg p-1 border border-white/20">
          <motion.button
            onClick={() => setViewMode('list')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
              viewMode === 'list' ? 'bg-white text-gray-800' : 'text-white/80 hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📋 List
          </motion.button>
          <motion.button
            onClick={() => setViewMode('calendar')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
              viewMode === 'calendar' ? 'bg-white text-gray-800' : 'text-white/80 hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📅 Calendar
          </motion.button>
        </div>
      </div>

      {/* Shows Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, x: viewMode === 'list' ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: viewMode === 'list' ? 20 : -20 }}
          transition={{ duration: 0.3 }}
        >
          {viewMode === 'list' ? (
            <div className="space-y-3">
              {shows.length === 0 ? (
                <motion.div
                  className="text-center py-12 text-white/60"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="text-4xl mb-4">🎭</div>
                  <div className="text-lg">No shows available</div>
                  <div className="text-sm mt-2">Check back soon for upcoming dates!</div>
                </motion.div>
              ) : (
                shows.map((show, index) => (
                  <motion.div
                    key={show.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ShowCard show={show} isSelected={show.id === selectedShow} />
                  </motion.div>
                ))
              )}
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
              <div className="text-center text-white/60">
                <div className="text-4xl mb-4">📅</div>
                <div className="text-lg mb-2">Calendar View Coming Soon!</div>
                <div className="text-sm">For now, use the list view to browse shows</div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Selected Show Preview */}
      {selectedShowData && (
        <motion.div
          className="mt-6 p-4 rounded-xl bg-white/10 backdrop-blur border border-white/20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          key={selectedShow}
        >
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-lg flex flex-col items-center justify-center text-white font-bold"
              style={{
                background: selectedShowData.isUpcoming 
                  ? SetlistStreetTheme.gradients.sunset 
                  : SetlistStreetTheme.gradients.galaxy,
              }}
            >
              <div className="text-xs">{formatDate(selectedShowData.date).month}</div>
              <div className="text-sm">{formatDate(selectedShowData.date).date}</div>
            </div>
            <div>
              <div 
                className="text-xl font-bold text-white mb-1"
                style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
              >
                {selectedShowData.venue}
              </div>
              <div className="text-white/80">
                {formatDate(selectedShowData.date).full} • {selectedShowData.city}, {selectedShowData.state}
              </div>
              {selectedShowData.specialNotes && (
                <div className="text-white/90 text-sm mt-1">
                  {selectedShowData.specialNotes}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
} 