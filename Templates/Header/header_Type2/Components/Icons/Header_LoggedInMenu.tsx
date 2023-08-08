import NxtImage from '@appComponents/reUsable/Image';
import { __LocalStorage } from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { Logout } from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import Link from 'next/link';
import React, { useState } from 'react';
import { __StaticImg } from '../../../../../public/assets/images.asset';

const LoggedInMenu: React.FC = () => {
  const {
    setWishListEmpty,
    updateEmployeeV2,
    product_employeeLogin,
    logoutClearCart,
    logInUser,
  } = useActions_v2();
  const { id: loggedIn, customer } = useTypedSelector_v2((state) => state.user);
  const [focus, setFocus] = useState(false);
  const { empId: isEmployeeLoggedIn } = useTypedSelector_v2(
    (state) => state.employee,
  );

  const logoutHandler = () => {
    if (isEmployeeLoggedIn) {
      updateEmployeeV2('CLEAN_UP');
      product_employeeLogin('MinQtyToOne_CleanUp');
      localStorage.removeItem(__LocalStorage.empData);
      localStorage.removeItem(__LocalStorage.empGuest);
      localStorage.removeItem(__LocalStorage.guestEmailID);
    }

    setFocus(false);
    setWishListEmpty([]);
    Logout(logInUser);
    logoutClearCart();
  };

  if (!loggedIn) return <></>;

  return (
    <div className='pl-[15px]'>
      <div
        className='flex relative tracking-[1px]'
        onMouseOver={() => setFocus(true)}
        onMouseLeave={() => setFocus(false)}
      >
        <Link href={paths.loggedInMenu.title}>
          <a
            className='text-quaternary hover:text-anchor-hover flex items-center'
            title={__pagesText.Headers.myAccountTittle}
          >
            <span className='text-[12px] hidden xl:inline-block whitespace-nowrap tracking-[1px]'>
              {__pagesText.Headers.myAccountTittle.toUpperCase()}
            </span>
            <span className='xl:hidden material-icons text-[30px]'>
              {__pagesText.Headers.loginIcon}
            </span>
          </a>
        </Link>

        {focus && (
          <div className='text-xs uppercase absolute right-0 top-full bg-white z-40 w-[210px]'>
            <ul className='border-[3px] border-[#000000]'>
              <li className='border-t border-t-gray-300 pt-[10px]'>
                <Link href={paths.loggedInMenu.order}>
                  <a className='flex items-center p-2 gap-3.5 text-[#000000] hover:text-[#000000]'>
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
              <li className='pt-[10px]'>
                <Link href={paths.myAccount.manage_logo}>
                  <a className='flex items-center p-2 gap-3.5 text-[#000000] hover:text-[#000000]'>
                    <span className=''>
                      <NxtImage
                        src='/assets/images/PKhealth/manage-logo.png'
                        alt={''}
                        className={''}
                        isStatic={true}
                        useNextImage={false}
                        title={__pagesText.Headers.manageLoco}
                      />
                    </span>
                    <span className=''>{__pagesText.Headers.manageLoco}</span>
                  </a>
                </Link>
              </li>
              <li className='pt-[10px]'>
                <Link href={paths.loggedInMenu.settings}>
                  <a className='flex items-center p-2 gap-2.5 text-[#000000] hover:text-[#000000]'>
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
              <li className='border-t border-t-gray-300 pt-[10px] pb-[10px]'>
                <div
                  onClick={() => logoutHandler()}
                  className='flex items-center p-2 gap-2.5 text-[#000000] hover:text-[#000000] cursor-pointer'
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
                  <span className=''> {__pagesText.Headers.logOut}</span>
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
