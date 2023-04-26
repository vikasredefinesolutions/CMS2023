import { paymentProps } from '..';

const PurchaseOrderType3: paymentProps = ({ changeHandler }) => {
  return (
    <div id='PurchaseOrder'>
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
          PO Number
        </label>
      </div>
    </div>
  );
};

export default PurchaseOrderType3;
