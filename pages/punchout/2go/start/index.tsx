import { PunchoutPostApi } from '@services/punchout.service';
import axios from 'axios';
import getRawBody from 'raw-body';

const Punchout = (props: any) => {
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

  console.log(props, 'these are props');
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
    .replace('###StoreUrl###', `http://${context.req.headers.host}`);

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: obj.returnUrl,
    withCredentials: false,
    headers: {
      'Content-Type': 'application/xml',
      'Access-Control-Allow-Origin': '*',
    },
    data: returnxml,
  };
  let x = '';

  axios

    .request(config)
    .then((response) => {
      x = JSON.stringify(response.data);
    })
    .catch((err) => console.log(err));

  return { props: { body: returnxml, returnUrl: x } };
};
