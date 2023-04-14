import {
  FetchLogoPayload,
  SubmitFeedbackPayloadType,
} from '@definations/APIs/logo.req';
import {
  ApprovedLogoItem,
  LogoDetails,
  LogoList,
} from '@definations/APIs/logo.res';
import { CallAPI_v2 } from '@helpers/api.helper';
import { conditionalLog_V2 } from '@helpers/console.helper';
import getLocation from '@helpers/getLocation';
import { SendAsync } from '@utils/axios.util';
import { _showConsoles } from 'configs_v2/show.config';

export type _LogoAPIs = 'UploadLogoWithDetails';

export type _LogoApiService = {
  service: 'Logo';
  api: _LogoAPIs;
};

export const getLogoDetailsById = async (
  logoId: number,
): Promise<LogoDetails | null> => {
  try {
    const url = `/StoreCustomerLogo/getalllistbycustomerlogoid/${logoId}.json`;
    const res = await SendAsync<LogoDetails>({
      url: url,
      method: 'POST',
      data: logoId,
    });
    conditionalLog_V2({
      data: res,
      name: 'getLogoDetailsById',
      type: 'API',
      show: _showConsoles.services.logo,
    });
    return res;
  } catch (error) {
    conditionalLog_V2({
      data: error,
      name: 'getLogoDetailsById',
      type: 'API',
      show: _showConsoles.services.logo,
      error: true,
    });
    return null;
  }
};

export const getLogoDetailsList = async (
  payload: FetchLogoPayload,
): Promise<LogoList | null> => {
  try {
    const url = `/StoreCustomerLogo/list.json`;
    const res = await SendAsync<LogoList>({
      url: url,
      method: 'POST',
      data: payload,
    });
    conditionalLog_V2({
      data: res,
      name: 'getLogoDetailsList',
      type: 'API',
      show: _showConsoles.services.logo,
    });
    return res;
  } catch (error) {
    conditionalLog_V2({
      data: error,
      name: 'getLogoDetailsList',
      type: 'API',
      show: _showConsoles.services.logo,
      error: true,
    });
    return null;
  }
};

export const getApprovedLogoWithPosition = async (
  payload: FetchApprovedLogoPayload,
): Promise<ApprovedLogoItem[] | null> => {
  try {
    const url = `StoreCustomerLogo/getreusecustomerlogobycustomerid/${payload.customerid}/${payload.storeid}/${payload.LogoPosition}.json`;
    const res = await SendAsync<ApprovedLogoItem[]>({
      url: url,
      method: 'GET',
    });
    conditionalLog_V2({
      data: res,
      name: 'getApprovedLogoDetailsList',
      type: 'API',
      show: _showConsoles.services.logo,
    });
    return res;
  } catch (error) {
    conditionalLog_V2({
      data: error,
      name: 'getApprovedLogoDetailsList',
      type: 'API',
      show: _showConsoles.services.logo,
      error: true,
    });
    return null;
  }
};

interface FetchApprovedLogoPayload {
  customerid: number;
  storeid: number;
  LogoPosition: string;
}
interface _UploadLogoWithDetails {
  customerId: number;
  logo: string;
  logoName: string;
  description: null;
  orderedCartLogoDetailId: number;
  id: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
}

interface _UploadLogoWithDetails_Payload {
  customerlogorequestmodel: {
    id: number;
    rowVersion: string;
    location: string;
    ipAddress: string;
    macAddress: string;
    customerId: number;
    logo: string;
    logoName: string;
    description: string;
    orderedCartLogoDetailId: number;
  };
}

export const UploadLogoWithDetails = async (payload: {
  id: number;
  customerId: number;
  logo: string;
  logoName: string;
  description: string;
  orderedCartLogoDetailId: number;
  logoPositionImage: string;
}): Promise<_UploadLogoWithDetails | null> => {
  const url = `/StoreCustomerLogo/create.json`;

  const location = await getLocation();
  const data: _UploadLogoWithDetails_Payload = {
    customerlogorequestmodel: {
      rowVersion: '',
      location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
      ipAddress: location.ip_address,
      macAddress: '00-00-00-00-00-00',
      ...payload,
    },
  };

  const response = await CallAPI_v2<_UploadLogoWithDetails>({
    name: {
      service: 'Logo',
      api: 'UploadLogoWithDetails',
    },
    request: {
      url: url,
      method: 'POST',
      data: data,
    },
  });

  return response;
};

export const submitLogoFeedback = async (
  payload: SubmitFeedbackPayloadType,
) => {
  try {
    const url = `/StoreCustomerLogo/submitfeedback.json`;
    const res = await SendAsync({
      url: url,
      method: 'POST',
      data: payload,
    });
    conditionalLog_V2({
      data: res,
      name: 'submitLogoFeedback',
      type: 'API',
      show: _showConsoles.services.logo,
    });
    return res;
  } catch (error) {
    conditionalLog_V2({
      data: error,
      name: 'submitLogoFeedback',
      type: 'API',
      show: _showConsoles.services.logo,
      error: true,
    });
    return null;
  }
};

export const approveLogo = async (payload: SubmitFeedbackPayloadType) => {
  try {
    const url = `/StoreCustomerLogo/approvelogo.json`;
    const res = await SendAsync({
      url: url,
      method: 'POST',
      data: payload,
    });
    conditionalLog_V2({
      data: res,
      name: 'approvelogo',
      type: 'API',
      show: _showConsoles.services.logo,
    });
    return res;
  } catch (error) {
    conditionalLog_V2({
      data: error,
      name: 'approvelogo',
      type: 'API',
      show: _showConsoles.services.logo,
      error: true,
    });
    return null;
  }
};
