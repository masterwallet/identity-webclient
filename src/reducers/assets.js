const defaultAssets = {
  isLoading: true,
  error: ''
};

const initialState = {
  total: '0',
  currency: 'USD',
  showPrices: true,
  needReload: true,
  wallets: [],
  assets: [],
  verifyWallet: { name: '', isUnique: true },
  status: { isLoading: true, error: '', firstRun: true }
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
    case 'WALLET_WIZARD_SUBMIT_DONE': {
      return {...state, needReload: true };
    }
    case 'WALLETS_LIST_RECEIVED': {
      const status = { isLoading: false, error: '' };
      return { ...state, wallets: fixIcons(action.payload).reverse(), status };
    }
    case 'WALLETS_LIST_REQUEST': {
      const status = { isLoading: true, error: '', firstRun: false };
      return { ...state, status, needReload: false };
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

    case 'WALLET_CONTRACT_RECEIVED': {
      const { walletId, data, contractAddress } = action.payload;
      const wallets = state.wallets.slice();
      const w = wallets.filter(w => (w.id === walletId))[0];
      if (!w.details || !w.details.assets) return state;

      const assets = w.details.assets.map(a => {
        if (a.contractAddress === contractAddress) {
          return {...a, ...data.asset, isLoading: false, isPending: false, error: '' }
        }
        return a;
      });
      w.details.assets = assets.slice();
      return { ...state, wallets };
    }
    case 'WALLET_CONTRACT_REQUEST': {
      const { walletId, contractAddress } = action.payload;
      const wallets = state.wallets.slice();
      const w = wallets.filter(w => (w.id === walletId))[0];
      if (!w.details || !w.details.assets) return state;
      const assets = w.details.assets.map(a => {
        if (a.contractAddress === contractAddress) {
          return {...a, isLoading: true, isPending: false, error: '' }
        }
        return a;
      });
      w.details.assets = assets.slice();
      return { ...state, wallets };
    }
    case 'WALLET_CONTRACT_ERROR': {
      const { walletId,error, contractAddress } = action.payload;
      const wallets = state.wallets.slice();
      const w = wallets.filter(w => (w.id === walletId))[0];
      if (!w.details || !w.details.assets) return state;
      const assets = w.details.assets.map(a => {
        if (a.contractAddress === contractAddress) {
          return {...a, isLoading: false, isPending: false, error }
        }
        return a;
      });
      w.details.assets = assets.slice();
      return { ...state, wallets };
    }

    default:
  }
  return state
};

