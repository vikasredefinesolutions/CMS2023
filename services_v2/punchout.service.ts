export const PunchoutPostApi = async (body: string) => {
  console.log(body, 'bodyyyyyyyyyyyyyyyyyyyyyyyyyyy');
  let res = '';
  const url =
    'https://front-staging.parsonskellogg.services/Punchout/index.json';
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json-patch+json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => (res = data.data));

  return res;
};
