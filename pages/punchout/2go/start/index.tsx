const Puchout = ({ req, res }: any) => {
  let resxmlDoc = res.body.toLocaleString();

  const parser = new DOMParser();
  var doc = parser.parseFromString(resxmlDoc, 'text/xml');
  const serializedResponse = new XMLSerializer().serializeToString(doc);
  let reqxmlDoc = res.body.toLocaleString();

  const reqparser = new DOMParser();
  var doc = reqparser.parseFromString(reqxmlDoc, 'text/xml');
  const serializedRequest = new XMLSerializer().serializeToString(doc);

  console.log(serializedRequest, 'serializeReqest');
  console.log(serializedResponse, 'serialized Response');
  return (
    <>
      His page exists and getting response {serializedResponse}{' '}
      {serializedRequest}
    </>
  );
};

export default Puchout;

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
