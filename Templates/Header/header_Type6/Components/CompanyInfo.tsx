import Price from '@appComponents/reUsable/Price';
import {
  CYXTERA_CODE,
  HEALTHYPOINTS,
  SIMPLI_SAFE_CODE,
  UNITI_CODE,
} from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';

interface _props {
  phoneNumber: string;
  email: string;
  headerTextColor: string;
}
const CompanyInfo: React.FC<_props> = ({
  phoneNumber,
  email,
  headerTextColor,
}) => {
  const { code: store_Code } = useTypedSelector_v2((state) => state.store);
  const { allowedBalance } = useTypedSelector_v2(
    (state) => state.cart.userCreditBalance,
  );
  const { id: loggedIn, customer } = useTypedSelector_v2((state) => state.user);
  const { view } = useTypedSelector_v2((state) => state.store);
  if (view == 'MOBILE')
    return (
      <div
        className='break-words w-full text-right  sm:block pb-[10px] text-default-text primary-link'
        style={{
          color: `${store_Code == SIMPLI_SAFE_CODE ? '' : headerTextColor}`,
        }}
      >
        {__pagesText.Headers.companyPhoneQuestion}{' '}
        <a
          href={`tel:${phoneNumber}`}
          className='primary-link hover:primary-link break-words'
          // style={{ color: `${headerTextColor}` }}
        >
          {phoneNumber}
        </a>{' '}
        {__pagesText.Headers.companyEmailQuestion}{' '}
        <a
          href={`mailto:${email}`}
          className='primary-link hover:primary-link break-words'
          // style={{ color: `${headerTextColor}` }}
        >
          {email}
        </a>
        {(store_Code == CYXTERA_CODE ||
          store_Code == UNITI_CODE ||
          store_Code === SIMPLI_SAFE_CODE) &&
          loggedIn && (
            <div>Available Credit : {<Price value={allowedBalance} />}</div>
          )}
      </div>
    );

  if (view == 'DESKTOP') {
    if (store_Code == SIMPLI_SAFE_CODE || store_Code == HEALTHYPOINTS) {
      return (
        <div
          className='break-words w-full text-right hidden sm:block pb-[10px] text-default-text primary-link'
          style={{
            color: `${store_Code == SIMPLI_SAFE_CODE ? '' : headerTextColor}`,
          }}
        >
          {phoneNumber ? (
            <div>
              {__pagesText.Headers.companyPhoneQuestion}{' '}
              <a
                href={`tel:${phoneNumber}`}
                className='primary-link hover:primary-link break-words'
              >
                {phoneNumber}
              </a>{' '}
            </div>
          ) : (
            <></>
          )}

          {email ? (
            <div>
              {__pagesText.Headers.companyEmailQuestion}{' '}
              <a
                href={`mailto:${email}`}
                className='primary-link hover:primary-link break-words'
              >
                {email}
              </a>
              {store_Code == SIMPLI_SAFE_CODE && loggedIn && (
                <div>Available Credit : {<Price value={allowedBalance} />}</div>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      );
    } else {
      return (
        <div
          className='break-words w-full text-right hidden sm:block pb-[10px] text-default-text primary-link'
          style={{
            color: `${store_Code == SIMPLI_SAFE_CODE ? '' : headerTextColor}`,
          }}
        >
          <div>
            {__pagesText.Headers.companyPhoneQuestion}{' '}
            <a
              href={`'tel:${phoneNumber}`}
              className='primary-link hover:primary-link break-words'
            >
              {phoneNumber}
            </a>{' '}
          </div>

          <div>
            {__pagesText.Headers.companyEmailQuestion}{' '}
            <a
              href={`mailto:${email}`}
              className='primary-link hover:primary-link break-words'
            >
              {email}
            </a>
            {(store_Code == CYXTERA_CODE || store_Code == UNITI_CODE) &&
              loggedIn && <div>Available Credit : ${allowedBalance}</div>}
          </div>
        </div>
      );
    }
  }
  return <></>;
};

export default CompanyInfo;
