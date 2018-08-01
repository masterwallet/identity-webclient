const initialState = {
  object: {},
  isLoading: true,
  error: ''
};

export default function (state = initialState, action) {
  switch (action.type) {

    case 'WALLET_DETAILS_RECEIVED': {
      return { ...state, object: action.payload, isLoading: false, error: '' };
    }
    case 'WALLET_DETAILS_REQUEST': {
      return { ...state, isLoading: true, error: '' };
    }
    case 'WALLET_DETAILS_ERROR': {
      return { ...state, isLoading: false, error: action.payload };
    }

    default:
  }
  return state;
};
