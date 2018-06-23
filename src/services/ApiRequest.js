
const getRoot = () => {
  return process.env.REACT_APP_PROXY || 'http://localhost:9111/api';
};

const fetchJson = (url, options = {}) => {
  return fetch(getRoot() + url, options).then(res => res.json());
};

export default {
  fetchJson
};
