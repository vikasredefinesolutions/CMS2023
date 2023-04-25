import { checkoutPages } from '@constants/enum';
import { __pagesText } from '@constants/pages.text';
import { GetCartTotals, useTypedSelector_v2 } from '@hooks_v2/index';

interface _props {
  placeorder: () => void;
  currentpage: number;
}
const OrderSummary: React.FC<_props> = ({ placeorder, currentpage }) => {
  const {
    totalPrice,
    subTotal,
    logoSetupCharges,
    smallRunFee,
    salesTax,
    discount,
  } = GetCartTotals();

  //   const store = useTypedSelector_v2((state) => state.store);
  //   console.log('store', store);

  return (
    <section className='w-full lg:w-4/12 md:w-5/12 pl-[15px] pr-[15px] mt-[15px]'>
      <div className='border border-gray-border p-[15px]'>
        <div className='w-full text-sub-text pt-[8px] pb-[8px]'>
          {__pagesText.CheckoutPage.orderSummary.OrderSummary}
        </div>
        <div className='w-full pl-[15px] pr-[15px] border-b border-gray-border mt-[10px] mb-[10px]'></div>
        <dl className='text-default-text'>
          <div className='flex items-center justify-between'>
            <dt>{__pagesText.CheckoutPage.orderSummary.Merchandise}</dt>
            <dt>{subTotal + discount}</dt>
          </div>
          <div className='flex items-center justify-between'>
            <dt>{__pagesText.CheckoutPage.orderSummary.Discount}</dt>
            <dt>{discount}</dt>
          </div>
          <div className='w-full pl-[15px] pr-[15px] border-b border-gray-border mt-[10px]'></div>
          <div className='flex items-center justify-between'>
            <dt>{__pagesText.CheckoutPage.orderSummary.Subtotal}</dt>
            <dt>{subTotal}</dt>
          </div>
          <div className='flex items-center justify-between'>
            <dt>{__pagesText.CheckoutPage.orderSummary.FirstLogo}</dt>
            <dt></dt>
          </div>
          <div className='flex items-center justify-between'>
            <dt>{__pagesText.CheckoutPage.orderSummary.SecondLogo}</dt>
            <dt></dt>
          </div>
          <div className='flex items-center justify-between'>
            <dt>{__pagesText.CheckoutPage.orderSummary.SmallRunFee}</dt>
            <dt>{smallRunFee}</dt>
          </div>
          <div className='flex items-center justify-between'>
            <dt>{__pagesText.CheckoutPage.orderSummary.ShippingHandling}</dt>
            <dt></dt>
          </div>
          <div className='flex items-center justify-between'>
            <dt>{__pagesText.CheckoutPage.orderSummary.Tax}</dt>
            <dt>{salesTax}</dt>
          </div>
          <div className='w-full pl-[15px] pr-[15px] border-b border-gray-border mt-[10px]'></div>
          <div className='flex items-center justify-between pt-[15px] mb-[30px]'>
            <dt className='font-semibold'>
              {__pagesText.CheckoutPage.orderSummary.EstimatedTotal}
            </dt>
            <dt className='font-semibold'>{totalPrice}</dt>
          </div>
          <div className='mt-[16px]'>
            <div className='text-[#ff0000] text-default-text mb-[10px]'>
              {__pagesText.CheckoutPage.orderSummary.CartSummarryInstruction}
            </div>
          </div>
          <div className='mt-[16px] mb-[16px]'>
            {currentpage === checkoutPages.reviewOrder && (
              <div
                className='btn btn-lg btn-primary w-full text-center'
                onClick={placeorder}
              >
                {__pagesText.CheckoutPage.placeOrder}
              </div>
            )}
          </div>
        </dl>
      </div>
    </section>
  );
};

export default OrderSummary;