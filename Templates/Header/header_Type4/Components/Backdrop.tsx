import { useActions_v2 } from '@hooks_v2/index';
import React from 'react';
const Backdrop: React.FC = () => {
  const { toggleSideMenu } = useActions_v2();
  return (
    <div
      onClick={() => toggleSideMenu('CLOSE')}
      // x-transition:enter="transition-opacity ease-linear duration-300"
      // x-transition:enter-start="opacity-0"
      // x-transition:enter-end="opacity-100"
      // x-transition:leave="transition-opacity ease-linear duration-300"
      // x-transition:leave-start="opacity-100"
      // x-transition:leave-end="opacity-0"
      className='fixed inset-0 '
    ></div>
  );
};

export default Backdrop;
