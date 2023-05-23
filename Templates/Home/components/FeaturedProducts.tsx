import { _SelectedBrands } from '@definations/APIs/storeDetails.res';
import React from 'react';
import BrandProductListing from './GeneralProductContainer/BrandProducsListing';
import ProductsInfoTabs from './GeneralProductContainer/GeneralProductTabs';

interface _props {
  dataArr: _SelectedBrands;
}

const FeaturedProducts: React.FC<_props> = (props) => {
  const { dataArr } = props;

  return (
    <section className='mainsection featured_items text-center'>
      {dataArr.featuredproducts_section_title.value && (
        <div className='peter-millar-promotional-embroidered-clothing-nw'>
          {dataArr.featuredproducts_section_title.value ?? ''}
        </div>
      )}

      <div>
        {dataArr?.featuredproducts_tabing_display &&
        dataArr?.featuredproducts_tabing_display?.value === 'Yes' &&
        dataArr.featuredproducts.value.length > 1 ? (
          <ProductsInfoTabs
            data={dataArr?.featuredproducts?.value}
            showBorder={dataArr?.featuredproducts_show_border?.value}
            customMessage={dataArr?.featuredproducts_custom_message?.value}
          />
        ) : (
          <div className='relative pt-[30px] '>
            <BrandProductListing
              showBorder={dataArr?.featuredproducts_show_border?.value}
              productsData={dataArr?.featuredproducts?.value[0]?.data}
              customMessage={dataArr?.featuredproducts_custom_message?.value}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
