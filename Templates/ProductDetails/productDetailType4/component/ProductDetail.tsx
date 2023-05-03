import { _ProductDetailsProps } from '@templates/ProductDetails/Components/productDetailsComponents';
import ProductDescription from './ProductDescription';
import ProductImg from './ProductImg';
import ProductInfo from './ProductInfo';
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
      {/* <ProductSizeChart /> */}
    </div>
  );
};

export default ProductDetail;
