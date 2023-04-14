import { SendAsync } from '@utils/axios.util';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TrackFile = async (body: any) => {
  const url =
    '/MarketingVariableTracking/createmarketingvariabletrackingfile.json';
  const res = await SendAsync({
    url: url,
    method: 'POST',
    data: { ...body },
  });
  return res;
};
