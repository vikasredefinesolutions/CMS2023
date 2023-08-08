import NxtImage from '@appComponents/reUsable/Image';
import {
  SIMPLI_SAFE_CODE,
  THD_STORE_CODE,
  UCA,
  _Store_CODES,
  __LocalStorage,
} from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { Logout } from '@helpers/common.helper';
import { OktaLogout } from '@services/saml.service';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { __StaticImg } from '../../../../../public/assets/images.asset';

const LoggedInMenu: React.FC = () => {
  const { logInUser, logoutClearCart, setWishListEmpty } = useActions_v2();
  const { id: loggedIn, customer } = useTypedSelector_v2((state) => state.user);
  const { code: storeCode, id: storeId } = useTypedSelector_v2(
    (state) => state.store,
  );
  const [focus, setFocus] = useState(false);
  const router = useRouter();
  const logoutHandler = async () => {
    setFocus(false);
    logoutClearCart();
    setWishListEmpty([]);
    // Logout(logInUser);
    const thirdParytLogin = localStorage.getItem(
      __LocalStorage.thirdPartyServiceName,
    );
    if (thirdParytLogin?.toLowerCase() == 'okta') {
      const payload = {
        oktaLogoutModel: {
          storeId: +storeId,
        },
      };
      const res = await OktaLogout(payload);
      res && router.push(res);
    }

    Logout(logInUser);
  };
  if (storeCode === THD_STORE_CODE) return null;

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
            className={
              storeCode == SIMPLI_SAFE_CODE ||
              storeCode === _Store_CODES.USAAHEALTHYPOINTS ||
              storeCode == UCA
                ? 'primary-link hover:primary-link flex items-center gap-1'
                : 'text-primary hover:text-secondary flex items-center gap-1'
            }
            title={__pagesText.Headers.myAccountTittle}
          >
            {/* <span className='text-[12px] hidden xl:inline-block whitespace-nowrap tracking-[1px]'>
              {customer?.firstname}
            </span> */}
            {/* <span className='material-icons-outlined'>perm_identity</span> */}
            <i className="fa-solid fa-user-large text-[22px]"></i>
          </a>
        </Link>

        {focus && (
          <div className='text-xs uppercase absolute right-0 top-full z-40 w-[220px] pt-[10px]'>
            <ul className='border-[3px] border-[#000000] bg-white'>
              <li className='border-t border-t-gray-300'>
                <Link href={paths.loggedInMenu.order}>
                  <a className='flex items-center p-[10px] gap-2.5 text-[#000000] hover:text-[#000000]'>
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
                  <a className='flex items-center p-[10px] gap-2.5 text-[#000000] hover:text-[#000000]'>
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
              <li className='border-t-2 border-t-gray-300'>
                <div
                  onClick={() => logoutHandler()}
                  className='flex items-center p-[10px] gap-2.5 text-[#000000] hover:text-[#000000] cursor-pointer'
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
