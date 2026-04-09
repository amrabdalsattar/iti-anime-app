import { jwtDecode } from 'jwt-decode';

export const setToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('otaku_token', token);
    // Dispatch a custom event so components (like Navbar) can update immediately
    window.dispatchEvent(new Event('auth_changed'));
  }
};

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('otaku_token');
  }
  return null;
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('otaku_token');
    window.dispatchEvent(new Event('auth_changed'));
  }
};

export const getUser = () => {
  const token = getToken();
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    // Check if token is expired
    if (decoded.exp * 1000 < Date.now()) {
      logout();
      return null;
    }
    return decoded;
  } catch (error) {
    return null;
  }
};

export const isAdmin = () => {
  const user = getUser();
  return user?.role === 'admin';
};

export const isLoggedIn = () => {
  return !!getUser();
};
