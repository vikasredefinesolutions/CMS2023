/* eslint-disable no-unused-vars */
import { FC } from 'react';

type _CartProps = {
  isRemovable: boolean;
  isEditable: boolean;
  availableFont: [] | PersonalizationFont[];
  availableLocation: [] | PersonalizationLocation[];
  availableColor: [] | PersonalizationColor[];
};

type checkoutProps = {
  isRemovable: false;
};

export type CI_Props = _CartProps | checkoutProps;

export interface CI_Templates {
  type1: FC<_CartProps>;
  type2: FC<_CartProps>;
  type3: FC<_CartProps>;
  type4: FC<_CartProps>;
  type5: FC<_CartProps>;
}
