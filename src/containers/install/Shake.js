import { connect } from 'react-redux';
import { ShakeComponent } from './../../components/install/ShakeComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onSeed: (value) => {
    dispatch({ type: 'SHAKE', payload: value });
  }
});

export const Shake = connect(mapStateToProps, mapDispatchToProps)(ShakeComponent);
export default { Shake };
