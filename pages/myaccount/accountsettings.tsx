import { getServerSideProps } from '@controllers/getServerSideProps';
import { getPageType } from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import AccountSetting from '@templates/account';
import { useEffect, useState } from 'react';

const AccountSettingPage = () => {
  const [seType, setSeType] = useState<string>('');
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const { setShowLoader } = useActions_v2();
  const { showLoader } = useTypedSelector_v2((state) => state.loader);

  useEffect(() => {
    setShowLoader(true);
    if (storeId) {
      getPageType(storeId, 'myAccountPage')
        .then((res: any) => {
          let pageType = res.config_value ? JSON.parse(res.config_value) : {};
          setSeType(pageType.myAccountTemplateId);
          setShowLoader(false);
        })
        .catch(() => setShowLoader(false));
    }
  }, [storeId]);

  return <>{seType && !showLoader && <AccountSetting id={seType} />}</>;
};

export { getServerSideProps };

export default AccountSettingPage;
