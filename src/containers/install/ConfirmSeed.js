import { connect } from 'react-redux';
import { ConfirmSeedComponent } from './../../components/install/ConfirmSeedComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onChange: ({ value, index }) => {
    dispatch({ type: 'CONFIRM_WORD', payload: { value, index }});
  },
  onInit: () => {
    // dispatch({ type: 'INIT_CONFIRMATION_WORDS', payload: ['', '', ''] })
    //fetch('/locale/en/bip39.json').then(r => r.json())
    //  .then(json => (dispatch({ type: 'INIT_DICTIONARY', payload: json })));
  }
});

export const ConfirmSeed = connect(mapStateToProps, mapDispatchToProps)(ConfirmSeedComponent);
export default { ConfirmSeed };
