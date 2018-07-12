import { connect } from 'react-redux';
import { ExchangeInputComponent } from './../../../components/add/exchange/ExchangeInputComponent';

const section = 'exchange';
const mapStateToProps = state => ({ ...state, section });
const mapDispatchToProps = dispatch => ({
    onUpdateKey: (name, value) => {
        dispatch({ type: 'UPDATE_SECRET', payload: { section, name, value } });
    }
});

export const ExchangeInput = connect(mapStateToProps, mapDispatchToProps)(ExchangeInputComponent);
export default { ExchangeInput };
