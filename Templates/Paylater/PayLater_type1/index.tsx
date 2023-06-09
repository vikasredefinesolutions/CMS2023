import { PaymentMethod } from '@constants/enum';
import { paths } from '@constants/paths.constant';
import { __SuccessErrorText } from '@constants/successError.text';
import {
  _MyAcc_OrderBillingDetails,
  _MyAcc_OrderProductDetails,
} from '@definations/APIs/user.res';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { _CartItem } from '@services/cart';
import { OrderModelPayment, UpdatePaymentLater } from '@services/user.service';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { ShippingAddressHTML } from './components/PL1.extras';
import PL1_BillingAddress from './components/PL1_BillingAddress';
import PL1_CartItem from './components/PL1_OrderItem';
import PL1_OrderSummary from './components/PL1_OrderSummary';
import AvailablePaymentMethods from './components/PL1_PaymentMethods';

interface _Props {
  templateId: number;
  orderDetails: {
    billing: _MyAcc_OrderBillingDetails | null;
    product: _MyAcc_OrderProductDetails[] | null;
  };
}

const PaylaterType1: React.FC<_Props> = ({ orderDetails }) => {
  const { setShowLoader, showModal } = useActions_v2();
  const orderNoteRef = useRef(null);
  const router = useRouter();

  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const [billingAddress, setBillingAddress] = useState({
    billingEqualsShipping: false,
    billingEmail: orderDetails.billing?.billingEmail || '',
    billingFirstName: orderDetails.billing?.billingFirstName || '',
    billingLastName: orderDetails.billing?.billingLastName || '',
    billingCompany: orderDetails.billing?.billingCompany || '',
    billingAddress1: orderDetails.billing?.billingAddress1 || '',
    billingAddress2: orderDetails.billing?.billingAddress2 || '',
    billingSuite: orderDetails.billing?.billingSuite || '',
    billingCity: orderDetails.billing?.billingCity || '',
    billingState: orderDetails.billing?.billingState || '',
    billingZip: orderDetails.billing?.billingZip || '',
    billingCountry: orderDetails.billing?.billingCountry || '',
    billingPhone: orderDetails.billing?.billingPhone || '',
  });

  const { payment } = useTypedSelector_v2((state) => state.checkout);

  const validatePaymentMethod = () => {
    if (payment.method === 'PURCHASE_ORDER') {
      if (payment.poNumber.length < 3) {
        showModal({
          title: 'Invalid PO Number',
          message: 'Please enter correct PO Number',
        });
        return true;
      }
    }

    if (payment.method === 'CREDIT_CARD') {
      const cardType = payment.creditCard.cardName;
      const cardLength = payment.creditCard.ccNumber.length;
      const cvvLength = payment.creditCard.securityCode.length;

      if (cardType === 'AMEX') {
        if (cardLength !== 15 || cvvLength !== 4) {
          showModal({
            title: 'Invalid Card',
            message: 'Please enter correct card details',
          });
          return true;
        }
        return false;
      }

      if (cardLength !== 16 || cvvLength !== 3) {
        showModal({
          title: 'Invalid Card',
          message: 'Please enter correct card details',
        });
        return true;
      }
    }
    return false;
  };

  const disablePlaceOrder = (): boolean => {
    if (payment.method === 'PURCHASE_ORDER') {
      if (payment.poNumber.length < 3) {
        return true;
      }
    }

    if (payment.method === 'CREDIT_CARD') {
      const cardType = payment.creditCard.cardName;
      const cardLength = payment.creditCard.ccNumber.length;
      const cvvLength = payment.creditCard.securityCode.length;

      if (cardType === 'AMEX') {
        if (cardLength !== 15 || cvvLength !== 4) {
          return true;
        }
      }

      if (cardLength !== 16 || cvvLength !== 3) {
        return true;
      }
    }

    return false;
  };

  const getPaymentMethod = (method: 'CREDIT_CARD' | 'PURCHASE_ORDER') => {
    if (method === 'CREDIT_CARD') {
      return PaymentMethod.CREDITCARD;
    }

    if (method === 'PURCHASE_ORDER') {
      return PaymentMethod.PREPAYMENT;
    }
    return '';
  };

  const getPaymentGateway = (
    method: 'CREDIT_CARD' | 'PURCHASE_ORDER',
  ): string => {
    if (method === 'CREDIT_CARD') {
      return PaymentMethod.CHARGELOGIC;
    }

    if (method === 'PURCHASE_ORDER') {
      return PaymentMethod.PREPAYMENT;
    }
    return '';
  };

  const handleRedirect = (
    reason: 'UNEXPECTED_ERROR' | 'PAYMENT_COMPLETE',
    orderId?: number,
  ) => {
    if (reason === 'PAYMENT_COMPLETE') {
      router.push(paths.THANK_YOU + `?orderNumber=${orderId}`);
      return;
    }

    if (reason === 'UNEXPECTED_ERROR') {
      router.push(paths.HOME);
      return;
    }

    router.push(paths.HOME);
  };

  const makePaymentHandler = async () => {
    if (validatePaymentMethod()) return;
    setShowLoader(true);

    const payload: OrderModelPayment = {
      id: orderDetails.billing!.id,
      isCreditLimit: false,
      storeID: storeId,
      email: orderDetails.billing?.email || '',
      paymentGateway: getPaymentMethod(payment.method),

      // BILLING
      ...billingAddress,

      // PAYMENT
      paymentMethod: getPaymentGateway(payment.method),
      cardName: payment.creditCard.cardName,
      cardType: payment.creditCard.cardName,
      cardNumber: payment.creditCard.ccNumber,
      cardVarificationCode: payment.creditCard.securityCode,
      cardExpirationMonth: payment.creditCard.month,
      cardExpirationYear: payment.creditCard.year,
      poNumber: payment.poNumber,
    };

    await UpdatePaymentLater({
      orderModelPayment: payload,
    })
      .then(() => {
        handleRedirect('PAYMENT_COMPLETE', orderDetails.billing?.id);
      })
      .catch((error) => {
        console.log('ERROR ===>', error);
        showModal({
          message: __SuccessErrorText.SomethingWentWrong,
          title: 'ERROR',
        });
      })
      .finally(() => {
        setShowLoader(false);
      });
  };

  return (
    <>
      <div className='container mx-auto pl-[15px] pr-[15px] mt-[20px] mb-[50px] '>
        <div className='flex flex-wrap justify-between -mx-[15px]'>
          <div className='w-full md:w-8/12 lg:w-[72%] pl-[15px] pr-[15px] checkoutpage'>
            <div id='OrderReview'>
              <section className='w-full'>
                <div className='flex flex-wrap checkout-box ml-[-15px] mr-[-15px]'>
                  <div className='flex w-full md:w-4/12 mt-[15px] pl-[15px] pr-[15px] mb-[30px]'>
                    {ShippingAddressHTML(orderDetails.billing!)}
                  </div>
                  <div className='flex w-full md:w-4/12 mt-[15px] pl-[15px] pr-[15px] mb-[30px] checkoutpage'>
                    <div className=''>
                      <div className='flex flex-wrap items-center justify-between pt-[10px] border-b border-[#ececec]'>
                        <div className='pb-[10px] text-title-text'>
                          Billing Address
                        </div>
                      </div>
                      <PL1_BillingAddress
                        billing={billingAddress}
                        setBillingAddress={setBillingAddress}
                      />
                    </div>
                  </div>
                  <div className=' flex w-full md:w-4/12 mt-[15px] pl-[15px] pr-[15px] mb-[30px]'>
                    <AvailablePaymentMethods
                      allowPO={orderDetails.billing?.isAllowPo || false}
                    />
                  </div>
                </div>
              </section>
              <div className='mb-[12px] mt-[16px]'>
                <hr />
              </div>
              <PL1_CartItem
                isRemovable={false}
                isEditable={false}
                availableFont={[]}
                availableLocation={[]}
                availableColor={[]}
                cartItems={orderDetails.product as unknown as _CartItem[]}
              />
            </div>
          </div>
          <div className='w-full md:w-4/12 lg:w-[27%] pl-[15px] pr-[15px]'>
            <PL1_OrderSummary
              shippingCost={orderDetails.billing?.orderShippingCosts || 0}
              totalPrice={orderDetails.billing?.orderTotal || 0}
              subTotal={orderDetails.billing?.orderSubtotal || 0}
              logoSetupCharges={orderDetails.billing?.orderLogoSetupFee || 0}
              smallRunFee={orderDetails.billing?.orderSmallRunFee || 0}
              salesTax={orderDetails.billing?.orderTax || 0}
              totalLogoCharges={orderDetails.billing?.logoFinalTotal || 0}
              totalLineCharges={orderDetails.billing?.lineFinalTotal || 0}
            />
            <div id='OrderNoteDiv mt-[20px]'>
              <div className='text-sub-text font-bold &nbsp;trsacking-normal mb-[5px]'>
                <label>Add a note to your order</label>
              </div>
              <div className='form-group mb-[10px]'>
                <textarea
                  className='border border-gray-border rounded pt-[12px] pb-[12px] pl-[12px] pr-[12px] w-full text-sub-text'
                  rows={3}
                  id='txtOrderNotes'
                  ref={orderNoteRef}
                />
              </div>
            </div>

            <div className=''>
              <button
                className={`btn btn-lg !w-full text-center btn-secondary mb-[8px] ${
                  disablePlaceOrder() ? 'opacity-50' : ''
                }`}
                id='btn-review-order'
                onClick={() => makePaymentHandler()}
              >
                MAKE PAYMENT
              </button>{' '}
            </div>
            <div className='mt-4 bg-light-gray px-4 py-4'>
              <div className='flex items-center justify-center'>
                <img
                  src='/order-risk-free-icon.jpg'
                  alt=''
                  className='mr-2 w-5 h-5'
                />
                <span className='text-2xl font-semibold'>Order Risk-Free!</span>
              </div>
              <div className='flex items-center justify-center text-base text-center mt-3 font-semibold'>
                Cancel your order without penalty anytime before your proof is
                approved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaylaterType1;
