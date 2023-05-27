import MyAccountTabsType1 from '@appComponents/common/MyAccountTabsType1';
import MyAccountTabsType2 from '@appComponents/common/MyAccountTabsType2';
import { GG_STORE_CODE } from '@constants/global.constant';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { FC } from 'react';
import HeaderType1 from './Components/HeaderType1';

interface _props {
  setype: string | number;
}
const AccountTabs: FC<_props> = ({ setype }) => {
  const { storeTypeId } = useTypedSelector_v2((state) => state.store);

  return (
    <>
      {setype == 1 ? (
        <>
          {' '}
          <MyAccountTabsType1 />
          {storeTypeId == GG_STORE_CODE ? (
            <div className='container mx-auto '>
              <table className='table table-auto border-[#ddd] w-full text-default-text text-[#000] mt-5'>
                <HeaderType1 />
                <tr>
                  <td className='text-center p-5 w-full ' colSpan={8}>
                    No record found.
                  </td>
                </tr>
              </table>
            </div>
          ) : (
            <div className='text-center col-span-8 p-2 mt-2'>
              No record found.
            </div>
          )}
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
