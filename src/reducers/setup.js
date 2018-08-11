import { getRoot, getLanguage } from './../services/ApiRequest';
const initialState = {
  language: getLanguage(),
  apiRoot: getRoot(), // root of the current pair
  pairs: [], // todo: load pairs from the session storage

  isFirstRun: !localStorage.getItem('masterwallet_pair'),
  termsAccepted: false,
  privacyAccepted: false,

  serverStatus: {
    isLoading: true,
    isRunning: true,
    error: '',
    data: {}
  },
  networksConfig: {
    isLoading: true,
    error: '',
    data: []
  },
  exchangesConfig: {
    isLoading: true,
    error: '',
    data: []
  }
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'SERVER_STATUS_REQUEST': {
      const serverStatus = { ...initialState.serverStatus };
      return { ...state, serverStatus };
    }
    case 'SERVER_STATUS_RECEIVED': {
      const error = payload.reason === 'first_run' ? '' : payload.error;
      const serverStatus = { isLoading: false, isRunning: true, data: payload.data, error };
      const isFirstRun = !!(payload.reason === 'first_run');
      return { ...state, serverStatus, isFirstRun };
    }
    case 'SERVER_STATUS_ERROR': {
      const isRunning = (payload !== 'TypeError: Failed to fetch');
      const serverStatus = { isLoading: false, isRunning, data: {}, error: payload };
      return { ...state, serverStatus };
    }

    case 'CONFIG_NETWORKS_REQUEST': {
      const networksConfig = { ...initialState.serverStatus };
      return { ...state, networksConfig };
    }
    case 'CONFIG_NETWORKS_RECEIVED': {
      const networksConfig = { isLoading: false, data: payload.data, error: payload.error };
      return { ...state, networksConfig };
    }
    case 'CONFIG_NETWORKS_ERROR': {
      const networksConfig = { isLoading: false, data: {}, error: payload };
      return { ...state, networksConfig };
    }

    case 'CONFIG_EXCHANGES_REQUEST': {
      const exchangesConfig = { ...initialState.serverStatus };
      return { ...state, exchangesConfig };
    }
    case 'CONFIG_EXCHANGES_RECEIVED': {
      const exchangesConfig = { isLoading: false, data: payload.data, error: payload.error };
      return { ...state, exchangesConfig };
    }
    case 'CONFIG_EXCHANGES_ERROR': {
      const exchangesConfig = { isLoading: false, data: {}, error: payload };
      return { ...state, exchangesConfig };
    }

    default:
  }
  return state;
};
