import LoginModal from '@appComponents/modals/loginModal';
import { __pagesText } from '@constants/pages.text';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { useEffect, useState } from 'react';
import AvailableColors_Type3 from './AvailableColors_Type3';
// import SizeChart_Type3 from './ProductSizeChart_Type3';
import SizeChartModal from '@appComponents/modals/sizeChartModal/SizeChartModal';
import { _Store } from '@configs/page.config';

import NxtImage from '@appComponents/reUsable/Image';
import {
  BACARDI,
  CYXTERA_CODE,
  SIMPLI_SAFE_CODE,
  THD_STORE_CODE,
  UNITI_CODE,
} from '@constants/global.constant';
import { _modals } from '@definations/product.type';
import BuyNowHandler from './BuyNowHandler';
import Inventory_Type3 from './ProductInventory_Type3';
import Inventory_Type3_2 from './ProductInventory_Type3_2';
import SizeQtyInput from './SizeQtyInput';
import { _ProductInfoProps } from './productDetailsComponents';

const ProductInfo_Type3: React.FC<_ProductInfoProps> = ({ product }) => {
  const [openModal, setOpenModal] = useState<null | _modals>(null);
  const { toCheckout } = useTypedSelector_v2((state) => state.product);
  const store_Code = useTypedSelector_v2((state) => state.store.code);
  const selectedColor = useTypedSelector_v2(
    (state) => state.product.selected.color,
  );

  const { code: storeCode } = useTypedSelector_v2((state) => state.store);
  const modalHandler = (param: null | _modals) => {
    if (param) {
      setOpenModal(param);
      return;
    }
    setOpenModal(null);
  };

  const priceForBacardi = () => {
    if (showSingleInv) {
      if (selectSize === '') {
        return price?.msrp;
      } else {
        return toCheckout.totalPrice.toFixed();
      }
    } else {
      return toCheckout.totalPrice.toFixed();
    }
  };

  const [selectSize, setSelectSize] = useState('');
  const { price } = useTypedSelector_v2((state) => state.product.product);
  const [showSingleInv, setShowSingleInv] = useState(true);
  const { updatePrice } = useActions_v2();
  useEffect(() => {
    updatePrice({ price: price?.msrp || 0 });
  }, [price?.msrp]);

  const { code } = useTypedSelector_v2((state) => state.store);

  return (
    <>
      <div className='lg:col-end-13 lg:col-span-5 mt-[15px] md:mt-[40px] px-0 lg:px-[15px] sm:px-0 sm:mt-[64px] lg:mt-0'>
        <div className='mb-[15px] border-b border-b-gray-border'>
          <div
            className={`${
              store_Code == _Store.type6
                ? 'text-medium-text '
                : 'text-title-text '
            } md:text-sub-text lg:text-title-text mb-[15px]`}
          >
            {product?.name}
          </div>
        </div>
        <div className='mb-[15px]'>
          <div
            className={`${
              store_Code == _Store.type6 ? 'text-sm' : 'text-default-text'
            }`}
          >
            <span className='inline-block w-[128px] font-semibold'>
              {storeCode === THD_STORE_CODE ||
              storeCode === CYXTERA_CODE ||
              store_Code == _Store.type6 ||
              store_Code == UNITI_CODE ||
              store_Code == BACARDI
                ? __pagesText.productInfo.product_code
                : __pagesText.productInfo.sku}
            </span>
            <span>{product?.sku}</span>
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
        </div>
        <AvailableColors_Type3 />
        {storeCode !== BACARDI ? (
          <>
            <div
              className={`${
                store_Code == _Store.type6
                  ? 'flex flex-wrap mb-[15px]'
                  : 'flex items-center'
              }`}
            >
              <Inventory_Type3
                attributeOptionId={selectedColor.attributeOptionId}
                storeCode={''}
                selectSize={selectSize}
                setSelectSize={setSelectSize}
              />

              {storeCode !== THD_STORE_CODE &&
                storeCode !== SIMPLI_SAFE_CODE && (
                  <div className='pb-[0px]'>
                    {storeCode !== BACARDI ? (
                      <button
                        type='button'
                        className='text-anchor hover:text-anchor-hover font-[600] underline text-default-text'
                        onClick={() => modalHandler('sizeChart')}
                      >
                        {__pagesText.productInfo.sizeChart}
                      </button>
                    ) : (
                      <div
                        className='size-chart p-t-20 ml-[10px]'
                        onClick={() => modalHandler('sizeChart')}
                      >
                        <NxtImage
                          isStatic={true}
                          src={'/assets/images/size-chart.jpg'}
                          alt={'size-chart'}
                          className={''}
                        />
                      </div>
                    )}
                  </div>
                )}
            </div>
            <SizeQtyInput price={price?.msrp} size={selectSize} />
          </>
        ) : (
          <>
            {showSingleInv ? (
              <>
                <div
                  className={`${
                    store_Code == _Store.type6
                      ? 'flex flex-wrap mb-[15px]'
                      : 'flex items-center'
                  }`}
                >
                  <Inventory_Type3
                    attributeOptionId={selectedColor.attributeOptionId}
                    storeCode={''}
                    selectSize={selectSize}
                    setSelectSize={setSelectSize}
                  />

                  {
                    <div className='pb-[0px]'>
                      {storeCode !== BACARDI ? (
                        <button
                          type='button'
                          className='text-anchor hover:text-anchor-hover font-[600] underline text-default-text'
                          onClick={() => modalHandler('sizeChart')}
                        >
                          {__pagesText.productInfo.sizeChart}
                        </button>
                      ) : (
                        <div
                          className='size-chart p-t-20 ml-[10px]'
                          onClick={() => modalHandler('sizeChart')}
                        >
                          <NxtImage
                            isStatic={true}
                            src={'/assets/images/size-chart.jpg'}
                            alt={'size-chart'}
                            className={''}
                          />
                        </div>
                      )}
                    </div>
                  }
                </div>
                <SizeQtyInput
                  price={price?.msrp}
                  size={selectSize}
                  setShowSingleInv={setShowSingleInv}
                />
              </>
            ) : (
              <>
                <Inventory_Type3_2
                  attributeOptionId={selectedColor.attributeOptionId}
                  storeCode={''}
                />
                <div className='mt-[15px]'>
                  <div className='flex flex-wrap justify-between items-center'>
                    <div onClick={() => setShowSingleInv(true)}>
                      <a className='' id='ShowSingleSize'>
                        Click here to add single size
                      </a>
                    </div>
                    <div>
                      <div className='ml-[10px]'>
                        <a
                          href='javascript:void(0);'
                          data-modal-toggle='sizechartModal'
                        >
                          <div
                            className='size-chart p-t-20 ml-[10px]'
                            onClick={() => modalHandler('sizeChart')}
                          >
                            <NxtImage
                              isStatic={true}
                              src={'/assets/images/size-chart.jpg'}
                              alt={'size-chart'}
                              className={''}
                            />
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        <div>
          <div className={`mt-[15px] bg-light-gray  p-[20px]`}>
            <div
              className={`${
                store_Code == _Store.type6 ? 'text-sm' : 'text-default-text'
              } flex flex-wrap items-center`}
            >
              <div
                className={` ${
                  store_Code == _Store.type6 ? '' : ' mr-[20px]'
                } w-[112px]`}
              >
                <span className=''>You Pay</span>
              </div>
              <div className=''>
                <span className='text-2xl tracking-wider'>
                  $
                  {storeCode === BACARDI
                    ? priceForBacardi()
                    : selectSize === ''
                    ? price?.msrp
                    : toCheckout.totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
            <div className='w-full text-left flex justify-end mt-[20px]'>
              <BuyNowHandler size='k' />
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
