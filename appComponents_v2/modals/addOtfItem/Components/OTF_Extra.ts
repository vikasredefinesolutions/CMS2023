import { OTFItemValidation } from '@constants/validationMessages';
import { OTFAddResponse } from '@definations/APIs/otf.res';
import { addOtfItem } from '@services/otfItems.service';
import * as Yup from 'yup';

type _InputNames = 'ourSKU' | 'name' | 'color' | 'size' | 'qty' | 'price';

type _SelectNames = 'otfItemNo' | 'otfItemVariant';

interface _Input {
  label: string;
  placeHolder: string;
  name: _InputNames;
  type: 'text' | 'number';
  required: boolean;
}

interface _Select {
  label: string;
  placeHolder: string;
  name: _SelectNames;
  type: 'select';
  required: boolean;
  noOptionFound: string;
}

export const _OTF_Fields: Array<_Input | _Select> = [
  {
    label: 'OTF Item No.',
    placeHolder: 'Select OTF Item No',
    name: 'otfItemNo',
    type: 'select',
    required: false,
    noOptionFound: 'No OTF Item number Found',
  },
  {
    label: 'OTF Variant Code',
    placeHolder: 'Select OTF Item Variant',
    name: 'otfItemVariant',
    type: 'select',
    required: false,
    noOptionFound: 'No OTF Item Variant Found',
  },
  {
    label: `SKU`,
    placeHolder: '',
    name: 'ourSKU',
    type: 'text',
    required: false,
  },
  {
    label: `Name`,
    placeHolder: '',
    name: 'name',
    type: 'text',
    required: false,
  },
  {
    label: `Color`,
    placeHolder: '',
    name: 'color',
    type: 'text',
    required: false,
  },

  {
    label: `Size`,
    placeHolder: '',
    name: 'size',
    type: 'text',
    required: false,
  },
  {
    label: `Qty`,
    placeHolder: '',
    name: 'qty',
    type: 'number',
    required: false,
  },
  {
    label: `Price`,
    placeHolder: '',
    name: 'price',
    type: 'number',
    required: false,
  },
];

export interface _OTF_InitialValues {
  otfItemNo: string;
  otfItemVariant: string;
  ourSKU: string;
  name: string;
  color: string;
  size: string;
  price: string;
  qty: string;
}

export const OTF_InitialValues = {
  otfItemNo: '',
  otfItemVariant: '',
  ourSKU: '',
  name: '',
  color: '',
  size: '',
  price: '',
  qty: '',
};

export const OTF_ValidationSchema = Yup.object().shape({
  otfItemNo: Yup.string().required(OTFItemValidation.otfItemNo.required),
  otfItemVariant: Yup.string().required(
    OTFItemValidation.otfItemVariant.required,
  ),
  ourSKU: Yup.string().required(OTFItemValidation.ourSKU.required),
  name: Yup.string().required(OTFItemValidation.name.required),
  price: Yup.number().required(OTFItemValidation.price.required),
  qty: Yup.string().required(OTFItemValidation.qty.required),
});

export const addOTFItemToStore = async (
  storeId: number,
  values: _OTF_InitialValues,
  fileURL: string,
): Promise<OTFAddResponse> => {
  const sizes = values.size.split(',');
  const qtys = values.qty.split(',');

  let sizesToSend: { attributeOptionId: number; name: string }[] = [];
  let qtysToSend: number[] = [];
  let colorToSend: string = 'OTFColor';

  if (values.color.length >= 1) {
    colorToSend = values.color;
  }

  if (values.size.length === 0) {
    // if empty string
    sizesToSend = [{ attributeOptionId: 0, name: 'OTFSize' }];
    qtysToSend = [+qtys[0]];
  }

  if (values.size.length > 0 && qtys.length > 0) {
    sizes.forEach((res, index) => {
      sizesToSend[index] = {
        attributeOptionId: 0,
        name: res.trim(),
      };

      if (qtys.length > index) {
        qtysToSend[index] = +qtys[index];
      } else {
        qtysToSend[index] = 0;
      }
    });
  }

  const response = await addOtfItem({
    addOTFItemModel: {
      storeId: storeId,
      otfItemNo: values.otfItemNo,
      otfItemVariant: values.otfItemVariant,
      ourSKU: values.ourSKU,
      name: values.name,
      price: values.price,
      qty: qtysToSend,

      // Optional fields
      color: colorToSend,
      size: sizesToSend,
      imagePath: fileURL,

      // Static values
      id: 0,
      colorOptionId: 0,
    },
  });

  return response;
};

export const calculateTotals = ({
  qty,
  responsePrice,
}: {
  qty: number[];
  responsePrice: number;
}): {
  totalQty: number;
  totalPrice: number;
} => {
  const totalQty = qty.reduce((prev, newQty) => {
    return newQty + prev;
  }, 0);

  const totalPrice = responsePrice * totalQty;

  return {
    totalPrice: totalPrice,
    totalQty: totalQty,
  };
};
