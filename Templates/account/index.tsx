import React from 'react';
import { _AccountTemplates } from './Account';
import AccountTemplatesType1 from './accountTemplate_Type1';
import AccountTemplatesType2 from './accountTemplate_Type2/index_type2';

const AccountTemplates: _AccountTemplates = {
  type1: AccountTemplatesType1,
  type2: AccountTemplatesType2,
};

const AccountSetting: React.FC<{ id: 'type1' }> = ({ id }) => {
  const Component = AccountTemplates[id];
  return <Component />;
};

export default AccountSetting;
