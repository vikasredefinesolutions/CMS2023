import { PunchoutPostApi } from '@services/punchout.service';
import getRawBody from 'raw-body';
import { useEffect } from 'react';

const Punchout = (props: any) => {
  console.log(props, 'this is props');
  useEffect(() => {
    const params = new URLSearchParams(props.body);
    let obj: Record<string, any> = {};
    obj = {
      pos: params.get('pos'),
      return_url: params.get('return_url'),
      params: JSON.parse(params.get('params') || ''),
    };
    let a = `${JSON.stringify(obj)}`;
    let b = '';

    PunchoutPostApi(a)
      .then((res) => {
        let str = `${res}`;
        let str1 = str.split('<URL>');
        let str2 = str1[1].split('</URL>');
        window.open(str2[0], '_blank');
      })
      .catch((err) => console.log(err));
  }, []);

  return <>This page exists and getting response</>;
};

export default Punchout;

export const getServerSideProps = async (context: any) => {
  const body = await getRawBody(context?.req);
  console.log(body, 'this is body');
  return {
    props: { body: body.toString(), returnUrl: context.req.headers.host },
  };
};
