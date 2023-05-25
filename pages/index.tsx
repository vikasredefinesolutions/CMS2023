import SeoHead from '@appComponents/reUsable/SeoHead';
import { __Error, __pageTypeConstant } from '@constants/global.constant';
import { _FeaturedProduct } from '@definations/APIs/storeDetails.res';
import { _GetPageType } from '@definations/slug.type';
import { GTMHomeScriptForAllStores } from '@helpers/common.helper';
import { highLightError } from '@helpers/console.helper';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { getPageComponents } from '@services/home.service';
import { FetchPageType } from '@services/slug.service';
import Home from '@templates/Home';
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next';
import { useEffect, useRef } from 'react';
import { _globalStore } from 'store.global';

export interface _Slug_CMS_Props {
  page: 'ALL_CMS_PAGES';
  data: {
    components: any;
    featuredItems: null | Array<_FeaturedProduct[] | null>;
  };
  metaData: _GetPageType;
}

type _HomeProps =
  | _Slug_CMS_Props
  | {
      error: __Error.noPageTypeFound | __Error.storeIdMissing;
    };

const DefaultHomePage: NextPage<_HomeProps> = (props) => {
  const { updatePageType } = useActions_v2();
  const { id: customerId } = useTypedSelector_v2((state) => state.user);
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const isCaptured = useRef(false);

  useEffect(() => {
    if ('metaData' in props) {
      updatePageType(props.metaData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (storeId && !isCaptured.current) {
      isCaptured.current = true;
      GTMHomeScriptForAllStores('HomePage', storeId, customerId || 0);
    }
  }, [storeId, customerId]);

  if ('error' in props) {
    return <>{props.error}</>;
  }

  const { metaData, data } = props;
  const tprops: _TopicHomeProps = {
    pageData: { components: data.components },
    pageType: 'topic',
    slug: metaData.slug,
  };

  return (
    <>
      <SeoHead
        title={metaData?.meta_Title ? metaData?.meta_Title : 'Home'}
        description={
          metaData?.meta_Description ? metaData?.meta_Description : ''
        }
        keywords={
          metaData?.meta_Keywords
            ? metaData?.meta_Keywords
            : 'Branded Promotional'
        }
      />
      <Home
        props={tprops}
        featuredItems={{
          products: data.featuredItems,
          brands: null,
        }}
      />
    </>
  );
};

export default DefaultHomePage;

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<_HomeProps>
> => {
  let store = {
    storeCode: _globalStore.code,
    storeTypeId: _globalStore.storeTypeId,
    storeId: _globalStore.storeId,
    isAttributeSaparateProduct: _globalStore.isAttributeSaparateProduct,
  };
  // ---------------------------------------------------------------

  if (store.storeId === 0) {
    highLightError({
      error: `No Store found. Can't proceed further`,
      component: 'Home: getServerSideProps',
    });
    return {
      props: { error: __Error.storeIdMissing },
    };
  }

  // ---------------------------------------------------------------
  const pageMetaData: _GetPageType | null = await FetchPageType({
    storeId: store.storeId,
    slug: '/',
  });

  if (pageMetaData === null) {
    highLightError({
      error: `No page type found.`,
      component: 'Home: getServerSideProps',
    });
    return {
      props: { error: __Error.noPageTypeFound },
    };
  }

  ////////////////////////////////////////////////
  /////////// Page Type Checks
  ////////////////////////////////////////////////

  if (pageMetaData.type === __pageTypeConstant.notFound) {
    return {
      notFound: true,
    };
  }

  if (pageMetaData.type === __pageTypeConstant.cmsPages) {
    const components = await getPageComponents({
      pageId: pageMetaData.id,
      type: '',
    });

    return {
      props: {
        page: 'ALL_CMS_PAGES',
        data: {
          components: components,
          featuredItems: [],
        },
        metaData: pageMetaData,
      },
    };
  }

  return {
    notFound: true,
  };
};
