import { connect } from 'react-redux';
import { ExchangeNameComponent } from './../../../components/add/exchange/ExchangeNameComponent';

const section = 'exchange';
const mapStateToProps = state => ({ ...state, section });
const mapDispatchToProps = dispatch => ({});

export const ExchangeName = connect(mapStateToProps, mapDispatchToProps)(ExchangeNameComponent);
export default { ExchangeName };
