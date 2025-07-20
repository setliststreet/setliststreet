import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';
import SetlistDragDropPicker from '../components/SetlistDragDropPicker';

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

  return (
    <MainLayout>
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Fantasy Setlist
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Build your fantasy setlist prediction for Dead & Company. Create your ideal show lineup like a fantasy sports league!
        </p>
      </div>

      {/* Main Content Grid - Builder + Hints Side by Side */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-12 mb-16">
        
        {/* Main Builder Area (3/4 width on large screens) */}
        <div className="xl:col-span-3 space-y-10">
          
          {/* Game Instructions */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4">How to Play</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Scoring:</h3>
                <ul className="space-y-2 text-xs">
                  <li>• Exact song in exact position = 20 points</li>
                  <li>• Correct song in wrong position = 10 points</li>
                  <li>• Bonus points for rare songs and perfect sequences</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Strategy Tips:</h3>
                <ul className="space-y-2 text-xs">
                  <li>• Set 1 typically has 7-9 songs</li>
                  <li>• Set 2 has Drums/Space in the middle</li>
                  <li>• Encores are usually 1-2 songs</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sets Grid - Better Spaced Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Set 1 */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800">Set 1</h2>
              <SetlistDragDropPicker
                availableSongs={allSongs}
                maxSongs={12}
                onSetlistChange={(songs) => updateSetSection('set1', songs)}
              />
            </div>

            {/* Set 2 Before Drums/Space */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800">Set 2 (Before Drums/Space)</h2>
              <SetlistDragDropPicker
                availableSongs={allSongs}
                maxSongs={8}
                onSetlistChange={(songs) => updateSetSection('set2Before', songs)}
              />
            </div>

            {/* Drums/Space Notice - Spans Full Width */}
            <div className="lg:col-span-2 my-8">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center shadow-sm">
                <h3 className="text-lg font-semibold text-purple-800 mb-2">🥁 Drums / Space 🚀</h3>
                <p className="text-purple-600 text-sm">Traditional drums and space segment (automatically included)</p>
              </div>
            </div>

            {/* Set 2 After Drums/Space */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800">Set 2 (After Drums/Space)</h2>
              <SetlistDragDropPicker
                availableSongs={allSongs}
                maxSongs={8}
                onSetlistChange={(songs) => updateSetSection('set2After', songs)}
              />
            </div>

            {/* Encore */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800">Encore</h2>
              <SetlistDragDropPicker
                availableSongs={allSongs}
                maxSongs={3}
                onSetlistChange={(songs) => updateSetSection('encores', songs)}
              />
            </div>
          </div>

          {/* Play Mode Selection */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Choose Your Play Mode</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {[
                { id: 'fun', title: 'Play for Fun', desc: 'Free play, leaderboard glory' },
                { id: 'charity', title: 'Play for Charity', desc: 'Donate $1-$10, winners choose charity' },
                { id: 'cash', title: 'Play for Cash', desc: 'Entry fee builds prize pool' },
                { id: 'prize', title: 'Play for Prize', desc: 'Compete for sponsored rewards' }
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setSelectedPlayMode(mode.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all shadow-sm hover:shadow-md ${
                    selectedPlayMode === mode.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <h3 className="font-semibold text-gray-800 mb-2 text-sm">{mode.title}</h3>
                  <p className="text-xs text-gray-600">{mode.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-10">
            <button
              onClick={handleSubmit}
              className="bg-purple-600 text-white px-10 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-lg shadow-lg hover:shadow-xl"
            >
              Submit Setlist Prediction
            </button>
          </div>
        </div>

        {/* Hints Sidebar (1/4 width on large screens) */}
        <div className="xl:col-span-1 space-y-6">
          
          {/* Statistical Hints */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 sticky top-4 shadow-sm">
            <h3 className="text-lg font-bold text-blue-800 mb-4">Quick Stats</h3>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold text-blue-700 text-sm mb-2">Most Common Openers:</h4>
                <ul className="text-blue-600 text-xs space-y-1">
                  <li>• Feel Like a Stranger (18%)</li>
                  <li>• Help on the Way (15%)</li>
                  <li>• Shakedown Street (12%)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 text-sm mb-2">Common Set 1 Closers:</h4>
                <ul className="text-blue-600 text-xs space-y-1">
                  <li>• Cassidy (14%)</li>
                  <li>• Deal (12%)</li>
                  <li>• Let It Grow (10%)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 text-sm mb-2">Popular Pairings:</h4>
                <ul className="text-blue-600 text-xs space-y-1">
                  <li>• Scarlet → Fire (89%)</li>
                  <li>• China Cat → Rider (78%)</li>
                  <li>• Playing → Drums (71%)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Strategy Tips */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-5 shadow-sm">
            <h3 className="text-lg font-bold text-green-800 mb-4">Pro Tips</h3>
            <div className="space-y-3 text-xs text-green-700">
              <p>• Mix common and rare songs for best scoring potential</p>
              <p>• Consider venue size - smaller venues favor acoustic songs</p>
              <p>• Check recent shows for songs due for rotation</p>
              <p>• Weather affects song choice - rain brings "Looks Like Rain"</p>
            </div>
          </div>

          {/* Current Preview */}
          {(setlist.set1.length > 0 || setlist.set2Before.length > 0 || setlist.set2After.length > 0) && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Preview</h3>
              <div className="space-y-3 text-xs">
                {setlist.set1.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Set 1 ({setlist.set1.length})</h4>
                    <p className="text-gray-600">{setlist.set1.slice(0, 3).join(' → ')}{setlist.set1.length > 3 && '...'}</p>
                  </div>
                )}
                {setlist.set2Before.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Set 2 Start ({setlist.set2Before.length})</h4>
                    <p className="text-gray-600">{setlist.set2Before.slice(0, 2).join(' → ')}{setlist.set2Before.length > 2 && '...'}</p>
                  </div>
                )}
                {setlist.set2After.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Post-Space ({setlist.set2After.length})</h4>
                    <p className="text-gray-600">{setlist.set2After.slice(0, 2).join(' → ')}{setlist.set2After.length > 2 && '...'}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
        </div>
      </div>
    </MainLayout>
  );
} 