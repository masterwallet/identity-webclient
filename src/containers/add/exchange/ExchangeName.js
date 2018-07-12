import { connect } from 'react-redux';
import { ExchangeNameComponent } from './../../../components/add/exchange/ExchangeNameComponent';

const section = 'exchange';
const mapStateToProps = state => ({ ...state, section });
const mapDispatchToProps = dispatch => ({
    onChange: (value) => {
        dispatch({ type: 'UPDATE_NAME', payload: { section, value } });
    }    
});

export const ExchangeName = connect(mapStateToProps, mapDispatchToProps)(ExchangeNameComponent);
export default { ExchangeName };
