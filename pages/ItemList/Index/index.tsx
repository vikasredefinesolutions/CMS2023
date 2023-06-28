import { _defaultTemplates } from '@configs/template.config';
import { FetchSiteMapCategories } from '@services/brand.service';
import { FetchFiltersJsonByCategory } from '@services/product.service';
import { GetlAllProductList } from '@templates/ProductListings/ProductListingType';
import ProductListingType7 from '@templates/ProductListings/productListingType7';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { _globalStore } from 'store.global';

interface _Props {
  id: string;
  categories: {
    category: string;
    products: GetlAllProductList[];
  }[];
}

const ProductListStoreBuilder: React.FC<_Props> = ({ id, categories }) => {
  return <ProductListingType7 categories={categories} />;
};

export default ProductListStoreBuilder;

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////// SERVER SIDE FUNCTION ----------------------------------------
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<_Props>
> => {
  const categoriesToShow: {
    category: string;
    products: GetlAllProductList[];
  }[] = [];

  if (!_globalStore.storeId) {
    // if no store id found
  }

  const categories = await FetchSiteMapCategories(_globalStore.storeId).then(
    (res) => {
      return res || null;
    },
  );

  const categoriesToFetch = categories.map((item) => {
    return FetchFiltersJsonByCategory({
      storeID: _globalStore.storeId,
      categoryId: item.id,
      customerId: 0,
      filterOptionforfaceteds: [
        {
          name: '',
          value: '',
        },
      ],
    });
  });

  await Promise.allSettled(categoriesToFetch)
    .then((values) => {
      values.map((value, index) => {
        if (value.status === 'fulfilled') {
          categoriesToShow.push({
            category: categories[index].name,
            products: value.value.getlAllProductList,
          });
        } else {
          categoriesToShow.push({
            category: categories[index].name,
            products: [],
          });
        }
      });
    })
    .catch(() => {});

  return {
    props: {
      id: _defaultTemplates.storyList,
      categories: categoriesToShow,
    },
  };
};
