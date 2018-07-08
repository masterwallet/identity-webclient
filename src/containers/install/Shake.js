import { connect } from 'react-redux';
import { ShakeComponent } from './../../components/install/ShakeComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onSeed: (value) => {
    dispatch({ type: 'SHAKE', payload: value });
  },
  onInit: () => {
    fetch('/locale/en/bip39.json').then(r => r.json())
      .then(json => (dispatch({ type: 'INIT_DICTIONARY', payload: json })));
  }
});

export const Shake = connect(mapStateToProps, mapDispatchToProps)(ShakeComponent);
export default { Shake };
