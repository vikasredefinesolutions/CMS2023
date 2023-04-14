/* eslint-disable no-unused-vars */

import { WishlistType } from '@services/wishlist';
import React from 'react';

export interface _WishlistTemplates {
  type1: React.FC<_Wishlist>;
  type2: React.FC<_Wishlist>;
  type3: React.FC<_Wishlist>;
  type4: React.FC<_Wishlist>;
}

export interface _Wishlist {
  wishlist: WishlistType[];
  removeWishlistHandler: (id: number) => void;
}
