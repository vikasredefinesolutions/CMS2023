import {
  BOSTONBEAR,
  customRequestStoreTypes,
} from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import CustomRequestTemplate from '@templates/CustomRequestForm';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const CustomRequestForm = () => {
  const storeCode = useTypedSelector_v2((state) => state.store.code);
  const router = useRouter();
  useEffect(() => {
    if (storeCode == BOSTONBEAR) {
      router.push(paths.Boston_CUSTOM_Item_REQUEST_FORM);
    }
  }, [storeCode]);

  return (
    <CustomRequestTemplate id={customRequestStoreTypes.get(storeCode) || '1'} />
  );
};

export default CustomRequestForm;
