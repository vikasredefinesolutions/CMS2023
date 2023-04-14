export interface _CustomerChangePasswordRes {
  issend: boolean;
}

export interface _CustomerRoleResponse {
  value: string;
  label: string;
}

export interface _AddCustomerRes {
  firstname: string;
  lastName: string;
  email: string;
  customerRoleId: number;
  storeId: number;
  customerId: number;
  recStatus: string;
  createdDate: string;
  createdBy: number;
  modifiedDate: null;
  modifiedBy: null;
  id: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
}
