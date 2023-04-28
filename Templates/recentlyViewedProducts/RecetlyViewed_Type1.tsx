import { NextPage } from 'next';
import { _RecentlyViewedProps } from './RecetlyViewed.d';
import RecentlyViewed from './components/RecentlyViewed';

const ProductRecetlyViewed_Type1: NextPage<_RecentlyViewedProps> = ({
  product,
}) => {
  return <RecentlyViewed product={product} title='RECENTLY VIEWED' />;
};

export default ProductRecetlyViewed_Type1;
