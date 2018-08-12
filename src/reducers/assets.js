const defaultAssets = {
  isLoading: true,
  error: ''
};

const initialState = {
  total: '0',
  currency: 'USD',
  showPrices: true,
  wallets: [],
  assets: [],
  verifyWallet: { name: '', isUnique: true },
  status: { isLoading: true, error: '' }
};

const fixIcons = (wallets) => (wallets.map(w => ({...w, icon: `/networks/${w.network}.png`})));

export default function (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_NAME': {
      const { value } = action.payload;
      const namesUsed = state.wallets.map(w => w.name);
      const verifyWallet = { name: value, isUnique: namesUsed.indexOf(value) === -1 };
      return { ...state, verifyWallet };
    }
    case 'WALLETS_LIST_RECEIVED': {
      const status = { isLoading: false, error: '' };
      return { ...state, wallets: fixIcons(action.payload).reverse(), status };
    }
    case 'WALLETS_LIST_REQUEST': {
      const status = { isLoading: true, error: '' };
      return { ...state, status };
    }
    case 'WALLETS_LIST_ERROR': {
      const status = { isLoading: false, error: action.payload  };
      return { ...state, status };
    }

    case 'WALLET_ASSETS_RECEIVED': {
      const { walletId, data } = action.payload;
      const wallets = state.wallets.slice();
      const w = wallets.filter(w => (w.id === walletId))[0];
      const pendingAssets = data.assets.map(a => {
        if (!a.value && a.contractAddress) { return { ...a, isPending: true }; }
        return a;
      });
      w.details = { ...data, assets: pendingAssets, error: '', isLoading: false };
      return { ...state, wallets};
    }

    case 'WALLET_ASSETS_REQUEST': {
      const { walletId } = action.payload;
      const wallets = state.wallets.slice();
      const w = wallets.filter(w => (w.id === walletId))[0];
      w.details = { ...defaultAssets, error: '', isLoading: true };
      return { ...state, wallets };
    }
    case 'WALLET_ASSETS_ERROR': {
      const { walletId, error } = action.payload;
      const wallets = state.wallets.slice();
      const w = wallets.filter(w => (w.id === walletId))[0];
      w.details = { ...defaultAssets, error, isLoading: false };
      return { ...state, wallets };
    }
    default:
  }
  return state
};

