import NxtImage from '@appComponents/reUsable/Image';
import { __pagesText } from '@constants/pages.text';
import { useRouter } from 'next/router';
import { _ProductCompanion } from './productDetailsComponents';
const ProductCompanion: React.FC<_ProductCompanion> = ({ product }) => {
  const router = useRouter();
  const goToProduct = (seName: string | null) => {
    if (seName === null) return;
    router.push(`${seName}`);
  };
  return (
    <>
      <div className='col-span-12 text-center pt-[20px]'>
        <div className='text-title-text'>
          {__pagesText.productInfo.companionProduct}
        </div>
      </div>
      <div className='col-span-12 md:col-start-5 md:col-span-4 text-center'>
        <div className=''>
          <NxtImage
            src={product && product.companionProductImage}
            alt={product && product.companionProductName}
            className=''
          ></NxtImage>
        </div>
        <div className='text-small-text h-[46px] overflow-hidden'>
          <button
            onClick={() => goToProduct(product?.companionProductSEName ?? null)}
            className='text-anchor hover:text-anchor-hover'
          >
            {product?.companionProductName}
          </button>
        </div>
      </div>
    </>
  );
};
export default ProductCompanion;
