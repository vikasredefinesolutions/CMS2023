import { paths } from '@constants/paths.constant';
import { generateImageUrl } from '@helpers/common.helper';
import { useTypedSelector_v2 } from 'hooks_v2';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { _globalStore } from 'store.global';
interface _props {
  logo: {
    mobile: string;
    desktop: string;
  };
}

const CompanyLogo: React.FC<_props> = ({ logo }) => {
  // const storeLayout = useTypedSelector_v2((state) => state.store.layout);
  const storeName = useTypedSelector_v2((state) => state.store?.storeName);
  const logoUrl = useTypedSelector_v2((state) => state.store.logoUrl);
  const router = useRouter();

  const checkoutStyle = () => {
    if (router.asPath === paths.CHECKOUT) {
      return {
        flex: ' 1 1 75%',
        justifyContent: 'center',
      };
    }
    return {};
  };
  const clientSideMediaBaseUrl = useTypedSelector_v2(
    (state) => state.store.mediaBaseUrl,
  );
  let mediaBaseUrl = _globalStore.blobUrl; // for server side
  mediaBaseUrl = mediaBaseUrl || clientSideMediaBaseUrl;
  const imageUrl = generateImageUrl(logo.desktop as string, mediaBaseUrl);
  return (
    <div
      className='sm:flex sm:items-center sm:w-[50%] md:w-[25%] relative '
      style={checkoutStyle()}
    >
      <Link href={paths.HOME}>
        <a
          title={storeName || ''}
          className='max-w-[350px] w-full inline-block'
        >
          <div className='brand-logo w-full'>
            <img
              title={storeName || ''}
              className='brand-logo'
              src={`${imageUrl}`}
              alt={storeName ? storeName : ''}
            />
          </div>
        </a>
      </Link>
    </div>
  );
};

export default CompanyLogo;
