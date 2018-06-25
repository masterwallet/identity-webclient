import { connect } from 'react-redux';
import { ExchangeCompleteComponent } from './../../../components/add/exchange/ExchangeCompleteComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const ExchangeComplete = connect(mapStateToProps, mapDispatchToProps)(ExchangeCompleteComponent);
export default { ExchangeComplete };
