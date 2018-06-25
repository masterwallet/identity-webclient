import { connect } from 'react-redux';
import { PinComponent } from './../../components/install/PinComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const Pin = connect(mapStateToProps, mapDispatchToProps)(PinComponent);
export default { Pin };
