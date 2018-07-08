import { connect } from 'react-redux';
import { ConfirmSeedComponent } from './../../components/install/ConfirmSeedComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onInit: () => {
    fetch('/locale/en/bip39.json').then(r => r.json())
      .then(json => (dispatch({ type: 'INIT_DICTIONARY', payload: json })));
  }
});

export const ConfirmSeed = connect(mapStateToProps, mapDispatchToProps)(ConfirmSeedComponent);
export default { ConfirmSeed };
