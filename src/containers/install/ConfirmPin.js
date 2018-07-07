import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { ConfirmPinComponent } from './../../components/install/ConfirmPinComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onContinue: (url) => {
    dispatch(push(url));
  },
  onUpdatePin: (value) => {
    dispatch({ type: 'UPDATE_PIN_CONFIRM', payload: value })
  }
});

export const ConfirmPin = connect(mapStateToProps, mapDispatchToProps)(ConfirmPinComponent);
export default { ConfirmPin };
