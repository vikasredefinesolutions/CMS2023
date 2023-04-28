/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import SeoHead from '@appComponents/reUsable/SeoHead';
import { getServerSideProps } from '@controllers/getServerSideProps';
import { _TopicHomeProps } from '@definations/slug.type';
import { useActions_v2 } from '@hooks_v2/index';
import Home from '@templates/Home';
import ProductDetails from '@templates/ProductDetails';
import ProductListing from '@templates/ProductListings';
import Banner from '@templates/banner';
import _ from 'lodash';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { _SlugServerSideProps, _SlugServerSide_WentWrong } from './slug';

const SlugSearch: NextPage<_SlugServerSideProps | _SlugServerSide_WentWrong> = (
  props,
) => {
  const { updatePageType } = useActions_v2();
  if ('error' in props) {
    const { error } = props;
    return <>{error}</>;
  }
  const { page, pageMetaData, _store } = props;

  useEffect(() => {
    if (!_.isEmpty(pageMetaData)) {
      updatePageType(pageMetaData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageMetaData]);

  if (!pageMetaData) {
    return <>No Page found</>;
  }

  if (pageMetaData?.type === 'product' && page?.productDetails && _store) {
    return (
      <ProductDetails
        {...page?.productDetails}
        storeCode={_store.storeCode}
        storeTypeId={_store.storeTypeId}
        productDetailsTemplateId={page.productDetails.productDetailsTemplateId}
      />
    );
  }

  if (page?.productListing && 'brand,category'.includes(pageMetaData?.type)) {
    const listing = page?.productListing;

    return (
      <>
        {listing?.brandSEO && (
          <SeoHead
            title={listing.brandSEO.seTitle}
            description={listing.brandSEO.seDescription}
            keywords={listing.brandSEO.seKeyWords}
          />
        )}
        {page.productListing.bannerType !== 'none' && (
          <Banner
            storeId={pageMetaData.storeId}
            slug={pageMetaData.slug}
            seType={pageMetaData.type}
            id={page.productListing.bannerType}
          />
        )}

        <ProductListing
          pageData={page?.productListing}
          slug={pageMetaData?.slug}
          seType={pageMetaData?.type}
          id={page.productListing.templateId}
        />
      </>
    );
  }

  if (pageMetaData?.type === 'topic' && page) {
    const tprops: _TopicHomeProps = {
      pageData: page.topicHome,
      pageType: pageMetaData.type,
      slug: pageMetaData.slug,
    };

    return (
      <>
        <SeoHead
          title={pageMetaData?.meta_Title ? pageMetaData.meta_Title : 'Home'}
          description={
            pageMetaData?.meta_Description ? pageMetaData.meta_Description : ''
          }
          keywords={
            pageMetaData?.meta_Keywords
              ? pageMetaData.meta_Keywords
              : 'Branded Promotional'
          }
        />
        <Home
          props={tprops}
          featuredItems={{
            products: page.home.featuredItems,
            brands: null,
          }}
        />
      </>
    );
  }

  return <></>;
};

export default SlugSearch;
export { getServerSideProps };
