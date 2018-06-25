import { connect } from 'react-redux';
import { ShakeComponent } from './../../components/install/ShakeComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const Shake = connect(mapStateToProps, mapDispatchToProps)(ShakeComponent);
export default { Shake };
