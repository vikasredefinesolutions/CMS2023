import { NextPage } from 'next';
import RecentlyViewed from './components/RecentlyViewed';
import { _RecentlyViewedProps } from './RecetlyViewed.d';

const ProductRecetlyViewed_Type1: NextPage<_RecentlyViewedProps> = ({
  product,
}) => {
  return (
    <RecentlyViewed
      product={product}
      storeCode={product?.storeCode}
      title='RECENTLY VIEWED'
    />
  );
};

export default ProductRecetlyViewed_Type1;
