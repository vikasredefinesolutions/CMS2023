import Price from '@appComponents/reUsable/Price';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from 'hooks_v2';
import { FC } from 'react';

interface _props {
  shippingCost: number;
  totalPrice: number;
  subTotal: number;
  logoSetupCharges: number;
  smallRunFee: number;
  salesTax: number;
  totalLogoCharges: number;
  totalLineCharges: number;
}

const PL1_OrderSummary: FC<_props> = ({
  shippingCost,
  totalPrice,
  subTotal,
  logoSetupCharges,
  smallRunFee,
  salesTax,
  totalLogoCharges,
  totalLineCharges,
}) => {
  const couponDetails = useTypedSelector_v2((state) => state.cart.discount);

  const ShippingHTML = (userShippingPrice: number) => {
    return (
      <div className='border-t border-gray-200 flex items-center justify-between pt-[10px] pb-[10px]'>
        <dt className='text-normal-text flex items-center'>
          <span>Shipping</span>
        </dt>
        <dd className='text-normal-text'>
          {userShippingPrice === 0 ? (
            'FREE'
          ) : (
            <Price value={userShippingPrice} />
          )}
        </dd>
      </div>
    );
  };

  const addBottomPadding = couponDetails?.amount ? '' : 'pb-[20px]';

  return (
    <div className='border border-slate-400 bg-[#ffffff] mb-[20px]'>
      <div className='bg-light-gray w-full text-sub-text font-medium pl-[16px] pr-[16px] pt-[8px] pb-[8px]'>
        {__pagesText.CheckoutPage.orderSummary.OrderSummary}
      </div>
      <div className='px-[15px] py-[15px]'>
        <dl className=''>
          <div className='font-[600] text-medium-text'>Products Price</div>
          <div className='flex items-center justify-between pt-[15px] pb-[20px]'>
            <dt className='text-normal-text'>Subtotal:</dt>
            <dd className='text-normal-text'>
              <Price value={subTotal} />
            </dd>
          </div>
          {totalLineCharges > 0 && (
            <div className='flex items-center justify-between pt-[10px]'>
              <dt className='text-base'>Line Charges</dt>
              <dd className='text-base font-medium text-gray-900'>
                <Price value={totalLineCharges} />
              </dd>
            </div>
          )}
          {totalLogoCharges > 0 && (
            <div className='flex items-center justify-between pt-[10px]'>
              <dt className='text-base'>Logo Charges</dt>
              <dd className='text-base font-medium text-gray-900'>
                <Price value={totalLogoCharges} />
              </dd>
            </div>
          )}
          {smallRunFee > 0 && (
            <div className='flex items-center justify-between pt-[10px]'>
              <dt className='text-base'>Small Run Fee</dt>
              <dd className='text-base font-medium text-gray-900'>
                <Price value={smallRunFee} />
              </dd>
            </div>
          )}
          {logoSetupCharges > 0 && (
            <div
              className={`flex items-center justify-between pt-[10px] ${addBottomPadding}`}
            >
              <dt className='text-base'>Logo Setup Charges</dt>
              <dd className='text-base font-medium text-gray-900'>
                <Price value={logoSetupCharges} />
              </dd>
            </div>
          )}

          {!!couponDetails?.amount && (
            <div className='flex items-center justify-between pt-[10px] pb-[20px]'>
              <dt className='text-base'>
                Promo{' '}
                {/* <span
                  className='text-anchor cursor-pointer'
                  onClick={() => removeCouponCodeHandler()}
                >
                  (Remove)
                </span> */}
              </dt>
              <dd className='text-base font-medium text-gray-900 '>
                - <Price value={couponDetails?.amount || 0} />
              </dd>
            </div>
          )}

          {ShippingHTML(shippingCost)}
          <div className='border-t border-gray-200 flex items-center justify-between pt-[10px]'>
            <dt className='text-normal-text flex items-center'>
              <span>{__pagesText.CheckoutPage.orderSummary.tax}</span>
            </dt>
            <dd className='text-normal-text'>
              <Price value={salesTax} />
            </dd>
          </div>
        </dl>
      </div>
      <div className='flex justify-between items-center bg-light-gray w-full text-sub-text font-[600] pl-[16px] pr-[16px] pt-[8px] pb-[8px]'>
        <div>Total:</div>
        <div>
          <Price value={totalPrice} />
        </div>
      </div>
    </div>
  );
};

export default PL1_OrderSummary;
