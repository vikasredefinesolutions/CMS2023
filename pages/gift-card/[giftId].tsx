import { _GiftDetailsProps } from '@definations/product.type';
import { FetchGiftCardDetailsBySename } from '@services/gift.service';
import GiftDetail from '@templates/GiftCard/GiftDetail';
import { GetServerSideProps, NextPage } from 'next';
import { _globalStore } from 'store.global';

const GiftCardDetails: NextPage<_GiftDetailsProps> = ({ giftData }) => {
  return <GiftDetail giftData={giftData} />;
};

export default GiftCardDetails;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let giftId = '';
  if (params?.giftId) giftId = params?.giftId as string;
  let store = {
    storeCode: _globalStore.code,
    storeId: _globalStore.storeId,
  };

  const data = await FetchGiftCardDetailsBySename({
    storeId: store.storeId,
    giftId: giftId,
  });

  return {
    props: {
      giftData: data,
    },
  };
};
