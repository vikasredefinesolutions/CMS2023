import NxtImage from '@appComponents/reUsable/Image';
import { paths } from '@constants/paths.constant';
import { useTypedSelector_v2 } from 'hooks_v2';
import Link from 'next/link';
import React from 'react';
interface _props {
  logo: {
    mobile: string;
    desktop: string;
  };
}

const CompanyLogo: React.FC<_props> = ({ logo }) => {
  const storeName = useTypedSelector_v2((state) => state.store?.storeName);

  return (
    <>
      <Link href={paths.HOME}>
        <a title={storeName || ''} className='logo inline-block'>
          <NxtImage
            title={storeName || ''}
            className='max-w-[160px] md:max-w-[260px]'
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
