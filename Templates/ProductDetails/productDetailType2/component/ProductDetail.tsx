import { _ProductDetails } from '@definations/APIs/productDetail.res';
import ProductDescription from './ProductDescription';
import ProductImg from './ProductImg';
import ProductInfo from './ProductInfo';
import ProductSizeChart from './ProductSizeChart';

interface _Props {
  product: _ProductDetails | null;
  storeCode: string;
  setShowLogoComponent: React.Dispatch<React.SetStateAction<boolean>>;
  showLogoComponent: boolean;
}
const ProductDetail: React.FC<_Props> = ({
  product,
  storeCode,
  setShowLogoComponent,
  showLogoComponent,
}) => {
  return (
    <>
      <div className='container mx-auto mt-[15px]'>
        <div className='lg:grid lg:grid-cols-2 lg:items-start pb-[20px]'>
          <div className='lg:hidden md-block w-full'>
            <div className='text-2xl-text mb-[20px]'>{product?.name}</div>
          </div>
          <ProductImg product={product!} />
          <ProductInfo
            product={product}
            storeCode={storeCode}
            setShowLogoComponent={setShowLogoComponent}
            showLogoComponent={showLogoComponent}
          />
        </div>
        <ProductDescription product={product} />
        <ProductSizeChart />
      </div>
    </>
  );
};

export default ProductDetail;
