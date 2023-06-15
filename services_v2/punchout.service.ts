export const PunchoutPostApi = async (body: string) => {
  let res = '';
  const url =
    'https://front-staging.parsonskellogg.services/Punchout/index.json';
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json-patch+json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => (res = data.data));

  return res;
};
