const RECENTS_KEY = "palette-recents";
const FAVORITES_KEY = "palette-favorites";

export function getStoredRecents() {
  const saved = localStorage.getItem(RECENTS_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function saveStoredRecents(recents) {
  localStorage.setItem(RECENTS_KEY, JSON.stringify(recents));
}

export function clearStoredRecents() {
  localStorage.removeItem(RECENTS_KEY);
}

export function getStoredFavorites() {
  const saved = localStorage.getItem(FAVORITES_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function saveStoredFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function clearStoredFavorites() {
  localStorage.removeItem(FAVORITES_KEY);
}