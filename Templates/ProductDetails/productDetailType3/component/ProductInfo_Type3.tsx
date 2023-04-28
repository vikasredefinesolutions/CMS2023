import LoginModal from '@appComponents/modals/loginModal';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { _modals } from '@definations/startOrderModal';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AvailableColors_Type3 from './AvailableColors_Type3';
// import SizeChart_Type3 from './ProductSizeChart_Type3';
import SizeChartModal from '@appComponents/modals/sizeChartModal/SizeChartModal';
import BuyNowHandler from './BuyNowHandler';
import Inventory_Type3 from './ProductInventory_Type3';
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
      console.log(sizeQtys);
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

  return (
    <>
      <div className='lg:col-end-13 lg:col-span-5 mt-[15px] md:mt-[40px] px-0 lg:px-[15px] sm:px-0 sm:mt-[64px] lg:mt-0'>
        <div className='mb-[15px] border-b border-b-gray-border'>
          <div className='text-medium-text md:text-sub-text lg:text-title-text mb-[15px]'>
            {product?.name}
          </div>
        </div>
        {/* <div className='mainsection text-center text-sm leading-none mt-[20px]'>
          <div className='md:pt-[20px] md:pb-[20px] text-center bg-quaternary'>
            <div className='md:flex justify-center'>
              <div className='w-full md:w-auto inline-block p-[20px] md:pt-0 md:pb-0 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-white'>
                <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
                  <span className='material-icons text-2xl-text leading-[15px] text-tertiary'>
                    {__pagesText.productListing.Banner.shippingIcon}
                  </span>
                  <div className='ml-[8px] text-left text-extra-small-text leading-[15px] tracking-[1px] text-white'>
                    <div>{__pagesText.productListing.Banner.shiping}</div>
                    <div> {__pagesText.productListing.Banner.location}</div>
                  </div>
                </div>
              </div>
              <div className='w-full md:w-auto inline-block p-[20px] md:pt-0 md:pb-0 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-white'>
                <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
                  <span className='material-icons text-2xl-text leading-[15px] text-secondary'>
                    {__pagesText.productListing.Banner.drawIcon}
                  </span>
                  <div className='ml-[8px] text-left text-extra-small-text leading-[15px] tracking-[1px] text-white'>
                    <div>{__pagesText.productListing.Banner.firstLogoFree}</div>
                    <div>
                      {__pagesText.productListing.Banner.uptoTenThousandStiches}
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-full md:w-auto inline-block p-[20px] md:pt-0 md:pb-0 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-white'>
                <div className='w-full md:w-auto flex flex-wrap justify-center items-center'>
                  <span className='material-icons text-2xl-text leading-[15px] text-primary'>
                    {__pagesText.productListing.Banner.verifyIcon}
                  </span>
                  <div className='ml-[8px] text-left text-extra-small-text leading-[15px] tracking-[1px] text-white'>
                    <div>{__pagesText.productListing.Banner.freeProof}</div>
                    <div>{__pagesText.productListing.Banner.onAllOrders}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
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
          {/* <div className='pt-[15px] text-default-text'>
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
          </div> */}
        </div>
        {/* <DiscountPricing_Type3
          storeCode={storeCode}
          showMsrpLine={true}
          price={{
            msrp: product ? product.msrp : 0,
            salePrice: product ? product.salePrice : 0,
          }}
          showLogin={product ? !product.isDiscontinue : false}
          modalHandler={modalHandler}
        /> */}
        <AvailableColors_Type3 />
        {/* <div className='pt-[15px] text-default-text'>
          <span className='inline-block w-[90px]'>Color Name</span>
          <span>:</span> <span className='ml-[4px]'>Stonewash</span>
        </div> */}

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
        {/* <div className='pt-[15px] text-default-text text-right'>
          <a
            href='javascript:void(0);'
            className='text-anchor hover:text-anchor-hover underline'
            data-modal-toggle='FitandSize'
          >
            Fit and Size
          </a>{' '}
          <a
            href='javascript:void(0);'
            className='text-anchor hover:text-anchor-hover underline'
            data-modal-toggle='Personalize'
          >
            Personalize
          </a>
        </div> */}
        <Inventory_Type3
          attributeOptionId={selectedColor.attributeOptionId}
          storeCode={''}
        />
        {/* <div className='pt-[15px] text-default-text'>
          <div className='text-red-700'>
            {__pagesText.productInfo.notesPk.minimumPiecePerColor}
          </div>
        </div> */}
        {/* <div className='pt-[15px] text-default-text flex flex-wrap items-center gap-[10px]'>
          <DiscountPrice_Type3
            storeCode={storeCode}
            ourCost={product?.ourCost || 0}
            msrp={product?.msrp || 0}
            imap={product?.imap || 0}
            salePrice={pricePerItem || 0}
          />
        </div> */}
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
