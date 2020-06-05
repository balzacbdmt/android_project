import { createStore, combineReducers } from 'redux';
import SearchReducer from './SearchReducer';
import FavoriteReducer from './FavoriteReducer';

export default createStore(
    combineReducers({
        search: SearchReducer,
        favorite: FavoriteReducer
    })
);