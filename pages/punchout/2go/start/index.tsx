import getRawBody from 'raw-body';

const Puchout = (props: any) => {
  const params = new URLSearchParams(props.body);
  let obj = {};
  obj = {
    pos: params.get('pos'),
    return_url: params.get('return_url'),
    params: JSON.parse(params.get('params') || ''),
  };

  return <>This page exists and getting response</>;
};

export default Puchout;

export const getServerSideProps = async (context: any) => {
  const body = await getRawBody(context?.req);
  return { props: { body: body.toString() } };
};
