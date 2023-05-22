import { __pagesText } from '@constants/pages.text';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import Link from 'next/link';
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
  const { view } = useTypedSelector_v2((state) => state.store);
  const { toggleSideMenu } = useActions_v2();
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

  if (view === 'MOBILE') {
    return (
      <>
        <div className='relative flex border-b border-b-gray-border items-center justify-between'>
          <button
            className='relative text-[14px] pl-[25px] mr-[5px] flex items-center pt-[15px] pb-[15px] grow'
            onClick={() => {
              setOpenTab(title);
              setShowAllItems((show) => !show);
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
            <Link href={`${url}.html`} passHref>
              <a>{__pagesText.Headers.mobileViewAll}</a>
            </Link>
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
      </>
    );
  }
  if (view === 'DESKTOP') {
    return (
      <>
        <Link href={`${url}.html`} className='flex'>
          <div className='relative flex'>
            <button
              onMouseOver={() => setFocus(true)}
              title={title}
              onMouseLeave={() => setFocus(false)}
              type='button'
              className={`relative text-[12px] xl:text-[14px] mt-[5px] xl:ml-[10px] xl:mr-[10px] ml-[5px] mr-[5px] tracking-[1px] z-10 flex items-center font-[600] border-0 border-b-2 pt-[10px] pb-[10px] border-transparent hover:border-[#003a70] text-primary `}
            >
              <span
                className='uppercase text-primary'
                style={{ textTransform: 'uppercase' }}
              >
                {title}
              </span>
            </button>
          </div>
        </Link>

        {focus && (
          <div
            onMouseOver={() => setFocus(true)}
            onMouseLeave={() => setFocus(false)}
            // x-transition:enter="transition ease-out duration-200"
            // x-transition:enter-start="opacity-0"
            // x-transition:enter-end="opacity-100"
            // x-transition:leave="transition ease-in duration-150"
            // x-transition:leave-start="opacity-100"
            // x-transition:leave-end="opacity-0"
            className='absolute top-full left-0 w-screen max-w-screen-sm text-gray-500 sm:text-sm  !m-0'
          >
            <div className='absolute inset-0 top-1/2 bg-white shadow'></div>
            <div className='relative bg-gray-100 z-50'>
              <div className='max-w-7xl mx-auto'>
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
