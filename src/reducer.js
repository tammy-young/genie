
const initialState = {
  name: "",
  username: "",
  filters: [],
  wishes: []
}

// Use the initialState as a default value
export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_PROFILE':
      return {
        ...state,
        name: action.payload.name,
        username: action.payload.username,
        filters: action.payload.filters,
        wishes: action.payload.wishes
      }
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}
