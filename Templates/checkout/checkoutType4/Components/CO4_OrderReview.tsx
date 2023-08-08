import NxtImage from '@appComponents/reUsable/Image';
import React from 'react';

interface _Props {}

const CO4_OrderReview: React.FC<_Props> = () => {
  return (
    <div id='OrderReview'>
      <div className='mb-[12px] mt-[16px]'>
        <hr />
      </div>
      <ul role='list' className='overflow-hidden'>
        <li className='flex flex-wrap ml-[-15px] mr-[-15px] pb-[50px] mb-[50px] border-b border-gray-border'>
          <div className='w-full lg:w-2/6 pl-[15px] pr-[15px] mb-[30px]'>
            <div className='w-full'>
              <span
              // style="box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative;"
              >
                <span
                // style="box-sizing: border-box; display: block; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 100% 0px 0px;"
                ></span>
                <NxtImage
                  className=''
                  alt='products'
                  sizes='100vw'
                  useNextImage={false}
                  // srcset="https://www.corporategear.com/resources/parsonskellogg/product/logo/110771_3172309_stonewash_7005.jpg?5339"
                  src='https://www.corporategear.com/resources/parsonskellogg/product/logo/110771_3172309_stonewash_7005.jpg?5339'
                  decoding='async'
                  data-nimg='responsive'
                  // style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: contain;"
                />
              </span>
            </div>
          </div>
          <div className='w-full lg:w-4/6 pl-[15px] pr-[15px] flex flex-wrap lg:justify-between'>
            <div className='text-title-text font-semibold mb-[10px]'>
              <a
                href='/Patagonia-Men-s-Better-Sweater-Quarter-Zip'
                className='text-[#000000]'
              >
                Patagonia Men's Better Sweater Quarter-Zip
              </a>
            </div>
            <div className='w-full flex flex-wrap mt-[5px]'>
              <div className='lg:w-2/3 w-full'>
                <div className='flex justify-between'>
                  <div className='text-normal-text'>
                    <span className='font-semibold'>SKU :</span> 25523
                  </div>
                </div>
                <div className='mt-[4px] flex'>
                  <div className='text-normal-text'>
                    <span className='font-semibold'>Color :</span>
                    Black
                  </div>
                </div>
              </div>
              <div className='lg:w-1/3 w-full'>
                <div className='font-[600] text-normal-text text-right'>
                  <span className=''>Item Total:</span>
                  <span className=''>$6708.00</span>
                </div>
              </div>
            </div>
            <div className='w-full flex flex-wrap'>
              <div className='w-full'>
                <div className='mt-[30px]'>
                  <div className='text-normal-text font-semibold border-b pb-[8px] mb-[5px]'>
                    Item Details
                  </div>
                  <div className='flex justify-between py-2'>
                    <div className='text-normal-text font-semibold w-1/3'>
                      Size
                    </div>
                    <div className='text-normal-text font-semibold w-1/3 text-center'>
                      Qty
                    </div>
                    <div className='text-normal-text font-semibold w-1/3 text-right'>
                      Price
                    </div>
                  </div>
                  <div className='flex justify-between py-2'>
                    <div className='text-normal-text w-1/3'>XS</div>
                    <div className='text-normal-text w-1/3 text-center'>9</div>
                    <div className='text-normal-text w-1/3 text-right'>
                      $1,161.00
                    </div>
                  </div>
                  <div className='flex justify-between py-2'>
                    <div className='text-normal-text w-1/3'>SM</div>
                    <div className='text-normal-text w-1/3 text-center'>9</div>
                    <div className='text-normal-text w-1/3 text-right'>
                      $1,161.00
                    </div>
                  </div>
                  <div className='flex justify-between py-2'>
                    <div className='text-normal-text w-1/3'>MD</div>
                    <div className='text-normal-text w-1/3 text-center'>8</div>
                    <div className='text-normal-text w-1/3 text-right'>
                      $1,032.00
                    </div>
                  </div>
                  <div className='flex justify-between py-2'>
                    <div className='text-normal-text w-1/3'>LG</div>
                    <div className='text-normal-text w-1/3 text-center'>8</div>
                    <div className='text-normal-text w-1/3 text-right'>
                      $1,032.00
                    </div>
                  </div>
                  <div className='flex justify-between py-3 border-t border-b'>
                    <div className='text-normal-text w-1/3'>Product Total:</div>
                    <div className='text-normal-text w-1/3 text-center'>52</div>
                    <div className='text-normal-text w-1/3 text-right'>
                      $6,708.00
                    </div>
                  </div>
                  <div className='flex justify-between py-3'>
                    <div className='text-normal-text leading-normal'>
                      <div className='mb-3 flex'>
                        <NxtImage
                          className='w-14 max-h-12'
                          isStatic={true}
                          useNextImage={false}
                          src='/images/logo-to-be-submitted.webp'
                          title=''
                          alt=''
                        />
                        <span className='font-semibold ml-3'>
                          Logo to be
                          <br />
                          submitted
                        </span>
                      </div>
                      <div>
                        <span className='font-semibold mr-1'>Location:</span>
                        <span>Right Sleeve</span>
                      </div>
                    </div>
                    <div className='text-normal-text leading-normal text-right'>
                      <div className='font-semibold'>Logo Price</div>
                      <div>First Logo Free</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CO4_OrderReview;
