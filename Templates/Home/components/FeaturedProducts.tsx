import { _SelectedBrands } from '@definations/APIs/storeDetails.res';
import { newFetauredItemResponse } from '@definations/productList.type';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import React, { useEffect } from 'react';
import BrandProductListing from './GeneralProductContainer/BrandProducsListing';
import ProductsInfoTabs from './GeneralProductContainer/GeneralProductTabs';
interface _props {
  dataArr: _SelectedBrands;
  featuredItems: { [x: string]: newFetauredItemResponse[] };
  count: number;
  setCount: (x: any) => void;
}

const FeaturedProducts: React.FC<_props> = (props) => {
  const { dataArr, featuredItems, setCount, count } = props;
  const storeCode = useTypedSelector_v2((state) => state.store.code);
  let fTitle = dataArr?.sectionTitle?.value;
  useEffect(() => {
    setCount((prev: any) => prev + 1);
  }, []);
  return (
    <section className='mainsection featured_items text-center por_a'>
      {fTitle && (
        <div
          className={`pkhg-featured-title pkhg-featured-title peter-millar-promotional-embroidered-clothing-nw ${dataArr?.sectionTitle_final_class?.value}`}
        >
          {' '}
          {storeCode === 'PKHG' ? (
            <>
              <span>{fTitle}</span>
            </>
          ) : (
            <> {fTitle}</>
          )}
        </div>
      )}

      <div>
        {dataArr?.featuredproducts_tabing_display &&
        dataArr?.featuredproducts_tabing_display?.value === 'Yes' &&
        dataArr.featuredproducts.value.length > 1 ? (
          <ProductsInfoTabs
            data={dataArr?.featuredproducts?.value}
            featuredItems={featuredItems}
            showBorder={dataArr?.featuredproducts_show_border?.value}
            customMessage={dataArr?.featuredproducts_custom_message?.value}
            showProductName={dataArr?.featuredproducts_show_product_name?.value}
            showPrice={dataArr?.featuredproducts_show_price?.value}
            footerTabing={
              dataArr?.featuredproducts_footer_tabing_display?.value
            }
            showSplitProducts={
              dataArr?.featuredproducts_show_split_products?.value
            }
            showButton={dataArr?.featuredproducts_show_button?.value}
            showBrandLogo={dataArr?.featuredproducts_show_brand_logo?.value}
            productToDisplay={
              dataArr?.featuredproducts_product_to_display?.value
            }
          />
        ) : (
          <div className='relative pt-[30px] '>
            <BrandProductListing
              showBorder={dataArr?.featuredproducts_show_border?.value}
              featuredItems={featuredItems}
              productsData={dataArr?.featuredproducts?.value[0]}
              customMessage={dataArr?.featuredproducts_custom_message?.value}
              showProductName={
                dataArr?.featuredproducts_show_product_name?.value
              }
              showPrice={dataArr?.featuredproducts_show_price?.value}
              showSplitProducts={
                dataArr?.featuredproducts_show_split_products?.value
              }
              showButton={dataArr?.featuredproducts_show_button?.value}
              showBrandLogo={dataArr?.featuredproducts_show_brand_logo?.value}
              productToDisplay={
                dataArr?.featuredproducts_product_to_display?.value
              }
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
