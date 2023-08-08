import { _OtherImage, _ProductColor } from '@definations/APIs/colors.res';
import { _SbProductCustomField } from '@services/sb.service';
import * as Yup from 'yup';
import { RequiredStringSchema } from 'yup/lib/string';
import { AnyObject } from 'yup/lib/types';

export const convertIntoValidtionSchema = (
  cFields: _SbProductCustomField[] | null,
) => {
  if (!cFields) return Yup.object().shape({});

  const schema: Record<
    string,
    RequiredStringSchema<string | undefined, AnyObject>
  > = {};

  cFields.forEach((cField) => {
    if (cField.isRequired) {
      schema[cField.name] = Yup.string().trim().required();
      return;
    }
  });

  return Yup.object().shape(schema);
};

export const convertIntoInitialValues = (
  cFields: _SbProductCustomField[] | null,
): Record<string, string> => {
  if (!cFields) return {};

  const initialValues: Record<string, string> = {};

  cFields.forEach((cField) => {
    initialValues[cField.name] = '';
  });

  return initialValues;
};

export const initialActiveImage = ({
  colors,
  color,
}: {
  colors?: _ProductColor[] | null;
  color?: _ProductColor | null;
}): _OtherImage | null => {
  if (color) {
    return color.moreImages.length > 0 ? color.moreImages[0] : null;
  }

  // More than one color
  if (colors && colors?.length > 0) {
    return colors[0]?.moreImages && colors[0].moreImages.length > 0
      ? colors[0].moreImages[0]
      : null;
  }
  return null;
};
