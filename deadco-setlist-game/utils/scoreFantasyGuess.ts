type SongSet = string[];
type FantasySet = {
  set1: SongSet;
  set2_pre_drums: SongSet;
  set2_post_drums: SongSet;
  encore: SongSet;
};

export function scoreFantasyGuess(
  actual: FantasySet,
  guess: FantasySet,
  songPlayCount: Record<string, number>
) {
  let totalScore = 0;
  let sectionBonuses = 0;

  const sections: (keyof FantasySet)[] = [
    'set1',
    'set2_pre_drums',
    'set2_post_drums',
    'encore',
  ];

  for (const section of sections) {
    const actualSongs = actual[section];
    const guessedSongs = guess[section];
    let sectionScore = 0;
    let isPerfectOrder = true;

    guessedSongs.forEach((song, index) => {
      const actualIndex = actualSongs.indexOf(song);
      if (actualIndex === index) {
        sectionScore += 20;
      } else if (actualIndex !== -1) {
        sectionScore += 10;
        isPerfectOrder = false;
      } else {
        isPerfectOrder = false;
      }

      // Rare song bonus
      if ((songPlayCount[song] || 0) < 3) {
        sectionScore += 5;
      }
    });

    if (guessedSongs.length > 0 && isPerfectOrder && guessedSongs.length === actualSongs.length) {
      sectionBonuses += 10;
    }

    totalScore += sectionScore;
  }

  return {
    totalScore,
    sectionBonuses,
    grandTotal: totalScore + sectionBonuses,
  };
}
