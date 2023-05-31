import Price from '@appComponents/reUsable/Price';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { _shippingMethod } from '@controllers/checkoutController';
import SummarryController from '@controllers/summarryController';
import { Form, Formik } from 'formik';
import { GetCartTotals, useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import Link from 'next/link';
import { FC, useState } from 'react';

interface _props {
  selectedShippingModel: _shippingMethod;
}

const CartSummarryType2: FC<_props> = ({ selectedShippingModel }) => {
  const { update_checkoutEmployeeLogin } = useActions_v2();
  const couponDetails = useTypedSelector_v2((state) => state.cart.discount);
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => !!state.employee.empId,
  );
  const currentPage = useTypedSelector_v2((state) => state.store.currentPage);
  const { el: employeeLogin } = useTypedSelector_v2((state) => state.checkout);
  const [textOrNumber, setTextOrNumber] = useState<'number' | 'text'>('text');
  // Functions
  const {
    coupon,
    successMessage,
    setCoupon,
    applyCouponHandler,
    removeCouponCodeHandler,
  } = SummarryController();
  const {
    totalPrice,
    subTotal,
    logoSetupCharges,
    smallRunFee,
    salesTax,
    totalLogoCharges,
    totalLineCharges,
    totalQty,
  } = GetCartTotals();

  // const { cartQty } = useTypedSelector_v2((state) => state.cart);
  // const { fetchShipping } = CheckoutController();
  // useEffect(() => {
  //   if (cartQty) {
  //     fetchShipping(subTotal);
  //   }
  // }, [subTotal]);
  const getNewShippingCost = (shippingCost: number): number => {
    if (isEmployeeLoggedIn) {
      return employeeLogin.shippingPrice;
    }

    return shippingCost;
  };

  const ShippingHTML = (userShippingPrice: number) => {
    if (isEmployeeLoggedIn && currentPage === 'CHECKOUT') {
      const price =
        textOrNumber === 'text' && employeeLogin.shippingPrice === 0
          ? 'FREE'
          : employeeLogin.shippingPrice.toFixed(2);

      return (
        <div className='border-t border-gray-200 flex items-center justify-between pt-[10px] pb-[10px]'>
          <dt className='text-normal-text flex items-center tracking-normal pb-[10px]'>
            <span>Shipping</span>
          </dt>
          <dd className='text-normal-text tracking-normal'>
            <div className='form-group m-b-10 pl-[15px] relative max-w-[100px]'>
              <span className='absolute left-[0px] top-[12px] text-normal-text flex items-center tracking-normal'>
                $
              </span>
              <Formik
                initialValues={{ shipping: price }}
                onSubmit={(values) => {
                  setTextOrNumber('text');
                  update_checkoutEmployeeLogin({
                    type: 'SHIPPING_PRICE',
                    value: +(+values.shipping).toFixed(2),
                  });
                }}
                enableReinitialize
              >
                {({ handleChange, values, setFieldValue, submitForm }) => {
                  return (
                    <Form>
                      <input
                        className='border border-gray-border text-right focus:border-gray-border rounded w-full px-2 py-2'
                        value={values.shipping}
                        name={'shipping'}
                        type={textOrNumber}
                        onChange={(event) => {
                          if (textOrNumber === 'text') {
                            setTextOrNumber('number');
                          }
                          if ('FREE'.includes(event.target.value[0])) {
                            setFieldValue('number', '0');
                            return;
                          }
                          handleChange(event);
                        }}
                        onBlur={() => submitForm()}
                        placeholder=''
                      />
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </dd>
        </div>
      );
    }

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

  const decideValue = (args: {
    message: string | null;
    currentValue: string;
    active: number | undefined;
  }) => {
    if (args.message) {
      return args.message; // will show for 3 secs after applying the code
    }

    let text = '';
    if (args.currentValue) {
      text = args.currentValue;
    }
    if (args.active) {
      text = coupon;
    }
    return text;
  };

  const showUpdateBtn = () => {
    if (successMessage) {
      return false;
    }
    if (coupon) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div className='border border-gray-border p-[15px]'>
        <div className='w-full text-sub-text pt-[8px] pb-[8px]'>
          {__pagesText.CheckoutPage.orderSummary.OrderSummary}
        </div>
        <div className='w-full pl-[15px] pr-[15px] border-b border-gray-border mt-[10px] mb-[10px]'></div>
        <dl className='text-default-text'>
          <div className='flex items-center justify-between pt-[15px]'>
            <dt className=''>Merchandise</dt>
            <dd className=''>
              {' '}
              <Price value={totalPrice} />
            </dd>
          </div>
          <div className='flex items-center justify-between pt-[15px]'>
            <dt className=''>Discount</dt>
            <dd className=''>-$90.00</dd>
          </div>
          <div className='w-full pl-[15px] pr-[15px] border-b border-gray-border mt-[10px]'></div>
          <div className='flex items-center justify-between pt-[15px]'>
            <dt className=''>
              <span>Subtotal</span>
            </dt>
            <dd className=''>
              <Price value={totalPrice - 0} />
            </dd>
          </div>
          <div className='flex items-center justify-between pt-[15px]'>
            <dt className=''>
              <span>First Logo</span>
            </dt>
            <dd className=''>FREE</dd>
          </div>
          {totalLogoCharges > 0 && (
            <div className='flex items-center justify-between pt-[15px]'>
              <dt className=''>
                <span>Second Logo</span>
              </dt>
              <dd className=''>
                {' '}
                <Price value={totalLogoCharges} />
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
                {totalQty > 10 ? 'FREE' : <Price value={smallRunFee} />}
              </dd>
            </div>
          )}
          <div className='w-full pl-[15px] pr-[15px] border-b border-gray-border mt-[10px]'></div>
          <div className='flex items-center justify-between pt-[15px] mb-[30px]'>
            <dt className='font-semibold'>
              <span>Estimated Total</span>
            </dt>
            <dd className='font-semibold'>
              <Price
                value={
                  totalPrice + getNewShippingCost(selectedShippingModel.price)
                }
              />
            </dd>
          </div>
          <div className=''>
            <div className='mt-[16px]'>
              <Link className='' href={paths.CHECKOUT}>
                <a className='btn btn-lg btn-primary w-full !flex flex-wrap justify-center items-center'>
                  CHECKOUT NOW
                </a>
              </Link>
            </div>
          </div>
        </dl>
      </div>
    </>
  );
};

export default CartSummarryType2;
