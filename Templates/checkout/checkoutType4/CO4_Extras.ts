import { CustomerAddress } from '@definations/APIs/user.res';

export type _CO4_AddEditInputFieldsName =
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
  name: _CO4_AddEditInputFieldsName;
  type: 'text' | 'number';
}

interface _Select {
  required: boolean;
  label: string;
  fullWidth: boolean;
  name: _CO4_AddEditInputFieldsName;
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

  if (!cardNumber) {
    return '';
  }

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

export const CO4_addEditInputFields: Array<_Input | _Select> = [
  {
    required: false,
    label: 'First Name',
    fullWidth: false,
    name: 'firstName',
    type: 'text',
  },
  {
    required: false,
    label: `Last Name`,
    fullWidth: false,
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
    fullWidth: false,
    name: 'state',
    type: 'select',
    noOptionFound: 'No State Found',
  },
  {
    required: false,
    label: 'Zip Code',
    fullWidth: false,
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
