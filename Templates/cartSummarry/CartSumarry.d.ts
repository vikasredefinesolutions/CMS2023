/* eslint-disable no-unused-vars */
export type CartSummarryProps = {
  couponInputChangeHandler: (arg: string) => void;
  couponSubmitHandler: () => void;
  showApplyButton: boolean;
  coupon: string;
};

export interface CS_Templates {
  type1: FC<CartSummarryProps>;
  type2: FC<CartSummarryProps>;
  type3: FC<CartSummarryProps>;
}
