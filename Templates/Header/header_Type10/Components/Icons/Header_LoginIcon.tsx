import ForgotModal from '@appComponents/modals/forgotModal';
import LoginModal from '@appComponents/modals/loginModal';
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
    <div className='pl-[15px]'>
      <div className='flex relative tracking-[1px]'>
        <button
          className='text-primary hover:text-anchor-hover flex items-center gap-1'
          onClick={toggleLoginModal}
          title='Login'
        >
          {/* <span className='text-[14px] hidden xl:inline-block whitespace-nowrap tracking-[1px] mr-[4px]'>
            {__pagesText.Headers.login}
          </span> */}
          <svg xmlns="http://www.w3.org/2000/svg" width="21.529" height="20" viewBox="0 0 21.529 20">
  <path id="Account" d="M1658.27,78.872a4.33,4.33,0,1,1,3.17-1.267A4.3,4.3,0,0,1,1658.27,78.872ZM1647.506,90V87.776a3.02,3.02,0,0,1,.582-1.819,3.953,3.953,0,0,1,1.529-1.251,26.312,26.312,0,0,1,4.422-1.522,17.453,17.453,0,0,1,8.457,0,25.919,25.919,0,0,1,4.4,1.532,3.829,3.829,0,0,1,1.558,1.24,3.018,3.018,0,0,1,.579,1.816V90Zm1.183-1.183h19.163V87.776a1.9,1.9,0,0,0-.4-1.128,3.047,3.047,0,0,0-1.081-.9,17.838,17.838,0,0,0-8.106-1.9,18.846,18.846,0,0,0-4.069.442,17.555,17.555,0,0,0-4.045,1.456,3.006,3.006,0,0,0-1.077.9,1.908,1.908,0,0,0-.39,1.128Zm9.581-11.128a3.2,3.2,0,1,0-2.317-.936A3.146,3.146,0,0,0,1658.27,77.689Z" transform="translate(-1647.506 -70)" fill="#011c48"/>
</svg>

        </button>
        {showModal === 'login' && <LoginModal modalHandler={setShowModal} />}
        {showModal === 'forgot' && <ForgotModal modalHandler={setShowModal} />}
      </div>
    </div>
  );
};

export default LoginIcon;
