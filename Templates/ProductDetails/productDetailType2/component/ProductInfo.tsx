import Price from '@appComponents/Price';
import PersonalizeFontModal from '@appComponents/modals/PersonalizeFontModal/PersonalizeFontModal';
import LoginModal from '@appComponents/modals/loginModal';
import { _modals } from '@appComponents/modals/modal';
import SizeChartModal from '@appComponents/modals/sizeChartModal/SizeChartModal';
import { storeBuilderTypeId } from '@configs/page.config';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { SbStore_fn } from '@services/product.service';
import { _sbsStore_props } from '@templates/ProductDetails/productDetails';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AvailableColors from './AvailableColors';
import DiscountPrice from './DiscountPrice';
import DiscountPricing from './DiscountPricing';
import Inventory from './ProductInventory';
import { _ProductInfoProps } from './productDetailsComponents';

const ProductInfo: React.FC<_ProductInfoProps> = ({ product, storeCode }) => {
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
  const { id: userId } = useTypedSelector_v2((state) => state.user);
  const { showModal, updateSbsStore } = useActions_v2();
  const router = useRouter();
  const [sbstoreList, setSbstoreList] = useState<_sbsStore_props[] | any>([]);
  const [sbs_state, setSbs_state] = useState<
    { [key: string]: string | number }[]
  >([]);
  const { storeTypeId } = useTypedSelector_v2((state) => state.store);

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
      <div className='col-span-1 mt-[15px] pl-[0px] pr-[0px] md:pl-[15px] md:pr-[15px] sm:pl-[0px] sm:pr-[0px] lg:mt-[0px]'>
        <div className='hidden md:flex flex-wrap'>
          <div className='w-full'>
            <h1 className='text-title-text'>{product?.name}</h1>
          </div>
        </div>
        <div className='mainsection text-center text-sm leading-none mt-[20px]'>
          <div className='md:pt-[20px] md:pb-[20px] text-center bg-quaternary'>
            <div className='md:flex justify-center'>
              <div className='w-full md:w-auto inline-block p-[20px] md:pt-0 md:pb-0 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-white'>
                <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
                  <span className='material-icons leading-[15px] text-tertiary'>
                    {__pagesText.productListing.Banner.shippingIcon}
                  </span>
                  <div className='ml-[8px] text-left text-extra-small-text leading-[15px] tracking-[1px] text-[#ffffff]'>
                    <div>{__pagesText.productListing.Banner.shiping}</div>
                    <div> {__pagesText.productListing.Banner.location}</div>
                  </div>
                </div>
              </div>
              <div className='w-full md:w-auto inline-block p-[20px] md:pt-0 md:pb-0 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-white'>
                <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
                  <span className='material-icons leading-[15px] text-secondary'>
                    {__pagesText.productListing.Banner.drawIcon}
                  </span>
                  <div className='ml-[8px] text-left text-extra-small-text leading-[15px] tracking-[1px] text-[#ffffff]'>
                    <div>{__pagesText.productListing.Banner.firstLogoFree}</div>
                    <div>
                      {__pagesText.productListing.Banner.uptoTenThousandStiches}
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-full md:w-auto inline-block p-[20px] md:pt-0 md:pb-0 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-white'>
                <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
                  <span className='material-icons leading-[15px] text-primary'>
                    {__pagesText.productListing.Banner.verifyIcon}
                  </span>
                  <div className='ml-[8px] text-left text-extra-small-text leading-[15px] tracking-[1px] text-[#ffffff]'>
                    <div>{__pagesText.productListing.Banner.freeProof}</div>
                    <div>{__pagesText.productListing.Banner.onAllOrders}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=''>
          <div className='pt-[15px] text-default-text'>
            <span className='inline-block w-[90px]'>
              {' '}
              {__pagesText.productInfo.sku}
            </span>
            <span>:</span> <span className='ml-[4px]'>{product?.sku}</span>
          </div>
          <div className='pt-[15px] text-default-text'>
            <span className='inline-block w-[90px]'>
              {' '}
              {__pagesText.productInfo.msrp}
            </span>

            <span className='ml-[4px]'>
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
        <AvailableColors />

        <div className='pt-[15px] text-default-text text-right items-end justify-between text-anchor hover:text-anchor-hover'>
          <a
            href='javascript:void(0)'
            className=' underline'
            data-modal-toggle='FitandSize'
            onClick={() => modalHandler('sizeChart')}
          >
            Fit and Size
          </a>{' '}
          <a
            href='javascript:void(0)'
            className='underline'
            data-modal-toggle='Personalize'
            onClick={() => {
              modalHandler('personalizationFonts');
            }}
          >
            Personalize
          </a>
        </div>
        {userId && (
          <Inventory
            attributeOptionId={selectedColor.attributeOptionId}
            storeCode={''}
          />
        )}

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

        {userId ? (
          <>
            {' '}
            <div className='pt-[15px] text-default-text'>
              <div className='text-red-700'>
                {__pagesText.productInfo.notesPk.minimumPiecePerColor}
              </div>
            </div>
            <div className='pt-[15px] text-default-text flex flex-wrap items-center gap-[10px]'>
              <DiscountPrice
                storeCode={storeCode}
                ourCost={product?.ourCost || 0}
                msrp={product?.msrp || 0}
                imap={product?.imap || 0}
                salePrice={pricePerItem || 0}
              />
            </div>
          </>
        ) : (
          <>
            <div className='pt-[15px] text-default-text'>
              <div className='text-red-700'>
                {
                  __pagesText.productInfo.notesPk
                    .minimumPiecePerColorWithoutLogin
                }
              </div>
            </div>
          </>
        )}

        <form className='mt-[24px]'>
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
        </form>
        <div className='pt-[15px] text-default-text '>
          <span className='font-bold'>
            {__pagesText.productInfo.notesPk.pleaseNote}
          </span>
          <span>{__pagesText.productInfo.notesPk.backordered}</span>
        </div>
      </div>
      {openModal === 'sizeChart' && (
        <SizeChartModal storeCode={storeCode} modalHandler={modalHandler} />
      )}
      {openModal === 'personalizationFonts' && (
        <PersonalizeFontModal modalHandler={modalHandler} />
      )}
      {openModal === 'login' && <LoginModal modalHandler={modalHandler} />}
    </>
  );
};

export default ProductInfo;
