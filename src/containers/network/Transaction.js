import { connect } from 'react-redux';
import { NetworkTransactionComponent } from './../../components/network/NetworkTransactionComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const NetworkTransaction = connect(mapStateToProps, mapDispatchToProps)(NetworkTransactionComponent);
export default { NetworkTransaction };
