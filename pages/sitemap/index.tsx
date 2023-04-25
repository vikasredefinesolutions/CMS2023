import { _defaultTemplates } from '@configs/template.config';
import SiteMap from '@templates/siteMap';
import { _siteMapProps, _siteMapstore } from '@templates/siteMap/siteMapTypes';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { _globalStore } from 'store.global';

const index = ({ store }: _siteMapProps) => {
  return (
    <>
      <SiteMap id={_defaultTemplates.siteMap} store={store} />
    </>
  );
};

const expectedProps: _siteMapstore = {
  store: null,
};
export const getServerSideProps: GetServerSideProps = async (
  // eslint-disable-next-line no-unused-vars
  context,
): Promise<GetServerSidePropsResult<_siteMapstore>> => {
  let { store } = expectedProps;

  if (_globalStore.storeId) {
    store = {
      storeCode: _globalStore.code,
      storeTypeId: _globalStore.storeTypeId,
      storeId: _globalStore.storeId,
    };
  }

  return {
    props: {
      store: store,
    },
  };
};
export default index;
