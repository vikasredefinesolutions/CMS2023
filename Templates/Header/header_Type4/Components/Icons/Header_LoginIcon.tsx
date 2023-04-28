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
    <div className='pl-[15px] order-2'>
      <div className='flex relative tracking-[1.25px]'>
        <button
          className='text-[#ffffff] hover:text-primary-hover flex items-center gap-1'
          onClick={toggleLoginModal}
          title='Login'
        >
          <span className='text-[14px] hidden xl:inline-block whitespace-nowrap tracking-[1.25px] mr-[4px]'>
            {__pagesText.Headers.login}
          </span>
          <span className='material-icons-round xl:hidden'>person_2</span>
          {/* <span className='material-icons'>perm_identity</span> */}
        </button>
        {showModal === 'login' && <LoginModal modalHandler={setShowModal} />}
        {showModal === 'forgot' && <ForgotModal modalHandler={setShowModal} />}
      </div>
    </div>
  );
};

export default LoginIcon;
