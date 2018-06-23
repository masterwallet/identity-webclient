const initialState = {
  language: 'en',
  apiRoot: localStorage.getItem("masterwallet_api_root") || 'http://localhost:7773',
  firstRun: true
};

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
