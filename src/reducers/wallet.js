const initialState = {
  object: {},
  isLoading: true,
  error: ''
};

const fixIcon = w => ({...w, icon: `/networks/${w.network}.png`});

export default function (state = initialState, action) {
  switch (action.type) {

    case 'WALLET_DETAILS_RECEIVED': {
      return { ...state, object: fixIcon(action.payload), isLoading: false, error: '' };
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
