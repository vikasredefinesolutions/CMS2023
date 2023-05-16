import {
  _HeaderPropsWithTemplateid,
  _HeaderTemplates,
} from '@definations/header.type';
import { NextPage } from 'next';
import LowerHeader from './Components/LowerHeader';
import UpperHeader from './Components/UpperHeader';
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
  announcementRow,
}) => {
  const templateTypeToShow = headerTemplateId
    ? (('type' + headerTemplateId) as 'type1' | 'type2' | 'type3' | 'type4')
    : 'type1';
  const HeaderTemplate = HeaderTemplates[templateTypeToShow];

  return (
    <div
      className='sticky md:top-7 z-40 shadow-[0_0px_5px_rgba(0,0,0,0.12)]'
      id='MainHeader'
    >
      {announcementRow && announcementRow[0]?.isVisible && (
        <UpperHeader headerContent={announcementRow[0]} />
      )}
      <HeaderTemplate
        storeCode={storeCode}
        logoUrl={logoUrl}
        menuItems={menuItems}
        headerBgColor={headerBgColor}
        headerTextColor={headerTextColor}
      />
      {announcementRow && announcementRow[1]?.isVisible && (
        <LowerHeader headerContent={announcementRow[1]} />
      )}
    </div>
  );
};

export default Header;
