import LoginModal from '@appComponents/modals/loginModal';
import { __pagesText } from '@constants/pages.text';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { useEffect, useState } from 'react';
import AvailableColors_Type3 from './AvailableColors_Type3';
// import SizeChart_Type3 from './ProductSizeChart_Type3';
import SizeChartModal from '@appComponents/modals/sizeChartModal/SizeChartModal';
import { _Store } from '@configs/page.config';
import { _Store_CODES } from '@constants/global.constant';
import { _modals } from '@definations/product.type';
import BuyNowHandler from './BuyNowHandler';
import Inventory_Type3 from './ProductInventory_Type3';
import SizeQtyInput from './SizeQtyInput';
import { _ProductInfoProps } from './productDetailsComponents';

const ProductInfo_Type3: React.FC<_ProductInfoProps> = ({ product }) => {
  const [openModal, setOpenModal] = useState<null | _modals>(null);
  const { selected, toCheckout, som_logos } = useTypedSelector_v2(
    (state) => state.product,
  );

  const selectedColor = useTypedSelector_v2(
    (state) => state.product.selected.color,
  );

  const storeCode = useTypedSelector_v2((store) => store.store.code);

  const modalHandler = (param: null | _modals) => {
    if (param) {
      setOpenModal(param);
      return;
    }
    setOpenModal(null);
  };

  const [selectSize, setSelectSize] = useState('');
  const { price } = useTypedSelector_v2((state) => state.product.product);

  const { updatePrice } = useActions_v2();

  useEffect(() => {
    updatePrice({ price: price?.msrp || 0 });
  }, [price?.msrp]);

  const { code } = useTypedSelector_v2((state) => state.store);

  const [inventory, setInventory] = useState<number>(0);

  const productInventory = useTypedSelector_v2(
    (state) => state.product.product.inventory,
  );

  const selectedProduct = useTypedSelector_v2(
    (state) => state.product.selected,
  );

  useEffect(() => {
    const prodArr = productInventory?.inventory.filter((prod) => {
      return (
        prod.colorAttributeOptionId === selectedProduct.color.attributeOptionId
      );
    });

    const inventoryCount = prodArr?.reduce(
      (acc, curr) => acc + curr.inventory,

      0,
    );

    setInventory(inventoryCount ? inventoryCount : 0);
  }, [selectedProduct, productInventory]);

  return (
    <>
      <div className='lg:col-end-13 lg:col-span-5 mt-[15px] md:mt-[40px] px-0 lg:px-[15px] sm:px-0 sm:mt-[64px] lg:mt-0 link-custom'>
        <div className='mb-[15px] border-b border-b-gray-border'>
          <div className='text-title-text md:text-sub-text lg:text-title-text mb-[15px]'>
            {product?.name}
          </div>
        </div>

        {code == _Store.type5 && (
          <div className='border-b mb-[15px] pb-[15px]'>
            <span className='text-rose-500 font-semibold'>
              ATTENTION: PLEASE READ BEFORE PLACING YOUR ORDER: ORDERS AREN'T
              SHIPPING UNTIL EARLY 2023. BE SURE TO ENTER THE CORRECT ADDRESS
              FOR DELIVERY. EMPLOYEES MAY REDEEM 1 PIECE OF APPAREL.
            </span>
          </div>
        )}

        <div className='text-sm items-center'>
          <div className='mb-[15px]'>
            <div className='text-sm'>
              <span className={`inline-block w-[128px]`}>
                {' '}
                {__pagesText.productInfo.ProductCode}
              </span>
              <span>{product?.sku}</span>
            </div>
          </div>
        </div>

        {storeCode === _Store_CODES.USAAHEALTHYPOINTS && (
          <div className='text-sm items-center'>
            <div className='mb-[15px]'>
              <div className='text-sm'>
                <span className='inline-block w-[128px]'> Availability:</span>
                <span
                  className={`${
                    inventory > 0 ? '!text-[#006400]' : '!text-[#ac080e]'
                  }`}
                >
                  {' '}
                  {inventory > 0 ? `In Stock` : 'Out of Stock'}
                </span>
              </div>
            </div>
          </div>
        )}
        <AvailableColors_Type3 />
        <div className='flex items-center'>
          <Inventory_Type3
            attributeOptionId={selectedColor.attributeOptionId}
            storeCode={''}
            selectSize={selectSize}
            setSelectSize={setSelectSize}
          />
        </div>
        <SizeQtyInput price={price?.msrp} size={selectSize} />
        <div>
          <div className='mt-[15px] bg-light-gray  p-[10px]'>
            <div className='text-default-text flex flex-wrap items-center'>
              <div className='w-[112px] mr-[20px]'>
                <span className=''>You Pay</span>
              </div>
              <div className=''>
                <span
                  className={`${
                    storeCode === _Store_CODES.USAAHEALTHYPOINTS
                      ? 'text-large-text'
                      : 'text-2xl'
                  } tracking-wider`}
                >
                  {' '}
                  ${toCheckout.totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
            <div>
              <div className='w-full text-left flex justify-end mt-[10px]'>
                <BuyNowHandler size='k' />
              </div>
            </div>
          </div>
        </div>
      </div>

      {openModal === 'login' && <LoginModal modalHandler={modalHandler} />}
      {openModal === 'sizeChart' && (
        <SizeChartModal storeCode={storeCode} modalHandler={modalHandler} />
      )}
    </>
  );
};

export default ProductInfo_Type3;
