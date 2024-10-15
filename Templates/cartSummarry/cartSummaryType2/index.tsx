import Price from '@appComponents/reUsable/Price';
import {
  BACARDI,
  PKHG_MINIMUM_QTY,
  SIMPLI_SAFE_CODE,
  UCA,
  _Store_CODES,
} from '@constants/global.constant';
import { thirdPartyLoginService } from '@constants/pages.constant';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { _shippingMethod } from '@controllers/checkoutController';
import SummarryController from '@controllers/summarryController';
import { punchoutCheckout } from '@services/checkout.service';

import {
  GetCartTotals,
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
} from 'hooks_v2';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

interface _props {
  selectedShippingModel: _shippingMethod;
}

const CartSummarryType2: FC<_props> = ({ selectedShippingModel }) => {
  const router = useRouter();
  const { showModal } = useActions_v2();

  const isEmployeeLoggedIN = useTypedSelector_v2(
    (state) => !!state.employee.empId,
  );
  const { id: loggedIn } = useTypedSelector_v2((state) => state.user);
  const couponDetails = useTypedSelector_v2((state) => state.cart.discount);
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
  const {
    coupon,
    successMessage,
    setCoupon,
    applyCouponHandler,
    removeCouponCodeHandler,
  } = SummarryController();
  const cartItems = useTypedSelector_v2((state) => state.cart.cart);
  const customerId = GetCustomerId();

  const [showCheckoutButton, setShowCheckoutButton] = useState(true);

  useEffect(() => {
    const service = localStorage.getItem('thirdPartyServices');
    if (service === thirdPartyLoginService.punchoutLogin) {
      setShowCheckoutButton(false);
    }
  }, []);

  const couponAmt = couponDetails?.amount || 0;
  const calculateSubTotal = () => {
    let subTotal = 0;
    if (!cartItems) return 0;

    cartItems.forEach((item) => {
      subTotal += item.totalPrice + item.totalCustomFieldsCharges;
    });

    return subTotal;
  };
  const calculateCouponAmount = () => {
    const subTotal = calculateSubTotal();

    if (couponAmt > subTotal) {
      return subTotal;
    }

    return couponAmt;
  };
  const cost = {
    subTotal: calculateSubTotal(),
    couponDiscount: calculateCouponAmount(),

    totalToShow: function () {
      const toAdd = this.subTotal;
      const toSubtract = this.couponDiscount;

      const estimated = toAdd - toSubtract;
      return estimated > 0 ? estimated : 0;
    },
  };

  const postData = (path: string, params: { [key: string]: string }) => {
    var bodyFormData = new FormData();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        bodyFormData.append(key, params[key]);
      }
    }
    const returnUrl = localStorage.getItem('returnUrl');
    console.log(returnUrl);

    fetch(path || '', {
      method: 'POST',
      body: bodyFormData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    fetch(returnUrl || '', {
      method: 'POST',
      body: bodyFormData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // let config = {
    //   method: 'post',
    //   maxBodyLength: Infinity,
    //   url: returnUrl || '',
    //   withCredentials: true,
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'POST',
    //     'Access-Control-Allow-Credentials': true,
    //     "Content-Type": "application/json",
    //     'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    //   },
    //   data: bodyFormData,
    // };

    // axios
    //   .request(config)
    //   .then((response: any) => {
    //     console.log(JSON.stringify(response.data));
    //   })
    //   .catch((error: any) => {
    //     console.log(error);
    //   });

    // axios({
    //   method: 'post',
    //   url: path,
    //   data: bodyFormData,
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     'Access-Control-Allow-Origin': '*',
    //   },
    // })
    //   .then((response: any) => console.log(response))
    //   .catch((error: any) => console.error(error));
    // document.body.appendChild(hidden_form);
    // hidden_form.submit();
  };

  const punchoutHandler = async () => {
    const SID = localStorage.getItem('P_SID');
    if (SID) {
      const sessionId = atob(SID);
      const punchoutResponse = await punchoutCheckout({
        sessionId,
        customerId,
      });
      console.log(punchoutResponse);
      postData(punchoutResponse.actionUrl, {
        'cxml-urlencoded': punchoutResponse.cartXml,
        Aribauser: 'AribaUser',
      });
    }
  };

  return (
    <>
      <div className='border border-gray-border p-[15px]'>
        <div className='w-full text-sub-text pt-[8px] pb-[8px]'>
          {__pagesText.CheckoutPage.orderSummary.OrderSummary}
        </div>
        <div className='w-full pl-[15px] pr-[15px] border-b border-gray-border mt-[10px] mb-[10px]'></div>
        <dl className='text-default-text'>
          {storeCode !== SIMPLI_SAFE_CODE &&
            storeCode !== UCA &&
            storeCode !== _Store_CODES.USAAPUNCHOUT &&
            storeCode !== BACARDI && (
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
          {storeCode !== SIMPLI_SAFE_CODE &&
            storeCode !== UCA &&
            storeCode !== _Store_CODES.USAAPUNCHOUT &&
            storeCode !== BACARDI && (
              <div className='flex items-center justify-between pt-[15px]'>
                <dt className=''>
                  <span>First Logo</span>
                </dt>
                <dd className=''>
                  {firstLogoPrice > 0 ? (
                    <Price value={firstLogoPrice} />
                  ) : (
                    'FREE'
                  )}
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

          {couponDetails?.amount != 0 &&
            couponDetails?.amount != undefined &&
            (storeCode == SIMPLI_SAFE_CODE ||
              storeCode == UCA ||
              storeCode === _Store_CODES.USAAPUNCHOUT) && (
              <div className='flex items-center justify-between pt-[10px] pb-[20px]'>
                <dt className='text-base'>
                  Promo{' '}
                  <span
                    className='text-anchor cursor-pointer'
                    onClick={() => removeCouponCodeHandler()}
                  >
                    (Remove)
                  </span>
                </dt>
                <dd className='text-base font-medium text-gray-900 '>
                  - <Price value={couponDetails?.amount} />
                </dd>
              </div>
            )}
          <div className='w-full pl-[15px] pr-[15px] border-b border-gray-border mt-[10px]'></div>
          <div className='flex items-center justify-between pt-[15px] mb-[30px]'>
            <dt className='font-bold'>
              <span>Estimated Total</span>
            </dt>
            <dd className='font-bold'>
              <Price value={cost.totalToShow()} />
            </dd>
          </div>
          <div className=''>
            {loggedIn && (
              <div className='mt-[16px]'>
                {showCheckoutButton ? (
                  <button
                    type='button'
                    onClick={() => {
                      if (
                        !isEmployeeLoggedIN &&
                        totalQty < PKHG_MINIMUM_QTY &&
                        storeCode !== SIMPLI_SAFE_CODE &&
                        storeCode !== UCA &&
                        storeCode !== _Store_CODES.USAAPUNCHOUT &&
                        storeCode !== BACARDI
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
                    className={`btn btn-lg btn-${
                      storeCode === SIMPLI_SAFE_CODE ||
                      storeCode === UCA ||
                      storeCode === _Store_CODES.USAAPUNCHOUT ||
                      storeCode === BACARDI
                        ? 'secondary'
                        : 'primary'
                    } w-full !flex flex-wrap justify-center items-center `}
                  >
                    CHECKOUT NOW
                  </button>
                ) : (
                  <button
                    onClick={punchoutHandler}
                    className={`btn btn-lg btn-${
                      storeCode === SIMPLI_SAFE_CODE ||
                      storeCode === UCA ||
                      storeCode === _Store_CODES.USAAPUNCHOUT ||
                      storeCode === BACARDI
                        ? 'secondary'
                        : 'primary'
                    } w-full !flex flex-wrap justify-center items-center `}
                  >
                    <span className='material-icons text-lg mr-[2px]'>
                      shopping_cart
                    </span>
                    PUNCHOUT CHECKOUT
                  </button>
                )}
              </div>
            )}
          </div>
        </dl>
      </div>
    </>
  );
};

export default CartSummarryType2;
