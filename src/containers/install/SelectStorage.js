import { connect } from 'react-redux';
import { SelectStorageComponent } from './../../components/install/SelectStorageComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onUpdate: (value) => {
    dispatch({ type: 'UPDATE_STORAGE', payload: value });
  },
  onUpdatePair: (value) => {
    dispatch({ type: 'UPDATE_PAIR', payload: value });
  }
});

export const SelectStorage = connect(mapStateToProps, mapDispatchToProps)(SelectStorageComponent);
export default { SelectStorage };
