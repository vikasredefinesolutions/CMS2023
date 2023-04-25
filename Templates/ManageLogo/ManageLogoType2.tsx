import MyAccountTabsType2 from '@appComponents/common/MyAccountTabsType2';
import { NextPage } from 'next';
import ManageLogoBody from './ManagelogoType2/components/ManageLogoBody';
import { _ManageLogoProps } from './managelogo';

const ManageLogoType2: NextPage<_ManageLogoProps> = ({ logoList }) => {
  return (
    <>
      <MyAccountTabsType2>
        <ManageLogoBody logoList={logoList} />
      </MyAccountTabsType2>
    </>
  );
};

export default ManageLogoType2;
