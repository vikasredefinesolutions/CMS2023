import { _Store } from '@configs/page.config';
import { _defaultTemplates } from '@configs/template.config';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import Template from '@templates/OrderDetails';
import { NextPage } from 'next';

const OrderDetails: NextPage = () => {
  const storeCode = useTypedSelector_v2((state) => state.store.code);

  return (
    <>
      <Template
        id={storeCode === _Store.type4 ? 'type3' : _defaultTemplates.thankYou}
      />
      ;
    </>
  );
};

export default OrderDetails;
