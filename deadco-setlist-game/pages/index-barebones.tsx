import React from 'react';
import MainLayout from '../components/MainLayout';
import GameModeCards from '../components/GameModeCards';

export default function HomeBarebones() {
  return (
    <MainLayout>
      <div>
        <h1>Setlist Street</h1>
        
        <section>
          <GameModeCards />
        </section>
      </div>
    </MainLayout>
  );
} 