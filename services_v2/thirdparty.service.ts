import { SendAsync } from '@utils/axios.util';
interface _ThirdPartyservices {
  id: number;
  thirdPartyServiceId: number;
  storeId: number;
  name: string;
  description: string;
  url: string;
  username: string;
  password: string;
  key: string;
  secretkey: string;
  redirectUrlToSite: string;
  thankYouPageUrl: string;
  certificate: string;
  url1: null;
  url2: null;
  url3: null;
  recStatus: string;
  createdName: string;
  modifiedName: string;
  createdDate: string;
  createdBy: string;
  modifiedDate: null;
  modifiedBy: null;
  location: string;
  ipAddress: string;
  macAddress: string;
  storeName: string;
  thirdPartyServiceName: string;
  rowVersion: string;
}

export const fetchThirdpartyservice = async (payload: { storeId: number }) => {
  const url = `ThirdPartyCredentials/thirdpartyservicedetailsbystore.json`;
  const res = await SendAsync<Array<_ThirdPartyservices>>({
    url: url,
    method: 'POST',
    data: payload,
  });

  return res;
};
