const mockTransactions = [
  {
    asset: 'BTC',
    icon: '/networks/BTC.png',
    date: '2019-03-03 12:30:11'
  }
];

const initialState = {
  loading: false,
  list: mockTransactions || []
};

export default function (state = initialState, action) {
  switch (action.type) {
    default:
  }
  return state;
};

