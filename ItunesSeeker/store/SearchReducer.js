const INITIAL_STATE = {
  listType: ["Artist", "Track", "Album"],
  listTypeItunes: ["allArtist", "allTrack", "album"],
  value: null,
  type: 0,
  search: false
  // 0 => search by artist
  // 1 => search by track
  // 2 => search by album
};

export default function SearchReducer (state = INITIAL_STATE, action) {
  let nextState;
  switch (action.type) {
    case 'TOGGLE_TYPE':
      nextState = {
          ...state,
          type: action.value
      }
      return nextState;
    case 'TOGGLE_VALUE':
      nextState = {
          ...state,
          value: action.value
      }
      return nextState;
    case 'SEARCH':
      nextState = {
          ...state,
          search: action.value
      }
      return nextState;
    default:
      return state
  }
};