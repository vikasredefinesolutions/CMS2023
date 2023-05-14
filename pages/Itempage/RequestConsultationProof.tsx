import { NextPage } from 'next';
import RC_Template from 'Templates/RequestConsultation';

import { __console_v2 } from '@configs/console.config';
import { _defaultTemplates } from '@configs/template.config';
import { paths } from '@constants/paths.constant';
import { _ExpectedRequestConsultationProps } from '@controllers/request';
import * as ConsultationController from '@controllers/requestConsultationController.async';
import { conditionalLog_V2 } from '@helpers/console.helper';
import { useActions_v2 } from '@hooks_v2/index';
import { _RequestConsultationProps } from '@templates/RequestConsultation/requestConsultation';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { useEffect } from 'react';
import { _globalStore } from 'store.global';

const RequestConsultationProof: NextPage<_RequestConsultationProps> = (
  props,
) => {
  const { store_productDetails } = useActions_v2();
  useEffect(() => {
    if (props.details) {
      store_productDetails({
        brand: {
          id: props?.details.brandID,
          name: props?.details.brandName,
          url: props?.details.brandColorLogoUrl,
          url2: props?.details.brandImage,
          url3: props?.details.productBrandLogo,
        },
        product: {
          id: props?.details?.id || null,
          name: props?.details.name || null,
          sizes: props?.details.sizes || '',
          sizeChart: null,
          colors: null,
          customization: props?.details.isEnableLogolocation,
          price:
            {
              msrp: props?.details.msrp,
              ourCost: props?.details.ourCost,
              salePrice: props?.details.salePrice,
            } || null,
        },
      });
    }
  }, []);

  return <RC_Template {...props} id={_defaultTemplates.requestConsultation} />;
};

export default RequestConsultationProof;

export const getServerSideProps: GetServerSideProps = async (
  context,
): Promise<GetServerSidePropsResult<_RequestConsultationProps>> => {
  let expectedProps: _ExpectedRequestConsultationProps = {
    product: null,
    color: null,
    alike: null,
    seo: null,
  };

  try {
    const query: {
      productId: undefined | string | string[] | number;
      colorName: undefined | string | string[];
    } = {
      productId: context.query?.productid,
      colorName: context.query?.Color,
    };

    if (typeof query.productId === 'string') {
      query.productId = +query.productId; // to number;

      if (_globalStore.storeId) {
        const product = await ConsultationController.FetchProductDetails({
          storeId: _globalStore.storeId,
          productId: query.productId,
          isAttributeSaparateProduct: _globalStore.isAttributeSaparateProduct,
        });
        if (product.details === null || product.details.id === null) {
          return {
            redirect: {
              destination:
                product.details?.productDoNotExist?.retrunUrlOrCategorySename ||
                paths.NOT_FOUND,
              permanent: true,
            },
          };
        }
        expectedProps.product = {
          details: product.details,
          colors: product.colors,
        };
        expectedProps.alike = product.alike;
        expectedProps.seo = product.seo;
        expectedProps.color =
          expectedProps.product?.colors?.find((color) => {
            return color.name === query.colorName;
          }) || null;
      }
    }

    conditionalLog_V2({
      data: {
        details: expectedProps?.product?.details,
        color: expectedProps.color,
        alike: expectedProps.alike,
        seo: expectedProps.seo,
      },
      show: __console_v2.serverMethod.requestConsultation,
      type: 'SERVER_METHOD',
      name: 'Request Consultation: getServerSide sending Props',
    });
  } catch (error) {
    conditionalLog_V2({
      data: error,
      show: __console_v2.allCatch,
      type: 'CATCH',
      name: 'Request Consultation: getServerSideProps - Something went wrong',
    });
  }

  return {
    props: {
      details: expectedProps?.product?.details || null,
      color: expectedProps?.color || null,
      alike: expectedProps?.alike || null,
      seo: expectedProps?.seo || null,
    },
  };
};
