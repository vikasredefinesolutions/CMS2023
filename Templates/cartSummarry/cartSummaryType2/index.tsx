import Price from '@appComponents/reUsable/Price';
import { PKHG_MINIMUM_QTY, SIMPLI_SAFE_CODE } from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { _shippingMethod } from '@controllers/checkoutController';
import { GetCartTotals, useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface _props {
  selectedShippingModel: _shippingMethod;
}

const CartSummarryType2: FC<_props> = ({ selectedShippingModel }) => {
  const router = useRouter();
  const { showModal } = useActions_v2();

  const isEmployeeLoggedIN = useTypedSelector_v2(
    (state) => !!state.employee.empId,
  );
  const { code: storeCode } = useTypedSelector_v2((state) => state.store);
  // Functions
  const {
    totalQty,
    totalPrice,
    subTotal,
    smallRunFee,
    totalLineCharges,
    merchandisePrice,
    firstLogoPrice,
    secondLogoPrice,
    thirdLogoPrice,
    fourthLogoPrice,
    fifthLogoPrice,
    sixthLogoPrice,
    seventhLogoPrice,
  } = GetCartTotals();
  return (
    <>
      <div className='border border-gray-border p-[15px]'>
        <div className='w-full text-sub-text pt-[8px] pb-[8px]'>
          {__pagesText.CheckoutPage.orderSummary.OrderSummary}
        </div>
        <div className='w-full pl-[15px] pr-[15px] border-b border-gray-border mt-[10px] mb-[10px]'></div>
        <dl className='text-default-text'>
          {storeCode !== SIMPLI_SAFE_CODE && (
            <>
              {' '}
              <div className='flex items-center justify-between pt-[15px]'>
                <dt className=''>Merchandise</dt>
                <dd className=''>
                  {' '}
                  <Price value={merchandisePrice} />
                </dd>
              </div>
              {merchandisePrice - subTotal > 0 && !isEmployeeLoggedIN && (
                <div className='flex items-center justify-between pt-[15px]'>
                  <dt className=''>Discount</dt>
                  <dd className=''>
                    -<Price value={merchandisePrice - subTotal} />
                  </dd>
                </div>
              )}
              <div className='w-full pl-[15px] pr-[15px] border-b border-gray-border mt-[10px]'></div>
            </>
          )}
          <div className='flex items-center justify-between pt-[15px]'>
            <dt className=''>
              <span>Subtotal</span>
            </dt>
            <dd className=''>
              <Price value={subTotal} />
            </dd>
          </div>

          {storeCode !== SIMPLI_SAFE_CODE && (
            <div className='flex items-center justify-between pt-[15px]'>
              <dt className=''>
                <span>First Logo</span>
              </dt>
              <dd className=''>
                {firstLogoPrice > 0 ? <Price value={firstLogoPrice} /> : 'FREE'}
              </dd>
            </div>
          )}
          {secondLogoPrice > 0 && (
            <div className='flex items-center justify-between pt-[15px]'>
              <dt className=''>
                <span>Second Logo</span>
              </dt>
              <dd className=''>
                <Price value={secondLogoPrice} />
              </dd>
            </div>
          )}

          {thirdLogoPrice > 0 && (
            <div className='flex items-center justify-between pt-[15px]'>
              <dt className=''>
                <span>Third Logo</span>
              </dt>
              <dd className=''>
                <Price value={thirdLogoPrice} />
              </dd>
            </div>
          )}
          {fourthLogoPrice > 0 && (
            <div className='flex items-center justify-between pt-[15px]'>
              <dt className=''>
                <span>Fourth Logo</span>
              </dt>
              <dd className=''>
                <Price value={fourthLogoPrice} />
              </dd>
            </div>
          )}
          {fifthLogoPrice > 0 && (
            <div className='flex items-center justify-between pt-[15px]'>
              <dt className=''>
                <span>Fifth Logo</span>
              </dt>
              <dd className=''>
                <Price value={fifthLogoPrice} />
              </dd>
            </div>
          )}
          {sixthLogoPrice > 0 && (
            <div className='flex items-center justify-between pt-[15px]'>
              <dt className=''>
                <span>Sixth Logo</span>
              </dt>
              <dd className=''>
                <Price value={sixthLogoPrice} />
              </dd>
            </div>
          )}
          {seventhLogoPrice > 0 && (
            <div className='flex items-center justify-between pt-[15px]'>
              <dt className=''>
                <span>Seventh Logo</span>
              </dt>
              <dd className=''>
                <Price value={seventhLogoPrice} />
              </dd>
            </div>
          )}
          {totalLineCharges > 0 && (
            <div className='flex items-center justify-between pt-[15px]'>
              <dt className=''>
                <span>Line Charges</span>
              </dt>
              <dd className=''>
                {' '}
                <Price value={totalLineCharges} />
              </dd>
            </div>
          )}
          {smallRunFee > 0 && (
            <div className='flex items-center justify-between pt-[10px]'>
              <dt className=''>
                <span>Small Run Fee</span>
              </dt>
              <dd className=''>
                {' '}
                <Price value={smallRunFee} />
              </dd>
            </div>
          )}
          <div className='w-full pl-[15px] pr-[15px] border-b border-gray-border mt-[10px]'></div>
          <div className='flex items-center justify-between pt-[15px] mb-[30px]'>
            <dt className='font-semibold'>
              <span>Estimated Total</span>
            </dt>
            <dd className='font-semibold'>
              <Price value={totalPrice} />
            </dd>
          </div>
          <div className=''>
            <div className='mt-[16px]'>
              <button
                onClick={() => {
                  if (
                    !isEmployeeLoggedIN &&
                    totalQty < PKHG_MINIMUM_QTY &&
                    storeCode !== SIMPLI_SAFE_CODE
                  ) {
                    showModal({
                      title: 'Min Quantity Alert',
                      message:
                        'Cart Quantity must be greater then or equal to 10',
                    });
                  } else {
                    router.push(paths.CHECKOUT);
                  }
                }}
                className={`btn btn-lg btn-primary w-full !flex flex-wrap justify-center items-center `}
              >
                CHECKOUT NOW
              </button>
            </div>
          </div>
        </dl>
      </div>
    </>
  );
};

export default CartSummarryType2;
