import { useTypedSelector_v2 } from '@hooks_v2/index';
import { paymentProps } from '..';

const PurchaseOrderType1: paymentProps = ({
  changeHandler,
  updatePaymentMethod,
  purchaseOrder,
}) => {
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => !!state.employee.empId,
  );
  const { el: employeeLogin } = useTypedSelector_v2((state) => state.checkout);

  return (
    <div id='PurchaseOrder'>
      <div
        className={`relative z-0 w-full mb-[20px] border border-gray-border rounded ${
          employeeLogin.isPaymentPending ? 'opacity-50' : ''
        }`}
      >
        <input
          onChange={changeHandler}
          name='EnterPONumber'
          placeholder=' '
          required={true}
          disabled={employeeLogin.isPaymentPending}
          className='pt-[15px] pb-[0px] block w-full px-[8px] h-[48px] mt-[0px] text-sub-text text-[18px] text-[#000000] bg-transparent border-0 appearance-none focus:outline-none focus:ring-0'
          defaultValue={purchaseOrder ? purchaseOrder : ''}
        />
        <label
          htmlFor='EnterPONumber'
          className='left-[8px] absolute duration-300 top-[11px] -z-1 origin-0 text-[#000000] text-[18px]'
        >
          PO Number
        </label>
      </div>
      <div
        className={`text-base hidden  ${
          employeeLogin.isPaymentPending ? 'opacity-50' : ''
        }`}
      >
        Please enter your PO Number. We will contact you to confirm details of
        your payment.
      </div>
    </div>
  );
};

export default PurchaseOrderType1;
