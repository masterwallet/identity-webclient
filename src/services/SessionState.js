
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
  console.log('overwriting ', alias, overwriteValue );
  const result = { ...Storage.get(alias, defaultValue), ...overwriteValue };
  console.info( 'overwritten=', result );
  return result;
};
export const saveSessionState = (alias, state) => {
  Storage.set(alias, state);
  return state;
};
