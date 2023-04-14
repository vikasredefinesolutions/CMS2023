import { combineReducers } from '@reduxjs/toolkit';
import cacheSlice from './slices/cache.slice';
import cartReducer from './slices/cart.slice';
import commonSlice from './slices/common.slice';
import employeeReducer from './slices/employee.slice';
import homeReducer from './slices/home.slice';
import loaderReducer from './slices/loader.slice';
import modalsReducer from './slices/modals.slice';
import productReducer from './slices/product.slice';
import redefineStoreReducer from './slices/redefineStore.slice';
import successReducer from './slices/success.slice';
import userReducer from './slices/user.slice';
import wishlistReducer from './slices/wishlist.slice';

const rootReducer = combineReducers({
  store: redefineStoreReducer,
  product: productReducer,
  user: userReducer,
  cart: cartReducer,
  employee: employeeReducer,
  common: commonSlice,
  cache: cacheSlice,
  success: successReducer,
  loader: loaderReducer,
  wishlist: wishlistReducer,
  modals: modalsReducer,
  home: homeReducer,
});

// const rootReducer = combineReducers({
//   store: redefineStoreReducer,
//   product: productReducer,
//   user: userReducer,
//   cart: cartReducer,
//   modals: modalsReducer,
//   compare: compareReducer,
//   loader: loaderReducer,
//   success: successReducer,
//   home: homeReducer,
//   employee: employeeReducer,
//   wishlist: wishlistReducer,
//   cache: cacheSlice,
// });

export default rootReducer;

type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>;
