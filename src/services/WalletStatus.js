import { fetchJson } from './ApiRequest';

export const dispatchWalletsAsset = (dispatch) => {
};

export const dispatchWalletsStatus = (dispatch) => {
  dispatch({ type: 'WALLETS_LIST_REQUEST' });
  fetchJson('/api/wallets')
    .then(response => {
      dispatch({ type: 'WALLETS_LIST_RECEIVED', payload: response.data.wallets });
      // console.info('WALLETS=', response.data.wallets);
      // const queue = response.data.wallets;
    }).catch(err => {
      console.warn(err.toString());
      dispatch({ type: 'WALLETS_LIST_ERROR', payload: err.toString() });
    });
};

export const dispatchWalletDetails = (id, dispatch) => {
  dispatch({ type: 'WALLET_DETAILS_REQUEST' });
  fetchJson(`/api/wallets/${id}`)
    .then(response => {
      dispatch({ type: 'WALLET_DETAILS_RECEIVED', payload: response.data });
    }).catch(err => {
      console.warn(err.toString());
      dispatch({ type: 'WALLET_DETAILS_ERROR', payload: err.toString() });
    });
};
