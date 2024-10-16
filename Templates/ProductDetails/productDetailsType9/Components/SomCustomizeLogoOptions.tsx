import { __pagesText } from '@constants/pages.text';
import { _LogoLocationDetail } from '@definations/APIs/productDetail.res';
import { _CartItem } from '@services/cart';
import { FetchLogoLocationByProductId } from '@services/product.service';
import { FieldArray, Form, Formik } from 'formik';
import { numberToOrdinalString } from 'helpers_v2/common.helper';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import { logoPositions } from 'mock_v2/startModal.mock';
import React, { useEffect, useState } from 'react';
import LogoSetterToStore from './LogoSetterToStore';
import NextLogoButton from './NextLogoButton';
import SomLogoOption from './SomLogoOption';
import { logoDetailsAr } from './productDetailsComponents';

interface logocharges {
  isFirstLogoFree: boolean;
  isLogoSetupCharges: boolean;
  logoSetupCharges: number;
  isLinepersonalization: boolean;
  firstLineCharges: number;
  secondLineCharges: number;
  isSmallRun: boolean;
  smallRunLimit: number;
  smallRunFeesCharges: number;
  productId: number;
}

const SomCustomizeLogoOptions: React.FC<{
  editSizes: _CartItem['shoppingCartLogoPersonViewModels'] | null;
  totalQty: number;
  setNowOrLater: (value: 'later' | 'now') => void;
  nowOrLater: 'later' | 'now';
}> = ({ editSizes, totalQty, setNowOrLater, nowOrLater }) => {
  const { product_updateLogoDetails, product_updateFirstLogoPrice } =
    useActions_v2();
  const { getDetailsLogo } = LogoSetterToStore();
  const { som_logos } = useTypedSelector_v2((state) => state.product);
  const { secondLogoCharge } = useTypedSelector_v2((state) => state.store);
  const [logoCharges, setLogoCharges] = useState<logocharges>({
    isFirstLogoFree: false,
    isLogoSetupCharges: false,
    logoSetupCharges: 0,
    isLinepersonalization: false,
    firstLineCharges: 0,
    secondLineCharges: 0,
    isSmallRun: false,
    smallRunLimit: 0,
    smallRunFeesCharges: 0,
    productId: 0,
  });
  const { currency } = useTypedSelector_v2((state) => state.store);
  const [logoLocation, setLogoLocation] = useState<_LogoLocationDetail[] | []>(
    [],
  );

  const id = useTypedSelector_v2((state) => state.product.product.id);
  const [logoEditDetails, setLogoEditDetails] =
    useState<logoDetailsAr | null>();
  const [initialValues, setInitialValues] = useState(['']);

  useEffect(() => {
    if (som_logos.details === null) {
      setNowOrLater('later');
    }
  }, [som_logos.details]);

  useEffect(() => {
    if (id) {
      FetchLogoLocationByProductId({ productId: id }).then((res) => {
        if (res) {
          setLogoCharges({
            isFirstLogoFree: res.isFirstLogoFree,
            isLogoSetupCharges: res.isLogoSetupCharges,
            logoSetupCharges: res.logoSetupCharges,
            isLinepersonalization: res.isLinepersonalization,
            firstLineCharges: res.firstLineCharges,
            secondLineCharges: res.secondLineCharges,
            isSmallRun: res.isSmallRun,
            smallRunLimit: res.smallRunLimit,
            smallRunFeesCharges: res.smallRunFeesCharges,
            productId: res.productId,
          });

          product_updateFirstLogoPrice({
            firstLogoPrice: res.isFirstLogoFree ? 0 : res.logoSetupCharges,
          });

          res?.subRow && res?.subRow?.length > 0
            ? setLogoLocation(res?.subRow)
            : setLogoLocation(logoPositions);
        }
      });
    }
  }, []);
  useEffect(() => {
    if (editSizes && logoLocation) {
      const { isLater, details } = getDetailsLogo(
        editSizes,
        logoLocation,
        totalQty,
      );
      if (isLater) {
        setNowOrLater('later');
      } else {
        setLogoEditDetails(details);
        if (details) {
          const filteredLogoLoations = logoLocation.filter(
            (item) =>
              !details.find(
                (dLogo) => dLogo.selectedLocation.label === item.name,
              ),
          );
          product_updateLogoDetails({
            type: 'Reset_Locations',
            allowNextLogo: true,
            data: filteredLogoLoations?.map((logo) => ({
              image: {
                url: logo.image,
                alt: logo.image,
              },
              label: logo.name,
              value: logo.name,
              price: logo.price,
              cost: logo.cost,
            })),
          });
          product_updateLogoDetails({
            type: 'Set_Logo_Details',
            data: details.map((item) => ({
              status: item?.logoStatus,
              location: {
                imageUrl: item?.selectedLocation?.image.url ?? '',
                name: item?.selectedLocation?.label ?? '',
                value: item?.selectedLocation?.value ?? '',
              },
              title: item?.fileToUpload?.name,
              filePath: item?.fileToUpload?.previewURL,
              date: '',
              price: item?.selectedLocation?.price,
              quantity: 0,
              isSewOut: item.isSewOut,
              sewOutAmount: item.sewOutAmount * totalQty,
              reUsableCustomerLogo: 0,
            })),
          });
        }
        setInitialValues(new Array(details?.length).fill(''));
        setNowOrLater('now');
      }
    }
  }, [editSizes, logoLocation]);

  const showPrice = (price: 'FREE' | number) => {
    if (price === 'FREE') return `FREE`;
    return `${currency}${price?.toFixed(2)}`;
  };

  const logoNowOrLaterHandler = (action: 'now' | 'later') => {
    if (action === 'later') {
      setInitialValues(['']);
      setNowOrLater('later');
      product_updateLogoDetails({
        type: 'Upload_Logo',
        logo: 'Customize Later',
      });
      return;
    }

    if (action === 'now') {
      setLogoEditDetails(null);
      setNowOrLater('now');
      product_updateLogoDetails({
        type: 'Reset_Locations',
        data: logoLocation?.map((logo) => ({
          image: {
            url: logo.image,
            alt: logo.image,
          },
          label: logo.name,
          value: logo.name,
          price: logo.price,
          cost: logo.cost,
        })),
      });

      return;
    }
  };

  return (
    <div className='mb-[10px]'>
      <div className='' x-data='{custom_logo : 1}'>
        <div className='bg-primary flex flex-wrap justify-between items-center pl-[10px] pr-[10px] pt-[6px] pb-[6px] mt-5 mb-[10px] text-default-text'>
          <span className='font-[600] text-[#ffffff] text-sub-text'>
            {
              __pagesText.productInfo.startOrderModal.customizeLogoOption
                .customizeYoutOrder
            }
          </span>
        </div>
        <label
          htmlFor='logo_later'
          className={`block pt-[15px] pb-[15px] pl-[10px] pr-[10px] font-[600] border-2 rounded-[5px] mb-[10px] text-sub-text ${
            nowOrLater === 'later' ? 'border-secondary' : 'border-slate-200'
          }`}
        >
          <input
            type='radio'
            value='later'
            name='customize_logo'
            className='mr-2'
            id='logo_later'
            checked={nowOrLater === 'later'}
            onChange={() => logoNowOrLaterHandler('later')}
          />
          {
            __pagesText.productInfo.startOrderModal.customizeLogoOption
              .customizeLogoLater
          }
        </label>

        <label
          htmlFor='logo_now'
          className={`block pt-[15px] pb-[15px] pl-[10px] pr-[10px] font-[600] border-2 rounded-[5px] mb-[10px] text-sub-text ${
            nowOrLater === 'now' ? 'border-secondary' : 'border-slate-200'
          }`}
        >
          <input
            type='radio'
            value='now'
            name='customize_logo'
            id='logo_now'
            checked={nowOrLater === 'now'}
            className='mr-2'
            onChange={() => logoNowOrLaterHandler('now')}
          />
          {
            __pagesText.productInfo.startOrderModal.customizeLogoOption
              .customizeLogoNow
          }
        </label>

        {nowOrLater === 'now' && (
          <div className=''>
            <Formik
              initialValues={{
                logos: initialValues,
              }}
              onSubmit={() => {}}
            >
              {({ values }) => {
                return (
                  <Form>
                    <FieldArray
                      name={'logos'}
                      render={(arrayHelpers) => {
                        return (
                          <>
                            {values.logos?.map((_, index) => (
                              <SomLogoOption
                                key={index}
                                index={index}
                                textIndex={values.logos.length}
                                price={
                                  logoCharges.isFirstLogoFree && index === 0
                                    ? 'FREE'
                                    : secondLogoCharge
                                }
                                onRemove={arrayHelpers}
                                title={`${numberToOrdinalString(
                                  index + 1,
                                )} Logo (${
                                  logoCharges.isFirstLogoFree && index === 0
                                    ? 'FREE'
                                    : showPrice(secondLogoCharge)
                                })`}
                                id={`${index}-id`}
                                name={`${index}-name`}
                                editDetails={
                                  logoEditDetails
                                    ? logoEditDetails[index]
                                    : null
                                }
                              />
                            ))}
                            {som_logos.availableOptions &&
                              som_logos?.availableOptions?.length > 0 && (
                                <NextLogoButton
                                  cIndex={{
                                    label: numberToOrdinalString(
                                      values.logos.length + 1,
                                    ),
                                    value: values.logos.length + 1,
                                    price:
                                      values.logos.length === 0 &&
                                      logoCharges.isFirstLogoFree
                                        ? 'FREE'
                                        : secondLogoCharge,
                                  }}
                                  arrayHelpers={arrayHelpers}
                                />
                              )}
                          </>
                        );
                      }}
                    />
                  </Form>
                );
              }}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
};
export default SomCustomizeLogoOptions;
