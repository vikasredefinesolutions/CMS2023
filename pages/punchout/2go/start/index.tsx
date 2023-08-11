import { PunchoutPostApi } from '@services/punchout.service';
import axios from 'axios';
import getRawBody from 'raw-body';
import { useEffect, useState } from 'react';

const Punchout = (props: any) => {
  const [returnXml, setReturnXml] = useState<any>('');
  console.log(props.returnUrl);
  // let returnxml = '';

  useEffect(() => {
    if(returnXml !== "" && returnXml !== "<empty string>")
    {
      
    const params = new URLSearchParams(props.body);
    console.log(params, 'params');
    let obj: Record<string, any> = {};
    obj = {
      pos: params.get('pos'),
      return_url: params.get('return_url'),
      params: JSON.parse(params.get('params') || ''),
    };
    console.log(obj);
    let a = `${JSON.stringify(obj)}`;
    console.log(a);
    let b = '';
    const fetchData = async (a: any) => {
      b = await PunchoutPostApi(a);
      console.log(b, 'coming from backend'),
        setReturnXml(
          b.toString().replace('###StoreUrl###', `https://${props.returnUrl}`),
        );
    };
    fetchData(a);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: obj.return_url,
      withCredentials: false,
      headers: {
        'Content-Type': 'application/xml',
        'Access-Control-Allow-Origin': '*',
      },
      data: returnXml.replace('https://pkthehartforddev.parsonskellogg.com/home/index', 'https://humanadev.parsonskellogg.com')
    };
    console.log("CI", config);
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((err) => console.log(err));
    }
  }, [returnXml]);

 console.log(returnXml, 'xmllllll');

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
  return {
    props: { body: body.toString(), returnUrl: context.req.headers.host },
  };
};
