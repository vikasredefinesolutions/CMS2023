import Price from '@appComponents/Price';
import NxtImage from '@appComponents/reUsable/Image';
import {
  _MyAcc_OrderBillingDetails,
  _MyAcc_OrderProductDetails,
} from '@definations/APIs/user.res';
import React from 'react';
import OrD_InvoiceItem from './OrD_InvoiceItem';

interface _Props {
  onClose(): void;
  billing: _MyAcc_OrderBillingDetails;
  product: _MyAcc_OrderProductDetails[];
  logoUrl: string;
  mediaBaseUrl: string;
}

const OrD_InvoiceModal: React.FC<_Props> = ({
  onClose,
  billing,
  product,
  logoUrl,
  mediaBaseUrl,
}) => {
  const getBillingAddress = (billing: _MyAcc_OrderBillingDetails | null) => {
    let address = '';
    if (billing?.billingAddress1) {
      address += `${billing.billingAddress1}`;
    }
    if (billing?.billingAddress2 && billing.billingAddress2.trim() !== '') {
      address += ', ';
      address += `\n${billing.shippingAddress2}`;
    }
    if (billing?.billingCity) {
      address += ', ';
      address += `\n${billing.billingCity}`;
    }
    if (billing?.billingState) {
      address += ', ';
      address += `\n${billing.billingState}`;
    }
    if (billing?.billingCountry) {
      address += ', ';
      address += `\n${billing.billingCountry} `;
    }
    if (billing?.billingZip) {
      address += ', ';
      address += `\n${billing.billingZip} `;
    }

    return address;
  };

  const getShippingAddress = (billing: _MyAcc_OrderBillingDetails | null) => {
    let address = '';
    if (billing?.shippingAddress1) {
      address += `${billing.shippingAddress1}`;
    }
    if (billing?.shippingAddress2 && billing.shippingAddress2.trim() !== '') {
      address += ', ';
      address += `\n${billing.shippingAddress2}`;
    }
    if (billing?.shippingCity) {
      address += ', ';
      address += `\n${billing.shippingCity}`;
    }
    if (billing?.shippingState) {
      address += ', ';
      address += `\n${billing.shippingState}`;
    }
    if (billing?.shippingCountry) {
      address += ', ';
      address += `\n${billing.shippingCountry}`;
    }
    if (billing?.shippingZip) {
      address += ', ';
      address += `\n${billing.shippingZip}`;
    }
    return address;
  };

  return (
    <div
      id='startorderModal'
      className='overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center h-modal inset-0'
    >
      <div className='w-full h-full bg-[#000000] bg-opacity-[0.50] flex items-center justify-center'>
        <div className='relative px-[16px] w-full max-w-4xl h-full md:h-auto'>
          <div className='relative bg-[#ffffff] shadow max-h-screen overflow-y-auto h-full'>
            <div className='flex justify-between items-start p-[25px] rounded-t border-b sticky top-0 left-0 bg-[#ffffff] z-50'>
              <div className='text-[30px] font-[600] text-large-text'>
                <NxtImage
                  src={logoUrl}
                  className=''
                  alt=''
                  useNextImage={false}
                />
              </div>
              <button
                type='button'
                onClick={onClose}
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[14px] p-[6px] ml-auto inline-flex items-center text-default-text'
              >
                <svg
                  className='w-[24px] h-[24px]'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </button>
            </div>
            <div className='p-[25px]'>
              <div className='font-[700] text-medium-text'>
                Dear {billing?.firstName},
                <br />
                Your order number is: {billing?.id}
              </div>
              <div className='p-4 border-b border-b-gray-300 last:border-b-0'>
                {product.map((prod, index) => (
                  <OrD_InvoiceItem
                    key={index}
                    item={prod}
                    mediaBaseUrl={mediaBaseUrl}
                  />
                ))}
              </div>
              <div className='p-4 border-b border-b-gray-300 last:border-b-0'>
                <div className='text-medium-text'>
                  <dl className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <dt className=''>Subtotal</dt>
                      <dd className='font-medium text-gray-900'>
                        <Price value={billing?.orderSubtotal} />
                      </dd>
                    </div>
                    <div className='flex items-center justify-between'>
                      <dt className=''>
                        <span>Shipping</span>
                      </dt>
                      <dd className='font-medium text-gray-900'>
                        <Price value={billing?.orderShippingCosts} />
                      </dd>
                    </div>
                    <div className='flex items-center justify-between'>
                      <dt className=''>
                        <span>Order Tax</span>
                      </dt>
                      <dd className='font-medium text-gray-900'>
                        <Price value={billing?.orderTax} />
                      </dd>
                    </div>

                    <div className='flex items-center justify-between font-[700]'>
                      <dt className=''>
                        <span>Total</span>
                      </dt>
                      <dd className='text-gray-900'>
                        <Price value={billing?.orderTotal} />
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className='p-4 border-b border-b-gray-300 last:border-b-0'>
                <div className='flex flex-wrap gap-y-3'>
                  <div className='w-full lg:w-1/2'>
                    <div className='font-[600]'>Bill to</div>
                    <div className=''>{billing?.billingFirstName}</div>

                    {billing.billingAddress1 && (
                      <div className=''> {billing.billingAddress1},</div>
                    )}
                    {billing.billingAddress2 && (
                      <div className=''>{billing.billingAddress2},</div>
                    )}
                    {billing?.billingCity && (
                      <div className=''>{billing?.billingCity},</div>
                    )}
                    {billing.billingState && (
                      <div className=''>{billing.billingState},</div>
                    )}
                    {billing.billingCountry && (
                      <div className=''>{billing.billingCountry},</div>
                    )}
                    {billing.billingZip && (
                      <div className=''>{billing.billingZip}</div>
                    )}
                  </div>
                  <div className='w-full lg:w-1/2'>
                    <div className='font-[600]'>Ship to</div>
                    <div className=''>{billing?.shippingFirstName}</div>

                    {billing.shippingAddress1 && (
                      <div className=''> {billing.shippingAddress1},</div>
                    )}
                    {billing.shippingAddress2 && (
                      <div className=''>{billing.shippingAddress2},</div>
                    )}
                    {billing?.shippingCity && (
                      <div className=''>{billing?.shippingCity},</div>
                    )}
                    {billing.shippingState && (
                      <div className=''>{billing.shippingState},</div>
                    )}
                    {billing.shippingCountry && (
                      <div className=''>{billing.shippingCountry},</div>
                    )}
                    {billing.shippingZip && (
                      <div className=''>{billing.shippingZip}</div>
                    )}
                  </div>
                  <div className='w-full'></div>
                </div>
              </div>
            </div>
            <div className='p-[25px] text-center border-t text-center text-medium-text'>
              © 2023 Redefine Ecommere - All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrD_InvoiceModal;
