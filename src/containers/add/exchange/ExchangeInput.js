import { connect } from 'react-redux';
import { ExchangeInputComponent } from './../../../components/add/exchange/ExchangeInputComponent';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});

export const ExchangeInput = connect(mapStateToProps, mapDispatchToProps)(ExchangeInputComponent);
export default { ExchangeInput };
