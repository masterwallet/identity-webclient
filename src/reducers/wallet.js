const defaultAssets = {
  list: [],
  isLoading: true,
  error: ''
};

const initialState = {
  object: {},
  isLoading: true,
  error: '',
  assets: defaultAssets
};

const fixIcon = w => ({...w, icon: `/networks/${w.network}.png`});

export default function (state = initialState, action) {
  switch (action.type) {

    case 'WALLET_DETAILS_RECEIVED': {
      return { ...state, object: fixIcon(action.payload), isLoading: false, error: '' };
    }
    case 'WALLET_DETAILS_REQUEST': {
      return { ...state, isLoading: true, error: '', assets: { ...defaultAssets } };
    }
    case 'WALLET_DETAILS_ERROR': {
      return { ...state, isLoading: false, error: action.payload, assets: { ...defaultAssets }};
    }

    case 'WALLET_ASSETS_RECEIVED': {
      return { ...state, assets: { ...action.payload, error: '', isLoading: false } };
    }
    case 'WALLET_ASSETS_REQUEST': {
      return { ...state, assets: { ...defaultAssets, error: '', isLoading: true }};
    }
    case 'WALLET_ASSETS_ERROR': {
      return { ...state, assets: { ...defaultAssets, error: action.payload, isLoading: false } };
    }

    default:
  }
  return state;
};
