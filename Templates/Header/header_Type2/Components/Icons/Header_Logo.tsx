import NxtImage from '@appComponents/reUsable/Image';
import { paths } from '@constants/paths.constant';
import { useTypedSelector_v2 } from 'hooks_v2';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
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
  const storeName = useTypedSelector_v2((state) => state.store?.storeName);
  const view = useTypedSelector_v2((state) => state.store.view);

  return (
    <>
      <div className='lg:hidden pr-[5px]'>
        {router.asPath !== paths.CHECKOUT && <MenuIcon />}
      </div>

      <Link href={paths.HOME}>
        <a
          title={storeName || ''}
          className='max-w-[350px] w-full inline-block'
        >
          <NxtImage
            title={storeName || ''}
            className='brand-logo w-full'
            src={logo?.mobile}
            useNextImage={false}
            alt={storeName ? storeName : ''}
          />
        </a>
      </Link>
    </>
  );
};

export default CompanyLogo;
