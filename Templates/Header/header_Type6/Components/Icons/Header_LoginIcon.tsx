import ForgotModal from '@appComponents/modals/forgotModal';
import LoginModal from '@appComponents/modals/loginModal';
import {
  SIMPLI_SAFE_CODE,
  THD_STORE_CODE,
  UCA,
  _Store_CODES,
  __LocalStorage,
} from '@constants/global.constant';
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
  const { thirdPartyLogin } = useTypedSelector_v2((state) => state.store);

  if (storeCode === THD_STORE_CODE) return null;
  if (loggedIn) return <></>;
  const OktaloginHandler = () => {
    fetchThirdpartyservice({ storeId }).then((ThirdpartyServices) => {
      ThirdpartyServices.map((service) => {
        if (service.thirdPartyServiceName == 'Okta')
          localStorage.setItem(
            __LocalStorage.thirdPartyServiceName,
            service.thirdPartyServiceName,
          );
        router.push(service.url);
      });
    });
  };
  return (
    <>
      {thirdPartyLogin ? (
        <div className='pl-[15px]'>
          <div className='flex relative tracking-[1px]'>
            <button
              className='text-primary hover:text-secondary flex items-center gap-1'
              onClick={OktaloginHandler}
              type='button'
            >
              <span className='material-icons' title='LOGIN VIA SAML'>
                perm_identity
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className='pl-[15px]'>
          <div className='flex relative tracking-[1px]'>
            <button
              className={
                storeCode == SIMPLI_SAFE_CODE ||
                storeCode === _Store_CODES.USAAHEALTHYPOINTS ||
                storeCode == UCA
                  ? 'primary-link hover:primary-link flex items-center gap-1'
                  : 'text-primary hover:text-secondary flex items-center gap-1'
              }
              onClick={toggleLoginModal}
              title='Login'
            >
              {/* <span className='material-icons-outlined'>perm_identity</span> */}
              <i className="fa-solid fa-user-large text-[22px]"></i>
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
