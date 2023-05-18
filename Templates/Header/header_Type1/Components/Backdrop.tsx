import { useActions_v2 } from '@hooks_v2/index';
import React from 'react';
const Backdrop: React.FC = () => {
  const { toggleSideMenu } = useActions_v2();
  return (
    <div
      onClick={() => toggleSideMenu('CLOSE')}
      className='fixed inset-0 '
    ></div>
  );
};

export default Backdrop;
