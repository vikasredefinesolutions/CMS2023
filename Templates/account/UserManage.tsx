import React from 'react';
import { _AccountTemplates } from './Account';
import UserManagementAccountTemplates_Type1 from './accountTemplate_Type1/UserManagementIndex';
import UserManagementAccountTemplates_Type2 from './accountTemplate_Type2/UserManagementIndex_type2';

const AccountTemplates: _AccountTemplates = {
  type1: UserManagementAccountTemplates_Type1,
  type2: UserManagementAccountTemplates_Type2,
};

const UserManagementAccountSetting: React.FC<{ id: 'type1' }> = ({ id }) => {
  const Component = AccountTemplates[id];
  return <Component />;
};

export default UserManagementAccountSetting;
