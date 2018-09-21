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
  error: ''
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
    default:
  }
  return state;
};

