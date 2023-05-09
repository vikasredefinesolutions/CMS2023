import { __domain } from '@configs/page.config';
import { domainToShow } from '@helpers/common.helper';
import { PunchoutPostApi } from '@services/punchout.service';
import getRawBody from 'raw-body';

const Punchout = (props: any) => {
  console.log(props.body);

  return <>This page exists and getting response</>;
};

export default Punchout;

export const getServerSideProps = async (context: any) => {
  const domain = domainToShow({
    domain: context.ctx.req?.rawHeaders[1],
    showProd: __domain.isSiteLive,
  });
  const body = await getRawBody(context?.req);
  const params = new URLSearchParams(body.toString());
  let obj = {};
  obj = {
    pos: params.get('pos'),
    return_url: params.get('return_url'),
    params: JSON.parse(params.get('params') || ''),
  };
  // let obj = {
  //   pos: 'Ej6458838b114a8',
  //   return_url:
  //     'https://connect.punchout2go.com/gateway/link/return/id/Ej6458838b114a8',
  //   params: {
  //     header: {
  //       to: {
  //         '0': {
  //           data: [],
  //           value: '1085',
  //           domain: 'DUNS',
  //         },
  //         data: [],
  //       },
  //       from: {
  //         '0': {
  //           data: [],
  //           value: '1085',
  //           domain: 'NetworkID',
  //         },
  //         data: [],
  //       },
  //       sender: {
  //         '0': {
  //           data: {
  //             SharedSecret: 'testing',
  //           },
  //           value: 'testing@punchout2go.com',
  //           domain: 'Punchout2goClientId',
  //         },
  //         data: {
  //           UserAgent: 'PunchOut2Go Test Client v1',
  //         },
  //       },
  //     },
  //     type: 'setuprequest',
  //     operation: 'create',
  //     mode: 'test',
  //     body: {
  //       data: {
  //         User: 'Janet Smith',
  //         UserEmail: 'janet.smith@testuser.com',
  //         UserPrintableName: 'Janet Anne Smith',
  //         UserFirstName: '',
  //         UserLastName: '',
  //       },
  //       contact: {
  //         data: [],
  //         email: 'janet.smith@testuser.com',
  //         name: 'Janet Anne Smith',
  //         unique: 'Janet Smith',
  //       },
  //       buyercookie: 'QK6458838abd907',
  //       postform:
  //         'https://portal.punchout2go.com/parsonskellogg/console/tools/punchout/session/889713/act/order?buyercookie=QK6458838abd907&i=f7af4b6b541eca3811bd526c0a1f41a3',
  //       shipping: {
  //         data: {
  //           address_name: 'Headquarters MW',
  //           shipping_id: '05618',
  //           shipping_business: '',
  //           shipping_to: 'Accounting',
  //           shipping_street: '15624 Atlantic Rd',
  //           shipping_city: 'Milton',
  //           shipping_state: 'Wisconsin',
  //           shipping_zip: '64056',
  //           shipping_country: 'USA',
  //           country_id: 'US',
  //         },
  //       },
  //       items: [
  //         {
  //           primaryId: 'AAA',
  //           secondaryId: '',
  //           type: 'in',
  //         },
  //       ],
  //     },
  //     custom: {
  //       default_group: 'General',
  //       default_user: 'user@humana.com',
  //     },
  //   },
  // };

  let a = `${JSON.stringify(obj)}`;
  let b = '';
  b = await PunchoutPostApi(a);
  let returnxml = b
    .toString()
    .replace('###StoreUrl###', context.req.headers.host);

  return { props: { body: returnxml } };
};
