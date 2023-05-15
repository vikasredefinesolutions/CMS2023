import { useTypedSelector_v2 } from '@hooks_v2/index';
import { FetchPageThemeConfigs } from '@services/product.service';
import CheckoutTemplate from '@templates/checkout';
import { useEffect, useState } from 'react';

const Checkout = () => {
  const [cartTemplateId, setCartTemplateId] = useState<number>(1);
  const storeId = useTypedSelector_v2((state) => state.store.id);

  useEffect(() => {
    if (!storeId) return;

    FetchPageThemeConfigs(`${storeId}`, 'cartPage').then((res) => {
      if (res.config_value) return;
      const templateId = (
        JSON.parse(res.config_value) as { cartPageTemplateId: number }
      ).cartPageTemplateId;

      setCartTemplateId(templateId);
    });
  }, [storeId]);

  return (
    <div className='checkoutpage'>
      <CheckoutTemplate cartTemplateId={cartTemplateId} />
    </div>
  );
};

export default Checkout;
