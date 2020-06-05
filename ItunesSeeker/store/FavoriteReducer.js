const INITIAL_STATE = {
  listFav: []
};

export default function FavoriteReducer (state = INITIAL_STATE, action) {
  let nextState;
  switch (action.type) {
    case 'ADD_FAV':
      nextState = {
        ...state,
        listFav: [...state.listFav, action.value]
      }
      return nextState;
    case 'RM_FAV':
      nextState = {
        ...state,
        listFav: state.listFav.filter( (item, index) => index !== action.value)
      }
      return nextState;
    case 'EDIT_FAV':
      nextState = {
        ...state,
        listFav: state.listFav.map( (item, index) => index === action.value.index ? {
            element: action.value.element,
            rate: action.value.rate,
            commentary: action.value.commentary
        } : item)
      }
      return nextState;
    default:
      return state
  }
};