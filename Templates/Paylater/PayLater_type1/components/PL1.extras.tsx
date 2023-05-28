import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { _MyAcc_OrderBillingDetails } from '@definations/APIs/user.res';
import { useRouter } from 'next/router';

export const handleRedirect = (
  reason:
    | 'PAYMENT_ALREADY_DONE'
    | 'NO_ORDER_ID_FOUND'
    | 'UNEXPECTED_ERROR'
    | 'PAYMENT_COMPLETE',
) => {
  const router = useRouter();

  if (reason === 'PAYMENT_COMPLETE') {
    router.push(paths.myAccount.order_details);
    return;
  }

  if (reason === 'PAYMENT_ALREADY_DONE') {
    router.push(paths.HOME);
    return;
  }

  if (reason === 'NO_ORDER_ID_FOUND') {
    router.push(paths.HOME);
    return;
  }
  if (reason === 'UNEXPECTED_ERROR') {
    router.push(paths.HOME);
    return;
  }

  router.push(paths.HOME);
};

export const ShippingAddressHTML = (billing: _MyAcc_OrderBillingDetails) => {
  return (
    <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
      <div className='flex flex-wrap items-center justify-between pt-[10px] border-b border-[#ececec]'>
        <div className='pb-[10px] text-title-text'>
          {__pagesText.CheckoutPage.ShippingAddress}
        </div>
      </div>
      <div className='text-default-text mt-[10px]'>
        {billing?.shippingFirstName} {billing?.shippingLastName}
        <br />
        {billing?.shippingCompany}
        <br />
        {billing?.shippingAddress1}
        <br />
        {billing?.shippingAddress2 && billing?.shippingAddress2.trim() != '' ? (
          <>
            {billing?.shippingAddress2}
            <br />
          </>
        ) : (
          <></>
        )}
        {[
          billing?.shippingCity,
          billing?.shippingState,
          billing?.shippingZip,
        ].join(', ')}
        <br />
        {billing?.shippingCountry}
        <br />
        {billing?.shippingPhone}
      </div>
    </div>
  );
};

export const BillingAddressHTML = (billing: _MyAcc_OrderBillingDetails) => {
  return (
    <div className='pl-[15px] pr-[15px] pt-[15px] pb-[15px]'>
      <div className='flex flex-wrap items-center justify-between pt-[10px] border-b border-[#ececec]'>
        <div className='pb-[10px] text-title-text'>Billing Address</div>
      </div>
      <div className='text-default-text mt-[10px]'>
        {billing?.shippingFirstName} {billing?.shippingLastName}
        <br />
        {billing?.shippingCompany}
        <br />
        {billing?.shippingAddress1}
        <br />
        {billing?.shippingAddress2 && billing?.shippingAddress2.trim() != '' ? (
          <>
            {billing?.shippingAddress2}
            <br />
          </>
        ) : (
          <></>
        )}
        {[
          billing?.shippingCity,
          billing?.shippingState,
          billing?.shippingZip,
        ].join(', ')}
        <br />
        {billing?.shippingCountry}
        <br />
        {billing?.shippingPhone}
      </div>
    </div>
  );
};

import { CustomerAddress } from '@definations/APIs/user.res';

export type _PL1_AddEditInputFieldsName =
  | 'firstName'
  | 'lastName'
  | 'companyName'
  | 'address1'
  | 'address2'
  | 'city'
  | 'state'
  | 'zipcode'
  | 'country'
  | 'phoneNumber';

interface _Input {
  required: boolean;
  label: string;
  fullWidth: boolean;
  name: _PL1_AddEditInputFieldsName;
  type: 'text' | 'number';
}

interface _Select {
  required: boolean;
  label: string;
  fullWidth: boolean;
  name: _PL1_AddEditInputFieldsName;
  type: 'select';
  noOptionFound: string;
}

export const maxLengthCalculator = (
  name: string,
  value: string,
  defaultMax: number,
): number => {
  if (name === 'ccNumber') {
    return detectCardIssuer(value) === 'AMEX' ? 15 : 16;
  }
  return defaultMax;
};

export const detectCardIssuer = (cardNumber: string) => {
  let re = new RegExp('^4');

  if (cardNumber.match(re) != null) {
    return 'VISA';
  }

  if (
    /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
      cardNumber,
    )
  ) {
    return 'MASTERCARD';
  }

  re = new RegExp('^3[47]');
  if (cardNumber.match(re) != null) {
    return 'AMEX';
  }

  re = new RegExp(
    '^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)',
  );
  if (cardNumber.match(re) != null) {
    return 'DISCOVER';
  }

  return '';
};

export const initialMethod = (
  methods: 'individual_cards' | 'bulk_payment' | 'both',
): 'individual_cards' | 'bulk_payment' => {
  if (methods === 'both') {
    return 'individual_cards';
  }

  if (methods === 'individual_cards') {
    return 'individual_cards';
  }

  if (methods === 'bulk_payment') {
    return 'bulk_payment';
  }

  return 'individual_cards';
};

export const getYears = (yrsNumber: number) => {
  const currentYear = new Date().getFullYear();
  const years = new Array(yrsNumber).fill('').map((_, index) => ({
    id: currentYear + index,
    name: `${currentYear + index}`,
  }));

  return years;
};

export const ifNoStoredAddressFound = ({
  addresses,
  lookingFor,
}: {
  addresses: CustomerAddress[] | undefined;
  lookingFor: 'B' | 'S';
}): boolean => {
  let noAddressFound = false;
  if (addresses) {
    if (addresses.length === 0) {
      noAddressFound = true;
    }

    if (addresses.length > 0) {
      const addressExist = addresses.find(
        (address) => address.addressType === lookingFor,
      );

      if (!addressExist) {
        noAddressFound = true;
      }
    }
  }
  return noAddressFound;
};

export const PL1_addEditInputFields: Array<_Input | _Select> = [
  {
    required: false,
    label: 'First Name',
    fullWidth: true,
    name: 'firstName',
    type: 'text',
  },
  {
    required: false,
    label: `Last Name`,
    fullWidth: true,
    name: 'lastName',
    type: 'text',
  },
  {
    required: false,
    label: 'Company Name',
    fullWidth: true,
    name: 'companyName',
    type: 'text',
  },
  {
    required: false,
    label: 'Street Address',
    fullWidth: true,
    name: 'address1',
    type: 'text',
  },
  {
    required: false,
    label: 'Address 2',
    fullWidth: true,
    name: 'address2',
    type: 'text',
  },
  {
    required: false,
    label: 'City',
    fullWidth: true,
    name: 'city',
    type: 'text',
  },
  {
    required: false,
    label: 'State / Province',
    fullWidth: true,
    name: 'state',
    type: 'select',
    noOptionFound: 'No State Found',
  },
  {
    required: false,
    label: 'Zip Code',
    fullWidth: true,
    name: 'zipcode',
    type: 'text',
  },
  {
    required: false,
    label: 'Country',
    fullWidth: true,
    name: 'country',
    type: 'select',
    noOptionFound: 'No Country Found',
  },
  {
    required: false,
    label: 'Phone Number',
    fullWidth: true,
    name: 'phoneNumber',
    type: 'text',
  },
];
