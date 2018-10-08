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
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'WALLET_HISTORY_REQUEST': {
      return { ...state, loading: true };
    }
    case 'WALLET_HISTORY_RECEIVED': {
      return { ...state, loading: false, list: action.payload.data };
    }
    case 'WALLET_HISTORY_ERROR': {
      return { ...state, loading: false, error: action.payload.error };
    }
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
    default:
  }
  return state;
};

