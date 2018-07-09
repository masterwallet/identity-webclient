
export const Storage = {
  set: (x, value) => { sessionStorage.setItem(x, JSON.stringify(value)); },
  get: (x, defaultValue = '') => {
    const str = sessionStorage.getItem(x);
    if (!str || str === 'null' || str === 'undefined') return defaultValue;
    try {
      return JSON.parse(str);
    } catch (e) {
    }
    return defaultValue
  }
};

export const getSessionState = (alias, defaultValue = {}, overwriteValue = {}) => {
  return { ...Storage.get(alias, defaultValue), overwriteValue };
};
export const saveSessionState = (alias, state) => {
  Storage.set(alias, state);
  return state;
};
