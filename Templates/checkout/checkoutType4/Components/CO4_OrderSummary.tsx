import React from 'react';

interface _Props {}

const CO4_OrderSummary: React.FC<_Props> = () => {
  return (
    <>
      <div className='border border-slate-400 bg-[#ffffff] mb-[20px]'>
        <div className='flex justify-between items-center text-title-text bg-light-gray w-full w-full pl-[15px] pr-[15px] pt-[17px] pb-[17px] tracking-normal font-semibold'>
          Order Summary
        </div>
        <div className='px-[15px] py-[15px]'>
          <dl className=''>
            <div className='font-[600] text-medium-text'>Products Price</div>
            <div className='flex items-center justify-between pt-[15px] pb-[20px]'>
              <dt className='text-normal-text tracking-normal'>Subtotal</dt>
              <dd className='text-normal-text tracking-normal'>$4,780.00</dd>
            </div>
            <div className='border-t border-gray-200 flex items-center pt-[10px] pb-[20px]'>
              <dt className='text-base z-0 w-full promocode relative'>
                <input
                  name='Promo_code'
                  id='Promo_code'
                  placeholder='Promo code'
                  className='peer placeholder:opacity-0 block w-full bg-transparent pt-[8px] appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200 pr-[40px] relative z-10'
                />
                <label
                  htmlFor='Promo_code'
                  className='absolute duration-300 -top-3 -z-1 origin-0 text-base bg-[#ffffff] peer-focus:-top-3 peer-placeholder-shown:top-2 peer-focus:-left: 0px'
                >
                  PROMO CODE
                </label>{' '}
                <a className='coupon-code-Apply text-sm absolute right-0 top-[8px] hidden'>
                  Apply
                </a>
                <div className='text-base font-medium absolute right-0 top-[8px]'>
                  +
                </div>
              </dt>
            </div>
            <div className='border-t border-gray-200 flex items-center justify-between pt-[10px]'>
              <dt className='text-normal-text flex items-center tracking-normal pb-[10px]'>
                <span>Shipping</span>
              </dt>
              <dd className='text-normal-text tracking-normal'>FREE</dd>
            </div>
            <div className='flex items-center justify-between'>
              <dt className='flex items-center text-normal-text tracking-normal'>
                <span>Tax</span>
              </dt>
              <dd className='text-normal-text tracking-normal'>$0.00</dd>
            </div>
          </dl>
        </div>
        <div className='flex justify-between items-center bg-light-gray w-full text-normal-text tracking-normal pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
          <div className='text-sub-text font-semibold tracking-normal'>
            Total:
          </div>
          <div className='text-sub-text font-semibold tracking-normal'>
            $4,850.60
          </div>
        </div>
      </div>
      <div id='OrderNoteDiv'>
        <div className='text-sub-text font-bold  trsacking-normal mb-[5px]'>
          <label>Add a note to your order</label>
        </div>
        <div className='form-group mb-[10px]'>
          <textarea
            className='border border-gray-border rounded pt-[12px] pb-[12px] pl-[12px] pr-[12px] w-full text-sub-text'
            rows={3}
            id='txtOrderNotes'
          ></textarea>
        </div>
      </div>
      <div className='text-medium-text text-[#ff0000] font-semibold mb-[20px]'>
        Please note that the tax amount on this order is subject to change based
        on the final invoice, and in accordance with local and state laws
      </div>
      <div className='text-medium-text text-[#ff0000] font-semibold mb-[20px]'>
        Your credit card will be authorized at checkout and you will see a
        pending charge on your bank statement. A sales representative will
        review the order details once received. Your card will then be charged
        in 5-7 days after submitted unless confirmed as finalized or otherwise
        cancelled prior to then.
      </div>{' '}
    </>
  );
};

export default CO4_OrderSummary;
