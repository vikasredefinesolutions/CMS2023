import { __pagesText } from '@constants/pages.text';
import { _ProductCompanion } from '@templates/ProductDetails/Components/productDetailsComponents';
import { useRouter } from 'next/router';
const ProductCompanion: React.FC<_ProductCompanion> = ({ product }) => {
  const router = useRouter();
  const goToProduct = (seName: string | null) => {
    if (seName === null) return;
    router.push(`${seName}`);
  };
  return (
    <>
      <div className=''>
        <div className='pt-[15px] text-default-text'>
          <div className='inline-block font-semibold'>
            {__pagesText.productInfo.companionProduct}:
          </div>
          <div className='mt-[5px]'>
            <a
              href='javascript:void(0);'
              className='underline'
              onClick={() =>
                goToProduct(product?.companionProductSEName ?? null)
              }
            >
              {product?.companionProductName}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductCompanion;
