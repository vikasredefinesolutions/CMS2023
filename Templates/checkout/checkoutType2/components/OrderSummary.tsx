import Price from '@appComponents/reUsable/Price';
import { checkoutPages } from '@constants/enum';
import { __pagesText } from '@constants/pages.text';
import { _shippingMethod } from '@controllers/checkoutController';
import { GetCartTotals, useTypedSelector_v2 } from '@hooks_v2/index';

interface _props {
  placeOrder: (args: _shippingMethod) => void;
  currentpage: number;
  selectedShipModel: _shippingMethod;
}
const OrderSummary: React.FC<_props> = ({
  placeOrder,
  currentpage,
  selectedShipModel,
}) => {
  const {
    totalPrice,
    subTotal,
    logoSetupCharges,
    smallRunFee,
    salesTax,
    discount,
    creditBalance,
  } = GetCartTotals();

  // console.log('selectedShipModel', selectedShipModel);

  const storeId = useTypedSelector_v2((state) => state.store.id);

  return (
    <section className='w-full lg:w-4/12 md:w-5/12 pl-[15px] pr-[15px] mt-[15px]'>
      <div className='border border-gray-border p-[15px]'>
        <div className='w-full text-sub-text pt-[8px] pb-[8px]'>
          {__pagesText.CheckoutPage.orderSummary.OrderSummary}
        </div>
        <div className='w-full pl-[15px] pr-[15px] border-b border-gray-border mt-[10px] mb-[10px]'></div>
        <dl className='text-default-text'>
          {storeId !== 11 && (
            <>
              <div className='flex items-center justify-between pt-[15px]'>
                <dt>{__pagesText.CheckoutPage.orderSummary.Merchandise}</dt>
                {/* <dt>{subTotal + discount}</dt> */}
                <Price value={subTotal + discount} />
              </div>
              <div className='flex items-center justify-between pt-[15px]'>
                <dt>{__pagesText.CheckoutPage.orderSummary.Discount}</dt>
                {/* <dt>{discount}</dt> */}
                <Price value={discount} />
              </div>
            </>
          )}
          <div className='w-full pl-[15px] pr-[15px] border-b border-gray-border mt-[10px]'></div>
          <div className='flex items-center justify-between pt-[15px]'>
            <dt>{__pagesText.CheckoutPage.orderSummary.Subtotal}</dt>
            {/* <dt>{subTotal}</dt> */}
            <Price value={subTotal} />
          </div>
          {storeId !== 11 && (
            <>
              {' '}
              <div className='flex items-center justify-between pt-[15px]'>
                <dt>{__pagesText.CheckoutPage.orderSummary.FirstLogo}</dt>
                <Price value={''} />
              </div>
              <div className='flex items-center justify-between pt-[15px]'>
                <dt>{__pagesText.CheckoutPage.orderSummary.SecondLogo}</dt>
                <Price value={''} />
              </div>
              <div className='flex items-center justify-between pt-[15px]'>
                <dt>{__pagesText.CheckoutPage.orderSummary.SmallRunFee}</dt>
                <Price value={smallRunFee} />
              </div>
            </>
          )}
          <div className='flex items-center justify-between pt-[15px]'>
            <dt>{__pagesText.CheckoutPage.orderSummary.ShippingHandling}</dt>
            <Price value={selectedShipModel.price} />
          </div>
          <div className='flex items-center justify-between pt-[15px]'>
            <dt>{__pagesText.CheckoutPage.orderSummary.Tax}</dt>
            <Price value={salesTax} />
          </div>
          <div className='flex items-center justify-between pt-[15px]'>
            <dt>{__pagesText.CheckoutPage.orderSummary.InternalCredit}</dt>
            <Price value={creditBalance} />
          </div>
          <div className='w-full pl-[15px] pr-[15px] border-b border-gray-border mt-[10px]'></div>
          <div className='flex items-center justify-between pt-[15px] mb-[30px]'>
            <dt className='font-semibold'>
              {__pagesText.CheckoutPage.orderSummary.EstimatedTotal}
            </dt>
            <dt className='font-semibold'>
              <Price value={totalPrice} />
            </dt>
          </div>
          <div className='mt-[16px]'>
            <div className=' text-rose-600 mb-[10px]'>
              {__pagesText.CheckoutPage.orderSummary.CartSummarryInstruction}
            </div>
          </div>
          <div className='mt-[16px] mb-[16px]'>
            {currentpage === checkoutPages.reviewOrder && (
              <div
                className='btn btn-lg btn-primary w-full text-center'
                onClick={() => placeOrder(selectedShipModel)}
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
