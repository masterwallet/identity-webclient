import { getRoot, getLanguage } from './../services/ApiRequest';

const initialConfig = { isLoading: true, error: '', data: [] };

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
  networksConfig: { ...initialConfig },
  exchangesConfig: { ...initialConfig }
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
      const networksConfig = { ...initialConfig };
      const exchangesConfig = { ...initialConfig };
      return { ...state, networksConfig, exchangesConfig };
    }
    case 'CONFIG_NETWORKS_RECEIVED': {
      const networksConfig = { isLoading: false, data: payload.data.networks, error: payload.error };
      const exchangesConfig = { isLoading: false, data: payload.data.exchanges, error: payload.error };
      return { ...state, networksConfig, exchangesConfig };
    }
    case 'CONFIG_NETWORKS_ERROR': {
      const networksConfig = { isLoading: false, data: {}, error: payload };
      const exchangesConfig = { isLoading: false, data: {}, error: payload };
      return { ...state, networksConfig, exchangesConfig };
    }

    default:
  }
  return state;
};
