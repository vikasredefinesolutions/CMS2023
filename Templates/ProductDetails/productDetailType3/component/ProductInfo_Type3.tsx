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
  UCA,
  UNITI_CODE,
  _Store_CODES,
} from '@constants/global.constant';
import { _modals } from '@definations/product.type';
import BuyNowHandler from './BuyNowHandler';
import InStock_Type3 from './InStock_Type3';
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
  const [selectSize, setSelectSize] = useState('');

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
        return toCheckout.totalPrice.toFixed(2);
      }
    } else {
      if (toCheckout.totalPrice.toFixed() == '0') {
        return price?.msrp;
      } else {
        return toCheckout.totalPrice.toFixed(2);
      }
    }
  };

  useEffect(() => {
    setSelectSize('');
  }, [selectedColor]);
  const { price } = useTypedSelector_v2((state) => state.product.product);
  const { minQuantity } = useTypedSelector_v2(
    (state) => state.product.selected.color,
  );
  // console.log(data, 'asdlkflksadfjksalkdjfkjaslkdfjklksadjflksdajf');
  const [showSingleInv, setShowSingleInv] = useState(true);
  const { updatePrice, clearToCheckout } = useActions_v2();
  useEffect(() => {
    updatePrice({ price: price?.msrp || 0 });
  }, [price?.msrp]);

  const sizeChart = useTypedSelector_v2(
    (state) => state.product.product.sizeChart,
  );

  const { code } = useTypedSelector_v2((state) => state.store);

  return (
    <>
      <div
        className={`${
          storeCode === THD_STORE_CODE
            ? 'col-span-1 mt-[15px] pl-[8px] pr-[8px] md:pl-[15px] md:pr-[15px] sm:pl-[0px] sm:pr-[0px] lg:mt-[0px]'
            : 'lg:col-end-13 lg:col-span-5 mt-[15px] md:mt-[40px] px-0 lg:px-[15px] sm:px-0 sm:mt-[64px] lg:mt-0 link-custom'
        }`}
      >
        <div
          className={`mb-[15px] border-b border-b-gray-border ${
            storeCode === _Store_CODES.UNITi ? 'hidden lg:block ' : ''
          }`}
        >
          <div
            className={`${
              store_Code == _Store.type6
                ? 'text-title-text mb-[15px]'
                : storeCode === _Store_CODES.UNITi
                ? `text-large-text md:text-sub-text lg:${
                    storeCode === _Store_CODES.UNITi
                      ? 'text-large-text'
                      : 'text-title-text'
                  } mb-[15px]`
                : `text-title-text md:text-sub-text lg:${
                    storeCode === _Store_CODES.UNITi
                      ? 'text-large-text'
                      : 'text-title-text'
                  } mb-[15px] `
            }`}
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
            <span className='inline-block w-[128px] font-bold'>
              {storeCode === THD_STORE_CODE ||
              storeCode === SIMPLI_SAFE_CODE ||
              storeCode === CYXTERA_CODE ||
              store_Code == _Store.type6 ||
              store_Code == UNITI_CODE ||
              storeCode === UCA ||
              store_Code == BACARDI ||
              storeCode == SIMPLI_SAFE_CODE ||
              storeCode === _Store_CODES.USAAPUNCHOUT
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
        {storeCode == SIMPLI_SAFE_CODE ? <InStock_Type3 /> : <></>}
        <AvailableColors_Type3 />
        {minQuantity > 0 && (
          <div>
            <div className='!text-default-text text-red-500 mb-[10px]'>
              The minimum order requirement for this piece is {minQuantity} for
              this color.
            </div>
          </div>
        )}

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
                storeCode={storeCode}
                selectSize={selectSize}
                setSelectSize={setSelectSize}
              />

              {sizeChart && (
                <div className='pb-[10px] ml-[10px]'>
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
                      ) : sizeChart &&
                        Object.keys(sizeChart?.sizeChartView).length != 0 ? (
                        <div
                          className='size-chart p-t-20 ml-[10px]'
                          onClick={() => modalHandler('sizeChart')}
                        >
                          {/* sizeChart */}
                          <NxtImage
                            isStatic={true}
                            src={'/assets/images/size-chart.jpg'}
                            alt={'size-chart'}
                            className={''}
                          />
                        </div>
                      ) : (
                        ''
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
                    <div
                      onClick={() => {
                        clearToCheckout();
                        setShowSingleInv(true);
                      }}
                    >
                      <a
                        className={` ${
                          storeCode == BACARDI
                            ? 'text-default hover:text-default cursor-pointer'
                            : ''
                        }`}
                        id='ShowSingleSize'
                      >
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
          <div className={`mt-[15px] bg-light-gray  p-[10px]`}>
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
            <div
            // className={`${
            //   storeCode == UNITI_CODE ||
            //   storeCode == UCA ||
            //   storeCode == SIMPLI_SAFE_CODE
            //     ? ''
            //     : 'w-full text-left flex justify-end mt-[20px '
            // }`}
            >
              <BuyNowHandler size='k' />
            </div>
          </div>
        </div>
      </div>

      {openModal === 'login' && <LoginModal modalHandler={modalHandler} />}
      {openModal === 'sizeChart' && (
        <SizeChartModal
          storeCode={storeCode || ''}
          modalHandler={modalHandler}
        />
      )}
    </>
  );
};

export default ProductInfo_Type3;
