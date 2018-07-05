import { connect } from 'react-redux';
import { NetworkStatusComponent } from './../../components/network/NetworkStatusComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const NetworkStatus = connect(mapStateToProps, mapDispatchToProps)(NetworkStatusComponent);
export default { NetworkStatus };
