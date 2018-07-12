import { connect } from 'react-redux';
import { ExchangeSelectComponent } from './../../../components/add/exchange/ExchangeSelectComponent';

const section = 'exchange';
const mapStateToProps = state => ({ ...state, section });
const mapDispatchToProps = dispatch => ({
    onUpdateNetwork: (value) => {
        dispatch({ type: 'UPDATE_NETWORK', payload: { section, value } });
    }
});

export const ExchangeSelect = connect(mapStateToProps, mapDispatchToProps)(ExchangeSelectComponent);
export default { ExchangeSelect };
