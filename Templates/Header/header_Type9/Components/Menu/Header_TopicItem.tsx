import LoginModal from '@appComponents/modals/loginModal';
import { _modals } from '@definations/product.type';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

interface _props {
  title: string;
  url: string;
  showPipe: boolean;
}

const Topic: React.FC<_props> = ({ title, url, showPipe }) => {
  const router = useRouter();
  const { toggleSideMenu } = useActions_v2();

  // --------------------------------------------------------------
  // const storeLayout = useTypedSelector_v2((state) => state.store.layout);
  const { view, code } = useTypedSelector_v2((state) => state.store);
  const { id: customeId } = useTypedSelector_v2((state) => state.user);
  const [openModal, setOpenModal] = useState<null | _modals>(null);
  const modalHandler = (param: null | _modals) => {
    if (param) {
      setOpenModal(param);
      return;
    }
    setOpenModal(null);
  };
  // --------------------------------------------------------------
  // const [focus, setFocus] = useState<boolean>(false);

  if (view === 'MOBILE') {
    return (
      <div className='text-sm border-b border-gray-300'>
        <div className='flex items-center justify-between py-3 px-2 pl-8'>
          <div className=''>
            <button
              title={title}
              onClick={() => {
                toggleSideMenu('CLOSE');
                router.push(`/${url}`);
              }}
              className=''
            >
              {title}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'DESKTOP') {
    return (
      <div
        className='flex'
        onClick={() => {
          if (code === 'CYX') {
            if (customeId) {
              router.push(`/${url}`);
            } else {
              setOpenModal('login');
              // router.push(`/${url}`);
            }
          } else {
            router.push(`/${url}`);
          }
        }}
      >
        <div className=''>
          <button
            title={title}
            // onMouseOver={() => setFocus(true)}
            // onMouseOut={() => setFocus(false)}
            type='button'
            className={`relative text-[12px] xl:text-[14px] xl:ml-[12px] xl:mr-[12px] ml-[5px] mr-[5px] tracking-[2px] z-10 flex items-center font-[400] pt-[10px] pb-[10px] border-b-[4px] border-transparent hover:border-secondary text-primary hover:text-secondary `}
          >
            <span className='uppercase' style={{ textTransform: 'uppercase' }}>
              {title}
            </span>
          </button>
        </div>
        {showPipe && (
          <div className='flex lg:py-[5px] xl:py-[12px] text-anchor'>/</div>
        )}

        {openModal === 'login' && <LoginModal modalHandler={modalHandler} />}
      </div>
    );
  }

  return <></>;
};

export default Topic;
