import { PunchoutPostApi } from '@services/punchout.service';
import { useRouter } from 'next/router';
import getRawBody from 'raw-body';
import { useEffect } from 'react';

const Punchout = (props: any) => {
  const router = useRouter();

  function parseXmlToJson(xml: any) {
    const json: any = {};
    for (const res of xml.matchAll(
      /(?:<(\w*)(?:\s[^>]*)*>)((?:(?!<\1).)*)(?:<\/\1>)|<(\w*)(?:\s*)*\/>/gm,
    )) {
      const key = res[1] || res[3];
      const value = res[2] && parseXmlToJson(res[2]);
      json[key] = (value && Object.keys(value).length ? value : res[2]) || null;
    }
    return json;
  }

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(props.body);
      let obj: Record<string, any> = {
        pos: params.get('pos'),
        return_url: params.get('return_url'),
        params: JSON.parse(params.get('params') || ''),
        payloadID:
          '200308221150.1061578208432.5888140454604746680@punchout2go.com',
        timestamp: '2003-08-22T11:50:27',
        lang: 'en-US',
      };
      console.log(obj);
      sessionStorage.setItem('json', JSON.stringify(obj));
      let a = `${JSON.stringify(obj)}`;
      const b = await PunchoutPostApi(a);
      const xml = b
        .toString()
        .replace('###StoreUrl###', `https://${props.returnUrl}`);
      const xmlJson = parseXmlToJson(xml);
      const url = xmlJson.cXML.Response.PunchOutSetupResponse.StartPage.URL;
      window.open(url);
    })();
  }, []);

  return <>This page exists and getting response</>;
};

export default Punchout;

export const getServerSideProps = async (context: any) => {
  const body = await getRawBody(context?.req);
  return {
    props: { body: body.toString(), returnUrl: context.req.headers.host },
  };
};
