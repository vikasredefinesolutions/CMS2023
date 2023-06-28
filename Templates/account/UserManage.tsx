import React from 'react';
import { _AccountTemplates } from './Account';
import UserManagementAccountTemplates_Type1 from './accountTemplate_Type1/UserManagementIndex';
import UserManagementAccountTemplates_Type2 from './accountTemplate_Type2/UserManagementIndex_type2';
import UserManagementAccountTemplates_Type3 from './accountTemplate_Type3/UserManagementIndex';
import UserManagementAccountTemplates_Type6 from './accountTemplate_Type6/index';

const AccountTemplates: _AccountTemplates = {
  type1: UserManagementAccountTemplates_Type1,
  type2: UserManagementAccountTemplates_Type2,
  type3: UserManagementAccountTemplates_Type3,
  type6: UserManagementAccountTemplates_Type6,
};

const UserManagementAccountSetting: React.FC<{ id: string }> = ({ id }) => {
  const Component =
    AccountTemplates[(`type${id}` as 'type1') || 'type2' || 'type3' || 'type4'];
  return <Component />;
};

export default UserManagementAccountSetting;
