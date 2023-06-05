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
  const { view } = useTypedSelector_v2((state) => state.store);
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.empId,
  );

  const logoutHandler = () => {
    if (isEmployeeLoggedIn) {
      updateEmployeeV2('CLEAN_UP');
      product_employeeLogin('MinQtyToOne_CleanUp');
      localStorage.removeItem(__LocalStorage.empData);
      localStorage.removeItem(__LocalStorage.empGuest);
    }
    setFocus(false);
    logoutClearCart();
    setWishListEmpty([]);
    Logout(logInUser);
  };

  const handleHelp = () => {
    window.openWidget();
  };

  if (!loggedIn) return <></>;

  return (
    <div className='pl-[15px]'>
      <div
        className='flex relative tracking-[1px]'
        onMouseOver={() => setFocus(true)}
        onMouseLeave={() => setFocus(false)}
      >
        <Link
          href={
            view == 'MOBILE' ? `javascript:void(0);` : paths.loggedInMenu.title
          }
        >
          <a
            className='text-primary hover:text-anchor-hover flex items-center gap-1'
            title={__pagesText.Headers.myAccountTittle}
          >
            <span className='text-[14px] hidden xl:inline-block whitespace-nowrap tracking-[1px] mr-[4px]'>
              {customer?.firstname}
            </span>
            <span className='material-icons'>
              {__pagesText.Headers.loginIcon}
            </span>
          </a>
        </Link>

        {focus && (
          <div className='text-xs uppercase absolute right-0 top-full bg-white z-40 w-[220px] pt-2'>
            <ul className='border-[3px] border-primary'>
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
                    <span className='w-6 h-6'>
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
              <li onClick={handleHelp} className='border-t border-t-gray-300'>
                {/* <Link href={paths.loggedInMenu.help}> */}
                <div className='flex items-center p-2 gap-2.5 text-primary hover:text-primary-hover cursor-pointer'>
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
                </div>
                {/* </Link> */}
              </li>
              <li className='border-t border-t-gray-300'>
                <div
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
