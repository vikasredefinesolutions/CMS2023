import ForgotModal from '@appComponents/modals/forgotModal';
import LoginModal from '@appComponents/modals/loginModal';
import { _Store } from '@configs/page.config';
import {
  BOSTONBEAR,
  THD_STORE_CODE,
  _Store_CODES,
  __LocalStorage,
} from '@constants/global.constant';
import { thirdPartyLoginService } from '@constants/pages.constant';
import { _modals } from '@definations/product.type';
import { fetchThirdpartyservice } from '@services/thirdparty.service';
import { useTypedSelector_v2 } from 'hooks_v2';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const LoginIcon: React.FC = () => {
  const [showModal, setShowModal] = useState<null | _modals>(null);
  // const storeLayout = useTypedSelector_v2((state) => state.store.layout);
  const { id: loggedIn } = useTypedSelector_v2((state) => state.user);
  const toggleLoginModal = () => {
    if (showModal) {
      setShowModal(null);
      return;
    }
    setShowModal('login');
  };
  const router = useRouter();
  const { id: storeId, code: storeCode } = useTypedSelector_v2(
    (state) => state.store,
  );
  const { thirdPartyLogin, bothLogin } = useTypedSelector_v2(
    (state) => state.store,
  );

  if (storeCode === THD_STORE_CODE) return null;
  if (storeCode === _Store_CODES.USAAPUNCHOUT) return null;
  if (loggedIn) return <></>;
  const SamlloginHandler = () => {
    fetchThirdpartyservice({ storeId }).then((ThirdpartyServices) => {
      ThirdpartyServices.map((service) => {
        if (
          service.thirdPartyServiceName.toLocaleLowerCase() ==
          thirdPartyLoginService.oktaLogin.toLocaleLowerCase()
        ) {
          localStorage.setItem(
            __LocalStorage.thirdPartyServiceName,
            service.thirdPartyServiceName,
          );
          service.url && router.push(service.url);
        } else if (
          service.thirdPartyServiceName.toLocaleLowerCase() ==
          thirdPartyLoginService.samlLogin.toLocaleLowerCase()
        ) {
          const jsonDate = new Date().toJSON();
          const datejson = jsonDate.split('.')[0] + 'Z';
          service.url &&
            router.push(service.url + encodeURIComponent(datejson));
        }
      });
    });
  };

  console.log(' ia m running');
  return (
    <>
      {thirdPartyLogin ? (
        <div className='pl-[15px]'>
          <div className='flex relative tracking-[1px]'>
            <button
              className={`text-secondary hover:text-${
                storeCode == BOSTONBEAR ||
                storeCode === _Store_CODES.USAAPUNCHOUT
                  ? 'primary'
                  : 'secondary'
              } flex items-center gap-1`}
              onClick={SamlloginHandler}
              type='button'
            >
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
            </button>
          </div>
        </div>
      ) : (
        <div className='pl-[15px]'>
          <div className='flex relative tracking-[1px]'>
            <button
              className='primary-link hover:primary-link  group flex items-center relative 
              pt-[8px] pb-[8px]'
              onClick={toggleLoginModal}
              title='Login'
            >
              {/* <span className='text-[12px] hidden xl:inline-block whitespace-nowrap tracking-[1px]'>
            {__pagesText.Headers.login}
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
            </button>
            {showModal === 'login' && (
              <LoginModal modalHandler={setShowModal} />
            )}
            {showModal === 'forgot' && (
              <ForgotModal modalHandler={setShowModal} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LoginIcon;
