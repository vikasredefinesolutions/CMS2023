import React from 'react';

interface _Props {
  title: string;
}

const Header_JustTitle: React.FC<_Props> = ({ title }) => {
  return (
    <div className='relative flex'>
      <button
        title={title}
        type='button'
        className={`relative text-[12px] xl:text-[14px] mt-[5px] xl:ml-[10px] xl:mr-[10px] ml-[5px] mr-[5px] tracking-[1px] z-10 flex items-center font-[600] border-0 border-b-2 pt-[10px] pb-[10px] border-transparent hover:border-[#003a70] text-primary `}
      >
        <span
          className='uppercase text-primary'
          style={{ textTransform: 'uppercase' }}
        >
          {title}
        </span>
      </button>
    </div>
  );
};

export default Header_JustTitle;
