import NxtImage from '@appComponents/reUsable/Image';
import Link from 'next/link';

interface _Props {
  giftCard: {
    description: string;
    giftCardEnddate: string;
    imageName: string;
    name: string;
    ourCost: string;
    productId: number;
    salePrice: string;
    seName: string;
    shortDescription: string;
    sku: string;
    storeId: number;
  };
}

const GiftCard: React.FC<_Props> = ({ giftCard }) => {
  return (
    <li className='text-center'>
      <div className='flex justify-center w-full border border-transparent hover:border-gray-border hover:shadow-md'>
        <div className='relative w-full mb-[20px]'>
          <div className='w-full px-[30px] pt-[10px]'>
            <Link href={`/gift-card/${giftCard.seName}`}>
              <a className='relative'>
                <NxtImage
                  src={giftCard.imageName}
                  alt=''
                  title=''
                  className='w-auto h-auto max-h-max'
                />
              </a>
            </Link>
          </div>
          <div className='mt-[20px] relative md:px-[30px] px-[15px]'>
            <div className='mb-[10px] mt-[10px] h-[46px] text-medium-text'>
              <Link href={`/gift-card/${giftCard.seName}`}>
                <a className='relative text-anchor hover:text-anchor'>
                  {giftCard.name}
                </a>
              </Link>
            </div>
            <div className='mb-[12px] text-sub-text'>
              <span className='text-tertiary !font-normal'>
                ${giftCard.ourCost}
              </span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
export default GiftCard;
