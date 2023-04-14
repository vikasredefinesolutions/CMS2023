import { _modals } from '@appComponents/modals/modal';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { _ProductInfoProps } from './productDetailsComponents';
const ProductInfo: React.FC<_ProductInfoProps> = ({ product, storeCode }) => {
  const { setShowLoader } = useActions_v2();
  const [showExtra, setShowExtra] = useState(false);
  const [openModal, setOpenModal] = useState<null | _modals>(null);
  const color = useTypedSelector_v2((state) => state.product.selected.color);
  const sizes = useTypedSelector_v2((state) => state.product.product.sizes);

  const router = useRouter();
  // console.log('product ' , product);
  
  return (
    <>
      <div className='col-span-1 mt-[15px] pl-[0px] pr-[0px] md:pl-[15px] md:pr-[15px] sm:pl-[0px] sm:pr-[0px] lg:mt-[0px]'>
        <div className='hidden md:flex flex-wrap'>
          <div className='w-full'>
            <h1 className='text-title-text'>{product?.name}</h1>
          </div>
        </div>
        {/* <div className='mainsection text-center text-sm leading-none mt-[20px]'>
          <div className='md:pt-[20px] md:pb-[20px] text-center bg-quaternary'>
            <div className='md:flex justify-center'>
              <div className='w-full md:w-auto inline-block p-[20px] md:pt-0 md:pb-0 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-white'>
                <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
                  <span className='material-icons text-2xl-text leading-[15px] text-tertiary'>
                    local_shipping
                  </span>
                  <div className='ml-[8px] text-left text-extra-small-text leading-[15px] tracking-[1px] text-white'>
                    <div>FREE SHIPPING</div>
                    <div>TO ONE LOCATION</div>
                  </div>
                </div>
              </div>
              <div className='w-full md:w-auto inline-block p-[20px] md:pt-0 md:pb-0 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-white'>
                <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
                  <span className='material-icons text-2xl-text leading-[15px] text-secondary'>
                    draw
                  </span>
                  <div className='ml-[8px] text-left text-extra-small-text leading-[15px] tracking-[1px] text-white'>
                    <div>1ST LOGO FREE</div>
                    <div>UP TO 10,000 STITCHES</div>
                  </div>
                </div>
              </div>
              <div className='w-full md:w-auto inline-block p-[20px] md:pt-0 md:pb-0 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-white'>
                <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
                  <span className='material-icons text-2xl-text leading-[15px] text-primary'>
                    verified
                  </span>
                  <div className='ml-[8px] text-left text-extra-small-text leading-[15px] tracking-[1px] text-white'>
                    <div>FREE PROOF</div>
                    <div>ON ALL ORDERS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className=''>
          <div className='pt-[15px] text-default-text'>
            <span className='inline-block w-[90px]'>SKU</span>
            <span>:</span>{' '}
            <span className='ml-[4px]'>{product.product.sku}</span>
          </div>
          <div className='pt-[15px] text-default-text'>
            <span className='inline-block w-[90px]'>MSRP</span>
            <span>:</span>{' '}
            <span className='ml-[4px]'>$ {product.product.msrp} </span>
          </div>
        </div>
        <div className='pt-[15px] text-default-text' x-data='{open : false}'>
          <div className='flex flex-wrap items-center cursor-pointer'>
            <span className='material-icons-outlined text-default-text'>
              add
            </span>{' '}
            MINIMUM ORDER QUANTITY:
            <span className='pl-[5px]'>4 units per color</span>
          </div>
          <div className='text-extra-small-text py-4' x-show='open'>
            We reserve the right to reject orders that do not meet the 4 piece
            minimum per style
            <br />
            and color, exceptions may apply for men’s and women’s companion
            styles per color.
          </div>
        </div>
        <div className='pt-[15px] text-default-text font-medium'>
          <div className='bg-light-gray py-[5px] text-center'>
            QUANTITY DISCOUNT
          </div>
          <div className='flex flex-wrap justify-center items-center border border-gray-border text-center p-[10px] md:divide-x md:divide-gray-border gap-y-[10px]'>
            <div className='w-1/2 md:w-auto px-[10px] even:border-l even:border-l-gray-border'>
              <div className='px-[10px]'>
                <div className=''>10+</div>
                <div className=''>$133.00</div>
              </div>
            </div>
            <div className='w-1/2 md:w-auto px-[10px] even:border-l even:border-l-gray-border'>
              <div className='px-[10px]'>
                <div className=''>24+</div>
                <div className=''>$130.50</div>
              </div>
            </div>
            <div className='w-1/2 md:w-auto px-[10px] even:border-l even:border-l-gray-border'>
              <div className='px-[10px] bg-light-gray'>
                <div className=''>48+</div>
                <div className=''>$124.00</div>
              </div>
            </div>
            <div className='w-1/2 md:w-auto px-[10px] even:border-l even:border-l-gray-border'>
              <div className='px-[10px]'>
                <div className=''>72+</div>
                <div className=''>$121.00</div>
              </div>
            </div>
            <div className='w-1/2 md:w-auto px-[10px] even:border-l even:border-l-gray-border'>
              <div className='px-[10px]'>
                <div className=''>144+</div>
                <div className=''>$118.00</div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-wrap items-center pt-[15px]'>
          <div className='text-default-text w-[90px]'>
            <span className=''>Color</span>
          </div>
          <div className='flex flex-wrap text-center available-colors text-default-text ml-[4px] gap-[5px]'>
            <div className=''>
              <div className='w-[32px] h-[32px] p-[1px] border-2 border-primary hover:border-primary cursor-pointer'>
                <img
                  src='images/1040623_25528_STH.jpg'
                  alt=''
                  className='w-full object-center object-cover'
                />
              </div>
            </div>
            <div className=''>
              <div className='w-[32px] h-[32px] p-[1px] border-2 border-white hover:border-primary cursor-pointer'>
                <img
                  src='images/1040623_25528_STH.jpg'
                  alt=''
                  className='w-full object-center object-cover'
                />
              </div>
            </div>
            <div className=''>
              <div className='w-[32px] h-[32px] p-[1px] border-2 border-white hover:border-primary cursor-pointer'>
                <img
                  src='images/1040623_25528_STH.jpg'
                  alt=''
                  className='w-full object-center object-cover'
                />
              </div>
            </div>
            <div className=''>
              <div className='w-[32px] h-[32px] p-[1px] border-2 border-white hover:border-primary cursor-pointer'>
                <img
                  src='images/1040623_25528_STH.jpg'
                  alt=''
                  className='w-full object-center object-cover'
                />
              </div>
            </div>
            <div className=''>
              <div className='w-[32px] h-[32px] p-[1px] border-2 border-white hover:border-primary cursor-pointer'>
                <img
                  src='images/1040623_25528_STH.jpg'
                  alt=''
                  className='w-full object-center object-cover'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='pt-[15px] text-default-text'>
          <span className='inline-block w-[90px]'>Color Name</span>
          <span>:</span> <span className='ml-[4px]'>Stonewash</span>
        </div>
        <div className='pt-[15px] text-default-text text-right'>
          <a
            href='javascript:void(0);'
            className='text-anchor hover:text-anchor-hover underline'
            data-modal-toggle='FitandSize'
          >
            Fit and Size
          </a>{' '}
          <a
            href='javascript:void(0);'
            className='text-anchor hover:text-anchor-hover underline'
            data-modal-toggle='Personalize'
          >
            Personalize
          </a>
        </div>
        <div className='pt-[15px] text-default-text'>
          <div className='flex flex-wrap items-center bg-light-gray py-[5px] mb-[10px]'>
            <div className='px-[15px] w-1/3'>Size</div>
            <div className='px-[15px] w-1/3 text-center'>Availability</div>
            <div className='px-[15px] w-1/3 text-right'>QTY.</div>
          </div>
          <div className='flex flex-wrap items-center border-b border-b-gray-border pl-[10px]'>
            <div className='w-1/3 pt-[10px] pb-[10px]'>XS</div>
            <div className='w-1/3 pt-[10px] pb-[10px] text-center text-green-700'>
              82
            </div>
            <div className='w-1/3 pt-[10px] pb-[10px] text-right'>
              <input
                className='form-input !px-[10px] !inline-block !w-[65px]'
                value='0'
              />
            </div>
          </div>
          <div className='flex flex-wrap items-center border-b border-b-gray-border pl-[10px]'>
            <div className='w-1/3 pt-[10px] pb-[10px]'>SM</div>
            <div className='w-1/3 pt-[10px] pb-[10px] text-center text-green-700'>
              250+
            </div>
            <div className='w-1/3 pt-[10px] pb-[10px] text-right'>
              <input
                className='form-input !px-[10px] !inline-block !w-[65px]'
                value='0'
              />
            </div>
          </div>
          <div className='flex flex-wrap items-center border-b border-b-gray-border pl-[10px]'>
            <div className='w-1/3 pt-[10px] pb-[10px]'>MD</div>
            <div className='w-1/3 pt-[10px] pb-[10px] text-center text-green-700'>
              250+
            </div>
            <div className='w-1/3 pt-[10px] pb-[10px] text-right'>
              <input
                className='form-input !px-[10px] !inline-block !w-[65px]'
                value='0'
              />
            </div>
          </div>
          <div className='flex flex-wrap items-center border-b border-b-gray-border pl-[10px]'>
            <div className='w-1/3 pt-[10px] pb-[10px]'>LG</div>
            <div className='w-1/3 pt-[10px] pb-[10px] text-center text-green-700'>
              250+
            </div>
            <div className='w-1/3 pt-[10px] pb-[10px] text-right'>
              <input
                className='form-input !px-[10px] !inline-block !w-[65px]'
                value='0'
              />
            </div>
          </div>
          <div className='flex flex-wrap items-center border-b border-b-gray-border pl-[10px]'>
            <div className='w-1/3 pt-[10px] pb-[10px]'>XL</div>
            <div className='w-1/3 pt-[10px] pb-[10px] text-center text-green-700'>
              250+
            </div>
            <div className='w-1/3 pt-[10px] pb-[10px] text-right'>
              <input
                className='form-input !px-[10px] !inline-block !w-[65px]'
                value='0'
              />
            </div>
          </div>
          <div className='flex flex-wrap items-center border-b border-b-gray-border pl-[10px]'>
            <div className='w-1/3 pt-[10px] pb-[10px]'>XXL</div>
            <div className='w-1/3 pt-[10px] pb-[10px] text-center text-green-700'>
              250+
            </div>
            <div className='w-1/3 pt-[10px] pb-[10px] text-right'>
              <input
                className='form-input !px-[10px] !inline-block !w-[65px]'
                value='0'
              />
            </div>
          </div>
          <div className='flex flex-wrap items-center border-b border-b-gray-border pl-[10px]'>
            <div className='w-1/3 pt-[10px] pb-[10px]'>3XL</div>
            <div className='w-1/3 pt-[10px] pb-[10px] text-center text-red-700 font-[600]'>
              OUT OF STOCK
            </div>
            <div className='w-1/3 pt-[10px] pb-[10px] text-right'>-</div>
          </div>
        </div>
        <div className='pt-[15px] text-default-text'>
          <div className='text-red-700'>
            We request that all orders include a minimum of 4 pieces per color
            of a style, which can be split across men's and women's companion
            items. We may reject or require modification to any orders not
            meeting these requirements without prior approval.
          </div>
        </div>
        <div className='pt-[15px] text-default-text flex flex-wrap items-center gap-[10px]'>
          <div className=''>Price Per Item</div>
          <div className='text-title-text'>$133.00</div>
          <div className='line-through'>$149.00</div>
        </div>
        <form className='mt-[24px]'>
          <div className='m-[12px] mt-[24px]'>
            <a
              href='apply-logo.html'
              className='btn btn-primary text-center btn-lg w-full'
            >
              CUSTOMIZE NOW AND ADD TO CART
            </a>
          </div>
        </form>
        <div className='pt-[15px] text-default-text'>
          <div className=''>
            PLEASE NOTE: If you are ordering product that is backordered, your
            entire order will not ship until all items are available. Click the
            number in the Availability column above to see future inventory
            dates. Please reference the ship date shown in your cart.
          </div>
        </div> */}
      </div>
    </>
  );
};

export default ProductInfo;
