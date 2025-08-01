import React, { useState } from 'react';
import Link from 'next/link';
import MainLayout from '../components/MainLayout';
import ShowSelector from '../components/ShowSelector';

// Mock leaderboard data
const mockLeaderboards = {
  'guess-opener': [
    { username: 'DeadHead42', playType: 'cash', score: 95, position: 1 },
    { username: 'GratefulFan88', playType: 'prize', score: 92, position: 2 },
    { username: 'TouchOfGrey', playType: 'charity', score: 88, position: 3 },
    { username: 'SugarMagnolia', playType: 'fun', score: 85, position: 4 },
    { username: 'UncleJohns', playType: 'cash', score: 82, position: 5 }
  ],
  'guess-encore': [
    { username: 'RippleFan', playType: 'prize', score: 97, position: 1 },
    { username: 'FireMountain', playType: 'cash', score: 94, position: 2 },
    { username: 'ScarletBegonias', playType: 'charity', score: 91, position: 3 },
    { username: 'StellaBlueFan', playType: 'fun', score: 87, position: 4 },
    { username: 'TruckinAlong', playType: 'cash', score: 84, position: 5 }
  ],
  'guess-bust-out': [
    { username: 'DarkStarGazer', playType: 'prize', score: 89, position: 1 },
    { username: 'TerrapinTunes', playType: 'cash', score: 86, position: 2 },
    { username: 'MorningDewDrop', playType: 'charity', score: 83, position: 3 },
    { username: 'EyesOfWorld', playType: 'fun', score: 80, position: 4 },
    { username: 'FranklinsTower', playType: 'cash', score: 77, position: 5 }
  ],
  'setlist-bingo': [
    { username: 'BingoMaster', playType: 'cash', score: 93, position: 1 },
    { username: 'FullHouseFan', playType: 'prize', score: 90, position: 2 },
    { username: 'CornerWinner', playType: 'charity', score: 87, position: 3 },
    { username: 'LineCompleter', playType: 'fun', score: 84, position: 4 },
    { username: 'BlackoutChamp', playType: 'cash', score: 81, position: 5 }
  ],
  'setlist-builder': [
    { username: 'SetlistPro', playType: 'prize', score: 96, position: 1 },
    { username: 'PerfectPredict', playType: 'cash', score: 93, position: 2 },
    { username: 'OrderMaster', playType: 'charity', score: 90, position: 3 },
    { username: 'SequenceKing', playType: 'fun', score: 87, position: 4 },
    { username: 'SetlistSage', playType: 'cash', score: 84, position: 5 }
  ]
};

export default function ViewResults() {
  const [selectedShow, setSelectedShow] = useState(null);

  const shows = [
    { id: 'show1', label: 'Show 1: Friday, August 1' },
    { id: 'show2', label: 'Show 2: Saturday, August 2' },
    { id: 'show3', label: 'Show 3: Sunday, August 3' }
  ];

  const games = [
    {
      id: 'guess-opener',
      title: 'Guess the Opener',
      description: 'Predict the opening song',
      resultsLink: '/guess-song-results'
    },
    {
      id: 'guess-encore',
      title: 'Guess the Encore',
      description: 'Predict the encore song',
      resultsLink: '/guess-song-results'
    },
    {
      id: 'guess-bust-out',
      title: 'Guess the Bust Out',
      description: 'Predict rare/never played songs',
      resultsLink: '/guess-song-results'
    },
    {
      id: 'setlist-bingo',
      title: 'Setlist Bingo',
      description: 'Fill your bingo card with setlist songs',
      resultsLink: '/setlist-bingo-results'
    },
    {
      id: 'setlist-builder',
      title: 'Setlist Builder',
      description: 'Predict the entire setlist order',
      resultsLink: '/setlist-builder-results'
    }
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

  return (
    <MainLayout>
      <div>
                  <div className="countdown-outer"></div>

         <h1 className="logo-small-text">View Game Results</h1>
        
        <section>
          <ShowSelector
            selectedShow={selectedShow}
            onShowSelect={setSelectedShow}
          />
          <p>Viewing results for: {selectedShow ? `${selectedShow.date} - ${selectedShow.guest}` : 'None'}</p>
        </section>

        <section>
          <h2>Game Results</h2>
          
          <div>
            {games.map((game) => (
              <div key={game.id}>
                <div>
                  <h3>{game.title}</h3>
                  <p>{game.description}</p>
                  
                  <div>
                    <h4>Top 5 Players</h4>
                    <table>
                      <thead>
                        <tr>
                          <th>Rank</th>
                          <th>Username</th>
                          <th>Score</th>
                          <th>Play Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockLeaderboards[game.id as keyof typeof mockLeaderboards]?.map((player) => (
                          <tr key={player.username}>
                            <td>{player.position}</td>
                            <td>{player.username}</td>
                            <td>{player.score}</td>
                            <td style={{ color: getPlayTypeColor(player.playType) }}>
                              {player.playType}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div>
                    <Link href={game.resultsLink}>
                      <button>View Full {game.title} Results</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Overall Statistics</h2>
          <div>
            <h3>Show Summary</h3>
            <p>Total Participants: 2,847</p>
            <p>Total Prize Pool: $12,450</p>
            <p>Charity Donations: $3,280</p>
            <p>Fun Players: 1,654</p>
            
            <h3>Game Popularity</h3>
            <ul>
              <li>Setlist Builder: 34% of players</li>
              <li>Setlist Bingo: 28% of players</li>
              <li>Guess the Opener: 16% of players</li>
              <li>Guess the Encore: 14% of players</li>
              <li>Guess the Bust Out: 8% of players</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>Play Type Breakdown</h2>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Play Type</th>
                  <th>Players</th>
                  <th>Percentage</th>
                  <th>Total Pool</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ color: 'gray' }}>
                  <td>Fun</td>
                  <td>1,654</td>
                  <td>58.1%</td>
                  <td>Free</td>
                </tr>
                <tr style={{ color: 'green' }}>
                  <td>Cash</td>
                  <td>782</td>
                  <td>27.5%</td>
                  <td>$12,450</td>
                </tr>
                <tr style={{ color: 'blue' }}>
                  <td>Charity</td>
                  <td>268</td>
                  <td>9.4%</td>
                  <td>$3,280</td>
                </tr>
                <tr style={{ color: 'gold' }}>
                  <td>Prize</td>
                  <td>143</td>
                  <td>5.0%</td>
                  <td>Various</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>Live Updates</h2>
          <div>
            <p>Results update in real-time during shows via setlist.fm API integration</p>
            <p>Manual updates available if API access unavailable</p>
            <p>Scoring calculated automatically as songs are confirmed</p>
          </div>
        </section>

        <section>
          <h2>Recent Activity</h2>
          <div>
            <h3>Latest Submissions:</h3>
            <ul>
              <li>DeadHead42 submitted Setlist Builder prediction - 2 minutes ago</li>
              <li>RippleFan updated Bingo board - 5 minutes ago</li>
              <li>TerrapinTunes guessed bust out: "Alligator" - 8 minutes ago</li>
              <li>SugarMagnolia predicted opener: "Feel Like a Stranger" - 12 minutes ago</li>
              <li>BingoMaster completed full bingo board - 15 minutes ago</li>
            </ul>
          </div>
        </section>
      </div>
    </MainLayout>
  );
} 