import { _ProductColor } from '@definations/APIs/colors.res';
import { _ProductInventoryTransfomed } from '@definations/APIs/inventory.res';
import { _ProductBySku } from '@definations/APIs/productDetail.res';

export interface _CompareProducts {
  details: _ProductBySku[] | null;
  colors: Array<_ProductColor[] | null> | null;
  inventory: (_ProductInventoryTransfomed | null)[] | null;
}
