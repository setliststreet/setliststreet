// lib/guestHelpers.ts

export function storeGuestEmail(email: string) {
  localStorage.setItem('guest_email', email);
}

export function getGuestEmail(): string | null {
  return localStorage.getItem('guest_email');
}

export function clearGuestEmail(): void {
  localStorage.removeItem('guest_email');
}

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
