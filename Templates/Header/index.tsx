import {
  _HeaderPropsWithTemplateid,
  _HeaderTemplates,
} from '@definations/header.type';
import { NextPage } from 'next';
import Header_Type1 from './header_Type1';
import Header_Type2 from './header_Type2';
import Header_Type3 from './header_Type3';
import Header_Type4 from './header_Type4';

const HeaderTemplates: _HeaderTemplates = {
  type1: Header_Type1,
  type2: Header_Type2,
  type3: Header_Type3,
  type4: Header_Type4,
};
const Header: NextPage<_HeaderPropsWithTemplateid> = ({
  storeCode,
  logoUrl,
  headerTemplateId,
  headerBgColor,
  headerTextColor,
  menuItems,
}) => {
  const template_Id: string = `type4`;
  // const template_Id = 'type4';
  const HeaderTemplate =
    HeaderTemplates[('type1' as 'type1') || 'type2'] || 'type3' || 'type4';
  return (
    <HeaderTemplate
      storeCode={storeCode}
      logoUrl={logoUrl}
      menuItems={menuItems}
      headerBgColor={headerBgColor}
      headerTextColor={headerTextColor}
    />
  );
};

export default Header;
