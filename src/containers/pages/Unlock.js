import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { UnlockComponent } from './../../components/pages/UnlockComponent';
import { fetchJson, postJson } from './../../services/ApiRequest';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onInit: () => {
    fetchJson('/api/auth/lock').then(response => {
      dispatch({ type: 'AUTH_TOKEN_REMOVE' });
      sessionStorage.removeItem('authToken');
    });
  },
  onComplete: (pinCode) => {
    dispatch({ type: 'AUTH_TOKEN_REQUEST' });
    postJson('/api/auth/unlock', { pinCode }).then(response => {
      if (response.error) {
        dispatch({ type: 'AUTH_TOKEN_ERROR', payload: response.error });
      } else {
        dispatch({ type: 'AUTH_TOKEN_RECEIVED', payload: response.data });
        sessionStorage.setItem('authToken', JSON.stringify(response.data));
        dispatch(push('/wallets'));
      }
    }).catch(error => {
      dispatch({ type: 'AUTH_TOKEN_ERROR', payload: error.message });
    });
  }
});

export const Unlock = connect(mapStateToProps, mapDispatchToProps)(UnlockComponent);
export default { Unlock };
