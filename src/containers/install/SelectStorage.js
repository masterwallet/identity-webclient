import { connect } from 'react-redux';
import { SelectStorageComponent } from './../../components/install/SelectStorageComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const SelectStorage = connect(mapStateToProps, mapDispatchToProps)(SelectStorageComponent);
export default { SelectStorage };