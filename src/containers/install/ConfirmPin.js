import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import { ConfirmPinComponent } from './../../components/install/ConfirmPinComponent';
import { postJson } from './../../services/ApiRequest';
import { toastr } from 'react-redux-toastr';

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
    const payload = {
      format: storage,
      pinCode,
      seed: entropy.getWords()
    };
    postJson('/api/storage', payload)
      .then((res) => {
        dispatch({ type: 'SUBMISSION_LOADING_DONE', payload: res });
      })
      .catch((e) => {
        dispatch({ type: 'SUBMISSION_LOADING_ERROR', payload: e.toString() });
        toastr.error(_t.installationError, e.toString());
      })
  }
});

export const ConfirmPin = connect(mapStateToProps, mapDispatchToProps)(ConfirmPinComponent);
export default { ConfirmPin };
