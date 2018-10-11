// const mockTransactions = [
//   {
//     asset: 'BTC',
//     icon: '/networks/BTC.png',
//     date: '2019-03-03 12:30:11'
//   }
// ];

const initialState = {
  loading: false,
  list: [],
  error: '',
  sender: {},
  details: {},
  fees: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    // Transactions history:
    case 'WALLET_HISTORY_REQUEST': {
      return { ...state, loading: true };
    }
    case 'WALLET_HISTORY_RECEIVED': {
      return { ...state, loading: false, list: action.payload.data };
    }
    case 'WALLET_HISTORY_ERROR': {
      return { ...state, loading: false, error: action.payload.error };
    }

    // Sending transaction:
    case 'TRANSACTION_SUBMITTED': {
      const { walletId } = action.payload;
      const sender = { 
        ...state.sender, 
        [walletId]: {
          ...state.sender[walletId],
          processing: true, 
          latestTx: null 
        } 
      };
      return { ...state, sender };
    }
    case 'TRANSACTION_SENT': {
      const { walletId, txId, data } = action.payload;
      const sender = { 
        ...state.sender, 
        [walletId]: {
          ...state.sender[walletId],
          processing: false, 
          [txId]: data,
          error: '',
          latestTx: txId,
        } 
      };
      return { ...state, sender };
    }
    case 'TRANSACTION_ERROR': {
      const { walletId, error } = action.payload;
      const sender = { 
        ...state.sender, 
        [walletId]: {
          ...state.sender[walletId],
          processing: false, 
          error, 
          latestTx: null 
        } 
      };
      return { ...state, sender };
    }

    // Transaction details:
    case 'TRANSACTION_DETAILS_REQUEST': {
      const { walletId, txId } = action.payload;
      const details = { ...state.details, [walletId]: { [txId]: { loading: true } }};
      return { ...state, details };
    }
    case 'TRANSACTION_DETAILS_RECEIVED': {
      const { walletId, txId, data } = action.payload;
      const details = { ...state.details, [walletId]: { [txId]: { loading: false, data } }};
      return { ...state, details };
    }
    case 'TRANSACTION_DETAILS_ERROR': {
      const { walletId, txId, error } = action.payload;
      const details = { ...state.details, [walletId]: { [txId]: { loading: false, error } } };
      return { ...state, details };
    }

    // Estimate transaction fee:
    case 'FEE_REQUEST': {
      const { walletId } = action.payload;
      const fees = { ...state.fees, [walletId]: { loading: true, error: '' } };
      return { ...state, fees };
    }
    case 'FEE_RECEIVED': {
      const { walletId, fee } = action.payload;
      const fees = { ...state.fees, [walletId]: { loading: false, ...fee }, error: '' };
      return { ...state, fees };
    }
    case 'FEE_ERROR': {
      const { walletId, error } = action.payload;
      const fees = { ...state.fees, [walletId]: { loading: false, error } };
      return { ...state, fees };
    }

    // Estimate gas limit (Ethereum)
    case 'GAS_LIMIT_RECEIVED': {
      const { walletId, gasLimit } = action.payload;
      const fees = { ...state.fees, [walletId]: { ...state.fees[walletId], gasLimit } };
      return { ...state, fees };
    }

    default:
  }
  return state;
};

