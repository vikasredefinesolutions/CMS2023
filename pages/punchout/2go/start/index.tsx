import { PunchoutPostApi } from '@services/punchout.service';
import getRawBody from 'raw-body';
import { useEffect } from 'react';

const Punchout = (props: any) => {
  const headersList = {
    'Content-Type': 'application/xml',
  };

  useEffect(() => {
    fetch(props.returnUrl, {
      mode: 'cors',
      method: 'POST',
      body: props.body,
      headers: headersList,
    });
  }, []);

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
    .replace('###StoreUrl###', context.req.headers.host);

  return { props: { body: returnxml, returnUrl: obj.return_url } };
};
