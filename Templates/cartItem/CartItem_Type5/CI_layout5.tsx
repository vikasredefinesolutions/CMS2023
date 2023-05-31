import { useTypedSelector_v2 } from '@hooks_v2/index';
import { _CartItem } from '@services/cart';
import { _CartProps } from '@templates/cartItem/cartItem';
import { FC } from 'react';
import CI5_Item from './Componets/CI5_Item';

const CIlayout5: FC<_CartProps> = (props) => {
  const cartData = useTypedSelector_v2((state) => state.cart.cart);
  // const linesAvailable = (item: any) => {
  //   let show = false;
  //   item.forEach((lineModel: any) => {
  //     if (lineModel.linePersonalizeDetails.length > 0) {
  //       show = true;
  //       return;
  //     }
  //   });
  //   return show;
  // };

  return (
    <ul role='list' className='overflow-hidden'>
      {cartData &&
        cartData.map((item: _CartItem, cartItemIndex: number) => (
          <CI5_Item {...item} {...props} cartItemIndex={cartItemIndex} />
        ))}
    </ul>
  );
};

export default CIlayout5;
