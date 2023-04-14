/* eslint-disable react-hooks/rules-of-hooks */
import SeoHead from '@appComponents/reUsable/SeoHead';
import Spinner from '@appComponents/ui/spinner';
import { pageNotFoundText } from '@constants/paths.constant';
import { getServerSideProps } from '@controllers/getServerSideProps';
import { cLog } from '@helpers/console.helper';
import { useActions_v2 } from '@hooks_v2/index';
import PageNotFound from '@templates/404';
import ProductDetails from '@templates/ProductDetails';
import ProductListing from '@templates/ProductListings';
import Banner from 'Templates/banner';
import _ from 'lodash';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { _SlugServerSideProps, _SlugServerSide_WentWrong } from './slug';

const SlugPage: NextPage<_SlugServerSideProps | _SlugServerSide_WentWrong> = (
  props,
) => {
  if ('error' in props) {
    const { error } = props;
    return <>{error}</>;
  }

  const { updatePageType } = useActions_v2();
  const { _store, pageMetaData, page } = props;

  useEffect(() => {
    if (!_.isEmpty(pageMetaData)) {
      updatePageType(pageMetaData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageMetaData]);

  if (!_store || !pageMetaData || !page) {
    cLog('No page data found', '404');
    return <PageNotFound id={pageNotFoundText.defaultId} />;
  }

  if (pageMetaData?.type === '404') {
    cLog('404', '404');
    return (
      <>
        <SeoHead
          title={pageMetaData?.meta_Title || '404: No Page found'}
          description={pageMetaData?.meta_Description || ''}
          keywords={pageMetaData?.meta_Keywords || 'Branded Promotional'}
        />
        <PageNotFound id={pageNotFoundText.defaultId} />
      </>
    );
  }

  if (pageMetaData?.type === 'collection') {
    return (
      <>
        <SeoHead
          title={pageMetaData?.meta_Title || 'Collection'}
          description={pageMetaData?.meta_Description || ''}
          keywords={pageMetaData?.meta_Keywords || 'Branded Promotional'}
        />
        <>Collection Page would come here</>
      </>
    );
  }

  if (pageMetaData?.type === 'product' && page?.productDetails && _store) {
    let storeCode = _store.storeCode;

    return (
      <ProductDetails
        {...page?.productDetails}
        storeCode={storeCode}
        storeTypeId={_store.storeTypeId}
      />
    );
  }

  if (page.productListing && 'brand,category'.includes(pageMetaData?.type)) {
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
        <Spinner>
          {' '}
          <Banner
            storeId={pageMetaData.storeId}
            slug={pageMetaData.slug}
            seType={pageMetaData.type}
            id={page.productListing.bannerType}
          />
          <ProductListing
            pageData={page?.productListing}
            slug={pageMetaData?.slug}
            seType={pageMetaData?.type}
            id={page.productListing.templateId}
          />
        </Spinner>
      </>
    );
  }

  return (
    <>
      <SeoHead
        title={pageMetaData?.meta_Title || 'No Matches found'}
        description={pageMetaData?.meta_Description || ''}
        keywords={pageMetaData?.meta_Keywords || 'Branded Promotional'}
      />
      {cLog('No match found', '404')}
      <PageNotFound id={pageNotFoundText.defaultId} />
    </>
  );
};

export { getServerSideProps };

export default SlugPage;
