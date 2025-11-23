
const STORAGE_KEY = 'userState';

const loadStateFromStorage = () => {
  try {
    const encryptedState = localStorage.getItem(STORAGE_KEY);
    if (encryptedState === null) {
      return undefined;
    }

    const decryptedState = encryptedState;
    if (decryptedState === null) {
      console.warn('Failed to decrypt state, using initial state');
      return undefined;
    }

    return JSON.parse(decryptedState);
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return undefined;
  }
};

const saveStateToStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    const encryptedState = serializedState;
    localStorage.setItem(STORAGE_KEY, encryptedState);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
};

const initialState = {
  name: "",
  username: "",
  filters: [],
  wishes: []
};

const persistedState = loadStateFromStorage();
const defaultState = persistedState || initialState;

export default function appReducer(state = defaultState, action) {
  let newState;

  switch (action.type) {
    case 'SET_PROFILE':
      newState = action.payload;
      saveStateToStorage(newState);
      return newState;

    case 'UPDATE_FILTERS':
      newState = {
        ...state,
        filters: action.payload
      };
      saveStateToStorage(newState);
      return newState;

    case 'UPDATE_WISHES':
      newState = {
        ...state,
        wishes: action.payload
      };
      saveStateToStorage(newState);
      return newState;

    case 'LOGOUT':
      localStorage.removeItem(STORAGE_KEY);
      return initialState;

    default:
      return state;
  }
}

export { loadStateFromStorage, saveStateToStorage };
