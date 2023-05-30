import NxtImage from '@appComponents/reUsable/Image';
import { useTypedSelector_v2 } from '@hooks_v2/index';

const BuyNowHeader = ({
  productName,
  msrp,
  image,
  buyNowHandler,
}: {
  productName: string;
  msrp: number;
  image: any;
  buyNowHandler: (event: any) => void;
}) => {
  const { totalPrice } = useTypedSelector_v2(
    (state) => state.product.toCheckout,
  );
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  return storeId === 7 ? (
    <div className='fixed top-0 left-0 right-0 pt-[10px] pb-[10px] z-[100] bg-white'>
      <div className='container mx-auto'>
        <div className='flex flex-wrap border-b border-gray-border justify-between gap-4 items-center'>
          <div className='flex flex-wrap items-center gap-4'>
            <div className='w-[60px]'>
              <NxtImage
                src={image.imageUrl}
                alt={image.altTag}
                className='max-h-full'
                title={image.altTag}
              />
            </div>

            <div className='text-sub-text'>
              <div className='text-anchor mb-[10px]'>{productName}</div>

              <div className='text-tertiary'>
                ${totalPrice ? totalPrice : msrp}
              </div>
            </div>
          </div>

          <div className=''>
            <button
              className='btn btn-primary'
              onClick={(e) => {
                e.stopPropagation();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                buyNowHandler(e);
              }}
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default BuyNowHeader;
