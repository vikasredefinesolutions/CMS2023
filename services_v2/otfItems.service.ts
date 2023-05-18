import { OTFAddResponse } from '@definations/APIs/otf.res';
import { SendAsync } from '@utils/axios.util';

export type OTFItem = {
  value: string;
  label: string;
};
export type OTFVariant = {
  value: string;
  label: string;
};

export const FetchOtfItemNumbers = async (): Promise<OTFItem[]> => {
  const url = '/OtfItem/GetOtfItemNo.json';
  try {
    const res = await SendAsync<OTFItem[] | null>({
      url,
      method: 'GET',
    });

    if (!res) {
      return [];
    }
    return res;
  } catch (error) {
    return [];
  }
};

export const FetchOtfItemVariants = async (): Promise<OTFVariant[]> => {
  const url = '/OtfItem/GetOtfVariantCode.json';
  try {
    const res = await SendAsync<OTFVariant[] | null>({
      url,
      method: 'GET',
    });

    if (!res) {
      return [];
    }

    return res;
  } catch (error) {
    return [];
  }
};

export const addOtfItem = async (payload: any) => {
  const url = '/OtfItem/CreateOtfItem';
  try {
    const res = await SendAsync<OTFAddResponse>({
      url,
      method: 'POST',
      data: payload,
    });
    return res;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};
