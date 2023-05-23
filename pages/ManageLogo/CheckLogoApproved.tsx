import { getPageType } from '@helpers/common.helper';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import CheckLogoApproved from '@templates/CheckLogoApproved';
import { useEffect, useState } from 'react';

const Index = () => {
  const [seType, setSeType] = useState<string>('');
  const storeId = useTypedSelector_v2((state) => state.store.id);

  useEffect(() => {
    if (storeId) {
      getPageType(storeId, 'myAccountPage').then((res: any) => {
        let pageType = res.config_value ? JSON.parse(res.config_value) : {};
        setSeType(`${pageType?.customizeLogoTemplate}`);
      });
    }
  }, [storeId]);
  return <>{seType ? <CheckLogoApproved id={seType} /> : null}</>;
};

export default Index;
