const initialState = {
  currency: 'USD',
  timeout: 10,
  priceDiff: true,
  minBalance: 0.5
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS': {
      const { field, value } = action.payload;
      return { ...state, [field]: value };
    }
    default:
  }
  return state;
};
