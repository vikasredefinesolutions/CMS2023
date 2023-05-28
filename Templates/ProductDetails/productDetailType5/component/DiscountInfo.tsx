import { _ProductDetails } from '@definations/APIs/productDetail.res';
import { c_getSeName } from '@helpers/common.helper';
import { FetchDiscountTablePrices } from '@services/product.service';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import React, { useEffect, useState } from 'react';
const DiscountInfo: React.FC<{
  storeCode: string;
  product: _ProductDetails | null;
  pricePerItem: number;
}> = ({ storeCode, product, pricePerItem }) => {
  const { product_storeData } = useActions_v2();
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const selectedColor = useTypedSelector_v2(
    (state) => state.product.selected.color,
  );
  const { discounts } = useTypedSelector_v2((state) => state.product.product);
  const totalQty = useTypedSelector_v2(
    (state) => state.product.toCheckout.totalQty,
  );
  const [qtyRequired, setQtyRequired] = useState(0);
  const [nextDiscountPrice, setNextDiscountPrice] = useState(0);

  useEffect(() => {
    if (storeId && customerId && selectedColor) {
      FetchDiscountTablePrices({
        storeId: storeId,
        seName: selectedColor.productSEName
          ? selectedColor.productSEName
          : c_getSeName('PRODUCT DETAILS'),
        customerId: customerId ? customerId : 0,
        attributeOptionId: selectedColor.attributeOptionId,
      }).then((res) => {
        product_storeData({
          type: 'DISOCUNT_TABLE_PRICES',
          data: res,
        });
      });
    }
  }, [customerId, selectedColor.attributeOptionId]);
  useEffect(() => {
    discounts?.subRows.forEach((discount, index) => {
      let qty = '';
      let nextqty = '';
      if (index === 0) {
        qty = '0';
        nextqty = discount?.displayQuantity.slice(0, -1);
      } else {
        qty = discounts?.subRows[index - 1].displayQuantity.slice(0, -1);
        nextqty = discount?.displayQuantity.slice(0, -1);
      }
      if (totalQty >= +qty && totalQty < +nextqty) {
        setNextDiscountPrice(parseFloat(discount.discountPrice)),
          setQtyRequired(+nextqty);
      }
    });
  }, [totalQty]);

  return (
    <>
      <div className='mt-[10px] px-[10px] py-[10px] bg-[#000000] text-[#ffffff] text-center'>
        `Add {qtyRequired - totalQty} more of this {product?.name} to your cart
        to save an additional $
        {product?.msrp &&
          parseFloat(`${product?.msrp}`) - parseFloat(`${nextDiscountPrice}`)}
        per Item!`
      </div>
    </>
  );
};

export default DiscountInfo;
