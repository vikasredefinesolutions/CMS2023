import { useTypedSelector_v2 } from '@hooks_v2/index';
import React from 'react';

interface _props {}

const Br3_Products: React.FC<_props> = () => {
  const storeId = useTypedSelector_v2((state) => state.store.id);

  return (
    <section className='container mx-auto pt-20 brand-logo-list white-title'>
      <div>
        <h1>Brands Page</h1>
      </div>
    </section>
  );
};

export default Br3_Products;
