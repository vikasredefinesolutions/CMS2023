import { useActions_v2 } from 'hooks_v2';
import React from 'react';

const MenuIcon: React.FC = () => {
  const { toggleSideMenu } = useActions_v2();
  // const storeLayout = useTypedSelector_v2((state) => state.store.layout);
  return (
    <button
      type='button'
      className='bg-[#ffffff] text-tertiary hover:text-gray-500 flex items-center'
      onClick={() => toggleSideMenu('OPEN')}
    >
      <span className='sr-only'>Open menu</span>
      <span className='material-icons-outlined text-[30px]'>menu</span>
    </button>
  );
};

export default MenuIcon;
