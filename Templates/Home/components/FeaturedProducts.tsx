import { _SelectedBrands } from '@definations/APIs/storeDetails.res';
import React from 'react';
import ProductsInfoTabs from './GeneralProductContainer/GeneralProductTabs';

interface _props {
  dataArr: _SelectedBrands;
}

const FeaturedProducts: React.FC<_props> = ({ dataArr }) => {
  return (
    <section
      className='mainsection featured_items text-center'
      style={{ padding: '50px 0 0' }}
    >
      <div className='peter-millar-promotional-embroidered-clothing-nw'>
        {dataArr.featuredproducts_section_title.value ?? ''}
      </div>
      <div>
        {dataArr?.featuredproducts_tabing_display &&
        dataArr?.featuredproducts_tabing_display?.value === 'Yes' &&
        dataArr.featuredproducts.value.length > 1 ? (
          <ProductsInfoTabs data={dataArr?.featuredproducts?.value} />
        ) : (
          // <ProductsInfo dataArr={dataArr} />
          <h1></h1>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
