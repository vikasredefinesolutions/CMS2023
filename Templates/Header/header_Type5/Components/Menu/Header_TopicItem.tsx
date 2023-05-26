import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface _props {
  title: string;
  url: string;
}

const Topic: React.FC<_props> = ({ title, url }) => {
  const router = useRouter();
  const { toggleSideMenu } = useActions_v2();

  // --------------------------------------------------------------
  // const storeLayout = useTypedSelector_v2((state) => state.store.layout);
  const view = useTypedSelector_v2((state) => state.store.view);

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
                router.push(`/${url}.html`);
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
      <Link href={`${url}`} passHref className='flex'>
        <a>
          <div className=''>
            <button
              title={title}
              // onMouseOver={() => setFocus(true)}
              // onMouseOut={() => setFocus(false)}
              type='button'
              className={`relative text-[14px] xl:text-[17px] xl:ml-[10px] xl:mr-[10px] ml-[5px] mr-[5px] tracking-[2px] z-10 flex items-center font-[600] pt-[8px] pb-[8px] pl-[15px] pr-[15px] text-[#ffffff] hover:text-primary`}
            >
              <span
                className='uppercase '
                style={{ textTransform: 'uppercase' }}
              >
                {title}
              </span>
            </button>
          </div>
        </a>
      </Link>
    );
  }

  return <></>;
};

export default Topic;
