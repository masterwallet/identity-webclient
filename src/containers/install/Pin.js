import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { PinComponent } from './../../components/install/PinComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onContinue: (url) => {
    dispatch(push(url));
  },
  onUpdatePin: (value) => {
    dispatch({ type: 'UPDATE_PIN', payload: value })
  }
});

export const Pin = connect(mapStateToProps, mapDispatchToProps)(PinComponent);
export default { Pin };
