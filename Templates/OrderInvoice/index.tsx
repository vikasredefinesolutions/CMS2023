import {
  _MyAcc_OrderBillingDetails,
  _MyAcc_OrderProductDetails,
} from '@definations/APIs/user.res';
import OrderInvoice_type1 from './OrderInvoice_Type1';
import { _OrderInvoiceTemplates } from './orderInvoice';

const OrderInvoiceTemplates: _OrderInvoiceTemplates = {
  type1: OrderInvoice_type1,
};
interface _props {
  order: {
    billing: _MyAcc_OrderBillingDetails | null;
    product: _MyAcc_OrderProductDetails[] | null;
  };
  id: 'type1';
}
const OrderInvoice: React.FC<_props> = ({ id, order }) => {
  const Component = OrderInvoiceTemplates[id];
  return <Component order={order} />;
};

export default OrderInvoice;
