import { connect } from 'react-redux';
import { ExchangeSelectComponent } from './../../../components/add/exchange/ExchangeSelectComponent';

const section = 'exchange';
const mapStateToProps = state => ({ ...state, section });
const mapDispatchToProps = dispatch => ({});

export const ExchangeSelect = connect(mapStateToProps, mapDispatchToProps)(ExchangeSelectComponent);
export default { ExchangeSelect };
