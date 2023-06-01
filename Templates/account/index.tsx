import React from 'react';
import { _AccountTemplates } from './Account';
import AccountTemplatesType1 from './accountTemplate_Type1';
import AccountTemplatesType2 from './accountTemplate_Type2/index_type2';
import AccountTemplatesType3 from './accountTemplate_Type3';

const AccountTemplates: _AccountTemplates = {
  type1: AccountTemplatesType1,
  type2: AccountTemplatesType2,
  type3: AccountTemplatesType3,
};

const AccountSetting: React.FC<{ id: string }> = ({ id }) => {
  const Component =
    AccountTemplates[(`type${id}` as 'type1') || 'type2' || 'type3' || 'type4'];
  return <Component />;
};

export default AccountSetting;
