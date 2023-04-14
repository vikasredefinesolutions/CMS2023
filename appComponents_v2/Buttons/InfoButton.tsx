import React, { useState } from 'react';

interface _props {}

const InfoButton: React.FC<_props> = () => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div
      className='absolute top-2 right-10'
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
    >
      <button
        className=''
        onFocus={() => setShowInfo(true)}
        onBlur={() => setShowInfo(false)}
      >
        <span className='material-icons-outlined ml-2 text-base'>info</span>
      </button>
      {showInfo && (
        <div className='z-10 absolute top-full -left-32 transform -translate-x-1/2'>
          <div className='bg-slate-500 p-2 overflow-hidden mt-2'>
            <div className='text-sm text-gray-200 font-light whitespace-nowrap w-full text-left px-4 py-4'>
              <span className='w-full pt-1 pb-1 block font-semibold'>
                Your password must have :
              </span>
              <span className='w-full pt-1 pb-1 block'>
                8 Or more character
              </span>
              <span className='w-full pt-1 pb-1 block'>
                Upper and lowercase letters
              </span>
              <span className='w-full pt-1 pb-1 block'>At list one number</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoButton;
