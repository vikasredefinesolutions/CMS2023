import { getServerSideProps } from '@controllers/getServerSideProps';
import { getPageType } from '@helpers/common.helper';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import OrdersTemplate from '@templates/Orders';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const Orders: NextPage = () => {
  const [seType, setSeType] = useState<string>('');
  const storeId = useTypedSelector_v2((state) => state.store.id);

  useEffect(() => {
    if (storeId) {
      let pagesType = getPageType(storeId, 'myAccountPage').then((res: any) => {
        let pageType = res.config_value ? JSON.parse(res.config_value) : {};
        setSeType(pageType.myAccountTemplateId);
      });
    }
  }, [storeId]);

  return <>{seType && <OrdersTemplate id={seType} />}</>;
};
export { getServerSideProps };

export default Orders;
