import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';
import ShowSelector from '../components/ShowSelector';

// Mock live setlist data as it's being played
const liveSetlist = {
  set1: ['Feel Like a Stranger', 'Help on the Way', 'Slipknot!', 'Franklin\'s Tower', 'Tennessee Jed', 'The Harder They Come', 'Casey Jones'],
  set2Before: ['Passenger', 'Scarlet Begonias', 'Fire on the Mountain'],
  drumsSpace: ['Drums', 'Space'],
  set2After: ['Looks Like Rain', 'Tangled Up in Blue'],
  encores: [['Ripple']]
};

// Mock real-time leaderboard for setlist builder
const mockLeaderboard = [
  { username: 'SetlistPro', score: 847, accuracy: 89, playType: 'cash', correct: 15, total: 17 },
  { username: 'PerfectPredict', score: 823, accuracy: 85, playType: 'prize', correct: 14, total: 17 },
  { username: 'OrderMaster', score: 798, accuracy: 82, playType: 'charity', correct: 13, total: 16 },
  { username: 'SequenceKing', score: 775, accuracy: 78, playType: 'fun', correct: 12, total: 15 },
  { username: 'SetlistSage', score: 752, accuracy: 75, playType: 'cash', correct: 11, total: 15 },
  { username: 'MusicOracle', score: 728, accuracy: 71, playType: 'fun', correct: 10, total: 14 },
  { username: 'SongSeer', score: 704, accuracy: 68, playType: 'prize', correct: 9, total: 13 },
  { username: 'TunePredictor', score: 681, accuracy: 65, playType: 'charity', correct: 8, total: 12 },
  { username: 'SetGuess', score: 657, accuracy: 61, playType: 'fun', correct: 7, total: 11 },
  { username: 'ListBuilder', score: 634, accuracy: 58, playType: 'cash', correct: 6, total: 10 }
];

export default function SetlistBuilderResults() {
  const [selectedShow, setSelectedShow] = useState(null);

  const shows = [
    { id: 'show1', label: 'Show 1: Friday, August 1' },
    { id: 'show2', label: 'Show 2: Saturday, August 2' },
    { id: 'show3', label: 'Show 3: Sunday, August 3' }
  ];

  const getPlayTypeColor = (playType: string) => {
    switch (playType) {
      case 'cash': return 'green';
      case 'prize': return 'gold';
      case 'charity': return 'blue';
      case 'fun': return 'gray';
      default: return 'black';
    }
  };

  const isCurrentlyPlaying = (section: string, index?: number) => {
    // Mock logic for what's currently being played
    if (section === 'set2After' && index === 1) return true;
    return false;
  };

  return (
    <MainLayout>
      <div>
        <h1>View Guess the Setlist Results</h1>
        
        <section>
          <ShowSelector
            selectedShow={selectedShow}
            onShowSelect={setSelectedShow}
          />
          <p>Viewing results for: {selectedShow ? `${selectedShow.date} - ${selectedShow.guest}` : 'None'}</p>
        </section>

        <section>
          <h2>Main Content</h2>
          
          <div>
            {/* Element 1: Live Setlist Structure */}
            <div>
              <h3>Live Setlist Structure</h3>
              <p>Songs added in real-time via setlist.fm API</p>
              
              {/* Set 1 */}
              <div>
                <h4>Set 1</h4>
                <ol>
                  {liveSetlist.set1.map((song, index) => (
                    <li 
                      key={index}
                      style={{
                        backgroundColor: '#90EE90',
                        margin: '2px 0',
                        padding: '4px'
                      }}
                    >
                      {song} ✓
                    </li>
                  ))}
                </ol>
                <p>Set 1 Status: COMPLETED ({liveSetlist.set1.length} songs)</p>
              </div>

              {/* Set 2 */}
              <div>
                <h4>Set 2</h4>
                
                <div>
                  <h5>Before Drums/Space</h5>
                  <ol>
                    {liveSetlist.set2Before.map((song, index) => (
                      <li 
                        key={index}
                        style={{
                          backgroundColor: '#90EE90',
                          margin: '2px 0',
                          padding: '4px'
                        }}
                      >
                        {song} ✓
                      </li>
                    ))}
                  </ol>
                </div>

                <div style={{ backgroundColor: '#FFE4B5', padding: '8px', margin: '8px 0' }}>
                  <h5>Drums/Space</h5>
                  <p>Drums ✓</p>
                  <p>Space ✓</p>
                </div>

                <div>
                  <h5>After Drums/Space</h5>
                  <ol start={liveSetlist.set2Before.length + 1}>
                    {liveSetlist.set2After.map((song, index) => (
                      <li 
                        key={index}
                        style={{
                          backgroundColor: isCurrentlyPlaying('set2After', index) ? '#FFFF00' : '#90EE90',
                          margin: '2px 0',
                          padding: '4px'
                        }}
                      >
                        {song} {isCurrentlyPlaying('set2After', index) ? '🎵 NOW PLAYING' : '✓'}
                      </li>
                    ))}
                  </ol>
                  <p>Set 2 Status: IN PROGRESS ({liveSetlist.set2Before.length + liveSetlist.set2After.length} songs so far)</p>
                </div>
              </div>

              {/* Encores */}
              <div>
                <h4>Encores</h4>
                {liveSetlist.encores.map((encore, encoreIndex) => (
                  <div key={encoreIndex}>
                    <h5>Encore {encoreIndex + 1}</h5>
                    <ol>
                      {encore.map((song, songIndex) => (
                        <li 
                          key={songIndex}
                          style={{
                            backgroundColor: '#90EE90',
                            margin: '2px 0',
                            padding: '4px'
                          }}
                        >
                          {song} ✓
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
                <p>Encore Status: COMPLETED (1 encore)</p>
              </div>
            </div>

            {/* Element 2: Real-time Leaderboard */}
            <div>
              <h3>Real-Time Leaderboard</h3>
              <p>Scores update as each song is confirmed</p>
              
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Username</th>
                    <th>Score</th>
                    <th>Accuracy</th>
                    <th>Correct</th>
                    <th>Play Type</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLeaderboard.map((player, index) => (
                    <tr key={player.username}>
                      <td>{index + 1}</td>
                      <td>{player.username}</td>
                      <td>{player.score}</td>
                      <td>{player.accuracy}%</td>
                      <td>{player.correct}/{player.total}</td>
                      <td style={{ color: getPlayTypeColor(player.playType) }}>
                        {player.playType}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section>
          <h2>Scoring Breakdown</h2>
          <div>
            <h3>Points System:</h3>
            <ul>
              <li>Correct song in correct position: 100 points</li>
              <li>Correct song in wrong position: 50 points</li>
              <li>Correct set (but wrong position within set): 25 points</li>
              <li>Set structure bonus (correct number of songs): 10 points</li>
              <li>Encore prediction bonus: 20 points per correct encore</li>
              <li>Perfect set bonus: 200 points</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>Current Setlist Statistics</h2>
          <div>
            <h3>Prediction Accuracy:</h3>
            <ul>
              <li>Total Players: 89</li>
              <li>Perfect Set 1 Predictions: 0</li>
              <li>Perfect Opener Predictions: 23 (25.8%)</li>
              <li>Perfect Set 1 Closer Predictions: 8 (9.0%)</li>
              <li>Perfect Set 2 Opener Predictions: 12 (13.5%)</li>
              <li>Perfect Encore Predictions: 34 (38.2%)</li>
              <li>Average Songs Correct: 8.7 out of 17</li>
              <li>Most Predicted Song: Feel Like a Stranger (67 players)</li>
              <li>Least Predicted Song: The Harder They Come (3 players)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>Live Song Updates</h2>
          <div>
            <h3>Recent Activity:</h3>
            <ul>
              <li>🎵 "Tangled Up in Blue" just started - 12 players predicted this position!</li>
              <li>📊 Scores updated for 89 players</li>
              <li>🎵 "Looks Like Rain" completed - 23 players got it right!</li>
              <li>🥁 Space segment ended - transitioning to second half of Set 2</li>
              <li>🥁 Drums segment completed - 15 minutes long</li>
              <li>🎵 "Fire on the Mountain" completed - 45 players predicted this!</li>
              <li>🎵 "Scarlet Begonias" completed - classic opener for Set 2 second half</li>
              <li>🎵 "Passenger" started Set 2 - 28 players got the opener right!</li>
              <li>✅ Set 1 completed with 7 songs - 12 players predicted exact count</li>
              <li>🎵 "Casey Jones" closed Set 1 - 34 players got the closer!</li>
            </ul>
            <p>Last update: 30 seconds ago</p>
          </div>
        </section>

        <section>
          <h2>Show Progress</h2>
          <div>
            <h3>Timeline:</h3>
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Event</th>
                  <th>Duration</th>
                  <th>Songs</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ backgroundColor: '#90EE90' }}>
                  <td>7:30 PM</td>
                  <td>Set 1</td>
                  <td>78 minutes</td>
                  <td>7 songs</td>
                </tr>
                <tr style={{ backgroundColor: '#FFE4B5' }}>
                  <td>8:48 PM</td>
                  <td>Set Break</td>
                  <td>30 minutes</td>
                  <td>-</td>
                </tr>
                <tr style={{ backgroundColor: '#FFFF00' }}>
                  <td>9:18 PM</td>
                  <td>Set 2 (In Progress)</td>
                  <td>67 minutes so far</td>
                  <td>5 songs + Drums/Space</td>
                </tr>
                <tr>
                  <td>~10:45 PM</td>
                  <td>Encore (Expected)</td>
                  <td>Est. 15 minutes</td>
                  <td>1-2 songs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </MainLayout>
  );
} 