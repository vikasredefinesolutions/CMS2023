import { useTypedSelector_v2 } from 'hooks_v2';
import React from 'react';

interface _props {
  value: number | string | undefined;
  prices?: { msrp: number; salePrice: number };
  addColon?: boolean;
}

const Price: React.FC<_props> = ({ value, prices, addColon = false }) => {
  let priceToDisplay = 0;

  const currency = useTypedSelector_v2((state) => state.store.currency);
  const loggedIn = useTypedSelector_v2((state) => state.user.loggedIn);

  if (value) {
    priceToDisplay = +value;
  }

  if (prices) {
    priceToDisplay = +prices.msrp;
    if (loggedIn && prices?.salePrice < prices?.msrp) {
      priceToDisplay = +prices.salePrice;
    }
  }

  if (isNaN(priceToDisplay)) {
    priceToDisplay = 0;
  }

  const toShow = priceToDisplay.toFixed(2);

  if (addColon) {
    return <>{`: ${currency}${toShow}`}</>;
  }

  return <>{`${currency}${toShow}`}</>;
};

export default Price;
