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

import { __ValidationText } from '@constants/validation.text';
import { Klaviyo_BackInStock } from '@services/klaviyo.service';
import { ErrorMessage, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import * as Yup from 'yup';
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

  const goToProduct = (seName: string | null) => {
    if (seName === null) return;
    router.push(`${seName}`);
  };

  const startOrderBtnText = () => {
    let text = 'START ORDER';

    if (isEmployeeLoggedIn) {
      text = 'START ORDER';
      return text;
    }
    if (product.isDiscontinue && !isEmployeeLoggedIn) {
      text = 'Discontinued';
    }
    return text;
  };

  const consultationURL = `${paths.REQUEST_CONSULTATION}?productid=${product.id}&title=Request%20Consultation%20%26%20Proof&Color=${color?.name}`;
  const showExtraButton =
    product.description.length >=
    __pagesConstant._productDetails.descriptionLength;

  const { inventory: inv } = useTypedSelector_v2(
    (state) => state.product.product,
  );
  const [email, setEmail] = useState<string>('');

  const sendEmailHandler = async (values: { email: string }) => {
    const sizeAttributeOptionId = inv?.inventory.find(
      (item) => item.productId === product.id,
    )?.attributeOptionId;
    const response = await Klaviyo_BackInStock({
      email: values.email,
      variant: `${sizeAttributeOptionId}`,
      platform: 'api',
      a: klaviyokey || '',
      storeId: storeId,
    });
    if (response) {
      setEmail('SENT');
    }
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(__ValidationText.email.required),
  });

  const HTML_START_ORDER_BUTTON = () => {
    const totalInventoryCount = inventory?.inventory.reduce(
      (accumulator, currentValue) => accumulator + currentValue.inventory,
      0,
    );
    if (product.isDiscontinue && !isEmployeeLoggedIn) {
      return (
        <form className='mt-[24px]'>
          <div className='m-3 mt-6'>
            <button
              type='button'
              disabled={product.isDiscontinue}
              className='btn btn-xl btn-secondary !flex items-center justify-center lg:!text-3xl w-full uppercase cursor-pointer'
            >
              DISCONTINUED
            </button>
          </div>
        </form>
      );
    }
    if (
      totalInventoryCount === undefined ||
      isEmployeeLoggedIn ||
      (totalInventoryCount && totalInventoryCount > 0) ||
      product.isDropShipProduct
    ) {
      return (
        <form className='mt-[24px]'>
          <div className='m-3 mt-6'>
            <button
              type='button'
              onClick={() => {
                setOpenModal('startOrder');
                setShowLoader(true);
              }}
              className='btn btn-xl btn-secondary !flex items-center justify-center lg:!text-3xl w-full uppercase'
            >
              {startOrderBtnText()}
            </button>
          </div>
        </form>
      );
    }

    return (
      <>
        <div className='m-3 mt-6'>
          <button
            type='button'
            disabled={true}
            className='btn btn-xl bg-light-gray !flex items-center justify-center lg:!text-3xl w-full uppercase'
          >
            Out of Stock
          </button>
        </div>
        {email === 'SENT' ? (
          <div className='text-center text-medium-text font-bold px-2 py-4'>
            {
              __pagesText.productInfo.startOrderModal.sizePriceQty.selectOrInput
                .thanksForSigningUp
            }
          </div>
        ) : (
          <>
            <p className='font-bold text-medium-text mb-2 '>
              Get Inventory Alert
            </p>
            <Formik
              initialValues={{ email: '' }}
              onSubmit={(values) => sendEmailHandler(values)}
              validationSchema={validationSchema}
            >
              {({ values, handleChange }) => {
                return (
                  <Form className='flex flex-wrap mt-[2px]'>
                    <input
                      type='text'
                      name='email'
                      autoComplete='off'
                      value={values.email}
                      onChange={handleChange}
                      className='grow bg-light-gray shadow-sm text-md py-1 px-2'
                    />

                    <button
                      type='submit'
                      className='btn btn-xl btn-secondary whitespace-nowrap'
                    >
                      {
                        __pagesText.productInfo.startOrderModal.sizePriceQty
                          .selectOrInput.notify
                      }
                    </button>

                    <ErrorMessage
                      name={'email'}
                      className='text-rose-500'
                      component={'p'}
                    />
                  </Form>
                );
              }}
            </Formik>
          </>
        )}
      </>
    );
  };

  return (
    <div className='col-span-1 mt-[15px] pl-[8px] pr-[8px] md:pl-[15px] md:pr-[15px] sm:pl-[0px] sm:pr-[0px] lg:mt-[0px] link-custom'>
      <div className='hidden md:flex flex-wrap'>
        <div className='w-full md:w-2/3'>
          <h1 className='font-[600] text-large-text' itemProp='name'>
            {product.name}
          </h1>
          <div className='pt-[3px] text-default-text'>
            <span className='font-[600] inline-block w-[43px]'>
              {__pagesText.productInfo.sku}
            </span>
            <span itemProp='sku' className='ml-[4px]'>
              : {product.sku}
            </span>
          </div>

          <div className='pt-[6px] text-default-text'>
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

        <div className='w-full md:w-1/3 mt-2.5 md:text-right text-sm font-semibold text-anchor'>
          <div className='inline-flex items-center'>
            <a
              href='javascript:void(0);'
              onClick={() => router.push(consultationURL)}
              className='!text-anchor hover:!text-anchor-hover text-normal-text pr-[1px]'
              title={__pagesText.productInfo.requestConsultaionProof}
            >
              {__pagesText.productInfo.requestConsultaionProof}
            </a>{' '}
            <span className='material-icons-outlined leading-none text-[20px] font-600 w-[15px] text-anchor hover:text-anchor-hover no-underline'>
              chevron_right
            </span>
          </div>
        </div>
      </div>
      <AvailableColors />
      <div
        itemProp='offers'
        itemType='https://schema.org/AggregateOffer'
        itemScope
      >
        <meta itemProp='lowPrice' content={`${product.salePrice}`} />
        <meta itemProp='highPrice' content={`${product.msrp}`} />
        <meta itemProp='priceCurrency' content='USD' />
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
      </div>
      {!product?.isDropShipProduct && (
        <div className='ml-[10px] mr-[10px] mt-[13px]'>
          <button
            type='button'
            className='!text-anchor hover:!text-anchor-hover text-normal-text'
            onClick={() => modalHandler('availableInventory')}
          >
            {__pagesText.productInfo.checkAvailableInventory}
          </button>
        </div>
      )}
      {/* <div className='ml-[10px] mr-[10px] mt-[13px]'>
        <button
          type='button'
          className='text-anchor hover:text-anchor-hover font-[600] underline text-normal-text'
          onClick={() => modalHandler('availableInventory')}
        >
          {__pagesText.productInfo.checkAvailableInventory}
        </button>
      </div> */}
      <div className='ml-[10px] mr-[10px] mt-[6px] flex flex-wrap justify-between gap-[8px] items-center'>
        <div className='pt-[10px] text-sub-text'>
          <span> {__pagesText.productInfo.availableSizes}</span>
          <span className='ml-[5px]'>{` ${sizes.replaceAll(',', ', ')}`}</span>
        </div>
        {sizeChart?.sizeChartView && (
          <div className='pb-[0px]'>
            <button
              type='button'
              className='!text-anchor hover:!text-anchor-hover text-default-text'
              onClick={() => modalHandler('sizeChart')}
            >
              {__pagesText.productInfo.sizeChart}
            </button>
          </div>
        )}
      </div>
      {/* <div className='ml-[10px] mr-[10px] mt-[6px] flex flex-wrap justify-between gap-[8px] items-center'>
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
      </div> */}
      {product.companionProductName && (
        <>
          <div className='text-lg mx-3 mt-3'>
            <div className='font-semibold'>
              {' '}
              {__pagesText.productInfo.companionProduct} :
            </div>
            <div>
              <a
                href='javascript:void(0);'
                onClick={() =>
                  goToProduct(`${product.companionProductSEName}.html`)
                }
                className='text-anchor hover:text-anchor-hover text-[15px] font-semibold underline leading-[20px]'
                title={product.companionProductName}
              >
                {product.companionProductName}
              </a>
            </div>
          </div>
          {/* <div className='ml-[10px] mr-[10px] mt-[19px] text-sub-text'>
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
          </div> */}
        </>
      )}
      <div className='m-[10px] mt-[18px]'>
        {(product.isShortDescriptionOnTop && product.shortDescription) && (
          <div
            itemProp='description'
            className='pb-5'
            dangerouslySetInnerHTML={{
              __html: product.shortDescription,
            }}
          />
        )}
        <div className='mb-[12px] text-title-text'>
          {__pagesText.productInfo.description}
        </div>
        <div
          className={`relative text-sm text-default-text div_description transition-all pb-[32px] ${
            !showExtra && 'h-32 overflow-hidden'
          }`}
        >
          <div
            itemProp='description'
            className='pb-10'
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          />
          {(!product.isShortDescriptionOnTop && product.shortDescription) && (
           <div
            itemProp='description'
            className='pb-10'
            dangerouslySetInnerHTML={{
              __html: product.shortDescription,
            }}
          ></div>
          )}

          {showExtraButton && (
            <div
              className={`bg-gradient-to-b from-[#fffefe00] to-[#ffffff] absolute bottom-0 left-0 right-0 pt-[80px] text-center ${
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
          )}
        </div>
      </div>

      {/* <div className='m-[10px] mt-[18px]'>
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
      </div> */}
      {HTML_START_ORDER_BUTTON()}
      {/* <div className='m-[12px] mt-[24px]'>
          <button
            type='button'
            disabled={product.isDiscontinue}
            onClick={() => {
              setOpenModal('startOrder');
              setShowLoader(true);
            }}
            className='btn btn-xl btn-secondary w-full'
          >
            {startOrderBtnText()}
          </button>
        </div> */}
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
          className='text-anchor text-lg font-semibold underline leading-[20px]'
        >
          {__pagesText.productInfo.requestAFreeConsulation}
        </a>
      </div>
      {/* <div className='mt-[20px] text-center'>
          <a
            href='javascript:void(0);'
            onClick={() => router.push(consultationURL)}
            className='text-anchor tracking-normal text-base underline font-bold'
          >
            {__pagesText.productInfo.requestAFreeConsulation}
          </a>
        </div> */}
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
