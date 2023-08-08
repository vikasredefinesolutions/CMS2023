import NxtImage from '@appComponents/reUsable/Image';
import { __pagesText } from '@constants/pages.text';
import Link from 'next/link';
import React from 'react';

const Ecommerce_RequestSubmitted: React.FC = () => {
  return (
    <div className='my-[10px]'>
      <div className='container mx-auto'>
        <div className='flex items-stretch flex-wrap'>
          <div className='w-full'>
            <div className='font-semibold mb-[18px] text-[36px] leading-[40px] text-center mt-[15px]'>
              {__pagesText.requestConsultation.heading}
            </div>
            <div className='p-[15px] border border-gray-border'>
              <div className='font-semibold text-center text-[28px] mb-[20px]'>
                {__pagesText.requestConsultation.thankYou}
              </div>
              <div className='text-center text-[20px] mb-[20px]'>
                {__pagesText.requestConsultation.customerServiceContact}
              </div>
              <div className='text-center mb-[30px]'>
                <Link title='' href='/'>
                  <span className='btn btn-md btn-tertiary cursor-pointer'>
                    {__pagesText.requestConsultation.shop}
                  </span>
                </Link>
              </div>
              <div className='text-center font-semibold text-[20px] mb-[10px]'>
                {__pagesText.requestConsultation.oneMillion}
              </div>
              <div className='text-center text-[15px] mb-[30px]'>
                {__pagesText.requestConsultation.timmings}
              </div>
              <div className='text-center mb-[30px]'>
                <a href='javascript:void(0);'>
                  <NxtImage
                    src='/contact-us.webp'
                    isStatic={true}
                    //
                    alt=''
                    className='mb-[5px] inline-block'
                    height='47'
                    title=''
                    width='47'
                  />
                  <div className='text-[18px]'>
                    {__pagesText.requestConsultation.contactUs}
                  </div>
                </a>
              </div>
              <div className='text-center mb-[30px]'>
                <a href='tel:888-293-5648' title='CALL'>
                  <NxtImage
                    alt=''
                    height='47'
                    isStatic={true}
                    className='mb-[5px] inline-block'
                    src='/call.webp'
                    title=''
                    width='47'
                  />
                  <div className='text-[18px]'>
                    {__pagesText.requestConsultation.number}
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce_RequestSubmitted;
