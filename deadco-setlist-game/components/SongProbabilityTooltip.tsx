import React from 'react';

interface SongData {
  name: string;
  probability: number;
  lastPlayed?: string;
  frequency: 'Very High' | 'High' | 'Medium' | 'Low' | 'Very Low';
  position: string; // e.g., "opener", "encore", "set 1 closer", etc.
  venueBonus?: number;
  tourBonus?: number;
  additionalInfo?: string;
}

interface SongProbabilityTooltipProps {
  song: SongData;
  isVisible: boolean;
  className?: string;
}

const SongProbabilityTooltip: React.FC<SongProbabilityTooltipProps> = ({ 
  song, 
  isVisible, 
  className = "" 
}) => {
  if (!isVisible) return null;

  const getProbabilityColor = (probability: number) => {
    if (probability >= 15) return 'text-green-400';
    if (probability >= 10) return 'text-yellow-400';
    if (probability >= 5) return 'text-orange-400';
    return 'text-red-400';
  };

  const getProbabilityLabel = (probability: number) => {
    if (probability >= 15) return 'Very Likely';
    if (probability >= 10) return 'Likely';
    if (probability >= 5) return 'Possible';
    return 'Unlikely';
  };

  const getFrequencyEmoji = (frequency: string) => {
    switch (frequency) {
      case 'Very High': return '🔥';
      case 'High': return '⭐';
      case 'Medium': return '📊';
      case 'Low': return '📉';
      case 'Very Low': return '❄️';
      default: return '📊';
    }
  };

  return (
    <div className={`absolute z-20 top-full left-0 mt-2 p-4 bg-gray-900 text-white rounded-lg shadow-xl max-w-sm border border-gray-700 ${className}`}>
      <h4 className="font-semibold mb-3 text-blue-300 flex items-center gap-2">
        📊 {song.position.charAt(0).toUpperCase() + song.position.slice(1)} Statistics
      </h4>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between items-center">
          <span><strong>Probability:</strong></span>
          <span className={`font-bold ${getProbabilityColor(song.probability)}`}>
            {song.probability}%
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span><strong>Classification:</strong></span>
          <span className={getProbabilityColor(song.probability)}>
            {getProbabilityLabel(song.probability)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span><strong>Frequency:</strong></span>
          <span className="flex items-center gap-1">
            {getFrequencyEmoji(song.frequency)} {song.frequency}
          </span>
        </div>
        
        {song.lastPlayed && (
          <div className="flex justify-between items-center">
            <span><strong>Last {song.position}:</strong></span>
            <span className="text-gray-300">{song.lastPlayed}</span>
          </div>
        )}
        
        {song.venueBonus && (
          <div className="flex justify-between items-center">
            <span><strong>Venue Factor:</strong></span>
            <span className="text-green-400">+{song.venueBonus}%</span>
          </div>
        )}
        
        {song.tourBonus && (
          <div className="flex justify-between items-center">
            <span><strong>Tour Position:</strong></span>
            <span className="text-blue-400">+{song.tourBonus}%</span>
          </div>
        )}
        
        {song.additionalInfo && (
          <div className="mt-3 p-2 bg-blue-900 bg-opacity-50 rounded text-xs">
            <span className="text-blue-300">💡 </span>
            {song.additionalInfo}
          </div>
        )}
      </div>
      
      <div className="text-xs text-gray-400 mt-3 pt-2 border-t border-gray-700">
        Based on historical Dead & Company data
      </div>
      
      {/* Tooltip arrow */}
      <div className="absolute top-0 left-4 transform -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900 border-l border-t border-gray-700"></div>
    </div>
  );
};

export default SongProbabilityTooltip; 