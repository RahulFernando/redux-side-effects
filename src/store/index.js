import { configureStore, combineReducers } from '@reduxjs/toolkit';
import uiReducer from '../redux/ui-slice';
import cartReducer from '../redux/cart-slice';

const rootReducer = combineReducers({ ui: uiReducer, cart: cartReducer });

const store = configureStore({ reducer: rootReducer });

export default store;
