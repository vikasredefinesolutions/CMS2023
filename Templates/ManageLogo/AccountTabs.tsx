import MyAccountTabsType1 from '@appComponents/common/MyAccountTabsType1';
import MyAccountTabsType2 from '@appComponents/common/MyAccountTabsType2';
import { FC } from 'react';

interface _props {
  setype: string | number;
}
const AccountTabs: FC<_props> = ({ setype }) => {
  return (
    <>
      {setype == 1 ? (
        <>
          {' '}
          <MyAccountTabsType1 />
          <div className='text-center col-span-8 p-2 mt-2'>
            No record found.
          </div>
        </>
      ) : (
        <MyAccountTabsType2>
          <div className='text-center col-span-8 p-2 mt-2'>
            No record found.
          </div>
        </MyAccountTabsType2>
      )}
    </>
  );
};

export default AccountTabs;
