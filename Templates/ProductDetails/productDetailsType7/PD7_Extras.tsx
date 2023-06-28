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
