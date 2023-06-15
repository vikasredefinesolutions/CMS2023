import { SendAsync } from '@utils/axios.util';
import { AxiosRequestConfig } from 'axios';

export const PunchoutPostApi = async (body: string) => {
  console.log(body, 'JS....................');
  const url = '/Punchout/index.json';
  const res: any = await SendAsync<AxiosRequestConfig>({
    url: url,
    method: 'POST',
    data: body,
  });
  return res;
};
