import { fetchJson } from './ApiRequest';

export const dispatchServerStatus = (dispatch) => {
  dispatch({ type: 'SERVER_STATUS_REQUEST' });
  fetchJson('/status')
  .then(status => {
      dispatch({ type: 'SERVER_STATUS_RECEIVED', payload: status });
  }).catch(err => {
      console.warn(err.toString());
      dispatch({ type: 'SERVER_STATUS_ERROR', payload: err.toString() });
  });
};

export default { dispatchServerStatus };