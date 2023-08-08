import NxtImage from '@appComponents/reUsable/Image';
import { __pagesConstant } from '@constants/pages.constant';
import { paths } from '@constants/paths.constant';
import { useTypedSelector_v2, useWindowDimensions_v2 } from 'hooks_v2';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import MenuIcon from './Header_MenuIcon';

interface _props {
  logo: {
    mobile: string;
    desktop: string;
  };
}

const CompanyLogo: React.FC<_props> = ({ logo }) => {
  // const storeLayout = useTypedSelector_v2((state) => state.store.layout);
  const router = useRouter();
  const { width } = useWindowDimensions_v2();
  const storeName = useTypedSelector_v2((state) => state.store?.storeName);
  const view = useTypedSelector_v2((state) => state.store.view);

  const [isMobileView, setIsMobileView] = useState<boolean>(
    width <= __pagesConstant._header.mobileBreakPoint,
  );

  useEffect(() => {
    const isMobile = width <= __pagesConstant._header.mobileBreakPoint;
    setIsMobileView(isMobile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return (
    <>
      <div className='pr-[5px]'>
        {isMobileView && router.asPath !== paths.CHECKOUT && <MenuIcon />}
      </div>

      <Link href={paths.HOME}>
        <a
          title={storeName || ''}
          className='max-w-[350px] w-full inline-block'
        >
          <NxtImage
            title={storeName || ''}
            className='brand-logo'
            src={logo?.mobile}
            useNextImage={false}
            alt={storeName || ''}
          />
        </a>
      </Link>
    </>
  );
};

export default CompanyLogo;
