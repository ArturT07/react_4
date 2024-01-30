import { combineReducers } from 'redux';
import modalReducer from './reducers/modalReducer';
import cartReducer from './reducers/cartReducer';
import favoriteReducer from './reducers/favoriteReducer';

const rootReducer = combineReducers({
  modal: modalReducer,
  cart: cartReducer,
  favorite: favoriteReducer,
});

export default rootReducer;
