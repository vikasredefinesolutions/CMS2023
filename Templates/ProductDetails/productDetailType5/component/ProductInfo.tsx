import LoginModal from '@appComponents/modals/loginModal';
import { _modals } from '@appComponents/modals/modal';
import ProductQuoteRequest from '@appComponents/modals/ProductQuoteRequest';
import SizeChartModal from '@appComponents/modals/sizeChartModal/SizeChartModal';
import Price from '@appComponents/Price';
import { storeBuilderTypeId } from '@configs/page.config';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { _ProductColor } from '@definations/APIs/colors.res';
import {
  _ProductDetails,
  _ProductDoNotExist,
} from '@definations/APIs/productDetail.res';
// import { _ProductColor } from '@definations/APIs/colors.res';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import {
  FetchColors,
  FetchProductById,
  SbStore_fn,
} from '@services/product.service';
import { _sbsStore_props } from '@templates/ProductDetails/productDetails';
import ProductCompanion from '@templates/ProductDetails/productDetailType5/component/ProductCompanion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { _globalStore } from 'store.global';
import AvailableColors from './AvailableColors';
import DiscountInfo from './DiscountInfo';
import DiscountPrice from './DiscountPrice';
import DiscountPricing from './DiscountPricing';
import FreeBannerTemplate5 from './FreeBannerTemplate5';
import { _ProductInfoProps } from './productDetailsComponents';
import Inventory from './ProductInventory';

const ProductInfo: React.FC<_ProductInfoProps> = ({ product, storeCode }) => {
  const [selecteCompanionimg, setselecteCompanionimg] = useState(
    product?.companionProductImage,
  );
  let mediaBaseUrl = _globalStore.blobUrl;
  let flag: boolean = false;
  const [openModal, setOpenModal] = useState<null | _modals>(null);
  const {
    totalQty,
    minQty,
    sizeQtys,
    price: pricePerItem,
  } = useTypedSelector_v2((state) => state.product.toCheckout);
  const selectedColor = useTypedSelector_v2(
    (state) => state.product.selected.color,
  );
  const [companionProduct, setCompanionProduct] = useState<
    _ProductDetails | null | _ProductDoNotExist
  >(null);
  const [companionProductcolor, setCompanionProductcolor] = useState<
    _ProductColor[] | null
  >();
  const [companionsplitproductList, setSplitproductList] = useState<
    _ProductColor[] | null
  >();
  const { isAttributeSaparateProduct } = useTypedSelector_v2(
    (state) => state.store,
  );
  const { id: userId } = useTypedSelector_v2((state) => state.user);
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const { showModal, updateSbsStore } = useActions_v2();
  const router = useRouter();
  const [sbstoreList, setSbstoreList] = useState<_sbsStore_props[] | any>([]);
  const [sbs_state, setSbs_state] = useState<
    { [key: string]: string | number }[]
  >([]);
  const { storeTypeId } = useTypedSelector_v2((state) => state.store);
  const { color } = useTypedSelector_v2((state) => state.product.selected);
  const fetch_SbStore = async () => {
    try {
      await SbStore_fn({ productId: product?.id }).then((res) => {
        setSbstoreList(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (storeTypeId == storeBuilderTypeId) {
      fetch_SbStore();
    }
  }, [storeTypeId]);

  const modalHandler = (param: null | _modals) => {
    if (param) {
      setOpenModal(param);
      return;
    }
    setOpenModal(null);
  };
  useEffect(() => {
    if (product?.companionProductSEName && product.companionProductId) {
      FetchProductById({
        storeId: storeId,
        seName: product?.companionProductSEName,
        productId: 0,
      }).then((res) => {
        if (res) setCompanionProduct(res);
      });

      FetchColors({
        productId: product.companionProductId || 0,
        storeId,
        isAttributeSaparateProduct: true,
      }).then((res) => {
        if (res) setCompanionProductcolor(res);
      });
      if (true) {
        FetchColors({
          productId: product.companionProductId || 0,
          storeId,
          isAttributeSaparateProduct: false,
        }).then((res) => {
          if (res) setSplitproductList(res);
        });
      }
    }
  }, [storeId, product?.companionProductSEName]);
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
      // if (sbstoreList.length !== sbs_state.length) {
      //   showModal({
      //     message: `Please enter additional custom field.`,
      //     title: 'Required field',
      //   });
      //   return;
      // }
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
  const blurHandler = (e: any, charge: number) => {
    updateSbsStore({
      name: e.target.name,
      value: e.target.value,
      charge: charge,
    });
  };

  const goToProduct = (seName: string | null) => {
    if (seName === null) return;
    router.push(`${seName}`);
  };

  const selected = useTypedSelector_v2((state) => state.product.selected);
  return (
    <>
      {/* need to change call */}
      <div
        className={`lg:col-span-${
          product?.companionProductId ? '4' : '6'
        } mt-[15px] pl-[0px] pr-[0px] md:pl-[15px] md:pr-[15px] lg:my-[30px]`}
      >
        <div className='hidden md:flex flex-wrap'>
          <div className='w-full'>
            <h1 className='text-title-text !font-bold pb-[10px]'>
              {product?.name}
            </h1>
            <div className=''>
              <a className='inline-flex items-center gap-[5px] font-medium tracking-[1px] '>
                <span>
                  <img
                    src='assets/images/personalize-icon.png'
                    className='max-h-6'
                    alt=''
                  />
                </span>
                <span>PERSONALIZE WITH YOUR LOGO</span>
              </a>
            </div>
          </div>
        </div>

        <FreeBannerTemplate5 />
        <div className=''>
          <div className='pt-[15px] flex items-center text-default-text'>
            <span className='inline-block w-[130px] !font-bold'>
              {' '}
              {__pagesText.productInfo.sku}
            </span>
            <span>:</span> <span className='ml-[8px]'>{product?.sku}</span>
          </div>
          <div className='pt-[15px] flex items-center text-default-text'>
            <span className='inline-block w-[130px] !font-bold'>
              {' '}
              {__pagesText.productInfo.msrp}
            </span>

            <span className='ml-[8px]'>
              <Price
                value={undefined}
                prices={{
                  msrp: product ? product.msrp : 0,
                  salePrice: product ? product.salePrice : 0,
                }}
                addColon={true}
              />{' '}
            </span>
          </div>
        </div>
        <DiscountPricing
          storeCode={storeCode}
          showMsrpLine={true}
          price={{
            msrp: product ? product.msrp : 0,
            salePrice: product ? product.salePrice : 0,
          }}
          showLogin={product ? !product.isDiscontinue : false}
          modalHandler={modalHandler}
        />

        <AvailableColors modalHandler={modalHandler} />

        {/* <div className='pt-[15px] text-default-text text-right'>
          <a
            className='text-anchor hover:text-anchor-hover '
            data-modal-toggle='FitandSize'
            onClick={() => modalHandler('sizeChart')}
          >
            <img src={'/assets/images/size-chart.jpg'} alt={'Fit and Size'} />
          </a>{' '}
        </div> */}

        <Inventory
          attributeOptionId={selectedColor.attributeOptionId}
          storeCode={''}
        />

        {/* only for substore */}

        <>
          {sbstoreList &&
            sbstoreList?.map((el: _sbsStore_props, index: number) => {
              return (
                <div
                  className='flex flex-wrap justify-between items-center mt-[18px] pb-[8px] text-default-text border-b border-b-gray-border'
                  key={index}
                >
                  <div className='flex items-center justify-center my-[10]'>
                    <span className='mr-[3px] text-sub-text w-52'>
                      {el.name}
                    </span>
                    <span className='text-large-text mr-5'>
                      <input
                        type='text'
                        name={el.name}
                        className='form-input !px-[10px] !inline-block !w-[100px]'
                        onBlur={(e) => blurHandler(e, el.customizationCharges)}
                      />
                    </span>
                    <span>
                      ${el.customizationCharges.toFixed(2)} extra charge per
                      character
                    </span>
                  </div>
                </div>
              );
            })}
        </>

        {userId && (
          <DiscountInfo
            storeCode={storeCode}
            product={product}
            pricePerItem={pricePerItem}
          />
        )}
        <div className='mt-[10px] p-[15px] text-default-text flex flex-wrap items-center gap-[10px] bg-light-gray'>
          <DiscountPrice
            storeCode={storeCode}
            ourCost={product?.ourCost || 0}
            msrp={product?.msrp || 0}
            imap={product?.imap || 0}
            salePrice={pricePerItem || 0}
          />
        </div>
        {/* <CreateAccount />
        <LoginComp  modalHandler={modalHandler} /> */}

        <div className='mt-[20px]'>
          <a
            onClick={(e) => {
              setOpenModal('qouteRequest');
              // disabled={product?.isDiscontinue}
              // buyNowHandler(e, !!userId);
            }}
            className='btn btn-secondary w-full text-center cursor-pointer'
          >
            {/* {product?.isDiscontinue
                ? 'Discontinued'
                : userId
                ? 'CUSTOMIZE NOW AND ADD TO CART'
                : 'LOGIN TO SHOP NOW WITH LIVE INVENTORY'} */}
            CLICK HERE TO SUBMIT A QUOTE REQUEST
          </a>
        </div>
      </div>
      {product?.companionProductId != 0 &&
      companionsplitproductList &&
      companionProductcolor ? (
        <ProductCompanion
          product={product}
          companionsplitproductList={companionsplitproductList}
          companionProductcolor={companionProductcolor}
        />
      ) : null}
      {openModal === 'login' && <LoginModal modalHandler={modalHandler} />}
      {openModal === 'sizeChart' && (
        <SizeChartModal storeCode={storeCode} modalHandler={modalHandler} />
      )}{' '}
      {openModal === 'qouteRequest' && (
        <ProductQuoteRequest
          product={product?.name}
          modalHandler={modalHandler}
          productColor={color.name}
        />
      )}
    </>
  );
};

export default ProductInfo;
