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