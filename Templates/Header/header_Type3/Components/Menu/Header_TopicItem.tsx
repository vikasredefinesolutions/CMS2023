import LoginModal from '@appComponents/modals/loginModal';
import { _Store } from '@configs/page.config';
import { UCA } from '@constants/global.constant';
import { _modals } from '@definations/product.type';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

interface _props {
  title: string;
  url: string;
}

const Topic: React.FC<_props> = ({ title, url }) => {
  const router = useRouter();
  const { toggleSideMenu, setRedirectPagePath } = useActions_v2();
  const { redirectPath } = useTypedSelector_v2((state) => state.home);

  // --------------------------------------------------------------
  // const storeLayout = useTypedSelector_v2((state) => state.store.layout);
  const { view, code } = useTypedSelector_v2((state) => state.store);
  const { id: customeId } = useTypedSelector_v2((state) => state.user);
  const [openModal, setOpenModal] = useState<null | _modals>(null);
  const modalHandler = (param: null | _modals) => {
    if (param) {
      console.log(param);
      setOpenModal(param);
      return;
    }
    setOpenModal(null);
  };
  // --------------------------------------------------------------
  const [focus, setFocus] = useState<boolean>(false);

  if (view === 'MOBILE') {
    return (
      <div className='text-sm border-b border-gray-300'>
        <div className='relative text-[14px] pl-[25px] mr-[5px] flex items-center pt-[15px] pb-[15px] grow'>
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
      <>
        {' '}
        <div
          className='flex'
          onClick={() => {
            if (code === 'CYX' || code === UCA) {
              if (customeId) {
                router.push(`/${url}`);
              } else {
                setRedirectPagePath(redirectPath || `/${url}`);
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
              onMouseOver={() => setFocus(true)}
              onMouseOut={() => setFocus(false)}
              type='button'
              className={`relative text-[12px] xl:text-[14px] xl:ml-[12px] xl:mr-[12px] ml-[5px] mr-[5px] tracking-[2px] z-10 flex items-center font-[400] pt-[10px] pb-[10px] border-b-[4px] ${
                focus
                  ? `border-secondary ${
                      code == _Store.type6
                        ? 'primary-link hover:primary-link'
                        : 'text-secondary'
                    } `
                  : `border-transparent  ${
                      code == _Store.type6 ? '' : 'text-primary'
                    } `
              } border-primary-link`}
            >
              <span
                className='uppercase'
                style={{ textTransform: 'uppercase' }}
              >
                {title}
              </span>
            </button>
          </div>
        </div>
        {openModal === 'login' && <LoginModal modalHandler={modalHandler} />}
      </>
    );
  }

  return <></>;
};

export default Topic;
