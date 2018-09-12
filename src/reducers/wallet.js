const defaultAssets = {
  isLoading: true,
  error: ''
};

const defaultDeletionStatus = {
  deleted: false,
  isDeleting: false,
  error: ''
};

const initialState = {
  object: {},
  isLoading: true,
  error: '',
  assets: defaultAssets,
  deletionStatus: defaultDeletionStatus
};

const fixIcon = w => ({...w, icon: `/networks/${w.network}.png`});

export default function (state = initialState, action) {
  switch (action.type) {

    case 'WALLET_DETAILS_RECEIVED': {
      const { data } = action.payload;
      return { ...state, object: fixIcon(data), isLoading: false, error: '' };
    }
    case 'WALLET_DETAILS_REQUEST': {
      return { ...state, isLoading: true, error: '', assets: { ...defaultAssets } };
    }
    case 'WALLET_DETAILS_ERROR': {
      const { error } = action.payload;
      return { ...state, isLoading: false, error, assets: { ...defaultAssets }};
    }

    case 'WALLET_ASSETS_RECEIVED': {
      const { data } = action.payload;
      const pendingAssets = data.assets.map(a => {
        if (!a.value && a.contractAddress) {
          return { ...a, isPending: true };
        }
        return a;
      });
      return { ...state, assets: { ...data, assets: pendingAssets, error: '', isLoading: false } };
    }
    case 'WALLET_ASSETS_REQUEST': {
      return { ...state, assets: { ...defaultAssets, error: '', isLoading: true }};
    }
    case 'WALLET_ASSETS_ERROR': {
      const { error } = action.payload;
      return { ...state, assets: { ...defaultAssets, error, isLoading: false } };
    }

    case 'WALLET_DELETE_REQUEST': {
      return { ...state, deletionStatus: { ...defaultDeletionStatus, isDeleting: true, error: '' }};
    }
    case 'WALLET_DELETED': {
      return { ...state, deletionStatus: { ...defaultDeletionStatus, deleted: true }};
    }
    case 'WALLET_DELETE_ERROR': {
      return { ...state, deletionStatus: { ...defaultDeletionStatus, error: action.payload.error }};
    }

    case 'WALLET_CONTRACT_RECEIVED': {
      const { data, contractAddress } = action.payload;
      if (!state.assets.assets) return state;
      const assets = state.assets.assets.map(a => {
        if (a.contractAddress === contractAddress) {
         return {...a, ...data.asset, isLoading: false, isPending: false, error: '' }
        }
        return a;
      });
      return { ...state, assets: { assets } };
    }
    case 'WALLET_CONTRACT_REQUEST': {
      const { contractAddress } = action.payload;
      if (!state.assets.assets) return state;
      const assets = state.assets.assets.map(a => {
        if (a.contractAddress === contractAddress) {
          return {...a, isLoading: true, isPending: false, error: '' }
        }
        return a;
      });
      return { ...state, assets: { assets } };
    }
    case 'WALLET_CONTRACT_ERROR': {
      const { error, contractAddress } = action.payload;
      if (!state.assets.assets) return state;
      const assets = state.assets.assets.map(a => {
        if (a.contractAddress === contractAddress) {
          return {...a, isLoading: false, isPending: false, error }
        }
        return a;
      });
      return { ...state, assets: { assets } };
    }

    default:
  }
  return state;
};
