import { connect } from 'react-redux';
import { PinComponent } from './../../components/install/PinComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onUpdatePin: (value) => {
    dispatch({ type: 'UPDATE_PIN', payload: value })
  }
});

export const Pin = connect(mapStateToProps, mapDispatchToProps)(PinComponent);
export default { Pin };
