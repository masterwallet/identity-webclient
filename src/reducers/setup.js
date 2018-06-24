const initialState = {
  language: 'en',
  apiRoot: localStorage.getItem("masterwallet_api_root") || process.env.REACT_APP_API_URL || '/',
  firstRun: true,
  serverStatus: {}}
;

// TODO: determine if that was firstRun, we can query our API server

export default function (state = initialState, action) {
  //switch (action.type) {
  //  case 'SCREEN_RESIZE': {
  //    if (typeof window === 'object') {
  //      return { ...state, width: window.innerWidth, height: window.innerHeight }
  //    }
  //    break;
  //  }
  //  default:
  //}
  return state
};
