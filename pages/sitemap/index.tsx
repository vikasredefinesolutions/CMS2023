import LoginModal from '@appComponents/modals/loginModal';
import ThirdPartyLogin from '@appComponents/modals/loginModal/ThirdPartyLogin';
import { _defaultTemplates } from '@configs/template.config';
import { _Store_CODES } from '@constants/global.constant';
import { _modals } from '@definations/product.type';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import SiteMap from '@templates/siteMap';
import { _siteMapProps, _siteMapstore } from '@templates/siteMap/siteMapTypes';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { _globalStore } from 'store.global';

const index = ({ store }: _siteMapProps) => {
  const router = useRouter();
  const { id: userID } = useTypedSelector_v2((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const { thirdPartyLogin } = useTypedSelector_v2((state) => state.store);

  useEffect(() => {
    if (
      (store?.storeCode === _Store_CODES.UNITi ||
        store?.storeCode === _Store_CODES.USAACLAIMS) &&
      !userID
    ) {
      setShowModal(true);
    }
  }, []);

  const modalHandler = (arg: _modals | null) => {
    setShowModal(false);
  };
  const closeHandler = () => {
    router.push('/').then(() => setShowModal(false));
  };

  const renderLoginModal = () => {
    return thirdPartyLogin ? (
      <ThirdPartyLogin
        modalHandler={modalHandler}
        closeHandler={closeHandler}
      />
    ) : (
      <LoginModal modalHandler={modalHandler} closeHandler={closeHandler} />
    );
  };

  return (
    <>
      {showModal ? (
        renderLoginModal()
      ) : (
        <SiteMap id={_defaultTemplates.siteMap} store={store} />
      )}
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
