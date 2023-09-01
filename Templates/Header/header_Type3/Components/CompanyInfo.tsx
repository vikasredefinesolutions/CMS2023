import {
  BOSTONBEAR,
  CYXTERA_CODE,
  UNITI_CODE,
} from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';

interface _props {
  phoneNumber: string;
  email: string;
}
const CompanyInfo: React.FC<_props> = ({ phoneNumber, email }) => {
  const { code: store_Code } = useTypedSelector_v2((state) => state.store);
  const { allowedBalance } = useTypedSelector_v2(
    (state) => state.cart.userCreditBalance,
  );
  const { id: loggedIn, customer } = useTypedSelector_v2((state) => state.user);
  const { view } = useTypedSelector_v2((state) => state.store);
  if (view == 'MOBILE')
    return (
      <div className='block text-center pb-[10px] break-words border-b border-b-gray-border mb-[10px] text-[12px] xl:text-[14px] font-[400] text-[#ffffff]'>
        {__pagesText.Headers.companyPhoneQuestion}{' '}
        <a
          href={`tel:${phoneNumber}`}
          className='break-words primary-link hover:primary-link'
        >
          {phoneNumber}
        </a>{' '}
        {store_Code == BOSTONBEAR && <span>or</span>}{' '}
        {__pagesText.Headers.companyEmailQuestion}{' '}
        <a
          href={`mailto:${email}`}
          className='break-words primary-link hover:primary-link'
        >
          {email}
        </a>
        {(store_Code == CYXTERA_CODE || store_Code == UNITI_CODE) &&
          loggedIn && <div>Available Credit : {allowedBalance}</div>}
      </div>
    );

  if (view == 'DESKTOP')
    return (
      <div className='break-words w-full text-right hidden sm:block pb-[10px] text-[12px] xl:text-[14px] font-[400] text-[#ffffff]'>
        <div>
          {__pagesText.Headers.companyPhoneQuestion}{' '}
          <a
            href={`tel:${phoneNumber}`}
            className='break-words primary-link hover:primary-link '
          >
            {phoneNumber}
          </a>{' '}
          {store_Code == BOSTONBEAR && <span>or</span>}
        </div>

        <div>
          {__pagesText.Headers.companyEmailQuestion}{' '}
          <a
            href={`mailto:${email}`}
            className='break-words primary-link hover:primary-link'
          >
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
