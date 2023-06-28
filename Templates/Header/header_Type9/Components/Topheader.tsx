import { useActions_v2 } from '@hooks_v2/index';
import React from 'react';
import { LoggedInMenu, LoginIcon, MyCartIcon } from './Icons';

// interface _props {
//   setOpenTab: (args: string) => void;
// }
const TopHeader: React.FC = () => {
  const { toggleSideMenu } = useActions_v2();
  return (
    <div className='sm:flex sm:flex-wrap sm:justify-between items-center text-default-text tracking-wider'>
      <div className='text-center text-white'>
        <span className=''>ParsonsKellogg Corporate Stores</span>
      </div>
      <div className='lg:flex hidden'>
        <LoginIcon />
        <LoggedInMenu />
        <span className='text-white mx-2'>|</span>
        <MyCartIcon />
      </div>
    </div>
  );
};

export default TopHeader;
