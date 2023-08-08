import { allAsyncActions } from './asyncActions';
import { cacheActions } from './slices/cache.slice';
import { CartActions } from './slices/cart.slice';
import { compareActions } from './slices/compare.slice';
import { employeeActions } from './slices/employee.slice';
import { homeActions } from './slices/home.slice';
import { loaderActions } from './slices/loader.slice';
import { successActions } from './slices/success.slice';
import { wishlistActions } from './slices/wishlist.slice';

import { checkoutActions } from './slices/checkout.slice';
import { listingActions } from './slices/listing.slice';
import { modalActions } from './slices/modals.slice';
import { productActions } from './slices/product.slice';
import { redefineStoreActions } from './slices/redefineStore.slice';
import { sbStoreActions } from './slices/sbStore';
import { userActions } from './slices/user.slice';

const actions = {
  ...redefineStoreActions,
  ...productActions,
  ...allAsyncActions,
  ...userActions,
  ...CartActions,
  ...compareActions,
  ...homeActions,
  ...employeeActions,
  ...cacheActions,
  ...successActions,
  ...loaderActions,
  ...wishlistActions,
  ...modalActions,
  ...sbStoreActions,
  ...checkoutActions,
  ...listingActions,
};

export default actions;
