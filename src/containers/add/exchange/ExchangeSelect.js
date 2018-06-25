import { connect } from 'react-redux';
import { ExchangeSelectComponent } from './../../../components/add/exchange/ExchangeSelectComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const ExchangeSelect = connect(mapStateToProps, mapDispatchToProps)(ExchangeSelectComponent);
export default { ExchangeSelect };
