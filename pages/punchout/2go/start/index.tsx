import getRawBody from 'raw-body';

const Puchout = (props: any) => {
  const params = new URLSearchParams(props.body);
  let obj = {};
  obj = { ...obj, ...JSON.parse(params.get('pos') || '') };
  obj = { ...obj, ...JSON.parse(params.get('return_url') || '') };
  obj = { ...obj, ...JSON.parse(params.get('params') || '') };

  console.log(obj);
  //   console.log(req, res, 'ooooooo');
  //   if (res) {
  //     let resxmlDoc = res.toLocaleString();

  //     const parser = new DOMParser();
  //     var resdoc = parser.parseFromString(resxmlDoc, 'text/xml');
  //     const serializedResponse = new XMLSerializer().serializeToString(resdoc);
  //     console.log(serializedResponse, 'serialized Response');
  //   }

  //   if (req) {
  //     let reqxmlDoc = req.toLocaleString();

  //     const reqparser = new DOMParser();
  //     var reqdoc = reqparser.parseFromString(reqxmlDoc, 'text/xml');
  //     const serializedRequest = new XMLSerializer().serializeToString(reqdoc);
  //     console.log(serializedRequest, 'serializeReqest');
  //   }

  return <>His page exists and getting response</>;
};

export default Puchout;

export const getServerSideProps = async (context: any) => {
  const body = await getRawBody(context?.req);
  return { props: { body: body.toString() } };
};

// export const getServerSideProps = async (context: any) => {
//   let xmlDoc = context.res.body.toLocaleString();

//   const parser = new DOMParser();
//   var doc = parser.parseFromString(xmlDoc, 'text/xml');
//   const serialized = new XMLSerializer().serializeToString(doc);
//   return {
//     props: {
//       response: serialized,
//     },
//   };

//   const filePath = path.join(process.cwd(), '/public/success.xml');
//   const xmlData = await fsPrmoises.readFile(filePath);
//   let xmlDoc = xmlData.toLocaleString();

//   const parser = new DOMParser();
//   var doc = parser.parseFromString(xmlDoc, 'text/xml');
//   const serialized = new XMLSerializer().serializeToString(doc);

//   let body = '';
//   if (req.method == 'POST') {
//     req.on('data', (chunk: any) => {
//       body += chunk;
//     });
//     req.on('end', () => {});
//   }

//   const res = await PunchoutPostApi(serialized);
//   console.log(res, 'this si ');
//   return {
//     props: {
//       req: {
//         data: {
//           body: serialized,
//           headers: { ...context.req.headers },
//           returnUrl: { ...context.req?.return_url },
//         },
//       },
//       res: {
//         data: {
//           body: { ...context.res.body },
//           headers: { ...context.res.headers },
//           params: { ...context.req?.params },
//           returnUrl: { ...context.req?.return_url },
//         },
//       },
//       punchout: res,
//     },
//   };
// };
