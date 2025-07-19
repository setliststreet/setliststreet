import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';

// Mock wheel data and results
const wheelSongs = [
  'Feel Like a Stranger', 'Help on the Way', 'Tennessee Jed', 'Casey Jones', 'Truckin\'',
  'Sugar Magnolia', 'Touch of Grey', 'Uncle John\'s Band', 'Friend of the Devil', 'Box of Rain',
  'Ripple', 'Fire on the Mountain', 'Eyes of the World', 'Deal', 'Shakedown Street',
  'Good Lovin\'', 'Not Fade Away', 'One More Saturday Night', 'The Weight', 'Morning Dew'
];

const gameTypes = {
  opener: {
    title: 'Guess the Opener',
    description: 'First song of Set 1',
    winningSlot: 'Feel Like a Stranger'
  },
  encore: {
    title: 'Guess the Encore',
    description: 'Final song of the show',
    winningSlot: 'Ripple'
  },
  bustout: {
    title: 'Guess the Bust Out',
    description: 'Rare or never-before-played song',
    winningSlot: 'No bust out this show'
  }
};

// Mock leaderboards for each game type
const mockLeaderboards = {
  opener: [
    { username: 'OpenerKing', correct: true, playType: 'cash', prize: '$150', guessed: 'Feel Like a Stranger' },
    { username: 'FirstSongFan', correct: true, playType: 'prize', prize: 'Concert Poster', guessed: 'Feel Like a Stranger' },
    { username: 'SetStarter', correct: true, playType: 'charity', prize: '$50 to HeadCount', guessed: 'Feel Like a Stranger' },
    { username: 'MusicPredictor', correct: false, playType: 'fun', prize: '-', guessed: 'Help on the Way' },
    { username: 'SongGuesser', correct: false, playType: 'cash', prize: '-', guessed: 'Tennessee Jed' }
  ],
  encore: [
    { username: 'EncoreExpert', correct: true, playType: 'prize', prize: 'VIP Tickets', guessed: 'Ripple' },
    { username: 'FinalSongFan', correct: true, playType: 'cash', prize: '$200', guessed: 'Ripple' },
    { username: 'LastCallPlayer', correct: true, playType: 'charity', prize: '$75 to Rex Foundation', guessed: 'Ripple' },
    { username: 'ShowEnder', correct: false, playType: 'fun', prize: '-', guessed: 'Touch of Grey' },
    { username: 'ConcertCloser', correct: false, playType: 'cash', prize: '-', guessed: 'Brokedown Palace' }
  ],
  bustout: [
    { username: 'RareTrackHunter', correct: true, playType: 'cash', prize: '$500', guessed: 'No bust out' },
    { username: 'DeepCutDigger', correct: true, playType: 'prize', prize: 'Signed Setlist', guessed: 'No bust out' },
    { username: 'VaultExplorer', correct: false, playType: 'charity', prize: '-', guessed: 'Alligator' },
    { username: 'RaritySeeker', correct: false, playType: 'fun', prize: '-', guessed: 'Cosmic Charlie' },
    { username: 'BustOutBetter', correct: false, playType: 'cash', prize: '-', guessed: 'Caution' }
  ]
};

export default function GuessSongResults() {
  const [selectedShow, setSelectedShow] = useState('show1');
  const [selectedGame, setSelectedGame] = useState<'opener' | 'encore' | 'bustout'>('opener');
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelPosition, setWheelPosition] = useState(0);

  const shows = [
    { id: 'show1', label: 'Show 1: Friday, August 1' },
    { id: 'show2', label: 'Show 2: Saturday, August 2' },
    { id: 'show3', label: 'Show 3: Sunday, August 3' }
  ];

  const currentGame = gameTypes[selectedGame];
  const currentLeaderboard = mockLeaderboards[selectedGame];

  const spinWheel = () => {
    setIsSpinning(true);
    // Mock spinning animation
    const spins = Math.floor(Math.random() * 20) + 10;
    setWheelPosition(spins);
    
    setTimeout(() => {
      setIsSpinning(false);
    }, 3000);
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

  const winningSlot = currentGame.winningSlot;

  return (
    <MainLayout>
      <div>
        <h1>View Song Guess Results</h1>
        
        <section>
          <h2>Choose your show:</h2>
          <div>
            {shows.map((show) => (
              <button
                key={show.id}
                onClick={() => setSelectedShow(show.id)}
                disabled={selectedShow === show.id}
              >
                {show.label}
              </button>
            ))}
          </div>
          <p>Viewing results for: {shows.find(s => s.id === selectedShow)?.label}</p>
        </section>

        <section>
          <h2>Select Game Type:</h2>
          <div>
            <button 
              onClick={() => setSelectedGame('opener')}
              disabled={selectedGame === 'opener'}
            >
              Guess the Opener
            </button>
            <button 
              onClick={() => setSelectedGame('encore')}
              disabled={selectedGame === 'encore'}
            >
              Guess the Encore
            </button>
            <button 
              onClick={() => setSelectedGame('bustout')}
              disabled={selectedGame === 'bustout'}
            >
              Guess the Bust Out
            </button>
          </div>
          <p>Current Game: {currentGame.title} - {currentGame.description}</p>
        </section>

        <section>
          <h2>Main Content</h2>
          
          <div>
            {/* Element 1: Wheel of Fortune */}
            <div>
              <h3>Results Wheel</h3>
              <p>Reveals the correct answer via setlist.fm API or manual update</p>
              
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                {/* Mock wheel representation */}
                <div 
                  style={{
                    width: '300px',
                    height: '300px',
                    border: '10px solid #333',
                    borderRadius: '50%',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f0f0f0',
                    position: 'relative',
                    transform: isSpinning ? `rotate(${wheelPosition * 360}deg)` : 'none',
                    transition: isSpinning ? 'transform 3s ease-out' : 'none'
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <h4>WINNING SONG</h4>
                    <div style={{ 
                      fontSize: '18px', 
                      fontWeight: 'bold', 
                      backgroundColor: '#FFD700',
                      padding: '10px',
                      borderRadius: '5px'
                    }}>
                      {winningSlot}
                    </div>
                  </div>
                  
                  {/* Pointer */}
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '0',
                    height: '0',
                    borderLeft: '15px solid transparent',
                    borderRight: '15px solid transparent',
                    borderTop: '20px solid red'
                  }}></div>
                </div>
                
                <button 
                  onClick={spinWheel} 
                  disabled={isSpinning}
                  style={{ marginTop: '20px', padding: '10px 20px' }}
                >
                  {isSpinning ? 'Spinning...' : 'Spin Again (Demo)'}
                </button>
              </div>
              
              <div>
                <h4>Song Options on Wheel:</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                  {wheelSongs.map((song, index) => (
                    <div 
                      key={song}
                      style={{
                        padding: '5px',
                        backgroundColor: song === winningSlot ? '#FFD700' : '#f0f0f0',
                        border: '1px solid #ccc',
                        textAlign: 'center',
                        fontSize: '12px'
                      }}
                    >
                      {song}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Element 2: Real-time Leaderboard */}
            <div>
              <h3>Real-Time Results</h3>
              <p>Winners and participants for {currentGame.title}</p>
              
              <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Guess</th>
                    <th>Result</th>
                    <th>Play Type</th>
                    <th>Prize/Donation</th>
                  </tr>
                </thead>
                <tbody>
                  {currentLeaderboard.map((player, index) => (
                    <tr 
                      key={player.username}
                      style={{
                        backgroundColor: player.correct ? '#90EE90' : '#FFE4E1'
                      }}
                    >
                      <td>{player.username}</td>
                      <td>{player.guessed}</td>
                      <td style={{ fontWeight: 'bold' }}>
                        {player.correct ? '✓ CORRECT' : '✗ Incorrect'}
                      </td>
                      <td style={{ color: getPlayTypeColor(player.playType) }}>
                        {player.playType}
                      </td>
                      <td>{player.prize}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section>
          <h2>Game Statistics</h2>
          <div>
            <h3>{currentGame.title} Stats:</h3>
            <ul>
              <li>Total Players: {currentLeaderboard.length}</li>
              <li>Correct Guesses: {currentLeaderboard.filter(p => p.correct).length}</li>
              <li>Success Rate: {Math.round((currentLeaderboard.filter(p => p.correct).length / currentLeaderboard.length) * 100)}%</li>
              <li>Cash Players: {currentLeaderboard.filter(p => p.playType === 'cash').length}</li>
              <li>Prize Players: {currentLeaderboard.filter(p => p.playType === 'prize').length}</li>
              <li>Charity Players: {currentLeaderboard.filter(p => p.playType === 'charity').length}</li>
              <li>Fun Players: {currentLeaderboard.filter(p => p.playType === 'fun').length}</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>Prize Distribution</h2>
          <div>
            <h3>Winners:</h3>
            <ul>
              {currentLeaderboard
                .filter(player => player.correct)
                .map((winner, index) => (
                  <li key={winner.username}>
                    <strong>{winner.username}</strong> - {winner.playType} - {winner.prize}
                  </li>
                ))}
            </ul>
            
            {currentLeaderboard.filter(p => p.correct).length === 0 && (
              <p>No winners this round. All prize money rolls over to next show!</p>
            )}
          </div>
        </section>

        <section>
          <h2>Guess Distribution</h2>
          <div>
            <h3>Popular Guesses:</h3>
            <table>
              <thead>
                <tr>
                  <th>Song Guessed</th>
                  <th>Number of Players</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {/* Mock guess distribution */}
                <tr style={{ backgroundColor: winningSlot === 'Feel Like a Stranger' ? '#FFD700' : 'white' }}>
                  <td>Feel Like a Stranger</td>
                  <td>2</td>
                  <td>40%</td>
                </tr>
                <tr>
                  <td>Help on the Way</td>
                  <td>1</td>
                  <td>20%</td>
                </tr>
                <tr>
                  <td>Tennessee Jed</td>
                  <td>1</td>
                  <td>20%</td>
                </tr>
                <tr>
                  <td>Other Guesses</td>
                  <td>1</td>
                  <td>20%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>Historical Context</h2>
          <div>
            <h3>Recent {currentGame.title} Results:</h3>
            <ul>
              <li>Show 2024-12-31: Touch of Grey (23% success rate)</li>
              <li>Show 2024-12-30: Feel Like a Stranger (31% success rate)</li>
              <li>Show 2024-12-29: Help on the Way (18% success rate)</li>
              <li>Show 2024-12-28: Truckin' (27% success rate)</li>
              <li>Show 2024-12-27: Sugar Magnolia (35% success rate)</li>
            </ul>
          </div>
        </section>
      </div>
    </MainLayout>
  );
} 