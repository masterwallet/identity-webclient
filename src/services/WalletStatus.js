import { fetchJson } from './ApiRequest';

export const dispatchWalletsAsset = (dispatch) => {
};

export const dispatchWalletsStatus = (dispatch) => {
  dispatch({ type: 'WALLETS_LIST_REQUEST' });
  fetchJson('/api/wallets')
    .then(response => {
      dispatch({ type: 'WALLETS_LIST_RECEIVED', payload: response.data.wallets });
      // console.info('WALLETS=', response.data.wallets);
      const queue = response.data.wallets;

    }).catch(err => {
    console.warn(err.toString());
    dispatch({ type: 'WALLETS_LIST_ERROR', payload: err.toString() });
  });
};

