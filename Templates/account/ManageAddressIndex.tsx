import React from 'react';
import { _AccountTemplates } from './Account';
import ManageAddressTemplate_Type1 from './accountTemplate_Type1/ManageAddressIndex';
import ManageAddressTemplate_Type2 from './accountTemplate_Type2/ManageAddress_Type2';
import ManageAddressTemplate_Type3 from './accountTemplate_Type3/ManageAddressIndex';
import ManageAddressTemplate_Type6 from './accountTemplate_Type6/index';

const AccountTemplates: _AccountTemplates = {
  type1: ManageAddressTemplate_Type1,
  type2: ManageAddressTemplate_Type2,
  type3: ManageAddressTemplate_Type3,
  type6: ManageAddressTemplate_Type6,
};

const ManageAddressSetting: React.FC<{ id: string }> = ({ id }) => {
  const Component =
    AccountTemplates[
      (`type${id}` as 'type1') || 'type2' || 'type3' || 'type4' || 'type6'
    ];
  return <Component />;
};

export default ManageAddressSetting;
