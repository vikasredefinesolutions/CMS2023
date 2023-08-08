import LoginModal from '@appComponents/modals/loginModal';
import ThirdPartyLogin from '@appComponents/modals/loginModal/ThirdPartyLogin';
import {
  SIMPLI_SAFE_CODE,
  UCA,
  UNITI_CODE,
  _Store_CODES,
} from '@constants/global.constant';
import { _modals } from '@definations/product.type';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';

interface _props {
  title: string;
  url: string;
}

const Topic: React.FC<_props> = ({ title, url }) => {
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
  const [focus, setFocus] = useState<boolean>(false);
  const { thirdPartyLogin } = useTypedSelector_v2((state) => state.store);

  const getHeaderClassName = useCallback(() => {
    if (focus) {
      if (
        code == SIMPLI_SAFE_CODE ||
        code === _Store_CODES.USAAHEALTHYPOINTS ||
        code == UCA
      ) {
        return 'border-secondary primary-link hover:primary-link';
      }
      return 'border-secondary text-secondary';
    } else {
      if (code == UNITI_CODE) {
        return 'border-transparent primary-link font-semibold';
      } else if (
        code == SIMPLI_SAFE_CODE ||
        code === _Store_CODES.USAAHEALTHYPOINTS ||
        code == UCA
      ) {
        return 'border-transparent primary-link hover:primary-link';
      } else {
        return 'border-transparent text-primary';
      }
    }
  }, [focus, code]);

  if (view === 'MOBILE') {
    return (
      <>
        <div className='text-sm border-b border-gray-300'>
          <div className='flex items-center justify-between py-3 px-2 pl-8'>
            <div className=''>
              <button
                title={title}
                onClick={() => {
                  // toggleSideMenu('CLOSE');
                  if (
                    code === 'CYX' ||
                    code === 'UCA' ||
                    (code === _Store_CODES.UNITi &&
                      title.toLowerCase().includes('gift'))
                  ) {
                    if (customeId) {
                      router.push(`/${url}.html`);
                    } else {
                      setOpenModal('login');
                    }
                  } else {
                    router.push(`/${url}.html`);
                  }
                }}
                className=''
              >
                {title}
              </button>
            </div>
          </div>
        </div>
        {openModal === 'login' && (
          <>
            {thirdPartyLogin ? (
              <ThirdPartyLogin modalHandler={modalHandler} />
            ) : (
              <LoginModal modalHandler={modalHandler} />
            )}
          </>
        )}
      </>
    );
  }

  if (view === 'DESKTOP') {
    return (
      <>
        <div
          className='flex'
          onClick={() => {
            if (
              code === 'CYX' ||
              (code === _Store_CODES.UNITi &&
                title.toLowerCase().includes('gift')) ||
              (code === 'UCA' && title.toLowerCase() !== 'faq')
            ) {
              if (customeId) {
                if (title.toLocaleLowerCase() === 'special orders') {
                  router.push(`/${url}`);
                } else {
                  router.push(`/${url}.html`);
                }
              } else {
                setOpenModal('login');
              }
            } else {
              router.push(`/${url}.html`);
            }
          }}
        >
          <div className=''>
            <button
              title={title}
              onMouseOver={() => setFocus(true)}
              onMouseOut={() => setFocus(false)}
              type='button'
              className={`relative text-[12px] xl:text-[14px] xl:ml-[12px] xl:mr-[12px] ml-[5px] mr-[5px] tracking-[2px] z-10 flex items-center font-[400] pt-[10px] pb-[10px] border-b-[4px] ${getHeaderClassName()} `}
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
        {openModal === 'login' && (
          <>
            {thirdPartyLogin ? (
              <ThirdPartyLogin modalHandler={modalHandler} />
            ) : (
              <LoginModal modalHandler={modalHandler} />
            )}
          </>
        )}
      </>
    );
  }

  return <></>;
};

export default Topic;
