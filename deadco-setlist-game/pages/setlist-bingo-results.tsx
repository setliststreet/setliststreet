import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';
import ShowSelector from '../components/ShowSelector';

// Mock live setlist data
const liveSetlist = [
  'Feel Like a Stranger', 'Help on the Way', 'Slipknot!', 'Franklin\'s Tower', 
  'Tennessee Jed', 'The Harder They Come', 'Casey Jones'
];

// Mock real-time leaderboard
const mockLeaderboard = [
  { username: 'BingoMaster', score: 23, matches: 18, playType: 'cash', status: 'Two lines completed!' },
  { username: 'FullHouseFan', score: 21, matches: 16, playType: 'prize', status: 'Four corners + 1 line' },
  { username: 'CornerWinner', score: 19, matches: 14, playType: 'charity', status: 'Four corners completed' },
  { username: 'LineCompleter', score: 17, matches: 12, playType: 'fun', status: 'One line completed' },
  { username: 'BlackoutChamp', score: 15, matches: 10, playType: 'cash', status: 'Close to line completion' },
  { username: 'SongGuesser', score: 13, matches: 8, playType: 'fun', status: 'Multiple matches' },
  { username: 'LuckyPlayer', score: 11, matches: 6, playType: 'prize', status: 'Getting started' },
  { username: 'DeadHead88', score: 9, matches: 4, playType: 'charity', status: 'Early progress' },
  { username: 'MusicLover', score: 7, matches: 3, playType: 'fun', status: 'Few matches' },
  { username: 'NewPlayer', score: 5, matches: 2, playType: 'fun', status: 'Just started' }
];

export default function SetlistBingoResults() {
  const [selectedShow, setSelectedShow] = useState(null);

  // Mock shows data for ShowSelector
  const shows = [
    { id: 'show1', date: 'Friday, August 1', guest: 'Show 1' },
    { id: 'show2', date: 'Saturday, August 2', guest: 'Show 2' },
    { id: 'show3', date: 'Sunday, August 3', guest: 'Show 3' }
  ];

  // Mock bingo board that gets filled as songs are played
  const liveBingoBoard = [
    ['Feel Like a Stranger', 'Help on the Way', 'Tennessee Jed', 'Box of Rain', 'Ripple'],
    ['Sugar Magnolia', 'Slipknot!', 'Eyes of the World', 'Touch of Grey', 'Truckin\''],
    ['Uncle John\'s Band', 'Casey Jones', 'FREE', 'Friend of the Devil', 'Fire on the Mountain'],
    ['Scarlet Begonias', 'Franklin\'s Tower', 'The Harder They Come', 'Morning Dew', 'Deal'],
    ['Stella Blue', 'Not Fade Away', 'Good Lovin\'', 'Shakedown Street', 'U.S. Blues']
  ];

  const isSongPlayed = (song: string) => {
    if (song === 'FREE') return true;
    return liveSetlist.includes(song);
  };

  const getPlayTypeColor = (playType: string) => {
    switch (playType) {
      case 'cash': return 'green';
      case 'prize': return 'gold';
      case 'charity': return 'blue';
      case 'fun': return 'gray';
      default: return 'black';
    }
  };

  return (
    <MainLayout>
      <div>
        <h1>View Setlist Bingo Results</h1>
        
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
            {/* Element 1: Live Bingo Grid */}
            <div>
              <h3>Live Bingo Board</h3>
              <p>Songs get marked as they are played during the show</p>
              
              <table>
                <thead>
                  <tr>
                    <th>B</th>
                    <th>I</th>
                    <th>N</th>
                    <th>G</th>
                    <th>O</th>
                  </tr>
                </thead>
                <tbody>
                  {liveBingoBoard.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, colIndex) => (
                        <td 
                          key={`${rowIndex}-${colIndex}`}
                          style={{
                            backgroundColor: isSongPlayed(cell) ? '#90EE90' : 'white',
                            border: '1px solid black',
                            padding: '8px',
                            textAlign: 'center',
                            fontWeight: isSongPlayed(cell) ? 'bold' : 'normal'
                          }}
                        >
                          {cell}
                          {isSongPlayed(cell) && cell !== 'FREE' && (
                            <div>✓ PLAYED</div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div>
                <h4>Winning Patterns:</h4>
                <ul>
                  <li>Four corners: {isSongPlayed(liveBingoBoard[0][0]) && isSongPlayed(liveBingoBoard[0][4]) && isSongPlayed(liveBingoBoard[4][0]) && isSongPlayed(liveBingoBoard[4][4]) ? '✓ Complete' : 'In progress'}</li>
                  <li>Any horizontal, vertical, or diagonal line</li>
                  <li>Full board (blackout)</li>
                </ul>
              </div>
            </div>

            {/* Element 2: Real-time Leaderboard */}
            <div>
              <h3>Real-Time Leaderboard</h3>
              <p>Updates automatically as songs are played</p>
              
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Username</th>
                    <th>Score</th>
                    <th>Matches</th>
                    <th>Status</th>
                    <th>Play Type</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLeaderboard.map((player, index) => (
                    <tr key={player.username}>
                      <td>{index + 1}</td>
                      <td>{player.username}</td>
                      <td>{player.score}</td>
                      <td>{player.matches}/25</td>
                      <td>{player.status}</td>
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
          <h2>Current Setlist Progress</h2>
          <div>
            <h3>Songs Played So Far:</h3>
            <ol>
              {liveSetlist.map((song, index) => (
                <li key={index}>{song}</li>
              ))}
            </ol>
            <p>Total songs played: {liveSetlist.length}</p>
            <p>Last updated: Live via setlist.fm API</p>
          </div>
        </section>

        <section>
          <h2>Bingo Statistics</h2>
          <div>
            <h3>Current Game Stats:</h3>
            <ul>
              <li>Total Players: 147</li>
              <li>Active Boards: 147</li>
              <li>Completed Lines: 12</li>
              <li>Four Corners: 3</li>
              <li>Near Completion: 8 players</li>
              <li>Average Matches: 9.2 per board</li>
              <li>Most Matched Song: Feel Like a Stranger (89% of boards)</li>
              <li>Least Matched Song: Morning Dew (12% of boards)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>Winners So Far</h2>
          <div>
            <h3>Completed Bingos:</h3>
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Winner</th>
                  <th>Pattern</th>
                  <th>Play Type</th>
                  <th>Prize</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ backgroundColor: '#FFD700' }}>
                  <td>8:47 PM</td>
                  <td>BingoMaster</td>
                  <td>Two Lines</td>
                  <td>Cash</td>
                  <td>$150</td>
                </tr>
                <tr style={{ backgroundColor: '#C0C0C0' }}>
                  <td>8:52 PM</td>
                  <td>FullHouseFan</td>
                  <td>Four Corners</td>
                  <td>Prize</td>
                  <td>Concert Poster</td>
                </tr>
                <tr style={{ backgroundColor: '#CD7F32' }}>
                  <td>8:58 PM</td>
                  <td>CornerWinner</td>
                  <td>Four Corners</td>
                  <td>Charity</td>
                  <td>$50 to Rex Foundation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>Live Updates</h2>
          <div>
            <h3>Recent Activity:</h3>
            <ul>
              <li>🎵 "Casey Jones" just played - 47 boards marked!</li>
              <li>🏆 BingoMaster just completed a line!</li>
              <li>🎵 "The Harder They Come" just played - 23 boards marked!</li>
              <li>🏆 FullHouseFan got four corners!</li>
              <li>🎵 "Tennessee Jed" just played - 67 boards marked!</li>
              <li>🎵 "Franklin's Tower" just played - 89 boards marked!</li>
              <li>🎵 "Slipknot!" just played - 78 boards marked!</li>
              <li>🎵 "Help on the Way" just played - 92 boards marked!</li>
              <li>🎵 "Feel Like a Stranger" opened the show - 134 boards marked!</li>
            </ul>
            <p>Updates every 30 seconds during live shows</p>
          </div>
        </section>
      </div>
    </MainLayout>
  );
} 