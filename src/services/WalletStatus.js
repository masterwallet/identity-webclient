import { fetchJson } from './ApiRequest';
import { toastr } from 'react-redux-toastr';

export const dispatchWalletsAsset = (dispatch) => {
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
      }
    }).catch(err => {
      console.error(err.toString());
      dispatch({ type: 'WALLET_DETAILS_ERROR', payload: err.toString() });
      toastr.error(err.toString());
    });
};
