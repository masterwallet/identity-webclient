import { connect } from 'react-redux';
import { SeedComponent } from './../../components/install/SeedComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onInit: () => {
    fetch('/locale/en/bip39.json').then(r => r.json())
      .then(json => (dispatch({ type: 'INIT_DICTIONARY', payload: json })));
  }
});

export const Seed = connect(mapStateToProps, mapDispatchToProps)(SeedComponent);
export default { Seed };
