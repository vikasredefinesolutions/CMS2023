import NxtImage from '@appComponents/reUsable/Image';
import { _Store } from '@configs/page.config';
import { THD_STORE_CODE, __LocalStorage } from '@constants/global.constant';
import { thirdPartyLoginService } from '@constants/pages.constant';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { OktaLogout } from '@services/saml.service';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { __StaticImg } from '../../../../../public/assets/images.asset';

const LoggedInMenu: React.FC = () => {
  const router = useRouter();
  const { logInUser, logoutClearCart, setWishListEmpty } = useActions_v2();
  const { id: loggedIn, customer } = useTypedSelector_v2((state) => state.user);
  const { code: storeCode, id: storeId } = useTypedSelector_v2(
    (state) => state.store,
  );
  const [focus, setFocus] = useState(false);

  const logoutHandler = async () => {
    setFocus(false);
    logoutClearCart();
    setWishListEmpty([]);

    const thirdParytLogin = localStorage.getItem(
      __LocalStorage.thirdPartyServiceName,
    );

    if (
      thirdParytLogin?.toLocaleLowerCase() ===
      thirdPartyLoginService.samlLogin.toLocaleLowerCase()
    ) {
      const payload = {
        oktaLogoutModel: {
          storeId: +storeId,
        },
      };
      const url = await OktaLogout(payload);
      url && router.push(url);
    } else {
      router.push('/');
    }
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
            className={`primary-link hover:primary-link  group flex items-center relative 
            pt-[8px] pb-[8px]`}
            title={__pagesText.Headers.myAccountTittle}
          >
            {/* <span className='text-[12px] hidden xl:inline-block whitespace-nowrap tracking-[1px]'>
              {customer?.firstname}
            </span> */}
            {storeCode == _Store.type6 ? (
              <i className='fa-solid fa-user-large text-[22px]'></i>
            ) : (
              <span
                className='material-icons'
                title={storeCode == _Store.type6 ? 'LOGIN VIA SAML' : ''}
              >
                perm_identity
              </span>
            )}
          </a>
        </Link>

        {focus && (
          <div className='text-xs uppercase absolute right-0 top-full bg-white z-40 w-[220px] pt-[10px]'>
            <ul className='border-[3px] border-[#000000]'>
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
              {/* <li className='border-t border-t-gray-300'>
                <Link href={paths.loggedInMenu.help}>
                  <a className='flex items-center p-[10px] gap-2.5 text-[#000000] hover:text-[#000000]'>
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
