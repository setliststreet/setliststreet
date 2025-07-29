
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