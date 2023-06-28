/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import SeoHead from '@appComponents/reUsable/SeoHead';
import { storeBuilderTypeId } from '@configs/page.config';
import { __Error, __pageTypeConstant } from '@constants/global.constant';
import { getServerSideProps } from '@controllers/getServerSideProps';
import { _FetchProductDetails } from '@controllers/ProductController.async';
import { _ProductList_PropsData } from '@controllers/slug.extras';
import { _GetPageType, _StoreCache } from '@definations/slug.type';
import { useActions_v2 } from '@hooks_v2/index';
import Banner, { _BrandTypes } from '@templates/banner';
import Home from '@templates/Home';
import ProductDetails from '@templates/ProductDetails';
import ProductListing from '@templates/ProductListings';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { _Slug_CMS_Props } from 'pages';
import { useEffect } from 'react';
import { _globalStore } from 'store.global';

export interface _Slug_ProductDetails_Props {
  page: 'PRODUCT_DETAILS';
  data: _FetchProductDetails;
  metaData: _GetPageType;
  configs: {
    templateId: string;
  };
}

export interface _Slug_ProductListing_Props {
  page: 'PRODUCT_LISTING';
  listingData: _ProductList_PropsData;
  metaData: _GetPageType;
  configs: {
    bannerType: _BrandTypes & 'none';
    templateId: string;
  };
}

export type _Slug_Props =
  | _Slug_ProductDetails_Props
  | _Slug_ProductListing_Props
  | _Slug_CMS_Props
  | {
      error: __Error.noPageTypeFound | __Error.storeIdMissing;
    };

const SlugSearch: NextPage<_Slug_Props, _Slug_Props> = (props) => {
  const { updatePageType, topic_set_isCMS } = useActions_v2();
  const router = useRouter();

  // useEffect(() => {
  //   if(!router.asPath.includes(".html") && !router.asPath.includes("not-found"))
  //   {
  //     router.push(paths.NOT_FOUND);
  //   }
  // }, [router.asPath])

  useEffect(() => {
    if ('metaData' in props) {
      updatePageType(props.metaData);
    }
    if ('page' in props && props.page === 'ALL_CMS_PAGES') {
      topic_set_isCMS(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  if ('error' in props) {
    return <>{props.error}</>;
  }

  // PAGES
  const _store: _StoreCache = {
    storeTypeId: _globalStore.storeTypeId,
    storeCode: _globalStore.code,
  };
  const { page, metaData } = props;
  if (page === 'PRODUCT_DETAILS') {
    const { configs, data } = props;
    return (
      <ProductDetails
        sectionView={data.views}
        SEO={data.SEO}
        alike={data.alike}
        colors={data.colors}
        sizes={data.sizes}
        details={data.details}
        storeCode={_store.storeCode}
        storeTypeId={_store.storeTypeId}
        productDetailsTemplateId={configs.templateId}
      />
    );
  }

  if (page === 'ALL_CMS_PAGES') {
    const { data } = props;

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
  }

  if (page === 'PRODUCT_LISTING') {
    const { listingData, configs } = props;

    const showBanner = () => {
      if (_globalStore.storeTypeId === storeBuilderTypeId) return false;
      if (configs.bannerType === 'none') return false;

      return true;
    };

    return (
      <>
        <SeoHead
          title={metaData.meta_Title}
          description={metaData.meta_Description}
          keywords={metaData.meta_Keywords}
        />
        {showBanner() && (
          <Banner
            typeId={configs.bannerType}
            storeId={metaData.storeId}
            content={listingData.banner}
          />
        )}
        <ProductListing
          pageData={listingData}
          slug={metaData.slug}
          seType={metaData.type}
          id={configs.templateId}
          CMS={{
            component: listingData.categoryComponents,
            type: __pageTypeConstant.category,
            slug: metaData.slug,
          }}
        />
      </>
    );
  }

  return <>No page found</>;
};

export default SlugSearch;
export { getServerSideProps };
