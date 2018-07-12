import { connect } from 'react-redux';
import { ExchangeCompleteComponent } from './../../../components/add/exchange/ExchangeCompleteComponent';

const section = 'exchange';
const mapStateToProps = state => ({ ...state, section });
const mapDispatchToProps = dispatch => ({});

export const ExchangeComplete = connect(mapStateToProps, mapDispatchToProps)(ExchangeCompleteComponent);
export default { ExchangeComplete };
