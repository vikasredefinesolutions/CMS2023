import { THD_STORE_CODE } from '@constants/global.constant';
import ProductDescription_Type3 from './ProductDescription_Type3';
import ProductImg_Type3 from './ProductImg_Type3';
import ProductInfo_Type3 from './ProductInfo_Type3';
import { _ProductDetailsProps } from './productDetailsComponents';
const ProductDetail_Type3: React.FC<_ProductDetailsProps> = ({
  product,
  storeCode,
}) => {
  return (
    <div className='container mx-auto'>
      <div className='bg-[#ffffff]'>
        <div
          className={`${
            storeCode === THD_STORE_CODE
              ? 'lg:grid lg:grid-cols-2 lg:items-start'
              : 'lg:grid lg:grid-cols-12 lg:items-start px-[10px]'
          }`}
        >
          <ProductImg_Type3 product={product} />
          <ProductInfo_Type3 product={product} storeCode={storeCode} />
        </div>
      </div>
      <ProductDescription_Type3 product={product} />
      {/* <SizeChart_Type3 /> */}
    </div>
  );
};

export default ProductDetail_Type3;
