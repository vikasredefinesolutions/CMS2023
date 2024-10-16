import { paths } from '@constants/paths.constant';
import Link from 'next/link';
import React from 'react';

const RcRequestDone: React.FC = () => {
  return (
    <div className=' w-full lg:w-4/12 md:w-6/12 pl-[15px] pr-[15px] mb-[30px]'>
      <div className='p-6 text-center'>
        <div className='text-2xl md:text-3xl lg:text-title font-title text-color-title mb-4'>
          Thank you! Your request has been received.
        </div>
        <div className='text-lg md:text-xl lg:text-small-title font-small-title text-color-small-title mb-4'>
          Once of our customer service representatives will contact you shortly.
        </div>
        <div className='mb-4'>
          <Link href={paths.HOME} className='btn btn-secondary'>
            SHOP
          </Link>
        </div>
        <div className='text-lg md:text-xl lg:text-small-title font-small-title text-color-small-title mb-4'>
          <strong>OVER 1 MILLION PRODUCTS DECORATED</strong>
        </div>
        <div className='text-default-text font-default-text text-color-default-text mb-4'>
          We are here to help Monday through Friday from 9 am to 5 pm EST.
        </div>

       
          
        <div className='flex flex-wrap justify-center items-center gap-y-5 max-w-lg mx-auto pt-4'>
        <div
            className='w-1/2 text-center order-2 md:order-1 cursor-pointer'
            data-reamaze-lightbox='contact'
            data-reamaze-lightbox-anchored='true'
            dangerouslySetInnerHTML={{
              __html: ` <a href='javascript:void(0)' onclick="if (!window.__cfRLUnblockHandlers) return false; openWidgett()">
              <div class='w-20 h-20 mx-auto mb-2 rounded-full flex items-center justify-center border-2 border-black'>
                <span class='material-icons-outlined text-4xl'>chat</span>
              </div>
              <div class='text-base font-semibold uppercase'>Chat</div>
            </a>`,
            }}
          ></div>
          <div className='w-1/2 text-center order-3 md:order-3'>
            <div className='w-20 h-20 mx-auto mb-2 rounded-full flex items-center justify-center border-2 border-black'>
              <span className='material-icons text-4xl'>phone</span>
            </div>
            <div className='text-base font-semibold uppercase'>Call</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RcRequestDone;
