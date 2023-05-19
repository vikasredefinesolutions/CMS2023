import { _SelectedBrands } from '@definations/APIs/storeDetails.res';
import React from 'react';
import BrandProductListing from './GeneralProductContainer/BrandProducsListing';
import ProductsInfoTabs from './GeneralProductContainer/GeneralProductTabs';

interface _props {
  dataArr: _SelectedBrands;
}

const FeaturedProducts: React.FC<_props> = ({ dataArr }) => {
  return (
    <section className='mainsection featured_items text-center'>
      <div className='peter-millar-promotional-embroidered-clothing-nw'>
        {dataArr.featuredproducts_section_title.value ?? ''}
      </div>
      <div>
        {dataArr?.featuredproducts_tabing_display &&
        dataArr?.featuredproducts_tabing_display?.value === 'Yes' &&
        dataArr.featuredproducts.value.length > 1 ? (
          <ProductsInfoTabs
            data={dataArr?.featuredproducts?.value}
            showBorder={dataArr?.featuredproducts_show_border?.value}
          />
        ) : (
          <>
            <BrandProductListing
              showBorder={dataArr?.featuredproducts_show_border?.value}
              productsData={[]}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
