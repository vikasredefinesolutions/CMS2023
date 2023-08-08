import React from 'react';

interface props {
  setReferralRecipient: (args: string) => void;
}
export const ReferralForm: React.FC<props> = ({ setReferralRecipient }) => {
  return (
    <div className='relative z-0 w-full mb-[20px]  rounded mb-[20px] last:mb-[0px]'>
      <label className='mb-[4px] text-normal-text'>
        Were you referred to us? If so, please enter their full name?
      </label>
      <div className='mb-[15px] w-full md:w-6/12 '>
        <div className='flex flex-wrap justify-between items-center'>
          <input
            name='firstname'
            placeholder=' '
            className='form-input !w-[calc(100%-40px)]'
            onChange={(e) => {
              setReferralRecipient(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};
