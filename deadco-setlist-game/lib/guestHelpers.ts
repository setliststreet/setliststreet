
// Guest Email

export function storeGuestEmail(email: string) {
  localStorage.setItem('guest_email', email);
}

export function getGuestEmail(): string | null {
  return localStorage.getItem('guest_email');
}

export function clearGuestEmail(): void {
  localStorage.removeItem('guest_email');
}

// Opener Winner Status

export function storeOpenerWinnerStatus(isWinner: boolean): void {
  localStorage.setItem('opener_winner', JSON.stringify(isWinner));
}

export function getOpenerWinnerStatus(): boolean | null {
  const value = localStorage.getItem('opener_winner');
  return value ? JSON.parse(value) : null;
}

export function clearOpenerWinnerStatus(): void {
  localStorage.removeItem('opener_winner');
}


// Set1 Closer Winner Status
export function storeSet1CloserWinnerStatus(isWinner: boolean | null): void {
  if (isWinner === null) {
    localStorage.removeItem('set1_closer_winner');
  } else {
    localStorage.setItem('set1_closer_winner', JSON.stringify(isWinner));
  }
}

export function getSet1CloserWinnerStatus(): boolean | null {
  const value = localStorage.getItem('set1_closer_winner');
  return value ? JSON.parse(value) : null;
}

export function clearSet1CloserWinnerStatus(): void {
  localStorage.removeItem('set1_closer_winner');
}



// Set2 Opener Winner Status
export function storeSet2OpenerWinnerStatus(isWinner: boolean | null): void {
  if (isWinner === null) {
    localStorage.removeItem('set2_opener_winner');
  } else {
    localStorage.setItem('set1_closer_winner', JSON.stringify(isWinner));
  }
}

export function getSet2OpenerWinnerStatus(): boolean | null {
  const value = localStorage.getItem('set2_opener_winner');
  return value ? JSON.parse(value) : null;
}

export function clearSet2OpenerWinnerStatus(): void {
  localStorage.removeItem('set2_opener_winner');
}

// Set2 Pre Drum/Space Status
export function storePreDrumSpaceStatus(isWinner: boolean | null): void {
  if (isWinner === null) {
    localStorage.removeItem('pre_drum_space_winner');
  } else {
    localStorage.setItem('pre_drum_space_winner', JSON.stringify(isWinner));
  }
}

export function getPreDrumSpaceWinnerStatus(): boolean | null {
  const value = localStorage.getItem('pre_drum_space_winner');
  return value ? JSON.parse(value) : null;
}

export function clearPreDrumSpaceWinnerStatus(): void {
  localStorage.removeItem('pre_drum_space_winner');
}


// Set2 Post Drum/Space Status
export function storePostDrumSpaceStatus(isWinner: boolean | null): void {
  if (isWinner === null) {

    localStorage.removeItem('post_drum_space_winner');
  } else {
    localStorage.setItem('post_drum_space_winner', JSON.stringify(isWinner));
  }
}

export function getPostDrumSpaceWinnerStatus(): boolean | null {
  const value = localStorage.getItem('post_drum_space_winner');
  return value ? JSON.parse(value) : null;
}

export function clearPostDrumSpaceWinnerStatus(): void {
  localStorage.removeItem('post_drum_space_winner');
}

// Set2 Closer Winner Status
export function storeSet2CloserWinnerStatus(isWinner: boolean | null): void {
  if (isWinner === null) {
    localStorage.removeItem('set2_closer_winner');
  } else {
    localStorage.setItem('set2_closer_winner', JSON.stringify(isWinner));
  }
}

export function getSet2CloserWinnerStatus(): boolean | null {
  const value = localStorage.getItem('set2_closer_winner');
  return value ? JSON.parse(value) : null;
}

export function clearSet2CloserWinnerStatus(): void {

  localStorage.removeItem('set2_closer_winner');
}


// Encore Closer Winner Status
export function storeEncoreCloserWinnerStatus(isWinner: boolean | null): void {
  if (isWinner === null) {
    localStorage.removeItem('encore_closer_winner');
  } else {
    localStorage.setItem('encore_closer_winner', JSON.stringify(isWinner));
  }
}

export function getEncoreCloserWinnerStatus(): boolean | null {
  const value = localStorage.getItem('encore_closer_winner');
  return value ? JSON.parse(value) : null;
}

export function clearEncoreCloserWinnerStatus(): void {
  
  localStorage.removeItem('encore_closer_winner');
}