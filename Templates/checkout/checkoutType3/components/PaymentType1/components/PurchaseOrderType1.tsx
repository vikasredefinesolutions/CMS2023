import { paymentMethodCustom } from '@constants/enum';
import { paymentProps } from '..';

const PurchaseOrderType1: paymentProps = ({
  changeHandler,
  updatePaymentMethod,
}) => {
  return (
    <div id='PurchaseOrder'>
      <div className='flex justify-between items-center mt-[12px] mb-[12px] pb-[18px] border-b border-gray-border'>
        <div className='text-title-text font-semibold tracking-normal'>
          Payment
        </div>
        <div>
          <button
            className='!text-anchor hover:!text-anchor-hover underline'
            id='btn-use-credit-card'
            onClick={() => updatePaymentMethod(paymentMethodCustom.creditCard)}
          >
            Use Credit Card
          </button>
        </div>
      </div>
      <div className='relative z-0 w-full mb-[20px] border border-gray-border rounded'>
        <input
          onChange={changeHandler}
          name='EnterPONumber'
          placeholder=' '
          required={true}
          className='pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
        />
        <label
          htmlFor='EnterPONumber'
          className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
        >
          PO Number *
        </label>
      </div>
      <div className='text-base'>
        Please enter your PO Number. We will contact you to confirm details of
        your payment.
      </div>
    </div>
  );
};

export default PurchaseOrderType1;
