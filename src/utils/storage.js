const STORAGE_KEY = 'countdowns';

export function loadCountdowns() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCountdowns(countdowns) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(countdowns));
  } catch (e) {
    console.error('Failed to save countdowns:', e);
  }
}
