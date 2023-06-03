import { getPageType } from '@helpers/common.helper';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import Template from '@templates/OrderDetails';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const OrderDetails: NextPage = () => {
  const [seType, setSeType] = useState<string>('');
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const storeCode = useTypedSelector_v2((state) => state.store.code);

  useEffect(() => {
    if (storeId) {
      let pagesType = getPageType(storeId, 'myAccountPage').then((res: any) => {
        let pageType = res.config_value ? JSON.parse(res.config_value) : {};
        setSeType(pageType.myAccountTemplateId);
      });
    }
  }, [storeId]);

  return <>{seType && <Template id={`${seType}`} />};</>;
};

export default OrderDetails;
