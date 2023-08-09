import { PunchoutPostApi } from '@services/punchout.service';
import axios from 'axios';
import getRawBody from 'raw-body';
import { useEffect, useState } from 'react';

const Punchout = (props: any) => {
  const [returnXml, setReturnXml] = useState<any>('');
  console.log(props.returnUrl);
  // let returnxml = '';

  useEffect(() => {
    const params = new URLSearchParams(props.body);
    let obj: Record<string, any> = {};
    obj = {
      pos: params.get('pos'),
      return_url: params.get('return_url'),
      params: JSON.parse(params.get('params') || ''),
    };
    console.log(obj.return_url, 'return url');
    let a = `${JSON.stringify(obj)}`;
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
      url: 'https://connect.punchout2go.com/gateway/link/return/id/qC64d3646a67711',
      withCredentials: false,
      headers: {
        'Content-Type': 'application/xml',
        'Access-Control-Allow-Origin': '*',
      },
      data: '<?xml version="1.0" encoding="UTF-8"?>\r\n<!DOCTYPE cXML SYSTEM "http://xml.cxml.org/schemas/cXML/1.2.018/cXML.dtd">\r\n<cXML payloadID="CL5fcf88cbf1256@connect.punchout2go.com" timestamp="2020-12-08T14:08:16+00:00" version="1.2.018" xml:lang="en">\r\n    <Header>\r\n        <From>\r\n            <Credential domain="NetworkID">\r\n                <Identity>HUMANA</Identity>\r\n            </Credential>\r\n        </From>\r\n        <To>\r\n            <Credential domain="NetworkID">\r\n                <Identity>PKSTORES</Identity>\r\n            </Credential>\r\n        </To>\r\n        <Sender>\r\n            <Credential domain="NetworkID">\r\n                <Identity>PKSTORES</Identity>\r\n                <SharedSecret>testpass</SharedSecret>\r\n            </Credential>\r\n            <UserAgent>PO2GO cXML Adapter</UserAgent>\r\n        </Sender>\r\n    </Header>\r\n    <Request deploymentMode="production">\r\n        <PunchOutSetupRequest operation="create">\r\n            <BuyerCookie>CL5fcf88cbf1256</BuyerCookie>\r\n            <Extrinsic name="User">685395</Extrinsic>\r\n            <Extrinsic/>\r\n            <Extrinsic name="UniqueName">685395</Extrinsic>\r\n            <Extrinsic name="UserPrintableName">Andrea Martos</Extrinsic>\r\n            <Extrinsic name="UserEmail">AMartos3@humana.com</Extrinsic>\r\n            <BrowserFormPost>\r\n                <URL>https://portal.punchout2go.com/parsonskellogg/console/tools/punchout/session/944529/act/order?buyercookie=VD64d3646a33c89&amp;i=50493de4705f63617442d2d3d8c087f3</URL>\r\n            </BrowserFormPost>\r\n            <Contact>\r\n                <Name xml:lang="en">Andrea Martos</Name>\r\n                <Email>AMartos3@humana.com</Email>\r\n            </Contact>\r\n            <SupplierSetup>\r\n                <URL>https://humana.parsonskellogg.com/Punchout/Index</URL>\r\n            </SupplierSetup>\r\n            <ShipTo>\r\n                <Address addressID="default_addressid">\r\n                    <Name xml:lang="en">default_address</Name>\r\n                    <PostalAddress>\r\n                        <DeliverTo>default_shipto</DeliverTo>\r\n                        <Street>default_street</Street>\r\n                        <City>default_city</City>\r\n                        <State>default_state</State>\r\n                        <PostalCode>default_zip</PostalCode>\r\n                        <Country isoCountryCode="default_country_id">default_country</Country>\r\n                    </PostalAddress>\r\n                </Address>\r\n            </ShipTo>\r\n            <SelectedItem>\r\n                <ItemID>\r\n                    <SupplierPartID>AAA</SupplierPartID>\r\n                </ItemID>\r\n            </SelectedItem>\r\n        </PunchOutSetupRequest>\r\n    </Request>\r\n</cXML>',
    };
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((err) => console.log(err));
  }, []);

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
