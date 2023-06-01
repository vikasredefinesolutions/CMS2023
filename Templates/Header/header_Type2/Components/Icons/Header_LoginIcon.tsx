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
  const { empId, isEmpGuest } = useTypedSelector_v2((state) => state.employee);

  const btnText = () => {
    if (!!empId) {
      return `LOGIN CONTINUE AS GUEST`;
    }
    return 'Login';
  };

  const toggleLoginModal = () => {
    if (!!empId) {
      setShowModal('guestLogin');
      return;
    }

    if (showModal) {
      setShowModal(null);
      return;
    }
    setShowModal('login');
  };

  if (loggedIn || isEmpGuest) return <></>;
  return (
    <div className='pl-[15px]'>
      <div className='flex relative tracking-[1px]'>
        <button
          className='text-quaternary hover:text-anchor-hover flex items-center'
          onClick={toggleLoginModal}
          title='Login'
        >
          <span className='text-[12px] hidden xl:inline-block whitespace-nowrap tracking-[1px]'>
            {btnText()}
          </span>
          <span className='material-icons xl:hidden '>
            {__pagesText.Headers.loginIcon}
          </span>
        </button>
        {showModal === 'login' && <LoginModal modalHandler={setShowModal} />}
        {showModal === 'guestLogin' && (
          <LoginModal modalHandler={setShowModal} />
        )}
        {showModal === 'forgot' && <ForgotModal modalHandler={setShowModal} />}
      </div>
    </div>
  );
};

export default LoginIcon;
