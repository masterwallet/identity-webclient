export const hasBip38 = (setup, network) => {
  if (
    network && network.length === 3 // network = BTC, ETH etc
    && setup 
    && setup.networksConfig
    && setup.networksConfig.data 
    && setup.networksConfig.data.length > 0
     
  ) {
    const networkData = setup.networksConfig.data.find(data => data.value === network);
    if (networkData && networkData.BIP38 !== undefined) {
      return networkData.BIP38;
    }
  }
  return false
};

export const getWalletAssetsList = ({ props, walletId }) => {
  let res = false;

  if (props && walletId) {
    const { assets, wallet } = props;

    if (
      assets 
      && assets.wallets 
      && assets.wallets.length > 0
    ) {
      const wallet = assets.wallets.find(w => w.id === walletId);
      if (
        wallet
        && wallet.details 
        && wallet.details.assets
        && wallet.details.assets.length >= 1
      ) {
        res = wallet.details;
      }
    }
    // If no data in Assets storage, try Wallets storage: useful, when switching screens of the same wallet
    if (!res) {
      if (
        wallet
        && wallet.assets
        && wallet.assets.assets
        && wallet.assets.assets.length >= 1
      ) {
        res = wallet.assets;
      }
    }
  }
  
  return res;
};

export const formatAssetValue = (value) => {
  const niceFloat = x => (parseFloat(x).toFixed(2).replace(/\.0{1,5}$/, ''));
  const billion = Math.pow(10, 9);
  const million = Math.pow(10, 6);
  const thousand = Math.pow(10, 3);
  value = parseFloat(value);
  if (value > billion) {
    return niceFloat(value / billion) + ' bln';
  } else if (value > million) {
    return niceFloat(value / million) + ' mln';
  } else if (value > thousand) {
    return niceFloat(value); 
  }
  return value;
};

export const historyNeedsReload = ({ history }) => {
  return !history 
          || 
          (
            !history.loading 
            && (
              history.error 
              || !history.list 
              || history.list.length === 0
            )
          )
};