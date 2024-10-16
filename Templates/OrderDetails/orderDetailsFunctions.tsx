import Price from '@appComponents/Price';
import { _MyAcc_OrderBillingDetails } from '@definations/APIs/user.res';
import { ShoppingCartItemDetailsViewModel } from '@services/cart';

export const CustomizationPrice = (billing: _MyAcc_OrderBillingDetails) => {
  const logoTotal = billing?.logoFinalTotal || 0;
  const lineTotal = billing?.lineFinalTotal || 0;

  const customizationTotal = logoTotal + lineTotal;

  if (customizationTotal === 0) {
    return <></>;
  }

  return (
    <div className='px-4'>
      <div className=' font-semibold border-t border-gray-200 pt-2'>
        Customizations Price
      </div>
      {logoTotal > 0 && (
        <div className='flex items-center justify-between border-t border-gray-200 pt-2'>
          <dt className=''>Logo</dt>
          <dd className='font-medium text-gray-900'>
            <Price value={logoTotal} />
          </dd>
        </div>
      )}
      {lineTotal > 0 && (
        <div className='flex items-center justify-between border-t border-gray-200 pt-2'>
          <dt className=''>Line</dt>
          <dd className='font-medium text-gray-900'>
            <Price value={lineTotal} />
          </dd>
        </div>
      )}
      <div className='flex items-center justify-between border-t border-gray-200 pt-2'>
        <dt className=''>Subtotal</dt>
        <dd className='font-medium text-gray-900'>
          <Price value={customizationTotal} />
        </dd>
      </div>
    </div>
  );
};

export const TotalSavings = (billing: _MyAcc_OrderBillingDetails) => {
  const shipPromotionDiscount = billing?.shipPromotionDiscount || 0;
  const couponDiscountAmount = billing?.couponDiscountAmount || 0;
  const giftCertificateDiscountAmount =
    billing?.giftCertificateDiscountAmount || 0;
  const quantityDiscountAmount = billing?.quantityDiscountAmount || 0;
  const levelDiscountAmount = billing?.levelDiscountAmount || 0;
  const customDiscount = billing?.customDiscount || 0;

  const totalSavings =
    shipPromotionDiscount +
    couponDiscountAmount +
    giftCertificateDiscountAmount +
    quantityDiscountAmount +
    levelDiscountAmount +
    customDiscount;

  if (totalSavings === 0) {
    return <></>;
  }

  return (
    <div className='px-4'>
      <div className='font-semibold border-t border-gray-200 pt-2'>
        Total Saving
      </div>
      {shipPromotionDiscount > 0 && (
        <div className='flex items-center justify-between border-t border-gray-200 pt-2'>
          <dt className=''>Ship Promotion Discount</dt>
          <dd className='font-medium text-gray-900'>
            <Price value={shipPromotionDiscount} />
          </dd>
        </div>
      )}
      {couponDiscountAmount > 0 && (
        <div className='flex items-center justify-between border-t border-gray-200 pt-2'>
          <dt className=''>Coupon Discount</dt>
          <dd className='font-medium text-gray-900'>
            <Price value={couponDiscountAmount} />
          </dd>
        </div>
      )}
      {quantityDiscountAmount > 0 && (
        <div className='flex items-center justify-between border-t border-gray-200 pt-2'>
          <dt className=''>Quantity Discount</dt>
          <dd className='font-medium text-gray-900'>
            <Price value={quantityDiscountAmount} />
          </dd>
        </div>
      )}
      {levelDiscountAmount > 0 && (
        <div className='flex items-center justify-between border-t border-gray-200 pt-2'>
          <dt className=''>Level Discount</dt>
          <dd className='font-medium text-gray-900'>
            <Price value={levelDiscountAmount} />
          </dd>
        </div>
      )}
      {customDiscount > 0 && (
        <div className='flex items-center justify-between border-t border-gray-200 pt-2'>
          <dt className=''>Custom Discount</dt>
          <dd className='font-medium text-gray-900'>
            <Price value={customDiscount} />
          </dd>
        </div>
      )}

      <div className='flex items-center justify-between border-t border-gray-200 pt-2'>
        <dt className=''>Custom Discount</dt>
        <dd className='font-medium text-gray-900'>
          <Price value={totalSavings} />
        </dd>
      </div>
    </div>
  );
};

export const ShippingEstimationPrice = (
  billing: _MyAcc_OrderBillingDetails,
) => {
  const shippingLabelCost = billing?.shippingLabelCost || 0;
  const orderShippingCosts = billing?.orderShippingCosts || 0;
  const shippingPromotionDiscount = billing?.shipPromotionDiscount || 0;
  const shippingEstimationTotal =
    shippingLabelCost + orderShippingCosts - shippingPromotionDiscount;

  if (shippingEstimationTotal === 0) {
    return <></>;
  }

  return (
    <div className='px-4'>
      <div className='font-semibold border-t border-gray-200 pt-2'>
        Estimated Shipping
      </div>
      {orderShippingCosts > 0 && (
        <div className='flex items-center justify-between'>
          <dt className=''>
            <span>Shipping</span>
          </dt>
          <dd className='font-medium text-gray-900'>
            <Price value={orderShippingCosts} />
          </dd>
        </div>
      )}
      {shippingLabelCost > 0 && (
        <div className='flex items-center justify-between'>
          <dt className=''>
            <span>Shipping Label</span>
          </dt>
          <dd className='font-medium text-gray-900'>
            <Price value={shippingLabelCost} />
          </dd>
        </div>
      )}
      {shippingPromotionDiscount > 0 && (
        <div className='flex items-center justify-between'>
          <dt className=''>
            <span>Shipping Promotion Discount</span>
          </dt>
          <dd className='font-medium text-gray-900'>
            -<Price value={shippingPromotionDiscount} />
          </dd>
        </div>
      )}
      {shippingEstimationTotal > 0 && (
        <div className='flex items-center justify-between border-t border-gray-200 pt-2'>
          <dt className=''>Subtotal</dt>
          <dd className='font-medium text-gray-900'>
            <Price value={shippingEstimationTotal} />
          </dd>
        </div>
      )}
    </div>
  );
};

export const AdditionalCosts = (billing: _MyAcc_OrderBillingDetails) => {
  const sewOutTotal = billing?.sewoutTotal || 0;
  const orderTaxTotal = billing?.orderTax || 0;
  const giftWrapPrice = billing?.giftWrapPrice || 0;
  const giftWrapAmt = billing?.giftWrapAmt || 0;
  const logoSetupCharges = billing?.orderLogoSetupFee || 0;
  const smallRunFeesCharges = billing?.orderSmallRunFee || 0;

  const additionalCostsTotal =
    sewOutTotal +
    orderTaxTotal +
    giftWrapAmt +
    giftWrapPrice +
    logoSetupCharges +
    smallRunFeesCharges;

  if (additionalCostsTotal === 0) {
    return <></>;
  }

  return (
    <div className='px-4'>
      <div className='font-semibold border-t border-gray-200 pt-2'>
        Additional Services
      </div>
      {sewOutTotal > 0 && (
        <div className='flex items-center justify-between'>
          <dt className=''>
            <span>Sew-Out</span>
          </dt>
          <dd className='font-medium text-gray-900'>
            <Price value={sewOutTotal} />
          </dd>
        </div>
      )}

      {smallRunFeesCharges > 0 && (
        <div className='flex items-center justify-between border-t border-gray-200 pt-2'>
          <dt className=''>Small Run Fee</dt>
          <dd className='font-medium text-gray-900'>
            <Price value={smallRunFeesCharges} />
          </dd>
        </div>
      )}

      {logoSetupCharges > 0 && (
        <div className='flex items-center justify-between border-t border-gray-200 pt-2'>
          <dt className=''>Logo Setup Charges</dt>
          <dd className='font-medium text-gray-900'>
            <Price value={logoSetupCharges} />
          </dd>
        </div>
      )}

      {orderTaxTotal > 0 && (
        <div className='flex items-center justify-between'>
          <dt className=''>
            <span>Order Tax</span>
          </dt>
          <dd className='font-medium text-gray-900'>
            <Price value={orderTaxTotal} />
          </dd>
        </div>
      )}

      {giftWrapAmt > 0 && (
        <div className='flex items-center justify-between'>
          <dt className=''>
            <span>Order Tax</span>
          </dt>
          <dd className='font-medium text-gray-900'>
            <Price value={giftWrapAmt} />
          </dd>
        </div>
      )}

      {giftWrapPrice > 0 && (
        <div className='flex items-center justify-between'>
          <dt className=''>
            <span>Order Tax</span>
          </dt>
          <dd className='font-medium text-gray-900'>
            <Price value={giftWrapPrice} />
          </dd>
        </div>
      )}

      <div className='flex items-center justify-between border-t border-gray-200 pt-2'>
        <dt className=''>
          <span>Subtotal</span>
        </dt>
        <dd className='font-medium text-gray-900'>
          <Price value={additionalCostsTotal} />
        </dd>
      </div>
    </div>
  );
};

export const ProductsPrice = (billing: _MyAcc_OrderBillingDetails) => {
  const productsTotal = billing?.orderSubtotal || 0;

  return (
    <div className='px-4'>
      <div className=' font-semibold'>Products Price</div>
      <div className='flex items-center justify-between border-t border-gray-200 pt-2'>
        <dt className=''>Subtotal</dt>
        <dd className='font-medium text-gray-900'>
          <Price value={productsTotal} />
        </dd>
      </div>
    </div>
  );
};

function removeDuplicates(arr: string[]) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

export const mergeAllSizes = (items: ShoppingCartItemDetailsViewModel[]) => {
  if (items.length === 0) return '';

  let sizes = '';

  const sizesList = removeDuplicates(
    items.map((product) => product.attributeOptionValue),
  );

  sizesList.forEach((size, index, workingArr) => {
    if (index === workingArr.length - 1) {
      sizes += `${size} `;
      return;
    }
    sizes += `${size}, `;
  });

  return sizes;
};

export const BillingAddress = (
  billing: _MyAcc_OrderBillingDetails,
  type: '1' | '2' = '1',
) => {
  let address = '';
  let billingName = '';
  if (billing?.billingAddress1) {
    billingName += `${
      billing?.billingFirstName + ' ' + billing?.billingLastName
    }`;
    address += `${billing.billingAddress1}`;
  }
  if (billing?.billingAddress2 && billing.billingAddress2.trim() !== '') {
    address += ', ';
    address += `${billing.shippingAddress2}`;
  }
  if (billing?.billingCity) {
    address += ', ';
    address += `${billing.billingCity}`;
  }
  if (billing?.billingState) {
    address += ', ';
    address += `${billing.billingState}`;
  }
  if (billing?.billingCountry) {
    address += ', ';
    address += `${billing.billingCountry} `;
  }
  if (billing?.billingZip) {
    address += ', ';
    address += `${billing.billingZip} `;
  }

  if (type === '2') {
    return (
      <div>
        <div className='font-[600]'>Bill to:</div>
        <div className=''>{billingName}</div>
        <div className=''>{address}</div>
      </div>
    );
  }

  return (
    <div className='w-full lg:w-1/3 px-2'>
      <div className='border border-gray-200 h-full bg-white'>
        <div className='bg-gray-100 p-2 font-semibold'>BILLING ADDRESS</div>
        <div className='p-2'>{address}</div>
      </div>
    </div>
  );
};

export const ShippingAddress = (
  billing: _MyAcc_OrderBillingDetails,
  type: '1' | '2' | '3' = '1',
) => {
  let address = '';
  let shippingName = '';
  if (billing?.shippingAddress1) {
    shippingName += `${billing.shippingFirstName} ${billing?.shippingLastName}`;
    address += `${billing.shippingAddress1}`;
  }
  if (billing?.shippingAddress2 && billing.shippingAddress2.trim() !== '') {
    address += ', ';
    address += `${billing.shippingAddress2}`;
  }
  if (billing?.shippingCity) {
    address += ', ';
    address += `${billing.shippingCity}`;
  }
  if (billing?.shippingState) {
    address += ', ';
    address += `${billing.shippingState}`;
  }
  if (billing?.shippingCountry) {
    address += ', ';
    address += `${billing.shippingCountry}`;
  }
  if (billing?.shippingZip) {
    address += ', ';
    address += `${billing.shippingZip}`;
  }
  if (type === '2') {
    return (
      <div>
        <div className='font-[600]'>Ship to:</div>
        <div>{shippingName}</div>
        <div className=''>{address}</div>
      </div>
    );
  }
  if (type === '3') {
    return (
      <div>
        <div className='font-[600]'>SHIPPING ADDRESS:</div>
        <div className=''>{address}</div>
      </div>
    );
  }

  return (
    <div className='w-full lg:w-1/3 px-2'>
      <div className='border border-gray-200 h-full bg-white'>
        <div className='bg-gray-100 p-2 font-semibold'>SHIPPING ADDRESS</div>
        <div className='p-2'>{address}</div>
      </div>
    </div>
  );
};
