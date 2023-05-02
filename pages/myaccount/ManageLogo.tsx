import { getServerSideProps } from '@controllers/getServerSideProps';
import { getPageType } from '@helpers/common.helper';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import ManageLogo from '@templates/ManageLogo';
import { useEffect, useState } from 'react';

const index = () => {
  const [seType, setSeType] = useState<string>('');
  const { id: storeId } = useTypedSelector_v2((state) => state.store);

  useEffect(() => {
    let pageType = getPageType(storeId, 'myAccountPage').then((res: any) => {
      let pageType = res.config_value ? JSON.parse(res.config_value) : {};
      setSeType(pageType.myAccountTemplateId);
    });
  }, [storeId]);
  return <>{seType && <ManageLogo id={seType} />}</>;
};
export { getServerSideProps };
export default index;
