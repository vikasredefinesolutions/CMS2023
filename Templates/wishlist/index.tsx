/* eslint-disable no-unused-vars */
import { __Cookie } from '@constants/global.constant';
import { extractCookies } from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { WishlistType } from '@services/wishlist';
import { removeWishlist } from '@services/wishlist.service';
import React, { useEffect, useState } from 'react';
import { _WishlistTemplates } from './Wishlist';
import WishlistType1 from './wishlistType1';
import WishlistType2 from './wishlistType2';
import WishlistType3 from './wishlistType3';
import WishlistType4 from './wishlistType4';

const WishlistTemplates: _WishlistTemplates = {
  type1: WishlistType1,
  type2: WishlistType2,
  type3: WishlistType3,
  type4: WishlistType4,
};

const Wishlist: React.FC<{ id: 'type1' }> = ({ id }) => {
  const Component = WishlistTemplates[id];

  const [wishlist, setWishlist] = useState<WishlistType[]>([]);
  const { removeWishListById } = useActions_v2();
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const wishListData = useTypedSelector_v2(
    (state) => state.wishlist.wishListData,
  );
  useEffect(() => {
    const tempCustomerId = extractCookies(
      __Cookie.tempCustomerId,
      'browserCookie',
    ).tempCustomerId;

    if (customerId || tempCustomerId) {
      setWishlist(wishListData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId, wishListData]);

  const removeWishlistHandler = async (id: number) => {
    await removeWishlist(id);
    removeWishListById({ id: id });
  };

  return (
    <Component
      wishlist={wishlist}
      removeWishlistHandler={removeWishlistHandler}
    />
  );
};

export default Wishlist;
