import ProductDescription from './ProductDescription';
import ProductImg from './ProductImg';
import ProductInfo from './ProductInfo';
import ProductSizeChart from './ProductSizeChart';
import { _ProductDetailsProps } from './productDetailsComponents';
const ProductDetail: React.FC<_ProductDetailsProps> = ({
  product,
  storeCode,
}) => {
  return (
    <div className='container mx-auto mt-[15px]'>
      <div className='lg:grid lg:grid-cols-2 lg:items-start pb-[20px]'>
        <ProductImg product={product} />
        <ProductInfo product={product} storeCode={storeCode} />
      </div>
      <ProductDescription product={product} />
      <ProductSizeChart />
    </div>
  );
};

export default ProductDetail;
