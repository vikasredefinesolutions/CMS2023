import { __Cookie } from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import { extractCookies } from '@helpers/common.helper';
import { WishlistType } from '@redux/slices/wishlist';
import { useTypedSelector_v2 } from 'hooks_v2';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const WishListIcon: React.FC = () => {
  // const router = useRouter();
  const [wishlist, setWishlist] = useState<WishlistType>([]);
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
    } else {
      setWishlist([]);
    }
  }, [customerId, wishListData]);

  return (
    <div className='flex pl-[8px]'>
      <Link href={customerId ? paths.WISHLIST : paths.HOME}>
        <a className='text-primary hover:text-primary-hover flex items-center gap-1 relative' title='Wishlist'>
          <span className='sr-only'>Wishlist</span>{' '}
          <span className="material-symbols-outlined text-primary">favorite</span>
          <span className='absolute right-[-7px] top-[-10px] rounded-full flex items-center justify-center bg-[#dddddd] text-[9px] text-[#000000] pl-[4px] pr-[4px] pt-[2px] pb-[2px]'>
            {wishlist ? wishlist.length : 0}
          </span>
        </a>
      </Link>
    </div>
  );
};

export default WishListIcon;
