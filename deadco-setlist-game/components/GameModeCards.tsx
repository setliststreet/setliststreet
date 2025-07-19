import React from 'react';
import GameModeCard from './GameModeCard';

export default function GameModeCards() {
  return (
    <div>
      <GameModeCard
        title="Guess the Opener"
        description="Predict which song will open the show."
        href="/guess-opener"
      />
      <GameModeCard
        title="Guess the Encore"
        description="Predict which song will be the encore."
        href="/guess-encore"
      />
      <GameModeCard
        title="Guess the Bust Out"
        description="Predict which rare song will be played."
        href="/guess-bust-out"
      />
      <GameModeCard
        title="Setlist Bingo"
        description="Build a bingo card of songs for the show."
        href="/setlist-bingo"
      />
      <GameModeCard
        title="Setlist Builder"
        description="Drag and drop songs into setlist slots."
        href="/setlist-builder"
      />
    </div>
  );
} 