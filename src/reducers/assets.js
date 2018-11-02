const defaultAssets = {
  isLoading: true,
  error: ''
};

const initialState = {
  total: '0',
  currency: 'USD',
  loading: {},
  showPrices: true,
  needReload: true,
  wallets: [],
  assets: [],
  verifyWallet: { name: '', isUnique: true },
  status: { isLoading: true, error: '', firstRun: true }
};

const fixIcons = (wallets) => (wallets.map(w => ({...w, icon: `/networks/${w.network}.png`})));

const withTotals = state => {
  const { wallets } = state;

  const loadingAssetsList = wallets.filter(w => (w && w.details && w.details.isLoading));

  const loadingAssetsBalance = wallets.filter(w => {
    if (w && w.details && w.details.assets) {
      return w.details.assets.filter(w => (w.isPending || w.isLoading)).length;
    }
    return false;
  });

  const currency = (state.currency || 'usd').toLowerCase();
  const loadedWallets = wallets.filter(w => (w &&
    w.details &&
    !w.details.isPending &&
    !w.details.isLoading &&
    !w.details.error &&
    w.details.assets));


  const subtotals = {};
  const assetMap = {};
  loadedWallets.forEach(w => {

    w.details.assets
      .filter(asset => (
        asset.symbol &&
        !asset.isLoading &&
        !asset.isPending &&
        !asset.error &&
        asset.value &&
        asset.cmc
      ))
      .forEach(({ symbol, name, value, icon, cmc }) => {
        if (typeof assetMap[symbol] === 'undefined') {
          assetMap[symbol] = { symbol, name, value: parseFloat(value, 10), icon, cmc };
        } else {
          assetMap[symbol].value += parseFloat(value, 10);
        }
        if (cmc && cmc[`price_${currency}`]) {
          const price = cmc[`price_${currency}`];
          if (typeof subtotals[w.id] === 'undefined') subtotals[w.id] = 0;
          subtotals[w.id] += parseFloat(value, 10) * price;
        }
      });
  });
  // console.info('assets', loadedWallets.map(w => (w.details.assets)));
  const assets = Object.values(assetMap);

  // const getTotal = loadedWallets
  //   .map(w => {
  //     return w.details.assets.map(asset => {
  //       const { cmc, value } = asset;
  //       if (cmc && !isNaN(value) && value) {
  //         const priceField = `price_${currency}`;
  //         return value * cmc[priceField];
  //       }
  //       return 0;
  //     });
  //   }).reduce((acc, value) => (parseFloat(acc) + parseFloat(value)), 0);

  const total = assets.reduce((acc, asset) => {
    const { value, cmc } = asset;
    if (cmc && !isNaN(value) && value) {
      const price = cmc[`price_${currency}`];
      return parseFloat(acc) + parseFloat(value) * parseFloat(price);
    }
    return parseFloat(acc);
  }, 0);

  return {
    ...state,
    loading: {
      assets: loadingAssetsList.length,
      balances: loadingAssetsBalance.length
    },
    //total: getTotal.toFixed(2),
    total: total.toFixed(2),
    subtotals,
    assets
  };
};

export default function (state = initialState, action) {
  console.log('action.type=', action.type);
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
      return withTotals({ ...state, wallets: fixIcons(action.payload).reverse(), status });
    }
    case 'WALLETS_LIST_REQUEST': {
      const status = { isLoading: true, error: '', firstRun: false };
      return { ...state, status, needReload: false };
    }
    case 'WALLETS_LIST_ERROR': {
      const status = { isLoading: false, error: action.payload  };
      return { ...state, status };
    }
    case 'WALLETS_LIST_NEED_RELOAD' : {
      return { ...state, needReload: true };
    }

    case 'WALLET_ASSETS_RECEIVED': {
      const { walletId, data } = action.payload;
      const wallets = state.wallets.slice();
      const w = wallets.filter(w => (w.id === walletId))[0];
      const pendingAssets = data.assets.map(a => {
        if (!a.value && a.contractAddress) { return { ...a, isPending: true }; }
        return a;
      });
      if (w) {
        w.details = { ...w.details, assets: pendingAssets, error: '', isLoading: false };
      }
      return withTotals({ ...state, wallets});
    }

    case 'WALLET_ASSETS_REQUEST': {
      const { walletId } = action.payload;
      const wallets = state.wallets.slice();
      const w = wallets.filter(w => (w.id === walletId))[0];
      if (w) {
        w.details = { ...defaultAssets, error: '', isLoading: true };
      }
      return withTotals({ ...state, wallets });
    }
    case 'WALLET_ASSETS_ERROR': {
      const { walletId, error } = action.payload;
      const wallets = state.wallets.slice();
      const w = wallets.filter(w => (w.id === walletId))[0];
      if (w) {
        w.details = { ...defaultAssets, error, isLoading: false };
      }
      return withTotals({ ...state, wallets });
    }

    case 'WALLET_CONTRACT_RECEIVED': {
      const { walletId, data, contractAddress } = action.payload;
      const wallets = state.wallets.slice();
      const w = wallets.filter(w => (w.id === walletId))[0];
      if (!w || !w.details || !w.details.assets) return state;

      const assets = w.details.assets.map(a => {
        if (a.contractAddress === contractAddress) {
          return {...a, ...data.asset, isLoading: false, isPending: false, error: '' }
        }
        return a;
      });
      w.details.assets = assets.slice();
      return withTotals({ ...state, wallets });
    }
    case 'WALLET_CONTRACT_REQUEST': {
      const { walletId, contractAddress } = action.payload;
      const wallets = state.wallets.slice();
      const w = wallets.filter(w => (w.id === walletId))[0];
      if (!w || !w.details || !w.details.assets) return state;
      const assets = w.details.assets.map(a => {
        if (a.contractAddress === contractAddress) {
          return {...a, isLoading: true, isPending: false, error: '' }
        }
        return a;
      });
      w.details.assets = assets.slice();
      return withTotals({ ...state, wallets });
    }
    case 'WALLET_CONTRACT_ERROR': {
      const { walletId,error, contractAddress } = action.payload;
      const wallets = state.wallets.slice();
      const w = wallets.filter(w => (w.id === walletId))[0];
      if (!w || !w.details || !w.details.assets) return state;
      const assets = w.details.assets.map(a => {
        if (a.contractAddress === contractAddress) {
          return {...a, isLoading: false, isPending: false, error }
        }
        return a;
      });
      w.details.assets = assets.slice();
      return withTotals({ ...state, wallets });
    }

    default:
  }
  return state
};

