import React from 'react';
import { _AccountTemplates } from './Account';
import ManageAddressTemplate_Type1 from './accountTemplate_Type1/ManageAddressIndex';
import ManageAddressTemplate_Type2 from './accountTemplate_Type2/ManageAddress_Type2';

const AccountTemplates: _AccountTemplates = {
  type1: ManageAddressTemplate_Type1,
  type2: ManageAddressTemplate_Type2,
};

const ManageAddressSetting: React.FC<{ id: string }> = ({ id }) => {
  const Component = AccountTemplates[`type${id}` as 'type1'];
  return <Component />;
};

export default ManageAddressSetting;
