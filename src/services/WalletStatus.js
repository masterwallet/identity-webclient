import { fetchJson } from './ApiRequest';
import { toastr } from 'react-redux-toastr';

export const dispatchWalletsAssetId = (walletId, contractAddress, dispatch) => {
  dispatch({ type: 'WALLET_CONTRACT_REQUEST', payload: { walletId, contractAddress } });
  return fetchJson(`/api/wallets/${walletId}/assets/${contractAddress}`)
    .then(response => {
      if (response.error) {
        dispatch({ type: 'WALLET_CONTRACT_ERROR', payload: { walletId, contractAddress, error: response.error } });
      } else {
        dispatch({type: 'WALLET_CONTRACT_RECEIVED', payload: { walletId, contractAddress, data: response.data }});
      }
    }).catch(err => {
    console.error(err.toString());
    dispatch({ type: 'WALLET_CONTRACT_ERROR', payload: { walletId, contractAddress, error: err.toString() } });
    toastr.error(err.toString());
  });
};

export const dispatchWalletsAssetQueue = (walletId, queue, dispatch) => {

  const pickNext = () => {
    if (queue.length === 0) return;

    const { contractAddress } = queue.shift();
    console.log("next contract to look: ", contractAddress);
    dispatchWalletsAssetId(walletId, contractAddress, dispatch)
      .then(pickNext);
  };

  pickNext();
};

export const dispatchWalletsAssets = (walletId, dispatch) => {
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
        })
        setTimeout(() => {
          dispatchWalletsAssetQueue(walletId, queue, dispatch)
        }, 200);
      }
    }).catch(err => {
    console.error(err.toString());
    dispatch({ type: 'WALLET_ASSETS_ERROR', payload: { error: err.toString() } });
    toastr.error(err.toString());
  });
};

export const dispatchWalletsStatus = (dispatch) => {
  dispatch({ type: 'WALLETS_LIST_REQUEST' });
  fetchJson('/api/wallets')
    .then(response => {
      if (response.error) {
        dispatch({type: 'WALLETS_LIST_ERROR', payload: response.error });
      } else {
        dispatch({type: 'WALLETS_LIST_RECEIVED', payload: response.data.wallets});
      }
    }).catch(err => {
      console.warn(err.toString());
      dispatch({ type: 'WALLETS_LIST_ERROR', payload: err.toString() });
      toastr.error(err.toString());
    });
};

export const dispatchWalletDetails = (walletId, dispatch) => {
  dispatch({ type: 'WALLET_DETAILS_REQUEST' });
  fetchJson(`/api/wallets/${walletId}`)
    .then(response => {
      if (response.error) {
        dispatch({ type: 'WALLET_DETAILS_ERROR', payload: { walletId, error: response.error } });
      } else {
        dispatch({type: 'WALLET_DETAILS_RECEIVED', payload: { walletId, data: response.data }});
        dispatchWalletsAssets(walletId, dispatch);
      }
    }).catch(err => {
      console.error(err.toString());
      dispatch({ type: 'WALLET_DETAILS_ERROR', payload: { walletId, error: err.toString() }});
      toastr.error(err.toString());
    });
};
