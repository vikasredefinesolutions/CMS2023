import SeoHead from '@appComponents/reUsable/SeoHead';
import { _defaultTemplates } from '@configs/template.config';
import { FetchPageThemeConfigs } from '@services/product.service';
import CheckoutTemplate from '@templates/checkout';
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next';
import { _globalStore } from 'store.global';

const Checkout: NextPage<{ templateId: number }> = ({ templateId }) => {
  return (
    <>
      <SeoHead title={'Checkout'} keywords={''} description={''} />
      <div className='checkoutpage'>
        <CheckoutTemplate templateId={templateId} />
      </div>
    </>
  );
};

export default Checkout;

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<{ templateId: number }>
> => {
  let cartPageTemplateId = _defaultTemplates.cart;

  await FetchPageThemeConfigs('' + _globalStore.storeId, 'cartPage').then(
    (res) => {
      if (res.config_value) {
        let type: { cartPageTemplateId: number } = JSON.parse(res.config_value);
        cartPageTemplateId = type.cartPageTemplateId;
      }
    },
  );

  return {
    props: {
      templateId: cartPageTemplateId,
    },
  };
};
