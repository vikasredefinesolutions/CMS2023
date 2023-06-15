export const PunchoutPostApi = async (body: string) => {
  console.log(body, 'bodyyyyyyyyyyyyyyyyyyyyyyyyyyy');
  let res = '';
  const url =
    'https://front-staging.parsonskellogg.services/Punchout/index.json';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => (res = data.data));

  return res;
};
