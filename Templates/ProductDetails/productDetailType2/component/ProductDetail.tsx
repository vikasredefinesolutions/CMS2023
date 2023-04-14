import ProductInfo from './ProductInfo';
import ProductImg from './ProductImg';
import { _ProductDetailsProps } from './productDetailsComponents';
const ProductDetail: React.FC<_ProductDetailsProps> = ({product, storeCode}) => {
  // console.log('type 2');
  
  return (
    <div className='container mx-auto mt-[15px]'>
      <div className='lg:grid lg:grid-cols-2 lg:items-start pb-[20px]'>
        <ProductImg product={product} />
        <ProductInfo product={product} storeCode={storeCode} />
      </div>
    </div>
  );
};

export default ProductDetail;
