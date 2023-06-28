import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { FetchSbStorePlayerInformation } from '@services/sb.service';
import { CO6_Input } from '@templates/checkout/checkoutType6/Components/CO6_Inputs';
import { FormikErrors, FormikTouched } from 'formik';
import React, { useEffect, useState } from 'react';

interface _CO6_PlayerFields {
  firstName: string;
  lastName: string;
  number: string;
}

interface _Props {
  values: _CO6_PlayerFields;
  handleChange(e: React.ChangeEvent<any>): void;
  handleBlur(e: React.FocusEvent<any, Element>): void;
  touched: FormikTouched<_CO6_PlayerFields>;
  errors: FormikErrors<_CO6_PlayerFields>;
  readOnly: boolean;
}

const CO6_PlayerInformation: React.FC<_Props> = ({
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
  readOnly,
}) => {
  const { update_CheckoutCustomInformation } = useActions_v2();
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const [player, setPlayer] = useState<{
    firstName: string;
    lastName: string;
    number: string;
  } | null>(null);

  const fetchPlayerInformation = async () => {
    await FetchSbStorePlayerInformation(storeId)
      .then((response) => {
        if (!response) return;
        update_CheckoutCustomInformation({
          type: 'PO_NUMBER_TO_MATCH',
          value: response.poNumber,
        });

        if (response.playerFirstName.length === 0) return;
        update_CheckoutCustomInformation({
          type: 'VALIDATE_PLAYER',
          value: true,
        });
        setPlayer({
          firstName: response.playerFirstName || '',
          lastName: response.playerLastName || '',
          number: response.playerNo || '',
        });
      })
      .catch(() => {})
      .finally(() => {});
  };

  useEffect(() => {
    fetchPlayerInformation();
  }, []);

  if (!player?.firstName) return null;

  return (
    <div className='bg-light-gray w-full mb-[30px] opacity-100'>
      <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
        <div className='pt-[10px] border-b border-[#ececec]'>
          <div className='pb-[10px] text-title-text'>Player Information</div>
        </div>
        <div className='text-default-text text-[#84694d] mt-[10px] mb-[20px]'>
          All Fields marked * are required fields.
        </div>
        <div className='flex flex-wrap ml-[-15px] mr-[-15px]'>
          <CO6_Input
            label={
              player?.firstName ? `${player.firstName} First Name` : 'First Name'
            }
            additionalClass={'md:w-6/12'}
            type={'text'}
            name={'firstName'}
            required={true}
            readonly={readOnly}
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={!!touched.firstName}
            error={errors?.firstName ? errors.firstName : null}
          />
          <CO6_Input
            label={
              player?.lastName ? `${player.lastName} Last Name` : 'Last Name'
            }
            additionalClass={'md:w-6/12'}
            type={'text'}
            name={'lastName'}
            required={true}
            readonly={readOnly}
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={!!touched.lastName}
            error={errors?.lastName ? errors.lastName : null}
          />
          <CO6_Input
            label={player?.number ? `${player.number} No` : 'No'}
            additionalClass={'md:w-6/12'}
            type={'text'}
            readonly={readOnly}
            name={'number'}
            required={false}
            value={values.number}
            onChange={handleChange}
            onBlur={handleBlur}
            error={null}
            touched={false}
          />
        </div>
      </div>
    </div>
  );
};
export default CO6_PlayerInformation;
