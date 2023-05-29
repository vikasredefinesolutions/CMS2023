import ForgotModal from '@appComponents/modals/forgotModal';
import LoginModal from '@appComponents/modals/loginModal';
import { __pagesText } from '@constants/pages.text';
import { _modals } from '@definations/product.type';
import { useTypedSelector_v2 } from 'hooks_v2';
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

  if (loggedIn) return <></>;

  return (
    <div className='pl-[10px] flex items-center'>
      <div className='flex relative tracking-[1px]'>
        <button
          className='text-secondary hover:text-anchor-hover flex items-center'
          onClick={toggleLoginModal}
          title='Login'
        >
          <span className='text-[17px] hidden xl:inline-block whitespace-nowrap tracking-[1px]'>
            {__pagesText.Headers.login}
          </span>
          <span className='xl:hidden material-icons text-[30px]'>
            account_circle
          </span>
        </button>
        {showModal === 'login' && <LoginModal modalHandler={setShowModal} />}
        {showModal === 'forgot' && <ForgotModal modalHandler={setShowModal} />}
      </div>
    </div>
  );
};

export default LoginIcon;
