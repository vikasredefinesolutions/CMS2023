import QuickHelpModal from '@appComponents/modals/QuickHelpModal';
import LoginModal from '@appComponents/modals/loginModal';
import React, { useState } from 'react';

const QuickHelp: React.FC = () => {
  const [modal, setModal] = useState<string | null>(null);
  return (
    <>
      <div className='fixed left-[-118px] transition-all hover:left-0 top-[38%] rounded-r-full bg-secondary z-30 mb-20 duration-700'>
        <button className='w-full flex' onClick={() => setModal('Display')}>
          <span className='pr-4 border-r border-white/40 mr-1 leading-[57px] pl-4 text-white font-bold uppercase text-md'>
            Quick Help
          </span>
          <span
            className={`w-[40px] h-[48px] block mt-2 mr-2 ml-1`}
            style={{
              background: 'url(/combinedimage1.png)no-repeat -90px -129px',
            }}
          />
        </button>
      </div>

      {modal === 'Display' && <QuickHelpModal modalHandler={setModal} />}
      {modal === 'login' && <LoginModal modalHandler={setModal} />}
    </>
  );
};

export default QuickHelp;
