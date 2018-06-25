import { getRoot, getLanguage } from './../services/ApiRequest';
const initialState = {
  language: getLanguage(),
  apiRoot: getRoot(),
  
  isFirstRun: false,
  termsAccepted: false,
  privaceAccepted: false,

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
      const serverStatus = { isLoading: false, isRunning: true, data: payload, error: '' };
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
