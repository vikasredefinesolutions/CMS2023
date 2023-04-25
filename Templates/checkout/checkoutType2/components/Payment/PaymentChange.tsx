import NxtImage from '@appComponents/reUsable/Image';
import { paymentMethodCustom } from '@constants/enum';
import { paymentProps } from '@templates/checkout/checkoutType1/components/PaymentType1';

const PaymentChange: paymentProps = ({
  updatePaymentMethod,
  changeHandler,
  detectCardType,
}) => {
  return (
    <>
      <div className='flex justify-between flex-wrap items-center mt-[12px]  flex-wrap'>
        <div className='mb-[15px] w-full'>
          <button
            className='bg-[#ffffff] flex items-center font-semibold text-normal-text pl-[10px] pr-[10px] pb-[10px] pt-[10px] border border-[#000000]'
            onClick={() => updatePaymentMethod(paymentMethodCustom.creditCard)}
          >
            <span className='mr-[10px]'>
              <NxtImage
                className=''
                alt='credit card'
                src={'/images/cards.jpg'}
              />
            </span>
            <span>SELECT CREDIT CARD</span>
          </button>
        </div>
        <div className='mb-[15px]'>
          <button
            className='bg-[#ffffff] flex flex-wrap items-center font-semibold text-normal-text pl-[10px] pr-[10px] pb-[10px] pt-[10px] border border-[#000000]'
            onClick={() =>
              updatePaymentMethod(paymentMethodCustom.purchaseOrder)
            }
          >
            <span className='mr-[10px]'>
              <NxtImage
                className=''
                alt='credit card'
                src={'/images/cards.jpg'}
              />
            </span>
            <span>SELECT PURCHASE ORDER</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentChange;
