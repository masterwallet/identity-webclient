import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import { ConfirmPinComponent } from './../../components/install/ConfirmPinComponent';
import { postJson } from './../../services/ApiRequest';
import { toastr } from 'react-redux-toastr';
import { dispatchServerStatus } from './../../services/ServerStatus';

const _t = {
  installationError: 'Installation Error'
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onContinue: (url) => {
    // todo:
    // dispatch(push(url));
  },
  onUpdatePin: (value) => {
    dispatch({ type: 'UPDATE_PIN_CONFIRM', payload: value })
  },
  onSubmit: ({ storage, pinCode, entropy }) => {
    dispatch({ type: 'SUBMISSION_LOADING_STARTED' });
    const passphrase = '';
    const payload = {
      format: storage,
      pinCode,
      seed: entropy.getSeed(passphrase),
      passphrase: ''
    };
    postJson('/api/storage', payload)
      .then((res) => {
        dispatch({ type: 'SUBMISSION_LOADING_DONE', payload: res });
        dispatchServerStatus(dispatch);
        if (res.data.token) {
          dispatch({ type: 'AUTH_TOKEN_RECEIVED', payload: res.data.token });
          sessionStorage.setItem('authToken', JSON.stringify(res.data.token));
        }
      })
      .catch((e) => {
        dispatch({ type: 'SUBMISSION_LOADING_ERROR', payload: e.toString() });
        toastr.error(_t.installationError, e.toString());
      })
  }
});

export const ConfirmPin = connect(mapStateToProps, mapDispatchToProps)(ConfirmPinComponent);
export default { ConfirmPin };
