import NxtImage from '@appComponents/reUsable/Image';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import noImg from '@images/no.png';
import yesImg from '@images/yes.png';
import { useState } from 'react';
import { paymentProps } from '..';

const PurchaseOrderType: paymentProps = ({
  changeHandler,
  updatePaymentMethod,
  purchaseOrder,
}) => {
  const [showPO, setShowPO] = useState<Boolean>(false);
  const [numPO, setNumPO] = useState<string>(
    purchaseOrder ? purchaseOrder : '',
  );

  const { el: employeeLogin } = useTypedSelector_v2((state) => state.checkout);

  return (
    <div id='PurchaseOrder'>
      <div
        className={`ml-[-15px] mr-[-15px] w-full ${
          employeeLogin.isPaymentPending ? 'hidden' : ''
        }`}
      >
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
              maxLength={10}
              type='text'
              onBlur={(e) =>
                changeHandler({
                  name: e.target.name,
                  value: e.target.value,
                })
              }
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
