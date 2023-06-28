import NxtImage from '@appComponents/reUsable/Image';
import { THD_STORE_CODE } from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { Logout } from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import Link from 'next/link';
import React, { useState } from 'react';
import { __StaticImg } from '../../../../../public/assets/images.asset';

const LoggedInMenu: React.FC = () => {
  const { logInUser, logoutClearCart, setWishListEmpty } = useActions_v2();
  const { id: loggedIn, customer } = useTypedSelector_v2((state) => state.user);
  const { code: storeCode } = useTypedSelector_v2((state) => state.store);
  const [focus, setFocus] = useState(false);
  const view = useTypedSelector_v2((state) => state.store.view);

  const logoutHandler = () => {
    setFocus(false);
    logoutClearCart();
    setWishListEmpty([]);
    Logout(logInUser);
  };
  if (storeCode === THD_STORE_CODE) return null;

  if (!loggedIn) return <></>;

  return (
    <div className=''>
      <div
        className='flex relative tracking-[1px]'
        onMouseOver={() => setFocus(true)}
        onMouseLeave={() => setFocus(false)}
      >
        <Link href={paths.loggedInMenu.title}>
          <a
            className='ml-1 text-white hover:text-white focus:text-white'
            title={__pagesText.Headers.myAccountTittle}
          >
            {view == 'MOBILE' && (
              <span className='material-icons-outlined'>perm_identity</span>
            )}
            <span className='text-[12px] hidden xl:inline-block whitespace-nowrap tracking-[1px]'>
              {customer?.firstname}
            </span>
          </a>
        </Link>

        {focus && (
          <div className='absolute right-0 top-full border-2 border-black bg-white z-40 w-52'>
            <ul className=''>
              <li className='border-t border-t-gray-300'>
                <Link href={paths.loggedInMenu.order}>
                  <a className='flex p-[10px] gap-[5px]'>
                    <span className='material-icons-outlined'>
                      <NxtImage
                        src={__StaticImg.loggedInMenu.order.src}
                        alt={''}
                        isStatic={true}
                        className={''}
                        useNextImage={false}
                        title={__pagesText.Headers.order}
                      />
                    </span>
                    <span className=''> {__pagesText.Headers.order}</span>
                  </a>
                </Link>
              </li>
              <li className='border-t border-t-gray-300'>
                <Link href={paths.loggedInMenu.settings}>
                  <a className='flex p-[10px] gap-[5px]'>
                    <span className=''>
                      <NxtImage
                        src={__StaticImg.loggedInMenu.settings.src}
                        alt={''}
                        className={''}
                        isStatic={true}
                        useNextImage={false}
                        title={__pagesText.Headers.accountSetting}
                      />
                    </span>
                    <span className=''>
                      {__pagesText.Headers.accountSetting}
                    </span>
                  </a>
                </Link>
              </li>
              {/* <li className='border-t border-t-gray-300'>
                <Link href={paths.loggedInMenu.help}>
                  <a className='flex p-[10px] gap-[5px]'>
                    <span className=''>
                      <NxtImage
                        src={__StaticImg.loggedInMenu.help.src}
                        alt={''}
                        className={''}
                        isStatic={true}
                        useNextImage={false}
                        title={__pagesText.Headers.help}
                      />
                    </span>
                    <span className=''> {__pagesText.Headers.help}</span>
                  </a>
                </Link>
              </li> */}
              <li className='border-t-2 border-t-gray-300'>
                <div
                  onClick={() => logoutHandler()}
                  className='flex p-[10px] gap-[5px] cursor-pointer'
                >
                  <span className=''>
                    <NxtImage
                      src={__StaticImg.loggedInMenu.signOut.src}
                      alt={''}
                      className={''}
                      isStatic={true}
                      useNextImage={false}
                      title={__pagesText.Headers.signOut}
                    />
                  </span>
                  <span className=''> {__pagesText.Headers.signOut}</span>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoggedInMenu;
