import AvailableInventoryModal from '@appComponents/modals/availableInventoryModal/AvailableInventoryModal';
import ForgotModal from '@appComponents/modals/forgotModal';
import LoginModal from '@appComponents/modals/loginModal';
import { _modals } from '@appComponents/modals/modal';
import SizeChartModal from '@appComponents/modals/sizeChartModal/SizeChartModal';
import StartOrderModal from '@appComponents/modals/startOrderModal/StartOrderModal';
// import StartOrderModal from '@appComponents/modals/startOrderModal/startOrderModal';
import Price from '@appComponents/reUsable/Price';
import { __pagesConstant } from '@constants/pages.constant';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';

import { useRouter } from 'next/router';
import React, { useState } from 'react';
import AvailableColors from './AvailableColors';
import DiscountPricing from './DiscountPricing';
import ProductFeatures from './ProductFeatures';
import { _ProductInfoProps } from './productDetailsComponents';

const ProductInfo: React.FC<_ProductInfoProps> = ({ product, storeCode }) => {
  const { setShowLoader } = useActions_v2();
  const [showExtra, setShowExtra] = useState(false);
  const [openModal, setOpenModal] = useState<null | _modals>(null);
  const color = useTypedSelector_v2((state) => state.product.selected.color);
  const sizes = useTypedSelector_v2((state) => state.product.product.sizes);

  const router = useRouter();

  const modalHandler = (param: null | _modals) => {
    if (param) {
      setOpenModal(param);
      return;
    }
    setOpenModal(null);
  };

  const goToProduct = (seName: string | null) => {
    if (seName === null) return;
    router.push(`${seName}`);
  };

  const consultationURL = `${paths.REQUEST_CONSULTATION}?productid=${product.id}&title=Request%20Consultation%20%26%20Proof&Color=${color.name}`;
  const showExtraButton =
    product.description.length >=
    __pagesConstant._productDetails.descriptionLength;

  return (
    <div className='col-span-1 mt-[15px] pl-[8px] pr-[8px] md:pl-[15px] md:pr-[15px] sm:pl-[0px] sm:pr-[0px] lg:mt-[0px]'>
      <div className='hidden md:flex flex-wrap'>
        <div className='w-full md:w-2/3'>
          <h1 className='font-[600] text-large-text'>{product.name}</h1>

          <div className='pt-[3px] text-default-text'>
            <span className='font-[600] inline-block w-[43px]'>
              {__pagesText.productInfo.sku}
            </span>
            <span className='ml-[4px]'>: {product.sku}</span>
          </div>

          <div className='text-black text-sm'>
            <span className='font-[600] inline-block w-[43px]'>
              {__pagesText.productInfo.msrp}
            </span>
            <span className='ml-[4px]'>
              <Price
                value={undefined}
                prices={{ msrp: product.msrp, salePrice: product.salePrice }}
                addColon={true}
              />
            </span>
          </div>
        </div>

        <div className='w-full md:w-1/3 mt-[10px] md:text-right'>
          <div className='inline-flex items-center'>
            <a
              href='javascript:void(0);'
              onClick={() => router.push(consultationURL)}
              className='text-anchor hover:!text-anchor-hover text-normal-text pr-[1px] font-[600] underline '
            >
              {__pagesText.productInfo.requestConsultaionProof}
            </a>
            <span className='material-icons-outlined leading-none text-[20px] font-[600] w-[15px] text-anchor hover:text-anchor-hover !no-underline'>
              chevron_right
            </span>
          </div>
        </div>
      </div>

      <AvailableColors />
      <DiscountPricing
        title='Exclusivepricing'
        storeCode={storeCode}
        showMsrpLine={true}
        price={{
          msrp: product.msrp,
          salePrice: product.salePrice,
        }}
        showLogin={!product.isDiscontinue}
        modalHandler={modalHandler}
        isSpecialBrand={product.isSpecialBrand}
      />

      <div className='ml-[10px] mr-[10px] mt-[13px]'>
        <button
          type='button'
          className='text-anchor hover:text-anchor-hover font-[600] underline text-normal-text'
          onClick={() => modalHandler('availableInventory')}
        >
          {__pagesText.productInfo.checkAvailableInventory}
        </button>
      </div>

      <div className='ml-[10px] mr-[10px] mt-[6px] flex flex-wrap justify-between gap-[8px] items-center'>
        <div className='pt-[10px] text-sub-text'>
          <span className='font-[600]'>
            {__pagesText.productInfo.availableSizes}
          </span>
          <span className='ml-[5px]'>{` ${sizes}`}</span>
        </div>

        {!sizes.includes('MISC') && (
          <div className='pb-[0px]'>
            <button
              type='button'
              className='text-anchor hover:text-anchor-hover font-[600] underline text-default-text'
              onClick={() => modalHandler('sizeChart')}
            >
              {__pagesText.productInfo.sizeChart}
            </button>
          </div>
        )}
      </div>

      {product.companionProductName && (
        <div className='ml-[10px] mr-[10px] mt-[19px] text-sub-text'>
          <div className='font-[600]'>
            {__pagesText.productInfo.companionProduct}
          </div>
          <div className='mt-[9px]'>
            <button
              onClick={() =>
                goToProduct(`${product.companionProductSEName}.html`)
              }
              className='text-anchor hover:text-anchor-hover font-[600] underline text-normal-text'
            >
              {product.companionProductName}
            </button>
          </div>
        </div>
      )}

      <div className='m-[10px] mt-[18px]'>
        <h3 className='font-[600] mb-[12px] text-title-text'>
          {__pagesText.productInfo.description}
        </h3>
        <div
          className={`relative text-default-text tracking-widest div_description transition-all pb-[32px] ${
            !showExtra && 'h-32 overflow-hidden'
          }`}
        >
          <div
            className='pb-[12px]'
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          ></div>
          {showExtraButton && (
            <div
              className={`bg-gradient-to-b from-[#fffefe00] to-[#ffffff] absolute bottom-0 left-0 right-0 pt-[80px] text-center ${
                !showExtra && 'pt-20'
              } text-center`}
            >
              <button
                className='text-anchor tracking-normal text-base underline font-bold'
                onClick={() => setShowExtra((show) => !show)}
              >
                {showExtra ? 'Read Less' : 'Read More'}
              </button>
            </div>
          )}
        </div>
      </div>

      <form className='mt-[24px]'>
        <div className='m-[12px] mt-[24px]'>
          <button
            type='button'
            disabled={product.isDiscontinue}
            onClick={() => {
              setOpenModal('startOrder');
              setShowLoader(true);
            }}
            className='btn btn-xl btn-secondary w-full'
          >
            {product.isDiscontinue ? 'Discontinued' : 'START ORDER'}
          </button>
        </div>

        {/* {product.isDiscontinue && (
          <TopRatedProducts
            title={'Top Rated Alternatives'}
            suggestedProducts={product.suggestedProducts}
          />
        )} */}

        <div className='mt-[20px] text-center'>
          <a
            href='javascript:void(0);'
            onClick={() => router.push(consultationURL)}
            className='text-anchor tracking-normal text-base underline font-bold'
          >
            {__pagesText.productInfo.requestAFreeConsulation}
          </a>
        </div>
      </form>

      <ProductFeatures />

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
