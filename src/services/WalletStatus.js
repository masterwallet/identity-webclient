import { fetchJson } from './ApiRequest';
import { toastr } from 'react-redux-toastr';

export const dispatchWalletsAssetId = (walletId, assetId, dispatch) => {
};

export const dispatchWalletsAssets = (walletId, dispatch) => {
  dispatch({ type: 'WALLET_ASSETS_REQUEST' });
  fetchJson(`/api/wallets/${walletId}/assets`)
    .then(response => {
      if (response.error) {
        dispatch({ type: 'WALLET_ASSETS_ERROR', payload: response.error });
      } else {
        dispatch({type: 'WALLET_ASSETS_RECEIVED', payload: response.data});

        // ok, we have a queue of assets with unknown value, lets download all of them....
      }
    }).catch(err => {
    console.error(err.toString());
    dispatch({ type: 'WALLET_ASSETS_ERROR', payload: err.toString() });
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

export const dispatchWalletDetails = (id, dispatch) => {
  dispatch({ type: 'WALLET_DETAILS_REQUEST' });
  fetchJson(`/api/wallets/${id}`)
    .then(response => {
      if (response.error) {
        dispatch({ type: 'WALLET_DETAILS_ERROR', payload: response.error });
      } else {
        dispatch({type: 'WALLET_DETAILS_RECEIVED', payload: response.data});
        dispatchWalletsAssets(id, dispatch);
      }
    }).catch(err => {
      console.error(err.toString());
      dispatch({ type: 'WALLET_DETAILS_ERROR', payload: err.toString() });
      toastr.error(err.toString());
    });
};
