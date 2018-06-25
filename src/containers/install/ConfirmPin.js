import { connect } from 'react-redux';
import { ConfirmPinComponent } from './../../components/install/ConfirmPinComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const ConfirmPin = connect(mapStateToProps, mapDispatchToProps)(ConfirmPinComponent);
export default { ConfirmPin };
