/**
 * Storage service for managing localStorage operations
 */

export const storageService = {
  // User preferences
  setUserPreferences(preferences: any) {
    localStorage.setItem('user_preferences', JSON.stringify(preferences));
  },

  getUserPreferences() {
    const prefs = localStorage.getItem('user_preferences');
    return prefs ? JSON.parse(prefs) : null;
  },

  // Auth token
  setAuthToken(token: string) {
    localStorage.setItem('auth_token', token);
  },

  getAuthToken() {
    return localStorage.getItem('auth_token');
  },

  removeAuthToken() {
    localStorage.removeItem('auth_token');
  },

  // Cache data
  setCache(key: string, data: any, expiryMinutes: number = 30) {
    const expiryTime = Date.now() + expiryMinutes * 60 * 1000;
    localStorage.setItem(
      `cache_${key}`,
      JSON.stringify({ data, expiryTime })
    );
  },

  getCache(key: string) {
    const cached = localStorage.getItem(`cache_${key}`);
    if (!cached) return null;

    const { data, expiryTime } = JSON.parse(cached);
    if (Date.now() > expiryTime) {
      localStorage.removeItem(`cache_${key}`);
      return null;
    }

    return data;
  },

  clearCache() {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('cache_')) {
        localStorage.removeItem(key);
      }
    });
  },
};

export default storageService;
