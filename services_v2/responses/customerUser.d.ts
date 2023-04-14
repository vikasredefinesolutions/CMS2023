export interface CustomerUsersObject {
  name: string;
  customerRoleName: string;
  storeName?: string;
  createdByName?: string;
  modifiedByName?: string;
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  customerRoleId: number;
  storeId: number;
  customerId: number;
  recStatus?: string;
  createdDate: Date;
  createdBy: number;
  modifiedDate?: string;
  modifiedBy?: string;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
}

export interface Errors {
  [key: string]: string;
}

export interface CustomerAddResponse {
  success: boolean;
  data: boolean | CustomerUsersObject[];
  errors: Errors;
  otherData?: null;
}
