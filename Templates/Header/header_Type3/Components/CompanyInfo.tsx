import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';

interface _props {
  phoneNumber: string;
  email: string;
}
const CompanyInfo: React.FC<_props> = ({ phoneNumber, email }) => {
  const { view } = useTypedSelector_v2((state) => state.store);
  if (view == 'MOBILE')
    return (
      <div className='sm:hidden block text-center pb-[10px] break-words border-b border-b-gray-border mb-[10px] text-default-text'>
        {__pagesText.Headers.companyPhoneQuestion}{' '}
        <a href={`'tel:${phoneNumber}`} className='break-words'>
          {phoneNumber}
        </a>{' '}
        {__pagesText.Headers.companyEmailQuestion}{' '}
        <a href={`mailto:${email}`} className='break-words'>
          {email}
        </a>
      </div>
    );

  if (view == 'DESKTOP')
    return (
      <div className='break-words w-full text-right hidden sm:block pb-[10px] text-default-text flex text-white'>
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
        </div>
      </div>
    );
  return <></>;
};

export default CompanyInfo;
