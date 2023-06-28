import React from 'react';

interface _Props {
  text: string | null;
}

const PD7_Description: React.FC<_Props> = ({ text }) => {
  if (!text) return null;

  return (
    <div className='mt-[30px] container mx-auto'>
      <div className='text-center text-sub-text pb-[20px] uppercase font-bold'>
        Description
      </div>
      <div
        className='text-default-text'
        dangerouslySetInnerHTML={{ __html: text }}
      ></div>
    </div>
  );
};

export default PD7_Description;
