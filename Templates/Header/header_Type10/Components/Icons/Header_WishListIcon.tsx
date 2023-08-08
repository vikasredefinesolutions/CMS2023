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
        <a className='relative hover:text-primary-hover' title='Wishlist'>
          <span className='sr-only'>Wishlist</span>{' '}
          <svg
            className='w-6 h-6 fill-primary hover:fill-primary-hover'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
          >
            <path d='M12 21 10.55 19.7Q6.625 16.2 4.312 13.612Q2 11.025 2 8.15Q2 5.8 3.575 4.225Q5.15 2.65 7.5 2.65Q8.825 2.65 10 3.212Q11.175 3.775 12 4.75Q12.825 3.775 14 3.212Q15.175 2.65 16.5 2.65Q18.85 2.65 20.425 4.225Q22 5.8 22 8.15Q22 11.025 19.688 13.612Q17.375 16.2 13.45 19.7ZM12 11.475Q12 11.475 12 11.475Q12 11.475 12 11.475Q12 11.475 12 11.475Q12 11.475 12 11.475Q12 11.475 12 11.475Q12 11.475 12 11.475Q12 11.475 12 11.475Q12 11.475 12 11.475Q12 11.475 12 11.475Q12 11.475 12 11.475Q12 11.475 12 11.475Q12 11.475 12 11.475ZM12 18.3Q15.575 15.05 17.788 12.7Q20 10.35 20 8.15Q20 6.65 19 5.65Q18 4.65 16.5 4.65Q15.325 4.65 14.325 5.312Q13.325 5.975 12.95 7H11.05Q10.675 5.975 9.675 5.312Q8.675 4.65 7.5 4.65Q6 4.65 5 5.65Q4 6.65 4 8.15Q4 10.35 6.213 12.7Q8.425 15.05 12 18.3Z'></path>
          </svg>{' '}
          <span className='absolute right-[-7px] top-[-10px] rounded-full flex items-center justify-center bg-[#dddddd] text-[9px] text-[#000000] pl-[4px] pr-[4px] pt-[2px] pb-[2px]'>
            {wishlist ? wishlist.length : 0}
          </span>
        </a>
      </Link>
    </div>
  );
};

export default WishListIcon;
