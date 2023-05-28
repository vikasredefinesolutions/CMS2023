// import ProductImg from '@templates/ProductDetails/productDetailType4/component/ProductImg';
import FreeBannerTemplate5_Type2 from './FreeBannerTemplate5_Type2';
import ProductDescription from './ProductDescription';
import { _ProductDetailsProps } from './productDetailsComponents';
import ProductImg from './ProductImg';
import ProductInfo from './ProductInfo';
const ProductDetail: React.FC<_ProductDetailsProps> = ({
  product,
  storeCode,
}) => {
  return (
    <div className='container mx-auto mt-[15px]'>
      <div className='lg:grid lg:grid-cols-12 lg:items-start'>
        <div className='flex flex-wrap md:hidden'>
          <div className='w-full md:w-2/3'>
            <h1 className='text-title-text'></h1>
          </div>
        </div>
        <ProductImg product={product} />
        <ProductInfo product={product} storeCode={storeCode} />
      </div>
      <FreeBannerTemplate5_Type2 />
      <ProductDescription product={product} />
    </div>
  );
};

export default ProductDetail;
