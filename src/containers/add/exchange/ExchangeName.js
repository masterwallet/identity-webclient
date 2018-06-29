import { connect } from 'react-redux';
import { ExchangeNameComponent } from './../../../components/add/exchange/ExchangeNameComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const ExchangeName = connect(mapStateToProps, mapDispatchToProps)(ExchangeNameComponent);
export default { ExchangeName };
