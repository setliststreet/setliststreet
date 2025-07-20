import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';
import SetlistDragDropPicker from '../components/SetlistDragDropPicker';
import FourWaysToPlay from '../components/FourWaysToPlay';
import ShowSelector from '../components/ShowSelector';
import type { Show } from '../components/ShowSelector';
import PoolSizeDisplay from '../components/PoolSizeDisplay';

// Mock database of ~200 songs (simplified for demo)
const allSongs = [
  'Feel Like a Stranger', 'Help on the Way', 'Slipknot!', 'Franklin\'s Tower', 'Tennessee Jed',
  'The Harder They Come', 'Casey Jones', 'Passenger', 'Scarlet Begonias', 'Fire on the Mountain',
  'Estimated Prophet', 'Eyes of the World', 'Looks Like Rain', 'Tangled Up in Blue', 'Ripple',
  'Truckin\'', 'Sugar Magnolia', 'Uncle John\'s Band', 'Touch of Grey', 'Box of Rain',
  'Friend of the Devil', 'Shakedown Street', 'The Music Never Stopped', 'Dark Star', 'St. Stephen',
  'The Eleven', 'Terrapin Station', 'Playing in the Band', 'China Cat Sunflower', 'I Know You Rider',
  'Turn on Your Love Light', 'Morning Dew', 'Stella Blue', 'Brokedown Palace', 'Black Peter',
  'Wharf Rat', 'Good Lovin\'', 'Not Fade Away', 'Bertha', 'One More Saturday Night',
  'U.S. Blues', 'The Weight', 'Knockin\' on Heaven\'s Door', 'Johnny B. Goode', 'Samson and Delilah',
  'Deal', 'Row Jimmy', 'Lazy Lightning', 'Supplication', 'Cassidy', 'Althea', 'Alabama Getaway',
  'Far From Me', 'Lost Sailor', 'Saint of Circumstance', 'Ship of Fools', 'Hell in a Bucket',
  'West L.A. Fadeaway', 'Throwing Stones', 'Black Muddy River', 'Death Don\'t Have No Mercy',
  'Cumberland Blues', 'Big River', 'Loser', 'Jack Straw', 'Me and My Uncle', 'Big Railroad Blues',
  'Mama Tried', 'El Paso', 'Mexicali Blues', 'Tennessee Walker', 'Born Cross-Eyed', 'Alligator',
  'Caution (Do Not Stop on Tracks)', 'Feedback', 'New Speedway Boogie', 'Easy Wind', 'Attics of My Life',
  'Operator', 'Candyman', 'Going Down the Road Feeling Bad', 'Cold Rain and Snow', 'In the Midnight Hour',
  'The Other One', 'Cryptical Envelopment', 'Drums', 'Space', 'Spanish Jam', 'Fire on the Mountain (Reprise)',
  'And We Bid You Goodnight', 'The Grateful Dead', 'Golden Road (To Unlimited Devotion)', 'Cream Puff War',
  'Viola Lee Blues', 'Morning Dew', 'Doin\' That Rag', 'Mason\'s Children', 'To Lay Me Down',
  'Dire Wolf', 'High Time', 'New Orleans', 'Comes a Time', 'Sugar Magnolia', 'Mr. Charlie',
  'Weather Report Suite', 'Eyes of the World', 'China Doll', 'Crazy Fingers', 'The Music Never Stopped',
  'Help on the Way', 'Slipknot!', 'Franklin\'s Tower', 'King Solomon\'s Marbles', 'Stronger Than Dirt',
  'The Wheel', 'Samson and Delilah', 'Sunrise', 'Estimated Prophet', 'Barbed Wire Whipping Party',
  'Passenger', 'Terrapin Station', 'Fire on the Mountain', 'Good Lovin\'', 'Shakedown Street',
  'I Need a Miracle', 'From the Heart of Me', 'Stagger Lee', 'All New Minglewood Blues'
];

interface SetlistStructure {
  set1: string[];
  set2Before: string[];
  set2After: string[];
  encores: string[][];
}

export default function SetlistBuilder() {
  const [setlist, setSetlist] = useState<SetlistStructure>({
    set1: [],
    set2Before: [],
    set2After: [],
    encores: [[]]
  });
  
  const [selectedPlayMode, setSelectedPlayMode] = useState('');
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);

  const updateSetSection = (section: keyof SetlistStructure, songs: string[]) => {
    setSetlist(prev => ({
      ...prev,
      [section]: songs
    }));
  };

  const handleSubmit = () => {
    const totalSongs = setlist.set1.length + setlist.set2Before.length + setlist.set2After.length + 
                      setlist.encores.reduce((sum, encore) => sum + encore.length, 0);
    
    if (totalSongs === 0) {
      alert('Please add at least one song to your setlist!');
      return;
    }

    if (!selectedPlayMode) {
      alert('Please select a play mode!');
      return;
    }

    console.log('Setlist submitted:', setlist);
    alert('Setlist submitted successfully!');
  };

  const renderStatsAndHints = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm">
        <h4 className="text-lg font-bold text-blue-800 mb-3">Quick Stats</h4>
        <div className="space-y-4 text-xs">
          <div>
            <h5 className="font-semibold text-blue-700 text-sm mb-2">Top Openers:</h5>
            <ul className="list-disc pl-5 text-blue-600 space-y-1">
              <li>Feel Like a Stranger (23%)</li>
              <li>Truckin' (18%)</li>
              <li>Hell in a Bucket (15%)</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-blue-700 text-sm mb-2">Rare Songs:</h5>
            <ul className="list-disc pl-5 text-blue-600 space-y-1">
              <li>Dark Star (8%)</li>
              <li>St. Stephen (12%)</li>
              <li>Let It Grow (10%)</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-blue-700 text-sm mb-2">Popular Pairings:</h5>
            <ul className="list-disc pl-5 text-blue-600 space-y-1">
              <li>Scarlet → Fire (89%)</li>
              <li>China Cat → Rider (78%)</li>
              <li>Playing → Drums (71%)</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Strategy Tips */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-sm">
        <h4 className="text-lg font-bold text-green-800 mb-3">Pro Tips</h4>
        <div className="space-y-2 text-xs text-green-700">
          <ul className="list-disc pl-5">
            <li>Mix common and rare songs for best scoring potential</li>
            <li>Consider venue size - smaller venues favor acoustic songs</li>
            <li>Check recent shows for songs due for rotation</li>
            <li>Weather affects song choice - rain brings "Looks Like Rain"</li>
            <li>Set 1 usually has 7-9 songs, Set 2 varies more</li>
            <li>Encores are typically 1-2 songs</li>
          </ul>
        </div>
      </div>
      {/* Scoring Guide */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 shadow-sm">
        <h4 className="text-lg font-bold text-purple-800 mb-3">Scoring</h4>
        <div className="space-y-1 text-xs text-purple-700">
          <ul className="list-disc pl-5">
            <li>Exact position: 20 points</li>
            <li>Wrong position: 10 points</li>
            <li>Rare song bonus: +5 points</li>
            <li>Perfect sequence: +10 points</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <MainLayout>
      {/* Header with sponsor logos */}
      <div className="flex items-center justify-center mb-8 gap-4">
        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-2xl">[Logo]</div>
        <div className="w-2"></div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Fantasy Setlist Builder</h1>
        <div className="w-2"></div>
        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-2xl">[Logo]</div>
      </div>

      {/* Show Selection */}
      <div className="max-w-md mx-auto mb-8">
        <ShowSelector 
          onShowSelect={(show: Show) => setSelectedShow(show)}
          selectedShow={selectedShow ?? undefined}
        />
      </div>
      {/* Sponsor summary and live pool summary */}
      {selectedShow && (
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-lg font-semibold text-gray-700">[PLACEHOLDER SPONSOR NAME]</span>
            <span className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-2xl">[PLACEHOLDER SPONSOR LOGO]</span>
          </div>
          <PoolSizeDisplay 
            gameId="setlist-builder" 
            showId={selectedShow.id}
            showDate={selectedShow.date}
          />
        </div>
      )}

      {/* Live Preview - Centered and Prominent */}
      {(setlist.set1.length > 0 || setlist.set2Before.length > 0 || setlist.set2After.length > 0 || setlist.encores.some(e => e.length > 0)) && (
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-gray-50 border border-gray-300 rounded-xl p-6 shadow-lg text-center">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">Live Preview</h2>
            <div className="space-y-4 text-base">
              {setlist.set1.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Set 1 ({setlist.set1.length} songs)</h3>
                  <p className="text-gray-800">{setlist.set1.join(' → ')}</p>
                </div>
              )}
              {setlist.set2Before.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Set 2 (Before Drums/Space) ({setlist.set2Before.length})</h3>
                  <p className="text-gray-800">{setlist.set2Before.join(' → ')}</p>
                </div>
              )}
              <div>
                <h3 className="font-semibold text-purple-700 mb-1">🥁 Drums / Space 🚀</h3>
                <p className="text-purple-600">(automatically included)</p>
              </div>
              {setlist.set2After.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Set 2 (After Drums/Space) ({setlist.set2After.length})</h3>
                  <p className="text-gray-800">{setlist.set2After.join(' → ')}</p>
                </div>
              )}
              {setlist.encores.some(e => e.length > 0) && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Encore{setlist.encores.length > 1 ? 's' : ''}</h3>
                  {setlist.encores.map((encore, idx) => (
                    encore.length > 0 && (
                      <p key={idx} className="text-gray-800">{encore.join(' → ')}</p>
                    )
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Fantasy Setlist Builder - 5 Column Layout */}
      <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto mb-8 mt-8">
        {/* Column 1: Left Padding (1/12) */}
        <div className="col-span-1"></div>
        {/* Column 2: Setlist Builder (7/12, centered) */}
        <div className="col-span-7 space-y-6 px-2">
          {/* Set 1 */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Set 1</h2>
            <SetlistDragDropPicker
              availableSongs={allSongs}
              maxSongs={12}
              onSetlistChange={(songs) => updateSetSection('set1', songs)}
            />
          </div>
          {/* Set 2 Before Drums/Space */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Set 2 (Before Drums/Space)</h2>
            <SetlistDragDropPicker
              availableSongs={allSongs}
              maxSongs={8}
              onSetlistChange={(songs) => updateSetSection('set2Before', songs)}
            />
          </div>
          {/* Set 2 After Drums/Space */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Set 2 (After Drums/Space)</h2>
            <SetlistDragDropPicker
              availableSongs={allSongs}
              maxSongs={8}
              onSetlistChange={(songs) => updateSetSection('set2After', songs)}
            />
          </div>
          {/* Encore */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Encore</h2>
            <SetlistDragDropPicker
              availableSongs={allSongs}
              maxSongs={3}
              onSetlistChange={(songs) => updateSetSection('encores', songs)}
            />
          </div>
        </div>
        {/* Column 3: Padding (1/12) */}
        <div className="col-span-1"></div>
        {/* Column 4: Stats/Hints (2/12) */}
        <div className="col-span-2 space-y-6 px-2">
          {renderStatsAndHints()}
        </div>
        {/* Column 5: Right Padding (1/12) */}
        <div className="col-span-1"></div>
      </div>

      {/* Play Mode Selection & Auto-Submit - Moved to Bottom */}
      <div className="mt-8">
        {/* Standardized Payment Component */}
        <FourWaysToPlay 
          onSubmissionClick={(playMode, amount) => {
            setSelectedPlayMode(playMode);
            handleSubmit();
          }}
          gameType="setlist"
        />
      </div>
    </MainLayout>
  );
} 