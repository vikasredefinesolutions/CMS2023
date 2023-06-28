import { useActions_v2 } from '@hooks_v2/index';
import React from 'react';

interface _props {
  setOpenTab: (args: string) => void;
}
const Backdrop:  React.FC<_props> = ({ setOpenTab }) => {
  const { toggleSideMenu } = useActions_v2();
  return (
    <div
      onClick={() => {
        setOpenTab('');
        toggleSideMenu('CLOSE');
      }}
      className='fixed inset-0 '
    ></div>
  );
};

export default Backdrop;
