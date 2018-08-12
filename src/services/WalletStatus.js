import { fetchJson } from './ApiRequest';
import { toastr } from 'react-redux-toastr';

export const dispatchWalletsAssetId = ({ walletId, contractAddress, dispatch, signal }) => {
  dispatch({ type: 'WALLET_CONTRACT_REQUEST', payload: { walletId, contractAddress } });
  return fetchJson(`/api/wallets/${walletId}/assets/${contractAddress}`, { signal })
    .then(response => {
      if (response.error) {
        dispatch({ type: 'WALLET_CONTRACT_ERROR', payload: { walletId, contractAddress, error: response.error } });
      } else {
        dispatch({type: 'WALLET_CONTRACT_RECEIVED', payload: { walletId, contractAddress, data: response.data }});
      }
    }).catch(err => {
      if (err.toString().indexOf('AbortError:') === -1) {
        console.error(err.toString());
        dispatch({type: 'WALLET_CONTRACT_ERROR', payload: {walletId, contractAddress, error: err.toString()}});
        toastr.error(err.toString());
      }
    });
};

export const dispatchWalletsAssetQueue = ({ walletId, queue, dispatch, signal }) => {

  const pickNext = () => {
    if (queue.length === 0) return;

    const { contractAddress } = queue.shift();
    dispatchWalletsAssetId({ walletId, contractAddress, dispatch, signal })
      .then(pickNext);
  };

  pickNext();
};

export const dispatchWalletsAssets = ({ walletId, dispatch, signal }) => {
  dispatch({ type: 'WALLET_ASSETS_REQUEST', payload: { walletId } });
  fetchJson(`/api/wallets/${walletId}/assets`)
    .then(response => {
      if (response.error) {
        dispatch({ type: 'WALLET_ASSETS_ERROR', payload: { walletId, error: response.error } });
      } else {
        dispatch({type: 'WALLET_ASSETS_RECEIVED', payload: {walletId, data: response.data } });
        // ok, we have a queue of assets with unknown value, lets download all of them....
        const queue = response.data.assets.filter(({ value, contractAddress }) => {
          return !value && contractAddress;
        });
        console.log('assets queue prepared', queue.length);
        setTimeout(() => { dispatchWalletsAssetQueue({ walletId, queue, dispatch, signal })}, 200);
      }
    }).catch(err => {
    console.error(err.toString());
    dispatch({ type: 'WALLET_ASSETS_ERROR', payload: { error: err.toString() } });
    toastr.error(err.toString());
  });
};

export const dispatchWalletsStatus = (dispatch, { assets }) => {
  const { wallets } = assets;
  const { isLoading, firstRun } = assets.status;
  if (isLoading && !firstRun) { console.info('wallet status: already loading...'); return false; }

  const loadingAssetsList = wallets.filter(w => (w && w.details && w.details.isLoading));
  if (loadingAssetsList.length) { console.info('wallets are loading assets list...', loadingAssetsList.length); return false; }

  const loadingAssetsBalance = wallets.filter(w => {
    if (w && w.details && w.details.assets) {
      return w.details.assets.filter(w => (w.isPending || w.isLoading)).length;
    }
    return false;
  });
  if (loadingAssetsBalance.length) { console.info('loading assets balance...', loadingAssetsBalance.length); return false; }

  if (wallets.length) { console.info('there are some wallets...', wallets.length); return false; }

  console.log('re-loading wallets information');
  dispatch({ type: 'WALLETS_LIST_REQUEST' });
  fetchJson('/api/wallets')
    .then(response => {
      if (response.error) {
        dispatch({type: 'WALLETS_LIST_ERROR', payload: response.error });
      } else {
        dispatch({type: 'WALLETS_LIST_RECEIVED', payload: response.data.wallets});
        if (response.data.wallets) {
          response.data.wallets.filter(w => w.id).map(w => {
            return dispatchWalletsAssets({ walletId: w.id, dispatch });
          });
        }
      }
    }).catch(err => {
      console.warn(err.toString());
      dispatch({ type: 'WALLETS_LIST_ERROR', payload: err.toString() });
      toastr.error(err.toString());
    });
};

export const dispatchWalletDetails = (walletId, dispatch) => {
  const controller = (typeof window.AbortController === 'function') ? (new window.AbortController()) : { abort: () => {} };

  dispatch({ type: 'WALLET_DETAILS_REQUEST' });
  fetchJson(`/api/wallets/${walletId}`)
    .then(response => {
      if (response.error) {
        dispatch({ type: 'WALLET_DETAILS_ERROR', payload: { walletId, error: response.error } });
      } else {
        dispatch({type: 'WALLET_DETAILS_RECEIVED', payload: { walletId, data: response.data }});
        dispatchWalletsAssets({ walletId, dispatch, signal: controller.signal });
      }
    }).catch(err => {
      console.error(err.toString());
      dispatch({ type: 'WALLET_DETAILS_ERROR', payload: { walletId, error: err.toString() }});
      toastr.error(err.toString());
    });
  return controller;
};
