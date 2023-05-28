import {
  PersonalizationColor,
  PersonalizationFont,
  PersonalizationLocation,
  _CartItem,
} from '@services/cart';
import CI1_Item from '@templates/cartItem/CartItem_Type1/Components/CI1_Item';
import React from 'react';

interface _Props {
  cartItems: _CartItem[];
  isRemovable: boolean;
  isEditable: boolean;
  availableFont: [] | PersonalizationFont[];
  availableLocation: [] | PersonalizationLocation[];
  availableColor: [] | PersonalizationColor[];
}

const PL1_OrderItem: React.FC<_Props> = ({ cartItems, ...rest }) => {
  return (
    <ul role='list' className='overflow-hidden'>
      {cartItems.map((item: _CartItem, cartItemIndex: number) => (
        <CI1_Item
          {...item}
          {...rest}
          key={cartItemIndex}
          cartItemIndex={cartItemIndex}
        />
      ))}
    </ul>
  );
};

export default PL1_OrderItem;
