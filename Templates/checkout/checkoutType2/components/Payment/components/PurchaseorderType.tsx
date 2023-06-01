import { paymentProps } from '..';
import { useState } from 'react';
import NxtImage from '@appComponents/reUsable/Image';
import noImg from '@images/no.png';
import yesImg from '@images/yes.png';

const PurchaseOrderType: paymentProps = ({
  changeHandler,
  updatePaymentMethod,
  purchaseOrder,
}) => {
  const [showPO, setShowPO] = useState<Boolean>(false);
  const [numPO, setNumPO] = useState<string>(
    purchaseOrder ? purchaseOrder : '',
  );

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
          <div className='flex justify-between items-center'>
            <input
              type='text'
              onBlur={changeHandler}
              name='EnterPONumber'
              required={true}
              className='form-input !w-[calc(100%-40px)]'
              onFocus={() => setShowPO(true)}
              value={numPO}
              onChange={(e) => setNumPO(e.target.value)}
            />
            {numPO.length > 0 && (
              <div className='w-8 h-8'>
                <NxtImage
                  src={yesImg}
                  alt=''
                  className={''}
                  height={1}
                  isStatic={true}
                  width={1}
                />
              </div>
            )}
            {numPO.length == 0 && showPO ? (
              <div className='w-8 h-8'>
                <NxtImage
                  src={noImg}
                  alt=''
                  className={''}
                  height={1}
                  isStatic={true}
                  width={1}
                />
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderType;
