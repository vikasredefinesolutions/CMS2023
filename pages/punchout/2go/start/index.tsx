import { PunchoutPostApi } from '@services/punchout.service';
import axios from 'axios';
import getRawBody from 'raw-body';

const Punchout = (props: any) => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: props.returnUrl,
    withCredentials: false,
    headers: {
      'Content-Type': 'application/xml',
    },
    data: props.body,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((err) => console.log(err));
  // const myHeaders = new Headers();
  // myHeaders.append('Content-Type', 'application/xml');
  // myHeaders.append('Access-Control-Allow-Origin', ' no-cors');

  // if (props.body) {
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: props.body,
  //   };

  //   fetch(
  //     'https://connect.punchout2go.com/gateway/link/return/id/ZH645a10448cef6',
  //     requestOptions,
  //   )
  //     .then((response) => response.text())
  //     .then((result) => console.log(result))
  //     .catch((error) => console.log('error', error));
  // }

  return <>This page exists and getting response</>;
};

export default Punchout;

export const getServerSideProps = async (context: any) => {
  const body = await getRawBody(context?.req);
  const params = new URLSearchParams(body.toString());
  let obj: Record<string, any> = {};
  obj = {
    pos: params.get('pos'),
    return_url: params.get('return_url'),
    params: JSON.parse(params.get('params') || ''),
  };

  let a = `${JSON.stringify(obj)}`;
  let b = '';
  b = await PunchoutPostApi(a);
  let returnxml = b
    .toString()
    .replace('###StoreUrl###', `https://${context.req.headers.host}`);

  return { props: { body: returnxml, returnUrl: obj.return_url } };
};
