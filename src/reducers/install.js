import { SecureRandom } from './../services/SecureRandom';
import { getSessionState, saveSessionState } from './../services/SessionState';
import { isValidUrl } from './../services/Url';

const saved = (state) => (saveSessionState('masterwallet_install', state));
const initialState = getSessionState('masterwallet_install', {
  storage: '',
  pair: 'http://127.0.0.1:7773',
  isValidStorage: false,
  isValidRemote: false,
  urlValidationError: '',
  pinCodeLength: 6,
  pinCode: '',
  pinCodeConfirm: '',
  generatedProgress: 0,
  wordsIndexes: [5, 4, 16],
  wordsEntered: []
}, {
  entropy: new SecureRandom(),
  generatedProgress: 0,
  isLoading: false,
  lastError: '',
  lastResponse: ''
});

const validatedStorage = (state) => {
  const { storage, pair } = state;
  const hasStorage = !!storage;
  const isValidRemote = (storage === 'remote' && isValidUrl(pair)) || storage !== 'remote';
  const isValidStorage = hasStorage && isValidRemote;
  return saved({ ...state, isValidStorage, isValidRemote });
};

export default function (state = initialState, action) {
    switch (action.type) {
      case 'UPDATE_PIN': {
        return saved({...state, pinCode: action.payload, pinCodeConfirm: '' });
      }
      case 'UPDATE_PIN_CONFIRM': {
        return saved({...state, pinCodeConfirm: action.payload });
      }
      case 'UPDATE_STORAGE': {
        return validatedStorage({...state, storage: action.payload });
      }
      case 'UPDATE_PAIR': {
        return validatedStorage({...state, pair: action.payload });
      }
      case 'SUBMISSION_LOADING_STARTED': {
        return { ...state, isLoading: true, lastError: '', lastResponse: {} };
      }
      case 'SUBMISSION_LOADING_DONE': {
        return { ...state, isLoading: false, lastError: '', lastResponse: action.payload };
      }
      case 'SUBMISSION_LOADING_ERROR': {
        return { ...state, isLoading: false, lastError: action.payload, lastResponse: {} };
      }
      case 'SHAKE': {
        if (state.generatedProgress < 100) {
          const entropy = state.entropy.copy();
          if ( typeof action.payload === 'object' && action.payload.length === 2) {
            entropy.seedInt8(action.payload[0]);
            entropy.seedInt8(action.payload[1]);
          } else {
            entropy.seedInt8(action.payload);
          }
          const generatedProgress = entropy.getProgress();
          const wordsIndexes = entropy.getRandomIndexes(3);
          return saved({ ...state, entropy, generatedProgress, wordsIndexes });
        }
        return state;
      }
      case 'RESET_ENTROPY': {
        return saved({
          ...state,
          entropy: new SecureRandom(),
          generatedProgress: 0
        });
      }
      case 'CONFIRM_WORD': {
        const { index, value } = action.payload;
        const wordsEntered = state.wordsEntered.slice();
        wordsEntered[index] = value;
        return saved({ ...state, wordsEntered });
      }
      case 'INIT_CONFIRMATION_WORDS' : {
        const wordsEntered = action.payload.slice();
        return saved({ ...state, wordsEntered });
      }
      default:
    }
    return state
  };
