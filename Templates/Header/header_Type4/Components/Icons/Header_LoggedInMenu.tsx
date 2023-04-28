import NxtImage from '@appComponents/reUsable/Image';
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
  const [focus, setFocus] = useState(false);

  const logoutHandler = () => {
    setFocus(false);
    logoutClearCart();
    setWishListEmpty([]);
    Logout(logInUser);
  };

  if (!loggedIn) return <></>;

  return (
    <div className='pl-[15px] order-2'>
      <div
        className='flex relative tracking-[1.25px]'
        onMouseOver={() => setFocus(true)}
        onMouseLeave={() => setFocus(false)}
      >
        <Link href={paths.loggedInMenu.title}>
          <a
            className='text-[#ffffff] hover:text-primary-hover flex items-center gap-1'
            title={__pagesText.Headers.myAccountTittle}
          >
            <span className='text-[14px] hidden xl:inline-block whitespace-nowrap tracking-[1.25px] mr-[4px]'>
              {customer?.firstname}
            </span>
            <span className='material-icons-round xl:hidden'>person_2</span>
          </a>
        </Link>

        {focus && (
          <div className='text-xs uppercase absolute right-0 top-full bg-transparent z-40 w-[220px] pt-2'>
            <ul className='border-[3px] border-primary bg-white'>
              <li className='border-t border-t-gray-300'>
                <Link href={paths.loggedInMenu.order}>
                  <a className='flex items-center p-2 gap-2.5 text-primary hover:text-primary-hover'>
                    <span className=''>
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
                  <a className='flex items-center p-2 gap-2.5 text-primary hover:text-primary-hover'>
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
              <li className='border-t border-t-gray-300'>
                <Link href={paths.loggedInMenu.help}>
                  <a className='flex items-center p-2 gap-2.5 text-primary hover:text-primary-hover'>
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
              </li>
              <li className='border-t border-t-gray-300'>
                <a
                  onClick={() => logoutHandler()}
                  className='flex items-center p-2 gap-2.5 text-primary hover:text-primary-hover'
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
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoggedInMenu;
