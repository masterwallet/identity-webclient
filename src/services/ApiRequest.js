
export const getRoot = () => {
  const root = localStorage.getItem("masterwallet_api_root") ||
    process.env.REACT_APP_API_URL || '/api';
  return root;
};

export const getLanguage = () => {
  return localStorage.getItem('masterwallet_lang') || process.env.REACT_APP_LANG || 'en';
};

export const fetchJson = (url, options = {}) => {
  return fetch(getRoot() + url, options)
    .then(res => { 
      console.warn(res); return res.json(); 
    });
};

export default {
  getRoot,
  getLanguage,
  fetchJson
};
