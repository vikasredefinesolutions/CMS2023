import ForgotModal from '@appComponents/modals/forgotModal';
import LoginModal from '@appComponents/modals/loginModal';
import { _modals } from '@appComponents/modals/modal';
import { __Cookie } from '@constants/global.constant';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { ClearBrandCache } from '@services/cache.service';
import { _WishListProps } from '@services/wishlist';
import {
  AddToWishlist,
  getWishlist,
  removeWishlist,
} from '@services/wishlist.service';
import { extractCookies } from 'helpers_v2/common.helper';
import getLocation from 'helpers_v2/getLocation';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import { useEffect, useState } from 'react';
const WishlistButton = ({
  name,
  color,
  price,
  brandId,
  productId,
  iswishlist,
  wishlistId,
}: _WishListProps) => {
  const { updateWishListData, removeWishListById } = useActions_v2();
  const [wishlist, setWishlist] = useState(false);
  const [showModal, setShowModal] = useState<null | string>(null);
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const wishlistHandler = async () => {
    if (!customerId) {
      setShowModal('login');
      return;
    }
    const tempCustomerId = extractCookies(
      __Cookie.tempCustomerId,
      'browserCookie',
    ).tempCustomerId;

    const data = await getLocation();
    const requestObject = {
      storeproductWishListModel: {
        id: 0,
        name: name,
        quantity: 1,
        color: color,
        price: price,
        recStatus: 'A',
        rowVersion: '',
        productId: productId ? productId : 0,
        ipAddress: data.ip_address,
        customerId: customerId || 0,
        macAddress: '00-00-00-00-00-00',
        location: `${data?.city}, ${data?.region}, ${data?.country}, ${data?.postal_code}`,
      },
    };
    await AddToWishlist(requestObject);
    if (storeId) {
      (async () => {
        if (brandId) {
          await ClearBrandCache({ storeid: storeId, brandid: +brandId });
        }
        // if (category_id) {
        // await ClearCategoryCache({
        // storeid: storeId,
        // categoryid: +category_id,
        // });
        // }
      })();
    }
    if (customerId || tempCustomerId) {
      getWishlist(customerId || ~~(tempCustomerId || 0)).then((res) => {
        updateWishListData(res);
      });
    }
    setWishlist(true);
  };

  const removeWishlistHandler = async () => {
    if (wishlistId > 0) {
      await removeWishlist(wishlistId);
      removeWishListById({ id: wishlistId });
      setWishlist(false);
    }
  };

  useEffect(() => {
    setWishlist(iswishlist);
  }, [iswishlist]);

  const modalHandler = (arg: _modals | null) => {
    setShowModal(arg);
  };

  const wishlistHtml = wishlist ? (
    <FavoriteIcon
      sx={{ color: 'orange' }}
      className='cursor-pointer'
      onClick={removeWishlistHandler}
    />
  ) : (
    <FavoriteBorderOutlinedIcon
      className='text-primary hover:text-secondary cursor-pointer'
      onClick={wishlistHandler}
    />
  );
  return (
    <>
      {showModal === 'login' && <LoginModal modalHandler={modalHandler} />}
      {showModal === 'forgot' && <ForgotModal modalHandler={modalHandler} />}
      {wishlistHtml}
    </>
  );
};

export default WishlistButton;
