import { OTFAddResponse } from '@definations/APIs/otf.res';
import { OTFItemNoList, OTFItemVariantList } from '@definations/otfItem.res';
import { SendAsync } from '@utils/axios.util';

export const getOtfItemNo = async (): Promise<OTFItemNoList | null> => {
  const url = '/OtfItem/GetOtfItemNo.json';
  try {
    const res = await SendAsync<OTFItemNoList | null>({
      url,
      method: 'GET',
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const getOtfItemVariant =
  async (): Promise<OTFItemVariantList | null> => {
    const url = '/OtfItem/GetOtfVariantCode.json';
    try {
      const res = await SendAsync<OTFItemVariantList | null>({
        url,
        method: 'GET',
      });
      return res;
    } catch (error) {
      return null;
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
