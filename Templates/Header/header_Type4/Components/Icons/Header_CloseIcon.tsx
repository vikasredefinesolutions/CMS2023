import { useActions_v2 } from 'hooks_v2';
import React from 'react';

const CloseIcon: React.FC = () => {
  // const { layout: storeLayout } = useTypedSelector_v2((state) => state.store);
  const { toggleSideMenu } = useActions_v2();

  return (
    <div className='text-right p-[10px] border-b border-b-gray-border'>
      <button
        type='button'
        className='inline-block'
        onClick={() => toggleSideMenu('CLOSE')}
      >
        <span className='sr-only'>Close menu</span>
        <span className='material-icons-outlined'>cancel</span>
      </button>
    </div>
  );
};

export default CloseIcon;
