import LoginModal from '@appComponents/modals/loginModal';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AvailableColors_Type3 from './AvailableColors_Type3';
// import SizeChart_Type3 from './ProductSizeChart_Type3';
import SizeChartModal from '@appComponents/modals/sizeChartModal/SizeChartModal';
import { _modals } from '@definations/product.type';
import BuyNowHandler from './BuyNowHandler';
import Inventory_Type3 from './ProductInventory_Type3';
import SizeQtyInput from './SizeQtyInput';
import { _ProductInfoProps } from './productDetailsComponents';

const ProductInfo_Type3: React.FC<_ProductInfoProps> = ({
  product,
  storeCode,
}) => {
  const [openModal, setOpenModal] = useState<null | _modals>(null);
  const { selected, toCheckout, som_logos } = useTypedSelector_v2(
    (state) => state.product,
  );

  const {
    totalQty,
    minQty,
    sizeQtys,
    price: pricePerItem,
  } = useTypedSelector_v2((state) => state.product.toCheckout);
  const selectedColor = useTypedSelector_v2(
    (state) => state.product.selected.color,
  );
  const { id: userId } = useTypedSelector_v2((state) => state.user);
  const { showModal } = useActions_v2();
  const router = useRouter();
  const modalHandler = (param: null | _modals) => {
    if (param) {
      setOpenModal(param);
      return;
    }
    setOpenModal(null);
  };

  const buyNowHandler = (e: any, isLoggedIn: boolean) => {
    e.preventDefault();
    if (isLoggedIn === false) {
      modalHandler('login');
      return;
    }

    if (isLoggedIn === true) {
      if (sizeQtys === null || sizeQtys[0]?.qty === 0) {
        modalHandler('requiredQty');
        return;
      }
      if (totalQty < minQty) {
        showModal({
          message: `Please enter quantity greater than or equal to ${minQty}.`,
          title: 'Required Quantity',
        });

        return;
      }
      router.push(`${paths.CUSTOMIZE_LOGO}/${product?.id}`);
    }
  };
  const [selectSize, setSelectSize] = useState('');
  const { price, inventory } = useTypedSelector_v2(
    (state) => state.product.product,
  );

  const { updatePrice } = useActions_v2();

  useEffect(() => {
    updatePrice({ price: price?.msrp || 0 });
  }, [price?.msrp]);

  return (
    <>
      <div className='lg:col-end-13 lg:col-span-5 mt-[15px] md:mt-[40px] px-0 lg:px-[15px] sm:px-0 sm:mt-[64px] lg:mt-0'>
        <div className='mb-[15px] border-b border-b-gray-border'>
          <div className='text-medium-text md:text-sub-text lg:text-title-text mb-[15px]'>
            {product?.name}
          </div>
        </div>

        <div className=''>
          <div className='mb-[15px]'>
            <div className='text-sm'>
              <span className='inline-block w-[128px] font-semibold'>
                {' '}
                {__pagesText.productInfo.sku}
              </span>
              <span>:</span> <span>{product?.sku}</span>
            </div>
          </div>
        </div>

        <AvailableColors_Type3 />

        <div className='text-sm flex flex-wrap items-center gap-1'>
          <Inventory_Type3
            attributeOptionId={selectedColor.attributeOptionId}
            storeCode={''}
            selectSize={selectSize}
            setSelectSize={setSelectSize}
          />
          <div className='pb-[0px]'>
            {' '}
            <button
              type='button'
              className='text-anchor hover:text-anchor-hover font-[600] underline text-default-text'
              onClick={() => modalHandler('sizeChart')}
            >
              {__pagesText.productInfo.sizeChart}{' '}
            </button>{' '}
          </div>
        </div>
        <SizeQtyInput price={price?.msrp} size={selectSize} />

        <div className='mt-[15px] bg-light-gray p-[20px]'>
          <div className='text-sm flex flex-wrap items-center'>
            <div className='w-[112px]'>
              <span className=''>You Pay</span>
            </div>
            <div className=''>
              <span className='text-2xl tracking-wider'>
                ${toCheckout.totalPrice}
              </span>
            </div>
          </div>
          <BuyNowHandler size='k' />
        </div>
        {/* <form className='mt-[24px]'>
          <div className='m-[12px] mt-[24px]'>
            <button
              disabled={product?.isDiscontinue}
              onClick={(e) => {
                buyNowHandler(e, !!userId);
              }}
              className='btn btn-primary text-center btn-lg w-full'
            >
              {product?.isDiscontinue
                ? 'Discontinued'
                : userId
                ? 'CUSTOMIZE NOW AND ADD TO CART'
                : 'LOGIN TO SHOP NOW WITH LIVE INVENTORY'}
            </button>
          </div>
        </form> */}
        {/* <div className='pt-[15px] text-default-text'>
          <div className=''>{__pagesText.productInfo.notesPk.backordered}</div>
        </div> */}
      </div>
      {openModal === 'login' && <LoginModal modalHandler={modalHandler} />}
      {openModal === 'sizeChart' && (
        <SizeChartModal storeCode={storeCode} modalHandler={modalHandler} />
      )}
    </>
  );
};

export default ProductInfo_Type3;
