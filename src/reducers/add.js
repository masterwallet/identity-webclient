const initialState = {
  operation: '',
  create: {
  },
  import: {
  },
  watch: {
  },
  exchange: {
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_ADD_OPERATION': {
        return {...state, operation: action.payload };
    }
    default:
  }
  return state;
};
