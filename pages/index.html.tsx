import { _Brand } from '@definations/brand';
import { newFetauredItemResponse } from '@definations/productList.type';
import { _GetPageType } from '@definations/slug.type';
import { removeDuplicates } from '@helpers/common.helper';
import { FetchDataByBrand } from '@services/brand.service';
import { FetchBrands } from '@services/header.service';
import { getPageComponents } from '@services/home.service';
import { FetchPageType } from '@services/slug.service';
import Home from '@templates/Home';
import { _SelectedTab } from '@templates/ProductDetails/productDetailsTypes/storeDetails.res';
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next';
import { _globalStore } from 'store.global';

interface _Props {
  brands: _Brand[] | null;
  alphabets: string[];
  accordian: any;
  metaData: any;
  featuredItems: any;
}

const BacardiPage: NextPage<_Props> = (props) => {
  return (
    <>
      <Home
        props={{
          pageData: { components: props.accordian },
          pageType: 'Topic',
          slug: 'BC-Home',
        }}
        featuredItems={{
          products: props?.featuredItems,
          brands: null,
        }}
      />
    </>
  );
};

export default BacardiPage;

export const getServerSideProps: GetServerSideProps = async (
  context,
): Promise<GetServerSidePropsResult<_Props>> => {
  const { storeId } = _globalStore;
  let brands: _Brand[] | null = null;
  let alphabets: string[] = [];
  let accordian: any = [];

  let pageMetaData: _GetPageType | null = null;
  let data: { [x: string]: newFetauredItemResponse[] } = {};

  pageMetaData = await FetchPageType({
    storeId: _globalStore.storeId!,
    slug: 'BC-Home',
  });
  if (pageMetaData) {
    accordian = await getPageComponents({
      pageId: pageMetaData.id,
      type: pageMetaData.type,
    });
    if (accordian && accordian.length > 0) {
      const featuredProducts = accordian.find(
        (comp: any) => comp.name == 'Featured Products',
      );

      if (
        featuredProducts?.selectedVal &&
        featuredProducts?.selectedVal.length > 0
      ) {
        let productsData = JSON.parse(featuredProducts?.selectedVal);
        if (
          productsData?.featuredproducts &&
          productsData?.featuredproducts?.value
        ) {
          const bodyArr = productsData.featuredproducts?.value.map(
            (tab: _SelectedTab) => {
              const tagNameFunc = () => {
                if (tab.displayMethod == 'manual') {
                  return '';
                } else if (tab.displayMethod == 'dynamic') {
                  if (accordian?.featuredproducts_product_to_display?.value) {
                    return accordian?.featuredproducts_product_to_display
                      ?.value;
                  } else {
                    return 'featured';
                  }
                }
              };

              let body = {
                sename:
                  tab.displayMethod == 'dynamic'
                    ? tab.selectedBrands
                        ?.map(
                          (brand: { value: string; label: string }) =>
                            brand.value,
                        )
                        .join(',')
                    : tab.selectedProducts
                        .map((product: any) => product?.seName)
                        .join(','),
                type:
                  tab.displayMethod == 'dynamic'
                    ? tab.productType
                    : tab.displayMethod,
                storeId: _globalStore.storeId,
                tagName: tagNameFunc(),
                maximumItemsForFetch: tab.productCount,
              };
              return body;
            },
          );

          const TabingApiArray = bodyArr.map(
            async (body: {
              sename: string;
              type: string;
              storeId: number;
              tagName: string;
              maximumItemsForFetch: number | string;
            }) => {
              return await FetchDataByBrand(body);
            },
          );

          if (TabingApiArray.length > 0) {
            const allTabingData = await Promise.all(TabingApiArray);

            productsData.featuredproducts?.value.map(
              (tab: _SelectedTab, index: number) => {
                data[tab?.tabName] = allTabingData[index];
              },
            );
          }
        }
      }
    }
  }
  if (storeId) {
    const albhabetSet = new Set();
    await FetchBrands({ storeId: storeId }).then((result) => {
      if (!result?.brands) {
        return;
      }
      brands = result.brands.sort(
        (a: { brandName: string }, b: { brandName: string }) => {
          albhabetSet.add(a.brandName[0].toLowerCase());
          return a.brandName
            .toLowerCase()
            .localeCompare(b.brandName.toLowerCase());
        },
      );
      if (brands) {
        brands = removeDuplicates(brands);
        brands = brands.map((brd) => {
          const firstLetter = brd.brandName.charAt(0).toUpperCase();
          const remainingLetter = brd.brandName.slice(1);
          return { ...brd, brandName: firstLetter + remainingLetter };
        });
      }

      alphabets = albhabetSet?.size
        ? (Array.from(albhabetSet) as string[])
        : [];
    });
  }

  return {
    props: {
      brands: brands,
      featuredItems: data,
      alphabets: alphabets,
      accordian: accordian,
      metaData: pageMetaData,
    },
  };
};
