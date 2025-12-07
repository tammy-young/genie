
const STORAGE_KEY = 'userState';
const APPLE_KEY = 'apple';

async function encrypt(text) {
  let iv = window.crypto.getRandomValues(new Uint8Array(16));
  let key = window.crypto.getRandomValues(new Uint8Array(16));
  let data = new TextEncoder().encode(text);
  const keyEncoded = await window.crypto.subtle.importKey(
    "raw",
    key.buffer,
    "AES-CTR",
    false,
    ["encrypt", "decrypt"],
  );
  const content = await window.crypto.subtle.encrypt(
    {
      name: "AES-CTR",
      counter: iv,
      length: 128,
    },
    keyEncoded,
    data,
  );

  return {
    content: Array.from(new Uint8Array(content)),
    iv: Array.from(iv),
    key: Array.from(key)
  };
}

async function decrypt(keyArray, counterArray, ciphertextArray) {
  try {
    const key = await window.crypto.subtle.importKey(
      "raw",
      new Uint8Array(keyArray).buffer,
      "AES-CTR",
      false,
      ["encrypt", "decrypt"],
    );

    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: "AES-CTR",
        counter: new Uint8Array(counterArray),
        length: 128
      },
      key,
      new Uint8Array(ciphertextArray),
    );

    return new TextDecoder().decode(decrypted);
  } catch (err) {
    // console.error('Decryption failed:', err);
    return null;
  }
}

const loadStateFromStorage = () => {
  try {
    const encryptedState = localStorage.getItem(STORAGE_KEY);
    const apple = localStorage.getItem(APPLE_KEY);
    if (encryptedState === null || apple === null) {
      return undefined;
    }

    // For now, return a placeholder that will be replaced by async loading
    // This ensures we have a synchronous return for the initial state
    return undefined;
  } catch (err) {
    // console.error('Error loading state from localStorage:', err);
    return undefined;
  }
};

const loadStateFromStorageAsync = async () => {
  try {
    const encryptedState = localStorage.getItem(STORAGE_KEY);
    const apple = localStorage.getItem(APPLE_KEY);
    if (encryptedState === null || apple === null) {
      return undefined;
    }

    const appleData = JSON.parse(apple);
    const encryptedData = JSON.parse(encryptedState);

    const decryptedState = await decrypt(appleData.hello, appleData.world, encryptedData);
    if (decryptedState === null) {
      console.warn('Failed to decrypt state, using initial state');
      return undefined;
    }

    return JSON.parse(decryptedState);
  } catch (err) {
    // console.error('Error loading state from localStorage:', err);
    return undefined;
  }
};

const saveStateToStorage = async (state) => {
  try {
    const serializedState = JSON.stringify(state);
    const encryptedState = await encrypt(serializedState);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(encryptedState.content));
    localStorage.setItem(APPLE_KEY, JSON.stringify({
      hello: encryptedState.key,
      world: encryptedState.iv
    }));
  } catch (err) {
    // console.error('Error saving state to localStorage:', err);
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
    case 'INIT_STATE':
      // This action will be dispatched after async state loading completes
      return action.payload || state;

    case 'SET_PROFILE':
      newState = action.payload;
      saveStateToStorage(newState)  //.catch(err => console.error('Failed to save state:', err));
      return newState;

    case 'ADD_FILTER':
      newState = {
        ...state,
        filters: [...state.filters, action.payload]
      };
      saveStateToStorage(newState)  //.catch(err => console.error('Failed to save state:', err));
      return newState;

    case 'UPDATE_FILTER':
      const otherFilters = state.filters.filter(filter => filter.id !== action.payload.id);
      newState = {
        ...state,
        filters: otherFilters.concat([action.payload])
      };
      saveStateToStorage(newState)  // .catch(err => console.error('Failed to save state:', err));
      return newState;

    case 'DELETE_FILTER':
      newState = {
        ...state,
        filters: state.filters.filter(filter => filter.id !== action.payload)
      };
      saveStateToStorage(newState)  // .catch(err => console.error('Failed to save state:', err));
      return newState;

    case 'UPDATE_WISHES':
      newState = {
        ...state,
        wishes: action.payload
      };
      saveStateToStorage(newState)  // .catch(err => console.error('Failed to save state:', err));
      return newState;

    case 'LOGOUT':
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(APPLE_KEY);
      return initialState;

    default:
      return state;
  }
}

export { loadStateFromStorage, loadStateFromStorageAsync, saveStateToStorage };
