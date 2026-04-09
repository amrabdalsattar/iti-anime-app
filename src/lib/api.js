const API_BASE = 'http://localhost:3000/api';

// ─── Generic fetch helper ──────────────────────────────────────────────────────
async function apiFetch(path, options = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('otaku_token') : null;
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'API error');
  return data;
}

// ─── Anime ────────────────────────────────────────────────────────────────────
export const getAnimeList = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return apiFetch(`/anime${qs ? '?' + qs : ''}`);
};

export const filterAnime = (type = 'all') =>
  apiFetch(`/anime/filter?type=${type}`);

export const searchAnime = (q) =>
  apiFetch(`/anime/search?q=${encodeURIComponent(q)}`);

export const getAnimeById = (id) => apiFetch(`/anime/${id}`);

export const getAnimeCharacters = (id) => apiFetch(`/anime/${id}/characters`);

export const createAnime = (body) =>
  apiFetch('/anime', { method: 'POST', body: JSON.stringify(body) });

export const updateAnime = (id, body) =>
  apiFetch(`/anime/${id}`, { method: 'PUT', body: JSON.stringify(body) });

export const deleteAnime = (id) =>
  apiFetch(`/anime/${id}`, { method: 'DELETE' });

export const addCharacterToAnime = (animeId, body) =>
  apiFetch(`/anime/${animeId}/characters`, { method: 'POST', body: JSON.stringify(body) });

// ─── Characters ───────────────────────────────────────────────────────────────
export const getTopCharacters = () => apiFetch('/characters/top');

export const getCharacterById = (id) => apiFetch(`/characters/${id}`);

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const loginUser = (body) =>
  apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(body) });

export const registerUser = (body) =>
  apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(body) });
