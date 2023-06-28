import { giftCard } from '@definations/productList.type';
import { FetchGiftCardsList } from '@services/gift.service';
import GiftCard from '@templates/GiftCard/GiftListing';
import { GetServerSideProps, NextPage } from 'next';
import { _globalStore } from 'store.global';

interface Props {
  giftCards: giftCard[];
}
const GiftListing: NextPage<Props> = ({ giftCards }) => {
  return (
    <div>
      <section id=''>
        <div className='container mx-auto'>
          <div className='bg-[#ffffff]'>
            <div
              aria-labelledby='products-heading'
              className='pt-[20px] px-[10px]'
            >
              <h2 id='products-heading' className='sr-only'>
                Gift Card
              </h2>
              <div className='relative w-full pb-[24px] mb-[-24px]'>
                <ul
                  role='list'
                  className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4 mb-[32px]'
                >
                  {giftCards.map((giftCard: giftCard, index: number) => {
                    return (
                      <GiftCard
                        giftCard={giftCard}
                        key={`${index}_${giftCard.sku}`}
                      />
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  let store = {
    storeCode: _globalStore.code,
    storeTypeId: _globalStore.storeTypeId,
    storeId: _globalStore.storeId,
  };
  const giftCards = await FetchGiftCardsList({ storeId: store.storeId });
  return { props: { giftCards: giftCards } };
};
export default GiftListing;
