import { CYXTERA_CODE, UNITI_CODE } from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';

interface _props {
  phoneNumber: string;
  email: string;
  headerTextColor: string;
}
const CompanyInfo: React.FC<_props> = ({ phoneNumber, email, headerTextColor }) => {
  const { code: store_Code } = useTypedSelector_v2((state) => state.store);
  const { allowedBalance } = useTypedSelector_v2(
    (state) => state.cart.userCreditBalance,
  );
  const { id: loggedIn, customer } = useTypedSelector_v2((state) => state.user);
  const { view } = useTypedSelector_v2((state) => state.store);
  if (view == 'MOBILE')
    return (
      <div className='sm:hidden block text-center pb-[10px] break-words border-b border-b-gray-border mb-[10px] text-default-text'  style={{ color: `${headerTextColor}`}}>
        {__pagesText.Headers.companyPhoneQuestion}{' '}
        <a href={`'tel:${phoneNumber}`} className='break-words' style={{ color: `${headerTextColor}`}}>
          {phoneNumber}
        </a>{' '}
        {__pagesText.Headers.companyEmailQuestion}{' '}
        <a href={`mailto:${email}`} className='break-words' style={{ color: `${headerTextColor}`}}>
          {email}
        </a>
        {(store_Code == CYXTERA_CODE || store_Code == UNITI_CODE) &&
          loggedIn && <div>Available Credit : {allowedBalance}</div>}
      </div>
    );

  if (view == 'DESKTOP')
    return (
      <div className='break-words w-full text-right hidden sm:block pb-[10px] text-default-text' style={{ color: `${headerTextColor}`}}>
        <div>
          {__pagesText.Headers.companyPhoneQuestion}{' '}
          <a href={`'tel:${phoneNumber}`} className='break-words'>
            {phoneNumber}
          </a>{' '}
        </div>
        <div>
          {__pagesText.Headers.companyEmailQuestion}{' '}
          <a href={`mailto:${email}`} className='break-words'>
            {email}
          </a>
          {(store_Code == CYXTERA_CODE || store_Code == UNITI_CODE) &&
            loggedIn && <div>Available Credit : {allowedBalance}</div>}
        </div>
      </div>
    );
  return <></>;
};

export default CompanyInfo;
