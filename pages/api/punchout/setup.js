async function handler(req, res) {
  const body = await getRawBody(req);
  const params = new URLSearchParams(body.toString());
  let obj = {};
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
  res.status(200).send(returnxml);
}
export default nc().post(handler);
