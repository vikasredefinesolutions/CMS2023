import Price from '@appComponents/Price';
import NxtImage from '@appComponents/reUsable/Image';
import { _OtherImage, _ProductColor } from '@definations/APIs/colors.res';
import {
  _ProductDetails,
  _ProductSEO,
  _ProductsAlike,
} from '@definations/APIs/productDetail.res';
import { _SizeChartTransformed } from '@definations/APIs/sizeChart.res';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import {
  FetchSbStoreProductAdditionalPrices,
  FetchSbStoreProductCustomFields,
  _SbProductAdditionalPrices,
  _SbProductCustomField,
} from '@services/sb.service';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PD7_AddToCart from './Components/PD7_AddToCart';
import PD7_ColorInfo from './Components/PD7_ColorInfo';
import PD7_CustomizationFields from './Components/PD7_CustomizationCharges';
import PD7_Description from './Components/PD7_Description';
import PD7_Inventory from './Components/PD7_Inventory';
import PD7_PriceInfoBtn from './Components/PD7_PriceInfoBtn';
import PD7_SizeChart from './Components/PD7_SizeChartModal';
import PD7_Slider from './Components/PD7_Slider';
import {
  convertIntoInitialValues,
  convertIntoValidtionSchema,
  initialActiveImage,
} from './PD7_Extras';

interface _Props {
  details: null | _ProductDetails;
  colors: null | _ProductColor[];
  sizes: null | _SizeChartTransformed;
  SEO: null | _ProductSEO;
  alike: null | _ProductsAlike[];

  sectionView: string[] | [];
  productDetailsTemplateId: string;
  storeTypeId: number;
  storeCode: string;
}

export interface _SelectedSizeQty {
  colorAttributeOptionId: number; // colorId,
  totalQty: number;
  sizesNqtys: { size: string; sizeAttributeOptionId: number; qty: number }[];
  stockAvailable: boolean;
}
[];

const ProductDetailsType7: React.FC<_Props> = ({
  details,
  colors,
  sizes,
  alike,
}) => {
  const { setShowLoader } = useActions_v2();
  const router = useRouter();
  const [customFields, setCustomFields] = useState<
    _SbProductCustomField[] | null
  >(null);
  const storeId = useTypedSelector_v2((state) => state.store.id);

  const [activeColor, setActiveColor] = useState<_ProductColor | null>(
    colors && colors?.length > 0 ? colors[0] : null,
  );
  const [activeImage, setActiveImage] = useState<_OtherImage | null>(
    initialActiveImage({ colors }),
  );

  const [addtionalPrices, setAdditionalPrices] = useState<{
    details: _SbProductAdditionalPrices[];
    total: number;
  }>({
    details: [],
    total: 0,
  });
  const [selectedSizeQtys, setSelectedSizeQtys] = useState<_SelectedSizeQty>({
    colorAttributeOptionId: 0,
    totalQty: 0,
    sizesNqtys: [],
    stockAvailable: true,
  });

  const customizationFields = useFormik({
    initialValues: convertIntoInitialValues(customFields),
    validationSchema: convertIntoValidtionSchema(customFields),
    // validateOnMount: true,
    enableReinitialize: true,
    onSubmit: (values) => {},
  });

  const calculateUnitPrice = () => {
    if (details?.salePrice) {
      return +details.salePrice + addtionalPrices.total;
    }
    if (details?.msrp) {
      return +details.msrp + addtionalPrices.total;
    }
    return 0;
  };

  const fetchCustomFields = async (productId: number) => {
    setShowLoader(true);
    await FetchSbStoreProductCustomFields({ productId: productId })
      .then((response) => {
        if (!response) return;
        setCustomFields(response);
      })
      .catch(() => {})
      .finally(() => {
        setShowLoader(false);
      });
  };

  const fetchAdditionalPrices = async (storeId: number) => {
    await FetchSbStoreProductAdditionalPrices({
      storeId: storeId,
      productId: details!.id,
    }).then((response) => {
      if (!response) return;

      const total = response.reduce((prev, item) => prev + item.amount, 0);
      setAdditionalPrices({ details: response, total });
    });
  };

  useEffect(() => {
    if (details?.id && storeId) {
      fetchCustomFields(details.id);
      fetchAdditionalPrices(storeId);
      return;
    }
  }, [storeId]);

  return (
    <div className=''>
      <div className='container mx-auto mt-[30px]'>
        <div className='lg:grid lg:grid-cols-2 lg:items-start pb-[20px]'>
          <div className='flex flex-wrap md:hidden'>
            <div className='w-full md:w-2/3 mb-[15px]'>
              <h1 className='text-title-text uppercase !font-normal'>
                {details?.name}
              </h1>
            </div>
          </div>
          <div className='col-span-1 grid grid-cols-12 gap-[10px] lg:pr-[15px]'>
            <div className='col-span-12 relative'>
              <div className='mx-auto h-[700px] flex justify-center items-center'>
                <NxtImage
                  src={activeImage?.imageUrl || ''}
                  alt=''
                  className='max-h-[700px] m-auto'
                />
                <div
                  className={` md:block sub-image absolute left-[10px]  top-[15px] w-[70px] `}
                >
                  {activeColor &&
                    activeColor.moreImages.length > 1 &&
                    activeColor?.moreImages.map((img, index) => {
                      const highlight =
                        img.id === activeImage?.id
                          ? 'border-secondary'
                          : 'border-slate-200';
                      return (
                        <div
                          key={img.id + img.imageUrl}
                          className={`md:border hover:border-secondary p-[3px] mt-[5px] mb-[5px] last:mb-0 bg-white  w-[70px] h-[70px] cursor-pointer ${highlight}`}
                          onClick={() => setActiveImage({ ...img, id: index })}
                        >
                          <NxtImage
                            src={img.imageUrl}
                            alt={img.altTag}
                            useNextImage={false}
                            className='max-h-full m-auto cursor-pointer'
                            title={img.altTag}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-1 mt-[15px] pl-[0px] pr-[0px] md:pl-[15px] md:pr-[15px] sm:pl-[0px] sm:pr-[0px] lg:mt-[0px]'>
            <div className='hidden md:flex flex-wrap items-center'>
              <div className='w-full relative flex flex-wrap justify-between items-center'>
                <h1 className='text-sub-text !font-normal'>
                  {details?.name.toUpperCase()}
                </h1>
                <div className=''>
                  <a
                    href='javascript:void(0)'
                    title='Back'
                    onClick={() => router.back()}
                    className='btn btn-sm btn-secondary'
                  >
                    BACK
                  </a>
                </div>
              </div>
            </div>
            <div className='flex flex-wrap items-center pt-[20px]'>
              <div className='text-small-text'>
                <span className='inline-block'>SKU</span> <span>:</span>
                <span className='ml-[4px]'>{details?.sku}</span>
              </div>
              <div className='text-normal-text text-default ml-[15px]'>|</div>
              <div className='text-small-text ml-[15px]'>
                <span className='inline-block'>Availability</span>
                <span
                  className={`ml-[4px] text-medium-text !font-bold  ${
                    selectedSizeQtys.stockAvailable
                      ? '!text-[#006400]'
                      : 'text-[#a94442]'
                  } text-quaternary`}
                >
                  {selectedSizeQtys.stockAvailable
                    ? `In Stock`
                    : 'Out of Stock'}
                </span>
              </div>
            </div>
            <div className='mt-[20px] pt-[7px] pb-[7px] text-default-text flex flex-wrap items-center border-gray border-t border-b'>
              <div className='relative w-full'>
                <div className='relative flex flex-wrap border-gray border-b pt-[5px] pb-[10px]'>
                  <div className='text-title-text font-bold'>
                    <div className='text-quaternary'>
                      <Price value={calculateUnitPrice()} />
                    </div>
                  </div>
                  {addtionalPrices.total > 0 && (
                    <PD7_PriceInfoBtn
                      additionalPrices={addtionalPrices.details}
                    />
                  )}
                </div>
                <PD7_ColorInfo
                  colors={colors}
                  setActiveColor={(color) => {
                    setActiveColor(color);
                    setActiveImage(initialActiveImage({ color }));
                  }}
                  activeColor={activeColor}
                />
                <PD7_SizeChart chart={sizes} />
                <PD7_Inventory
                  attributeOptionId={activeColor?.attributeOptionId || null}
                  productId={details?.id || null}
                  setSelectedSizeQtys={setSelectedSizeQtys}
                  selectedSizeQtys={selectedSizeQtys}
                  submitForm={customizationFields.submitForm}
                />
                <PD7_CustomizationFields
                  fields={customFields}
                  values={customizationFields.values}
                  errors={customizationFields.errors}
                  touched={customizationFields.touched}
                  handleBlur={customizationFields.handleBlur}
                  handleChange={customizationFields.handleChange}
                />
                <PD7_AddToCart
                  selectedSizeQtys={selectedSizeQtys}
                  activeColor={activeColor}
                  customFieldValues={customizationFields.values}
                  details={details}
                  // colors={colors}
                  isValid={customizationFields.isValid}
                  setSelectedSizeQtys={setSelectedSizeQtys}
                  submitForm={customizationFields.submitForm}
                  unitPrice={calculateUnitPrice()}
                  customFields={customFields}
                  setValues={customizationFields.setValues}
                  errors={customizationFields.errors}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <PD7_Description text={details?.description || null} />
      <PD7_Slider products={alike} />
    </div>
  );
};

export default ProductDetailsType7;
