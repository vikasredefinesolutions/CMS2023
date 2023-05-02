import { getServerSideProps } from '@controllers/getServerSideProps';
import { getPageType } from '@helpers/common.helper';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import AccountSetting from '@templates/account';
import { useEffect, useState } from 'react';

const index = () => {
  const [seType, setSeType] = useState<string>('');
  const storeId = useTypedSelector_v2((state) => state.store.id);
  useEffect(() => {
    if (storeId) {
      getPageType(storeId, 'myAccountPage').then((res: any) => {
        let pageType = res.config_value ? JSON.parse(res.config_value) : {};
        setSeType(pageType.myAccountTemplateId);
      });
    }
  }, [storeId]);

  return <>{seType && <AccountSetting id={seType} />}</>;
};

export { getServerSideProps };

export default index;
