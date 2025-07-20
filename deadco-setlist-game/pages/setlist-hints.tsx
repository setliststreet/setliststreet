import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

const SetlistHintsPage = () => {
  const [activeTab, setActiveTab] = useState('positions');

  const tabs = [
    { id: 'positions', label: 'Song Positions', icon: '🎵' },
    { id: 'relationships', label: 'Song Pairs', icon: '🔗' },
    { id: 'timing', label: 'Timing Patterns', icon: '⏰' },
    { id: 'analytics', label: 'Advanced Analytics', icon: '📊' },
  ];

  const StatTable = ({ title, description, columns, placeholder = true }: {
    title: string;
    description: string;
    columns: string[];
    placeholder?: boolean;
  }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      
      {placeholder ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500 text-lg mb-2">📊 Statistical Data Coming Soon</p>
          <p className="text-gray-400 text-sm">
            This table will show {columns.join(', ').toLowerCase()} based on historical Dead & Company data
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                {columns.map((col, index) => (
                  <th key={index} className="border border-gray-200 px-4 py-2 text-left font-semibold">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={columns.length} className="border border-gray-200 px-4 py-8 text-center text-gray-500">
                  Data will be populated from historical analysis
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderPositionsTab = () => (
    <div className="space-y-6">
      <StatTable
        title="Set 1 Openers"
        description="Most likely songs to open the first set based on historical frequency"
        columns={['Song Name', 'Probability %', 'Last Used', 'Venue Type', 'Weather Factor']}
      />
      
      <StatTable
        title="Set 1 Closers"
        description="Songs most frequently used to close the first set"
        columns={['Song Name', 'Probability %', 'Avg Set Length', 'Set 2 Transition', 'Seasonal Trend']}
      />
      
      <StatTable
        title="Set 2 Openers"
        description="Second set opening songs and their probability factors"
        columns={['Song Name', 'Probability %', 'Break Length Factor', 'Energy Level', 'Set 1 Correlation']}
      />
      
      <StatTable
        title="Set 2 Closers"
        description="Songs that typically close the second set before encore"
        columns={['Song Name', 'Probability %', 'Encore Predictor', 'Show Length', 'Venue Size Factor']}
      />
      
      <StatTable
        title="Encore Songs"
        description="Most common encore selections and positioning"
        columns={['Song Name', 'Probability %', 'Encore Position', 'End Time Factor', 'Audience Energy']}
      />
      
      <StatTable
        title="Drums/Space Analysis"
        description="Songs before and after the Drums/Space segment"
        columns={['Position', 'Song Name', 'Probability %', 'Duration Factor', 'Transition Pattern']}
      />
    </div>
  );

  const renderRelationshipsTab = () => (
    <div className="space-y-6">
      <StatTable
        title="Most Likely Song Pairs"
        description="Songs that frequently appear together in sequence"
        columns={['Song A', 'Song B', 'Pair Probability %', 'Position', 'Recent Trend']}
      />
      
      <StatTable
        title="Three-Song Sequences"
        description="Common three-song combinations and flow patterns"
        columns={['Song 1', 'Song 2', 'Song 3', 'Sequence %', 'Set Preference']}
      />
      
      <StatTable
        title="Thematic Groupings"
        description="Songs grouped by energy, key, or thematic content"
        columns={['Theme', 'Songs', 'Probability %', 'Typical Position', 'Flow Pattern']}
      />
      
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">🎼 Song Relationship Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Classic Pairings</h4>
            <p className="text-gray-600 mb-2">[PLACEHOLDER] China Cat Sunflower → I Know You Rider</p>
            <p className="text-gray-600 mb-2">[PLACEHOLDER] Scarlet Begonias → Fire on the Mountain</p>
            <p className="text-gray-600">[PLACEHOLDER] Help on the Way → Slipknot! → Franklin's Tower</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Modern Combinations</h4>
            <p className="text-gray-600 mb-2">[PLACEHOLDER] Eyes of the World → Estimated Prophet</p>
            <p className="text-gray-600 mb-2">[PLACEHOLDER] Terrapin Station → Drums/Space</p>
            <p className="text-gray-600">[PLACEHOLDER] Touch of Grey → encore position</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTimingTab = () => (
    <div className="space-y-6">
      <StatTable
        title="Show Start Times"
        description="Historical start time patterns by venue and circumstances"
        columns={['Start Time', 'Frequency %', 'Venue Type', 'Day of Week', 'Weather Impact']}
      />
      
      <StatTable
        title="Set Break Lengths"
        description="Duration between sets and influencing factors"
        columns={['Break Duration', 'Frequency %', 'Set 1 Length', 'Temperature', 'Venue Factor']}
      />
      
      <StatTable
        title="Show End Times"
        description="Total show duration and ending time patterns"
        columns={['End Time', 'Total Duration', 'Frequency %', 'Encore Length', 'Venue Curfew']}
      />
      
      <div className="bg-green-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-3">⏰ Timing Strategy Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Start Time Factors</h4>
            <p className="text-gray-600 mb-1">• Outdoor venues typically start later</p>
            <p className="text-gray-600 mb-1">• Weather delays common in SF</p>
            <p className="text-gray-600">• Weekend shows often start 15-30 min late</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Duration Patterns</h4>
            <p className="text-gray-600 mb-1">• Final shows tend to run longer</p>
            <p className="text-gray-600 mb-1">• Special occasions extend encores</p>
            <p className="text-gray-600">• Park curfews may affect length</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      <StatTable
        title="Song Rarity Index"
        description="Bust out potential based on last played date and rarity"
        columns={['Song Name', 'Last Played', 'Days Since', 'Rarity Score', 'Anniversary Likelihood']}
      />
      
      <StatTable
        title="Weather Correlations"
        description="Environmental factors affecting song selection"
        columns={['Weather Type', 'Song Preferences', 'Impact %', 'Setlist Changes', 'Historical Examples']}
      />
      
      <StatTable
        title="Venue-Specific Patterns"
        description="Golden Gate Park and San Francisco performance history"
        columns={['Venue Type', 'Song Preferences', 'Frequency %', 'Special Considerations', 'Local Favorites']}
      />
      
      <div className="bg-purple-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-purple-800 mb-3">🤖 Machine Learning Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Predictive Models</h4>
            <p className="text-gray-600 mb-1">[PLACEHOLDER] Neural network analysis</p>
            <p className="text-gray-600 mb-1">[PLACEHOLDER] Pattern recognition algorithms</p>
            <p className="text-gray-600">[PLACEHOLDER] Confidence interval calculations</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Special Event Factors</h4>
            <p className="text-gray-600 mb-1">[PLACEHOLDER] 60th anniversary considerations</p>
            <p className="text-gray-600 mb-1">[PLACEHOLDER] San Francisco historical significance</p>
            <p className="text-gray-600">[PLACEHOLDER] Final show vs. opener differences</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'positions': return renderPositionsTab();
      case 'relationships': return renderRelationshipsTab();
      case 'timing': return renderTimingTab();
      case 'analytics': return renderAnalyticsTab();
      default: return renderPositionsTab();
    }
  };

  return (
    <Layout>
      <Head>
        <title>Setlist Hints & Statistics - Setlist Street</title>
        <meta name="description" content="Data-driven insights and statistics to improve your GD60 predictions" />
      </Head>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-4">
            Setlist Hints & Statistics
          </h1>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Grateful Dead 60th Anniversary Concerts (GD60)
            </h2>
            <p className="text-gray-600">
              Golden Gate Park, San Francisco • August 1, 2, 3, 2025
            </p>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6 mb-8 text-center">
          <h3 className="text-xl font-semibold text-purple-800 mb-3">📊 Data-Driven Insights for Better Predictions</h3>
          <p className="text-gray-700">
            Welcome to your statistical advantage! This page provides comprehensive data analysis to help you make smarter predictions across all 15 Setlist Street games.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Data Sources & Disclaimer */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">🗃️ Data Sources & Methodology</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• setlist.fm historical database</p>
              <p>• Dead & Company tour archives (2015-2024)</p>
              <p>• Grateful Dead historical patterns (1965-1995)</p>
              <p>• Venue-specific performance data</p>
              <p>• Weather and timing correlations</p>
              <p>• Machine learning pattern analysis</p>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Last updated: [TIMESTAMP] • Next update: After each show completion
            </p>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">⚠️ Important Disclaimer</h3>
            <p className="text-sm text-yellow-700">
              Past performance does not guarantee future results. These statistics are provided for entertainment and educational purposes. 
              The magic of live music means anything can happen!
            </p>
            <p className="text-xs text-yellow-600 mt-3">
              Use these insights as guidance, but remember that Dead & Company's spontaneity is part of what makes each show special.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SetlistHintsPage; 