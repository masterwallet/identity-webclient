import { connect } from 'react-redux';
import { ConfirmPinComponent } from './../../components/install/ConfirmPinComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onUpdatePin: (value) => {
    dispatch({ type: 'UPDATE_PIN_CONFIRM', payload: value })
  }
});
  
export const ConfirmPin = connect(mapStateToProps, mapDispatchToProps)(ConfirmPinComponent);
export default { ConfirmPin };
