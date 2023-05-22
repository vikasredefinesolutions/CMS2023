import React from 'react';

const RcFeatures: React.FC = () => {
  return (
    <div className='bg-[#f5f7f6] pl-[20px] pr-[20px] pt-[20px] pb-[20px] lg:max-w-sm lg:ml-auto w-full h-2/3 max-h-96 min-h-[630px] flex flex-col items-center justify-center lg:pl-[40px] lg:pr-[40px] lg:mr-[12px] mb-[30px]'>
      <div className='border-b last:border-b-0 border-[#051c2c] w-full text-center pt-[12px] pb-[12px] lg:pt-[20px] pb-[20px]'>
        <span className='material-icons text-4xl'>local_shipping</span>
        <div className='mt-[4px] text-normal-text'>
          FREE SHIPPING ORDERS OVER $4K
        </div>
      </div>
      <div className='border-b last:border-b-0 border-[#051c2c] w-full text-center pt-[12px] pb-[12px] lg:pt-[20px] pb-[20px]'>
        <span className='material-icons text-4xl'>style</span>
        <div className='mt-[4px] text-normal-text'>
          1ST LOGO FREE UP TO 10,000 STITCHES
        </div>
      </div>
      <div className='border-b last:border-b-0 border-[#051c2c] w-full text-center pt-[12px] pb-[12px] lg:pt-[20px] pb-[20px]'>
        <span className='material-icons text-4xl'>verified</span>
        <div className='mt-[4px] text-normal-text'>
          FREE PROOF ON ALL ORDERS
        </div>
      </div>
    </div>
  );
};

export default RcFeatures;
