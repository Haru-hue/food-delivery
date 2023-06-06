export const safeGetItem = (key) => {
    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (error) {
        console.error('Invalid value in localStorage for key:', key);
        return null;
      }
    } else {
      return null;
    }
  };