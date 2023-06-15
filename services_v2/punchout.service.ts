import { SendAsync } from '@utils/axios.util';
import { AxiosRequestConfig } from 'axios';

export const PunchoutPostApi = async (body: string) => {
  const url = '/Punchout/index.json';
  const res: any = await SendAsync<AxiosRequestConfig>({
    url: url,
    method: 'POST',
    data: { message: 'success', returnUrl: body },
  });
  return res;
};
