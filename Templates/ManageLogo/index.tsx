/* eslint-disable no-unused-vars */
import { LogoList } from '@definations/APIs/logo.res';
import React from 'react';
import AccountTabs from './AccountTabs';
import ManageLogoType1 from './ManageLogoType1';
import ManageLogoType2 from './ManageLogoType2';
import { _ManageLogoTemplates } from './managelogo.d';

const ManageLogoTemplates: _ManageLogoTemplates = {
  type1: ManageLogoType1,
  type2: ManageLogoType2,
};
interface _props {
  id: string;
  logoList: LogoList | null;
  fetchLogoDetails: () => void;
}
const ManageLogo: React.FC<_props> = ({ id, logoList, fetchLogoDetails }) => {
  const ManagelogoDeatils =
    ManageLogoTemplates[
      (`type${id}` as 'type1') || 'type2' || 'type3' || 'type4'
    ];
  return (
    <>
      {logoList && logoList.items.length > 0 ? (
        <ManagelogoDeatils
          logoList={logoList}
          fetchLogoDetails={fetchLogoDetails}
        />
      ) : (
        <>
          <AccountTabs setype={id} />
        </>
      )}
    </>
  );
};

export default ManageLogo;
