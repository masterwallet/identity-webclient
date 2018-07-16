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
      return { ...state, serverStatus };
    }
    case 'SERVER_STATUS_ERROR': {
      const isRunning = (payload !== 'TypeError: Failed to fetch');
      const serverStatus = { isLoading: false, isRunning, data: {}, error: payload };
      return { ...state, serverStatus };
    }
    default:
  }
  return state;
};
