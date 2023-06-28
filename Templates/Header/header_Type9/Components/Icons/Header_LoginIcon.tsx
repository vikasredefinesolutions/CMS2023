import ForgotModal from '@appComponents/modals/forgotModal';
import LoginModal from '@appComponents/modals/loginModal';
import { _modals } from '@definations/product.type';
import { useTypedSelector_v2 } from 'hooks_v2';
import React, { useState } from 'react';

const LoginIcon: React.FC = () => {
  const [showModal, setShowModal] = useState<null | _modals>(null);
  // const storeLayout = useTypedSelector_v2((state) => state.store.layout);

  const { id: loggedIn } = useTypedSelector_v2((state) => state.user);
  const view = useTypedSelector_v2((state) => state.store.view);
  const toggleLoginModal = () => {
    if (showModal) {
      setShowModal(null);
      return;
    }
    setShowModal('login');
  };

  if (loggedIn) return <></>;

  return (
    <div className=''>
      <div className='flex relative '>
        <button
          className='text-[#000000] hover:text-anchor-hover flex items-center gap-1'
          onClick={toggleLoginModal}
          title='Login'
        >
          {view == 'DESKTOP' && (
            <span className='text-white'>Login/Register</span>
          )}
          {view !== 'DESKTOP' && (
            <span className='material-icons pt-[4px]'>account_circle</span>
          )}
        </button>
        {showModal === 'login' && <LoginModal modalHandler={setShowModal} />}
        {showModal === 'forgot' && <ForgotModal modalHandler={setShowModal} />}
      </div>
    </div>
  );
};

export default LoginIcon;
