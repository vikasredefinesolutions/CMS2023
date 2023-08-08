import Price from '@appComponents/reUsable/Price';
import { checkoutPages } from '@constants/enum';
import {
  CYXTERA_CODE,
  UNITI_CODE,
  _Store_CODES,
} from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { _shippingMethod } from '@controllers/checkoutController';
import {
  GetCartTotals,
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from '@hooks_v2/index';
import { FetchSalesTax } from '@services/checkout.service';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import CO2_EL_Dropdowns from './CO2_EL_Dropdowns';

interface _props {
  placeOrder: (args: _shippingMethod) => void;
  currentpage: number;
  selectedShipModel: _shippingMethod;
}

const OrderSummary: React.FC<_props> = ({
  placeOrder,
  currentpage,
  selectedShipModel,
}) => {
  let smallRunFeeCharge = 0;
  const {
    totalPrice,
    creditBalance,
    merchandisePrice,
    totalLineCharges,
    totalLogoCharges,
    subTotal,
    firstLogoPrice,
    secondLogoPrice,
  } = GetCartTotals();

  const customerID = GetCustomerId();
  const {
    el: employeeLogin,
    charges,
    address,
  } = useTypedSelector_v2((state) => state.checkout);
  const smallRunFee = useTypedSelector_v2(
    (state) => state.store.cartCharges?.smallRunFeesCharges,
  );

  const { useBalance } = useTypedSelector_v2(
    (state) => state.cart.userCreditBalance,
  );

  const currentPage = useTypedSelector_v2((state) => state.store.currentPage);
  const logoSetupCharges = useTypedSelector_v2(
    (state) => state.store.cartCharges?.logoSetupCharges,
  );
  const [textOrNumberSmallRun, setTextOrNumberSmallRun] = useState<
    'number' | 'text'
  >('text');
  const { update_CheckoutEmployeeLogin, update_CheckoutCharges } =
    useActions_v2();

  const getNewShippingCost = (shippingCost: number): number => {
    if (isEmployeeLoggedIn) {
      return employeeLogin.shippingPrice;
    }
    return shippingCost;
  };

  const getNewSmallRunFee = (smallRunFee: number): number => {
    if (isEmployeeLoggedIn) {
      return employeeLogin.smallRunFee;
    }
    return smallRunFee;
  };

  useEffect(() => {
    FetchSalesTax({
      customerId: customerID || 0,
      zipCode: address.zipCode || 0,
      logoTotal: totalLogoCharges.toFixed(2),
      lineTotal: totalLineCharges.toFixed(2),
      logoSetupCharge: logoSetupCharges?.toFixed(2),
      // Here shippingPrice will be get updated, even if the store do not use employee login.
      // So, pass it as a dependency
      shippingCharges: getNewShippingCost(selectedShipModel?.price || 0),
      smallRunFee: getNewSmallRunFee(smallRunFeeCharge),
    }).then((res) => {
      update_CheckoutCharges({ type: 'SALES_TAX', cost: res });
    });
  }, [address.zipCode, employeeLogin.smallRunFee, employeeLogin.shippingPrice]);

  const disablePlaceOrder = (): boolean => {
    let disable = false;
    if (isEmployeeLoggedIn) {
      disable = !!!employeeLogin.salesRep.value;
    }

    return disable;
  };

  const ShippingHTML = (userShippingPrice: number) => {
    if (isEmployeeLoggedIn && currentPage === 'CHECKOUT') {
      const price = employeeLogin.shippingPrice.toFixed(2);

      return (
        <div
          className={`${
            storeCode !== CYXTERA_CODE && storeCode !== UNITI_CODE
              ? 'border-t border-gray-200'
              : ''
          }  flex items-center justify-between pt-[15px] pb-[10px]`}
        >
          <dt className='text-normal-text flex items-center tracking-normal pb-[10px]'>
            <span>Shipping</span>
          </dt>
          <dd className='text-normal-text tracking-normal'>
            <div className='form-group m-b-10 pl-[15px] relative max-w-[100px]'>
              <span className='absolute left-[0px] top-[12px] text-normal-text flex items-center tracking-normal'>
                $
              </span>
              <Formik
                key='shipping'
                initialValues={{ shipping: price }}
                onSubmit={(values) => {
                  update_CheckoutEmployeeLogin({
                    type: 'SHIPPING_PRICE',
                    value: +(+values.shipping).toFixed(2),
                  });
                }}
                enableReinitialize
              >
                {({ values, setFieldValue, submitForm }) => {
                  return (
                    <Form key='shipping'>
                      <input
                        className='border border-gray-border text-right focus:border-gray-border rounded w-full px-2 py-2'
                        value={values.shipping}
                        min={0}
                        name={'shipping'}
                        type={'number'}
                        onKeyDown={(e) =>
                          ['e', 'E', '+', '-', '.'].includes(e.key) &&
                          e.preventDefault()
                        }
                        onChange={(event) => {
                          if (Number(event.target.value) < 0)
                            return setFieldValue('shipping', 0);
                          setFieldValue('shipping', event.target.value);
                        }}
                        onBlur={() => {
                          setFieldValue(
                            'shipping',
                            Number(values.shipping).toFixed(2),
                          );
                          submitForm();
                        }}
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
      <div
        className={`${
          storeCode !== CYXTERA_CODE &&
          storeCode !== UNITI_CODE &&
          storeCode !== _Store_CODES.PKHG
            ? 'border-t border-gray-200 pt-[15px]'
            : ''
        }  flex items-center justify-between`}
      >
        <dt className='text-normal-text flex items-center'>
          <span>
            {storeCode === _Store_CODES.PKHG
              ? 'Shipping & Handling'
              : 'Shipping'}
          </span>
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
  const smallRunHtml = (userSmallRun: number) => {
    if (isEmployeeLoggedIn && currentPage === 'CHECKOUT') {
      const price =
        textOrNumberSmallRun === 'text' && employeeLogin.smallRunFee === 0
          ? 'FREE'
          : employeeLogin.smallRunFee.toFixed(2);
      return (
        <div className='flex items-center justify-between pt-[15px] pb-[10px]'>
          <dt className='text-normal-text flex items-center tracking-normal pb-[10px]'>
            <span>Small Run Fee</span>
          </dt>
          <dd className='text-normal-text tracking-normal'>
            <div className='form-group m-b-10 pl-[15px] relative max-w-[100px]'>
              <span className='absolute left-[0px] top-[12px] text-normal-text flex items-center tracking-normal'>
                $
              </span>
              <Formik
                key='smallRun'
                initialValues={{ smallRun: price }}
                onSubmit={(values, { setFieldValue }) => {
                  update_CheckoutEmployeeLogin({
                    type: 'SMALL_RUN_FEE',
                    value: +(+values.smallRun).toFixed(2),
                  });
                  if (+values.smallRun <= 0) {
                    setTextOrNumberSmallRun('text');
                    setFieldValue('smallRun', 'FREE');
                  } else {
                    setTextOrNumberSmallRun('number');
                  }
                }}
                enableReinitialize
              >
                {({ values, setFieldValue, submitForm }) => {
                  return (
                    <Form>
                      <input
                        className='border border-gray-border text-right focus:border-gray-border rounded w-full px-2 py-2'
                        value={values.smallRun}
                        name={'smallRun'}
                        min={0}
                        type={textOrNumberSmallRun}
                        onKeyDown={(e) =>
                          ['e', 'E', '+', '-', '.'].includes(e.key) &&
                          e.preventDefault()
                        }
                        onFocus={() => {
                          if (textOrNumberSmallRun === 'text') {
                            setFieldValue('smallRun', 0);
                            setTextOrNumberSmallRun('number');
                          }
                        }}
                        onChange={(event) => {
                          if (Number(event.target.value) < 0)
                            return setFieldValue('smallRun', 0);
                          setFieldValue('smallRun', event.target.value);
                        }}
                        onBlur={() => {
                          setFieldValue(
                            'smallRun',
                            Number(values.smallRun).toFixed(2),
                          );
                          submitForm();
                        }}
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
      <div className=' flex items-center justify-between pt-[15px] pb-[15px]'>
        <dt className='text-normal-text flex items-center'>
          <span>Small Run Fee</span>
        </dt>
        <dd className=''>
          {userSmallRun === 0 ? 'FREE' : <Price value={userSmallRun} />}
        </dd>
      </div>
    );
  };

  // console.log('selectedShipModel', selectedShipModel);

  const { code: storeCode } = useTypedSelector_v2((state) => state.store);
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.loggedIn,
  );

  return (
    <section className='w-full lg:w-4/12 md:w-5/12 pl-[15px] pr-[15px] mt-[15px]'>
      <div className='border border-gray-border p-[15px]'>
        <div className='w-full text-sub-text pt-[8px] pb-[8px]'>
          {__pagesText.CheckoutPage.orderSummary.OrderSummary}
        </div>
        <div className='w-full pl-[15px] pr-[15px] border-b border-gray-border mt-[10px] mb-[10px]'></div>
        <dl className='text-default-text'>
          {storeCode !== CYXTERA_CODE && storeCode !== UNITI_CODE && (
            <>
              <div className='flex items-center justify-between pt-[15px]'>
                <dt>{__pagesText.CheckoutPage.orderSummary.Merchandise}</dt>
                {/* <dt>{subTotal + discount}</dt> */}
                <Price value={merchandisePrice} />
              </div>
              <div className='flex items-center justify-between pt-[15px]'>
                <dt>{__pagesText.CheckoutPage.orderSummary.Discount}</dt>
                {/* <dt>{discount}</dt> */}
                -<Price value={merchandisePrice - subTotal} />
              </div>
            </>
          )}
          <div className='w-full pl-[15px] pr-[15px] border-gray-border'></div>
          <div className='flex items-center justify-between pt-[15px]'>
            <dt>{__pagesText.CheckoutPage.orderSummary.Subtotal}</dt>
            {/* <dt>{subTotal}</dt> */}
            <Price value={subTotal} />
          </div>
          {storeCode !== CYXTERA_CODE && storeCode !== UNITI_CODE && (
            <>
              {' '}
              <div className='flex items-center justify-between pt-[15px]'>
                <dt>{__pagesText.CheckoutPage.orderSummary.FirstLogo}</dt>
                {firstLogoPrice > 0 ? <Price value={firstLogoPrice} /> : 'FREE'}
              </div>
              {secondLogoPrice > 0 && (
                <div className='flex items-center justify-between pt-[15px]'>
                  <dt>{__pagesText.CheckoutPage.orderSummary.SecondLogo}</dt>
                  <Price value={secondLogoPrice} />
                </div>
              )}
              {totalLineCharges > 0 && (
                <div className='flex items-center justify-between pt-[15px]'>
                  <dt>
                    {__pagesText.CheckoutPage.orderSummary.LinePersonalization}
                  </dt>
                  <Price value={totalLineCharges} />
                </div>
              )}
              {smallRunHtml(smallRunFee ? smallRunFee : 0)}
            </>
          )}
          {ShippingHTML(getNewShippingCost(selectedShipModel?.price))}
          <div className='flex items-center justify-between pt-[15px]'>
            <dt>{__pagesText.CheckoutPage.orderSummary.Tax}</dt>
            <Price value={charges.salesTax} />
          </div>
          {(storeCode === CYXTERA_CODE || storeCode === UNITI_CODE) &&
          useBalance ? (
            <div className='flex items-center justify-between pt-[15px]'>
              <dt>{__pagesText.CheckoutPage.orderSummary.InternalCredit}</dt>
              -<Price value={creditBalance} />
            </div>
          ) : (
            <></>
          )}

          <div className='w-full pl-[15px] pr-[15px] border-b border-gray-border mt-[10px]'></div>
          <div className='flex items-center justify-between pt-[15px] mb-[30px]'>
            <dt className='font-semibold'>
              {__pagesText.CheckoutPage.orderSummary.EstimatedTotal}
            </dt>
            <dt className='font-semibold'>
              <Price
                value={
                  totalPrice +
                  getNewShippingCost(selectedShipModel?.price) +
                  getNewSmallRunFee(smallRunFeeCharge) +
                  charges.salesTax
                }
              />
            </dt>
          </div>

          {isEmployeeLoggedIn && <CO2_EL_Dropdowns />}

          {storeCode !== CYXTERA_CODE && storeCode !== UNITI_CODE && (
            <div className='mt-[16px]'>
              {__pagesText.CheckoutPage.orderSummary.CartSummarryInstruction.map(
                (text, index) => (
                  <div
                    key={`summary_${index}`}
                    className=' text-rose-600 mb-[10px]'
                  >
                    {text}
                  </div>
                ),
              )}
            </div>
          )}
          <div className='mt-[16px] mb-[16px]'>
            {currentpage === checkoutPages.reviewOrder && (
              <button
                className={`btn btn-lg !w-full text-center btn-primary mb-[8px] ${
                  disablePlaceOrder() ? 'opacity-50' : ''
                }`}
                disabled={disablePlaceOrder()}
                onClick={() => placeOrder(selectedShipModel)}
              >
                {__pagesText.CheckoutPage.placeOrder}
              </button>
            )}
          </div>
        </dl>
      </div>
    </section>
  );
};

export default OrderSummary;
