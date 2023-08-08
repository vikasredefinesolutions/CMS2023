import { useTypedSelector_v2 } from 'hooks_v2';
import React from 'react';
import { _PriceProps } from './reUsable.d';

const Price: React.FC<_PriceProps> = ({ value, prices, addColon = false }) => {
  let priceToDisplay = 0;

  const currency = useTypedSelector_v2((state) => state.store.currency);
  const loggedIn = useTypedSelector_v2((state) => state.user.id);

  const { storeTypeName } = useTypedSelector_v2((state) => state.store);
  if (value) {
    priceToDisplay = +value;
  }

  if (prices) {
    priceToDisplay = +prices.msrp;
    if (loggedIn && prices?.salePrice < prices?.msrp) {
      priceToDisplay = +prices.salePrice;
    }
    if (
      storeTypeName === 'Store Builder Store' ||
      storeTypeName === 'Corporate Store'
    ) {
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
