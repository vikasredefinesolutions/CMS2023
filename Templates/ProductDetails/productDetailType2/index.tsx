import { _StoreCache } from '@definations/slug.type';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { NextPage } from 'next';
import { _ProductDetailsProps } from '../productDetailsTypes/productDetail.res';
import ProductDetail from './component/ProductDetail';
import Head from 'next/head';
import { FetchCategoryByproductId, FetchInventoryById } from '@services/product.service';
import { useEffect } from 'react';
import { KlaviyoScriptTag } from '@helpers/common.helper';
import { CategoriesByPid } from '@definations/APIs/category.res';

const ProductDetails_Type2: NextPage<_ProductDetailsProps & _StoreCache> = (
  product,
) => {
  const {
    store_productDetails,
    setColor,
    setShowLoader,
    product_storeData,
    product_UpdateSelectedValues,
  } = useActions_v2();
  const { id: storeId, pageType } = useTypedSelector_v2((state) => state.store);

  const getCategoriesArr = (): string[] => {
    let categories: CategoriesByPid = [];
    let categoryArr: string[] = [];
    FetchCategoryByproductId(+pageType.id, storeId).then((res) => {
      categories = res;
    });
    if (categories.length > 0) {
      categoryArr = categories[0].name.split(' > ');
    }
    return categoryArr;
  };

  useEffect(() => {
    if (product.details && storeId && pageType.id) {
      product_UpdateSelectedValues({
        type: 'BASIC_PRODUCT_DETAILS',
        prop: {
          sku: product.details.sku,
        },
      });

      const categories = getCategoriesArr();
      const item = {
        ProductName: product.details.name,
        ProductID: product.details.id,
        SKU: product.details.sku,
        Categories: categories,
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
  }, [storeId, pageType.id]);

  useEffect(() => {
    if (product.details) {
      store_productDetails({
        brand: {
          id: product.details?.brandID,
          name: product?.details?.brandName,
          url: product.details?.brandColorLogoUrl,
        },
        product: {
          id: product?.details?.id || null,
          name: product?.details?.name || null,
          sizes: product.details?.sizes || '',
          sizeChart: product.sizes || null,
          colors: product.colors || null,
          customization: product.details?.isEnableLogolocation,
          price:
            {
              msrp: product?.details?.msrp,
              ourCost: product?.details?.ourCost,
              salePrice: product?.details?.salePrice,
            } || null,
        },
      });
      if (product.colors) {
        setColor(product.colors[0]);

        const allColorAttributes = product.colors.map(
          (color) => color.attributeOptionId,
        );

        FetchInventoryById({
          productId: product.details.id,
          attributeOptionId: allColorAttributes,
        }).then((res) =>
          product_storeData({
            type: 'INVENTORY_LIST',
            data: res,
          }),
        );
      }
    }
    setShowLoader(false);
  }, [product.details]);

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

  const HeadTag = (
    <Head>
      <title>{_SEO.title}</title>
      <meta name='description' content={_SEO.desc} key='desc' />
      <meta name='keywords' content={_SEO.keywords} />
    </Head>
  );


  // console.log('product layout page 2 ');
  
  return (
    <>
      {HeadTag}
      <ProductDetail product={product?.details} storeCode={product.storeCode} />
    </>
  );
};
export default ProductDetails_Type2;
