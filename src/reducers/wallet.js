const defaultAssets = {
  isLoading: true,
  error: '',
  total: '0',
  currency: 'USD',
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
  deletionStatus: defaultDeletionStatus,
  currentWalletId: ''
};

const fixIcon = w => ({ ...w, icon: `/networks/${w.network}.png` });

const withTotals = state => {

  const { assets } = state;
  const assetsList = assets.assets || [];

  const currency = (assets.currency || 'usd').toLowerCase();
  let total = 0;
  
  assetsList.filter(asset => (
    asset.symbol &&
    !asset.isLoading &&
    !asset.isPending &&
    !asset.error &&
    asset.value &&
    asset.cmc
  )).forEach(asset => {
    const { value, cmc } = asset;
    const price = cmc[`price_${currency}`];
    asset[`value_${currency}`] = parseFloat(value, 10) * price;
    total += asset[`value_${currency}`];
  });

  return {
    ...state,
    assets: {
      ...assets,
      total: total.toFixed(2)
    }
  };
};

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
      return { ...state, isLoading: false, error, assets: { ...defaultAssets } };
    }

    case 'WALLET_ASSETS_RECEIVED': {
      const { currentWalletId } = state;
      const { walletId, data } = action.payload;
      if (currentWalletId !== walletId) {
        return { ...state };
      }
      const pendingAssets = data.assets.map(a => {
        if (!a.value && a.contractAddress) {
          return { ...a, isPending: true };
        }
        return a;
      });
      return withTotals({ ...state, assets: { ...data, assets: pendingAssets, error: '', isLoading: false } });
    }
    case 'WALLET_ASSETS_REQUEST': {
      const { currentWalletId } = state;
      const { walletId } = action.payload;
      if (currentWalletId !== walletId) {
        return { ...state };
      }
      return withTotals({ ...state, assets: { ...defaultAssets, error: '', isLoading: true } });
    }
    case 'WALLET_ASSETS_ERROR': {
      const { currentWalletId } = state;
      const { walletId, error } = action.payload;
      if (currentWalletId !== walletId) {
        return { ...state };
      }
      return withTotals({ ...state, assets: { ...defaultAssets, error, isLoading: false } });
    }

    case 'WALLET_DELETE_REQUEST': {
      return { ...state, deletionStatus: { ...defaultDeletionStatus, isDeleting: true, error: '' } };
    }
    case 'WALLET_DELETED': {
      return { ...state, deletionStatus: { ...defaultDeletionStatus, deleted: true } };
    }
    case 'WALLET_DELETE_ERROR': {
      return { ...state, deletionStatus: { ...defaultDeletionStatus, error: action.payload.error } };
    }

    case 'WALLET_CONTRACT_RECEIVED': {
      const { currentWalletId } = state;
      const { walletId, data, contractAddress } = action.payload;
      if (currentWalletId !== walletId) {
        return { ...state };
      }
      if (!state.assets.assets) return state;
      const assets = state.assets.assets.map(a => {
        if (a.contractAddress === contractAddress) {
          return { ...a, ...data.asset, isLoading: false, isPending: false, error: '' }
        }
        return a;
      });
      return withTotals({ ...state, assets: { assets } });
    }
    case 'WALLET_CONTRACT_REQUEST': {
      const { currentWalletId } = state;
      const { walletId, contractAddress } = action.payload;
      if (currentWalletId !== walletId) {
        return { ...state };
      }
      if (!state.assets.assets) return state;
      const assets = state.assets.assets.map(a => {
        if (a.contractAddress === contractAddress) {
          return { ...a, isLoading: true, isPending: false, error: '' }
        }
        return a;
      });
      return withTotals({ ...state, assets: { assets } });
    }
    case 'WALLET_CONTRACT_ERROR': {
      const { currentWalletId } = state;
      const { walletId, error, contractAddress } = action.payload;
      if (currentWalletId !== walletId) {
        return { ...state };
      }
      if (!state.assets.assets) return state;
      const assets = state.assets.assets.map(a => {
        if (a.contractAddress === contractAddress) {
          return { ...a, isLoading: false, isPending: false, error }
        }
        return a;
      });
      return withTotals({ ...state, assets: { assets } });
    }
    case '@@router/LOCATION_CHANGE': {
      const { pathname } = action.payload;
      const parts = pathname.split('/');
      const currentWalletId = parts[parts.indexOf('wallets') + 1] || '';
      return { ...state, currentWalletId };
    }

    default:
  }
  return state;
};
