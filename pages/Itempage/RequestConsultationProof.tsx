import { NextPage } from 'next';
import RC_Template from 'Templates/RequestConsultation';

import { __console_v2 } from '@configs/console.config';
import { paths } from '@constants/paths.constant';
import { _ExpectedRequestConsultationProps } from '@controllers/request';
import * as ConsultationController from '@controllers/requestConsultationController.async';
import { conditionalLog_V2 } from '@helpers/console.helper';
import { _RequestConsultationProps } from '@templates/RequestConsultation/requestConsultation';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { _globalStore } from 'store.global';

const RequestConsultationProof: NextPage<_RequestConsultationProps> = (
  props,
) => {
  return <RC_Template {...props} id={'1'} />;
};

export default RequestConsultationProof;

export const getServerSideProps: GetServerSideProps = async (
  context,
): Promise<GetServerSidePropsResult<_RequestConsultationProps>> => {
  let expectedProps: _ExpectedRequestConsultationProps = {
    store: {
      storeId: null,
      layout: null,
      storeTypeId: null,
      pageType: '',
      pathName: '',
      code: '',
      storeName: '',
      isAttributeSaparateProduct: false,
      imageFolderPath: '',
      cartCharges: null,
      urls: {
        favicon: '',
        logo: '',
      },
      mediaBaseUrl: '',
      sewOutCharges: 0,
      isSewOutEnable: false,
    },
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
        expectedProps.store = {
          ...expectedProps.store,
          storeId: _globalStore.storeId,
          isAttributeSaparateProduct: _globalStore.isAttributeSaparateProduct,
          code: _globalStore.code,
        };
      }

      if (expectedProps.store) {
        const product = await ConsultationController.FetchProductDetails({
          storeId: expectedProps.store.storeId,
          productId: query.productId,
          isAttributeSaparateProduct:
            expectedProps.store.isAttributeSaparateProduct,
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
        store: expectedProps.store,
        details: expectedProps?.product?.details,
        color: expectedProps.color,
        alike: expectedProps.alike,
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
