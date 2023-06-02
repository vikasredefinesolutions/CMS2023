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
      <Link href={`/${url}.html`} className='flex'>
        <div className='relative flex'>
          <button
            title={title}
            // onMouseOver={() => setFocus(true)}
            // onMouseOut={() => setFocus(false)}
            type='button'
            className={`relative text-medium-text mt-[5px] xl:ml-[10px] xl:mr-[10px] ml-[5px] mr-[5px] z-10 flex items-center border-0 border-b-2 pt-[10px] pb-[10px] border-transparent hover:border-primary text-[#ffffff] hover:text-primary `}
          >
            <span>{title}</span>
          </button>
        </div>
      </Link>
    );
  }

  return <></>;
};

export default Topic;
