const initialState = {
  storage: '',
  pinCode: '',
  pinCodeConfirm: '',
  wordsGenerated: [],
  generated: [],
  generatedProgress: 0,
  wordsIndexes: [3, 5, 16],
  wordsEntered: []
};

export default function (state = initialState, action) {
    switch (action.type) {
      case 'UPDATE_PIN': {
        return {...state, pinCode: action.payload };
      }
      case 'UPDATE_PIN_CONFIRM': {
        return {...state, pinCodeConfirm: action.payload };
      }
      case 'UPDATE_STORAGE': {
        return {...state, storage: action.payload };
      }
      case 'SHAKE': {

        if (state.generatedProgress < 100) {
          const generated = state.generated.slice();
          generated.push(action.payload);
          const generatedProgress = parseInt(generated.length * 100 / 500, 10);
          return { ...state, generated, generatedProgress };
        }
        return state;
      }
      case 'CONFIRM_WORD': {
        const { index, value } = action.payload;
        const wordsEntered = state.wordsEntered.slice();
        wordsEntered[index] = value;
        return { ...state, wordsEntered };
      }
      default:
    }
    return state
  };
