import Price from '@appComponents/reUsable/Price';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { _shippingMethod } from '@controllers/checkoutController';
import SummarryController from '@controllers/summarryController';
import { GetCartTotals, useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import Link from 'next/link';
import { FC, useState } from 'react';

interface _props {
  selectedShippingModel: _shippingMethod;
}

const CartSummarryType4: FC<_props> = ({ selectedShippingModel }) => {
  const { update_CheckoutEmployeeLogin } = useActions_v2();
  const couponDetails = useTypedSelector_v2((state) => state.cart.discount);
  const { code: storeCode } = useTypedSelector_v2((state) => state.store);
  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => !!state.employee.empId,
  );
  const currentPage = useTypedSelector_v2((state) => state.store.currentPage);
  const { el: employeeLogin } = useTypedSelector_v2((state) => state.checkout);
  const [textOrNumber, setTextOrNumber] = useState<'number' | 'text'>('text');
  // Functions
  const {
    coupon,
    successMessage,
    setCoupon,
    applyCouponHandler,
    removeCouponCodeHandler,
  } = SummarryController();
  const {
    totalPrice,
    subTotal,
    logoSetupCharges,
    smallRunFee,
    salesTax,
    totalLogoCharges,
    totalLineCharges,
    sewOutTotal,
  } = GetCartTotals();
  // const { cartQty } = useTypedSelector_v2((state) => state.cart);
  // const { fetchShipping } = CheckoutController();
  // useEffect(() => {
  //   if (cartQty) {
  //     fetchShipping(subTotal);
  //   }
  // }, [subTotal]);
  const getNewShippingCost = (shippingCost: number): number => {
    if (isEmployeeLoggedIn) {
      return employeeLogin.shippingPrice;
    }

    return shippingCost;
  };

  return (
    <div className='border border-gray-border bg-white p-[15px]'>
      <div className='bg-light-gray w-full text-sub-text font-medium px-[15px] py-[15px]'>
        {__pagesText.CheckoutPage.orderSummary.OrderSummary}
      </div>
      <div className='px-[15px] py-[15px]'>
        <dl className='space-y-2'>
          <div className='flex items-center justify-between pt-[10px]'>
            <dt className='text-normal-text'>Subtotal:</dt>
            <dd className='text-normal-text'>
              <Price value={subTotal + totalLogoCharges} />
            </dd>
          </div>

          <div className='border-t border-t-gray-border pt-[10px] flex items-center justify-between'>
            <dt className='text-normal-text'>
              <span>Estimated Total</span>
            </dt>
            <dd className='text-normal-text font-medium'>
              <Price value={totalPrice} />
            </dd>
          </div>
        </dl>
      </div>
      <div className='flex justify-between items-center bg-light-gray w-full text-sub-text font-bold px-[15px] py-[5px]'>
        <div>Total:</div>
        <div>
          <Price
            value={
              totalPrice + getNewShippingCost(selectedShippingModel?.price)
            }
          />
        </div>
      </div>
      <div className='mt-4'>
        <Link className='' href={paths.CHECKOUT}>
          <a className='btn btn-lg btn-secondary !flex items-center justify-center w-full'>
            <span className='material-icons text-lg mr-[2px]'>
              shopping_cart
            </span>
            CHECKOUT NOW
          </a>
        </Link>
      </div>
    </div>
  );
};

export default CartSummarryType4;
