import { fetchJson } from './ApiRequest';

export const dispatchConfigNetworks = (dispatch) => {
  dispatch({ type: 'CONFIG_NETWORKS_REQUEST' });
  fetchJson('/api/networks')
    .then(response => {
      dispatch({ type: 'CONFIG_NETWORKS_RECEIVED', payload: response });
    }).catch(err => {
      dispatch({ type: 'CONFIG_NETWORKS_ERROR', payload: err.toString() });
      console.warn(err.toString());
    });
};

export const dispatchServerStatus = (dispatch) => {
  dispatch({ type: 'SERVER_STATUS_REQUEST' });
  fetchJson('/api/status')
  .then(status => {
    dispatch({ type: 'SERVER_STATUS_RECEIVED', payload: status });
    dispatchConfigNetworks(dispatch);
  }).catch(err => {
    dispatch({ type: 'SERVER_STATUS_ERROR', payload: err.toString() });
    console.warn(err.toString());
  });
};

export default { dispatchConfigNetworks, dispatchServerStatus };
