/* eslint-disable no-unused-vars */

export type _modals =
  | 'requiredQty'
  | 'sizeChart'
  | 'availableInventory'
  | 'login'
  | 'forgot'
  | 'personalizationFonts'
  | 'qouteRequest'
  | 'startOrder'
  | 'InventoryLimit';

export interface _ModalProps {
  modalHandler: (val: null | _modals) => void;
  closeHandler?: () => void;
}

export interface _MessageContainerProps {
  modalHandler: (val: null | _modals) => void;
  message: string;
  title: string;
  confirmButton?: () => void;
}

export interface _SizeChartModalProps {
  modal?: 'NO';
  modalHandler(val: null | _modals): void;
}
