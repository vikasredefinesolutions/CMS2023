import AvailableInventoryModal from '@appComponents/modals/availableInventoryModal/AvailableInventoryModal';
import ForgotModal from '@appComponents/modals/forgotModal';
import LoginModal from '@appComponents/modals/loginModal';
import { _modals } from '@appComponents/modals/modal';
import SizeChartModal from '@appComponents/modals/sizeChartModal/SizeChartModal';
import StartOrderModal from '@appComponents/modals/startOrderModal/StartOrderModal';
// import StartOrderModal from '@appComponents/modals/startOrderModal/startOrderModal';
import { __pagesConstant } from '@constants/pages.constant';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';

import AvailableColorsType8 from '@templates/ProductDetails/productDetailsType8/components/AvailableColorsType8';
import BuyNowHandlerType8 from '@templates/ProductDetails/productDetailsType8/components/BuyNowHandlerType8';
import Inventory_Type8 from '@templates/ProductDetails/productDetailsType8/components/ProductInventory_Type8';
import SizeQtyInputType8 from '@templates/ProductDetails/productDetailsType8/components/SizeQtyInput';
import { _ProductInfoProps } from '@templates/ProductDetails/productDetailsType8/components/productDetailsComponents';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
const ProductInfo: React.FC<_ProductInfoProps> = ({ product, storeCode }) => {
  const [showExtra, setShowExtra] = useState(false);
  const [openModal, setOpenModal] = useState<null | _modals>(null);

  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.loggedIn,
  );

  const sizeChart = useTypedSelector_v2(
    (state) => state.product.product.sizeChart,
  );
  const { price, inventory } = useTypedSelector_v2(
    (state) => state.product.product,
  );
  const { klaviyokey } = useTypedSelector_v2((state) => state.sbStore);
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const router = useRouter();
  const modalHandler = (param: null | _modals) => {
    if (param) {
      setOpenModal(param);
      return;
    }
    setOpenModal(null);
  };
  const selectedColor = useTypedSelector_v2(
    (state) => state.product.selected.color,
  );

  const [selectSize, setSelectSize] = useState('');

  const { toCheckout } = useTypedSelector_v2((state) => state.product);
  const startOrderBtnText = () => {
    let text = 'START ORDER';

    if (isEmployeeLoggedIn) {
      text = 'START ORDER';
    }
    if (product.isDiscontinue) {
      text = 'Discontinued';
    }
    return text;
  };

  const showExtraButton =
    product.description.length >=
    __pagesConstant._productDetails.descriptionLength;

  return (
    <div className='col-span-1 mt-[15px] pl-[8px] pr-[8px] md:pl-[15px] md:pr-[15px] sm:pl-[0px] sm:pr-[0px] lg:mt-[0px]'>
      <div className='hidden md:flex flex-wrap'>
        <div className='w-full'>
          <h1 className='font-[600] text-large-text'>{product.name}</h1>
        </div>
        <div className='w-full'>
          <div className=''>
            <div className='pt-[3px] text-default-text'>
              <span className='font-[600] inline-block w-[43px]'>SKU</span>
              <span>:</span> <span className='ml-[4px]'>{product.sku}</span>
            </div>
            {/* <div className='pt-[3px] text-default-text text-left'>
              <span className='font-[600] inline-block w-[43px]'>
                {__pagesText.productInfo.msrp}
              </span>
              <span className='ml-[4px]'>
                <Price
                  value={undefined}
                  prices={{
                    msrp: product.msrp,
                    salePrice: product.salePrice,
                  }}
                  addColon={true}
                />
              </span>
            </div> */}
          </div>
        </div>
      </div>

      <AvailableColorsType8 />

      <Inventory_Type8
        attributeOptionId={selectedColor.attributeOptionId}
        storeCode={''}
        selectSize={selectSize}
        setSelectSize={setSelectSize}
      />

      <SizeQtyInputType8 price={price?.salePrice} size={selectSize} />
      <div className='m-[10px] mt-[18px]'>
        <div className='mb-[12px] text-title-text'>
          {__pagesText.productInfo.description}
        </div>
        <div
          className={`relative text-sm text-default-text div_description transition-all ${
            !showExtra && ''
          }`}
        >
          <div
            className=''
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          ></div>
          {/* {showExtraButton && (
            <div
              className={`absolute bottom-0 left-0 right-0 pt-[80px] text-center ${
                !showExtra && 'pt-20'
              } text-center`}
            >
              <button
                className='!text-anchor tracking-normal text-base underline font-bold'
                onClick={() => setShowExtra((show) => !show)}
              >
                {showExtra ? 'Read Less' : 'Read More'}
              </button>
            </div>
          )} */}
        </div>
      </div>

      <div>
        <div className={`p-[10px] mb-[20px]`}>
          <div
            className={`
             text-default-text
          flex flex-wrap items-center`}
          >
            <div
              className={`
               mr-[20px]
               w-[112px]`}
            >
              <span className=''>You Pay</span>
            </div>
            <div className=''>
              <span className='text-2xl tracking-wider'>
                {' '}
                $
                {selectSize === ''
                  ? price?.salePrice
                  : toCheckout.totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
          <div className='w-full text-left flex justify-end mt-[10px]'>
            <BuyNowHandlerType8 size='k' />
          </div>
        </div>
      </div>

      {openModal === 'sizeChart' && (
        <SizeChartModal storeCode={storeCode} modalHandler={modalHandler} />
      )}

      {openModal === 'availableInventory' && (
        <AvailableInventoryModal modalHandler={modalHandler} />
      )}

      {openModal === 'startOrder' && (
        <StartOrderModal modalHandler={modalHandler} product={product} />
      )}

      {openModal === 'login' && <LoginModal modalHandler={modalHandler} />}

      {openModal === 'forgot' && <ForgotModal modalHandler={modalHandler} />}
    </div>
  );
};

export default ProductInfo;
