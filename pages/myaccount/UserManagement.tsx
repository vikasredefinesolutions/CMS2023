import { getServerSideProps } from '@controllers/getServerSideProps';
import { getPageType } from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import UserManagementAccountSetting from '@templates/account/UserManage';
import { useEffect, useState } from 'react';

const index = () => {
  const [seType, setSeType] = useState<string>('');
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const { setShowLoader } = useActions_v2();
  const { showLoader } = useTypedSelector_v2((state) => state.loader);

  useEffect(() => {
    setShowLoader(true);
    if (storeId && !seType) {
      getPageType(storeId, 'myAccountPage')
        .then((res: any) => {
          let pageType = res?.config_value ? JSON.parse(res.config_value) : {};
          setSeType(pageType.myAccountTemplateId);
          setShowLoader(false);
        })
        .catch(() => setShowLoader(false));
    }
  }, [storeId]);

  return (
    <>{seType && !showLoader && <UserManagementAccountSetting id={seType} />}</>
  );
};
export { getServerSideProps };

export default index;
