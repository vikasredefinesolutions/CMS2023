import LoginModal from '@appComponents/modals/loginModal';
import { CYXTERA_CODE, UNITI_CODE } from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { _modals } from '@definations/product.type';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface _props {
  title: string;
  content: string;
  url: string;
  openTab: string;
  setOpenTab: (arg: string) => void;
}

const Custom: React.FC<_props> = ({
  content,
  title,
  url,
  openTab,
  setOpenTab,
}) => {
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const { view, code } = useTypedSelector_v2((state) => state.store);
  const [openModal, setOpenModal] = useState<null | _modals>(null);
  const { toggleSideMenu } = useActions_v2();
  const router = useRouter();
  const [focus, setFocus] = useState(false);
  const [showAllItems, setShowAllItems] = useState<boolean>(false);
  const [showtab, setShowTab] = useState<boolean>(false);
  useEffect(() => {
    if (openTab == title) {
      setShowTab(true);
      setShowAllItems(true);
    } else {
      setShowTab(false);
      setShowAllItems(false);
    }
  }, [openTab]);
  const modalHandler = (param: null | _modals) => {
    if (param) {
      setOpenModal(param);
      return;
    }
    setOpenModal(null);
  };
  if (view === 'MOBILE') {
    return (
      <>
        <div className='relative flex border-b border-b-gray-border items-center justify-between'>
          <button
            className='relative text-[14px] pl-[25px] mr-[5px] flex items-center pt-[15px] pb-[15px] grow'
            onClick={() => {
              if (code === CYXTERA_CODE || code === UNITI_CODE) {
                if (customerId) {
                  setOpenTab(title);
                  setShowAllItems((show) => !show);
                } else {
                  toggleSideMenu('CLOSE');
                  setOpenModal('login');
                }
              } else {
                setOpenTab(title);
                setShowAllItems((show) => !show);
              }
            }}
            title={title}
          >
            <span
              className='material-icons-outlined text-[16px] font-[600] mr-[5px] absolute left-[5px] top-1/2 -translate-y-1/2'
              x-html="open1 == true ? 'remove' : 'add'"
            >
              {showAllItems == true && showtab ? 'remove' : 'add'}
            </span>
            <div className=''>{title}</div>
          </button>
          <a
            className='text-[12px] mr-[5px] underline'
            onClick={() => toggleSideMenu('CLOSE')}
          >
            <Link href={`${url}`}>{__pagesText.Headers.mobileViewAll}</Link>
          </a>
        </div>
        {showAllItems && showtab && (
          <div className='bg-gray-100'>
            <div
              className='border-t first:border-t-0 py-5 px-6'
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        )}
        {openModal === 'login' && <LoginModal modalHandler={modalHandler} />}
      </>
    );
  }
  if (view === 'DESKTOP') {
    return (
      <>
        <div
          onClick={() => {
            if (code === CYXTERA_CODE || code === UNITI_CODE) {
              if (customerId) {
                router.push(`/${url}.html`);
              } else {
                setOpenModal('login');
              }
            } else {
              router.push(`/${url}`);
            }
          }}
        >
          <div className=' '>
            <button
              onMouseOver={() => setFocus(true)}
              title={title}
              onMouseLeave={() => setFocus(false)}
              type='button'
              className={`relative text-[12px] xl:text-[14px] xl:ml-[12px] xl:mr-[12px] ml-[5px] mr-[5px] tracking-[2px] z-10 flex items-center font-[400] pt-[10px] pb-[10px] border-b-[4px] ${
                focus
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-primary'
              }`}
            >
              <span
                className='uppercase '
                style={{ textTransform: 'uppercase' }}
              >
                {title}
              </span>
            </button>
          </div>
        </div>
        {focus && (
          <div
            onMouseOver={() => setFocus(true)}
            onMouseLeave={() => setFocus(false)}
            className='absolute top-full left-[20%] xl:left-[43%] w-screen max-w-[600px] sm:text-[14px]'
          >
            <div className='relative bg-gray-100 z-50 p-[15px] pt-[0px]'>
              <div className=''>
                <div
                  className='border-t first:border-t-0 py-5 px-5'
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return <></>;
};

export default Custom;
