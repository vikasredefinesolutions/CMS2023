import { __Login } from '@constants/global.constant';
import { SendAsync } from '@utils/axios.util';
import { _OktaLogoutModel, _profileModel } from './saml';

export const FetchSAMPLProfile = async (payload: _profileModel) => {
  const url = `Okta/SAMPLProfile.json`;
  try {
    const res = await SendAsync({
      url: url,
      method: 'POST',
      data: payload,
    });
    if (res === null) {
      return {
        credentials: 'INVALID',
        // @ts-ignore: Unreachable code error
        message: res?.errors,
      };
    }
    return {
      credentials: 'VALID',
      id: `${res}`,
    };
  } catch (error) {
    return {
      credentials: 'INVALID',
      message: __Login.something_went_wrong,
    };
  }
};

export const OktaLogout = async (payload: _OktaLogoutModel) => {
  const url = `/Okta/Logout`;
  const res = await SendAsync({
    url: url,
    method: 'POST',
    data: payload,
  });

  return res;
};
