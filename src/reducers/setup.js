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
  exchangesConfig: { ...initialConfig },
  auth: { isLoading: false, tokens: [], error: '' }
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
    case 'AUTH_TOKEN_REQUEST' : {
      const { auth } = state;
      return { ...state, auth: { ...auth, isLoading: true } };
    }
    case 'AUTH_TOKEN_RECEIVED': {
      const { auth } = state;
      const { tokens } = auth; 
      const token = payload;
      tokens.push(token);
      return { ...state, auth: { ...auth, isLoading: false, tokens } };
    }
    case 'AUTH_TOKEN_ERROR': {
      const { auth } = state;
      const error = payload
      return { ...state, auth: { ...auth, isLoading: false, tokens: [], error } };
    }
    case 'AUTH_TOKEN_REMOVE': {
      return { ...state, auth: { isLoading: false, tokens: [], error: '' } };
    }

    default:
  }
  return state;
};
