import React from 'react';
import Layout from '../components/Layout';
import Leaderboard from '../components/Leaderboard';

export default function LeaderboardPage() {
  return (
    <Layout 
      title="Setlist Street - Leaderboard"
      description="See the top Setlist Street players across all game modes - bingo, setlist prediction, trivia, and more!"
    >
      <div className="min-h-screen py-8 px-4">
        <Leaderboard 
          variant="full" 
          maxPlayers={25} 
          showSponsors={true} 
          showCharities={true} 
        />
      </div>
    </Layout>
  );
} 