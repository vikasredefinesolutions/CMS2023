import NxtImage from '@appComponents/reUsable/Image';
import { BOSTONBEAR, THD_STORE_CODE } from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import Link from 'next/link';
import { useState } from 'react';
import ContactusIcon from './ContactusIcon';

const HeaderContactUs: React.FC = () => {
  const storeCode = useTypedSelector_v2((store) => store.store.code);
  const [focus, setFocus] = useState(false);
  return (
    <div className='flow-root relative pl-[15px]'>
      <Link href={paths.CONTACT_US}>
        <a
          className={`text-primary hover:text-${
            storeCode == BOSTONBEAR ? 'primary' : 'secondary'
          } group flex items-center relative pt-[8px] pb-[8px]`}
        >
          {storeCode === THD_STORE_CODE ? (
            <span
              onMouseOver={() => setFocus(true)}
              onMouseLeave={() => setFocus(false)}
            >
              <ContactusIcon
                color={focus ? 'black' : '#f26722'}
                className='h-[35px] w-[35px]'
              />
            </span>
          ) : (
            <NxtImage
              isStatic={true}
              alt={''}
              useNextImage={false}
              src='/assets/images/homedepot/support.svg'
              className='h-[30px] w-[30px]'
            />
          )}
        </a>
      </Link>
    </div>
  );
};

export default HeaderContactUs;
