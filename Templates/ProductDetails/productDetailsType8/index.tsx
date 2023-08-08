// React imports
import Head from 'next/head';
import { useEffect } from 'react';

// Services and Types imports
import { KlaviyoScriptTag } from 'helpers_v2/common.helper';
import { useTypedSelector_v2 } from 'hooks_v2';
// Componennts
// import { _StoreCache } from 'pages/[slug]/slug';
import { _Props } from '../productDetails';
import ProductDetails from './components/ProductDetails';

const ProductDetails_Type8: React.FC<_Props> = (product) => {
  const { id: storeId, pageType } = useTypedSelector_v2((state) => state.store);
  const { categoryArr } = useTypedSelector_v2((state) => state.product);

  useEffect(() => {
    if (product.details && storeId && pageType.id) {
      const item = {
        ProductName: product.details.name,
        ProductID: product.details.id,
        SKU: product.details.sku,
        Categories: categoryArr,
        ImageURL: product.colors && product.colors[0].imageUrl,
        URL: window.location.href,
        Brand: product.details.brandName,
        Price: product.details.salePrice,
        CompareAtPrice: product.details.msrp,
      };
      const viewedItem = {
        Title: item.ProductName,
        ItemId: item.ProductID,
        Categories: item.Categories,
        ImageUrl: item.ImageURL,
        Url: item.URL,
        Metadata: {
          Brand: item.Brand,
          Price: item.Price,
          CompareAtPrice: item.CompareAtPrice,
        },
      };

      KlaviyoScriptTag(['track', 'Viewed Product', item]);
      KlaviyoScriptTag(['trackViewedItem', viewedItem]);
    }
  }, [storeId, pageType.id, categoryArr]);

  if (product === null) return <p>Product Page Loading...</p>;

  if (product?.details === null || product?.details === undefined) {
    return <> Product Details not found </>;
  }

  const _SEO = {
    title: product.SEO?.pageTitle || product.details.name || 'Product Page',
    desc:
      product.SEO?.metaDescription ||
      product.details.description ||
      'Product Description',
    keywords:
      product.SEO?.metaKeywords || product.details.name || 'Product Keywords',
  };

  return (
    <>
      <Head>
        <title>{_SEO.title}</title>
        <meta name='description' content={_SEO.desc} key='desc' />
        <meta name='keywords' content={_SEO.keywords} />
      </Head>
      <ProductDetails details={product.details} colors={product.colors!} />
    </>
  );
};

export default ProductDetails_Type8;
