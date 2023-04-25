import { paymentMethodCustom } from '@constants/enum';
import { paymentProps } from '..';

const PurchaseOrderType: paymentProps = ({
  changeHandler,
  updatePaymentMethod,
}) => {
  return (
    <div id='PurchaseOrder'>
      <div className=' ml-[-15px] mr-[-15px] w-full'>
        <div className='mb-[15px] w-full pl-[15px] pr-[15px]'>
          <label
            htmlFor='creditCardHolder'
            className='mb-[4px] text-normal-text'
          >
            PLEASE ENTER YOUR PO NUMBER.WE WILL CONTACT YOU TO CONFIRM DETAILS
            OF YOUR PAYMENT AFTER THE ORDER HAS BEEN RECEIVED.:*
          </label>
          <div className='justify-between items-center'>
            <input
              type='text'
              onChange={changeHandler}
              name='EnterPONumber'
              required={true}
              className='form-input !w-[calc(100%-40px)]'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderType;
