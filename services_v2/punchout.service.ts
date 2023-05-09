export const PunchoutPostApi = async (body: string) => {
  const url =
    'https://redefine-front-staging.redefinecommerce.io/Punchout/index.json';
  let res = '';
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
