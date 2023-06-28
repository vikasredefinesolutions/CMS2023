import { useActions_v2 } from 'hooks_v2';
import React from 'react';

const MenuIcon: React.FC = () => {
  const { toggleSideMenu } = useActions_v2();
  // const storeLayout = useTypedSelector_v2((state) => state.store.layout);

  return (
    <button
      type='button'
      className='bg-[#ffffff] border border-primary text-primary hover:text-gray-500'
      onClick={() => toggleSideMenu('OPEN')}
    >
      <span className='sr-only'>Open menu</span>
      <svg
        className='h-6 w-6'
        x-description='Heroicon name: outline/menu'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth='2'
        stroke='currentColor'
        aria-hidden='true'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M4 6h16M4 12h16M4 18h16'
        ></path>
      </svg>
    </button>
  );
};

export default MenuIcon;
