import { paths } from '@constants/paths.constant';
import {
  _HeaderPropsWithTemplateid,
  _HeaderTemplates,
} from '@definations/header.type';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import LowerHeader from './Components/LowerHeader';
import UpperHeader from './Components/UpperHeader';
import Header_Type1 from './header_Type1';
import Header_Type2 from './header_Type2';
import Header_Type3 from './header_Type3';
import Header_Type4 from './header_Type4';
import Header_Type5 from './header_Type5';
import Header_Type6 from './header_Type6';
import Header_Type7 from './header_Type7';
import Header_Type8 from './header_Type8';
import Header_Type9 from './header_Type9';

const HeaderTemplates: _HeaderTemplates = {
  type1: Header_Type1,
  type2: Header_Type2,
  type3: Header_Type3,
  type4: Header_Type4, // DI
  type5: Header_Type5,
  type6: Header_Type6,
  type7: Header_Type7,
  type8: Header_Type8,
  type9: Header_Type9, //only for bacardi greygoose
};
const Header: NextPage<_HeaderPropsWithTemplateid> = ({
  storeCode,
  logoUrl,
  headerTemplateId,
  headerBgColor,
  headerTextColor,
  headerTransparent,
  headerContainer,  
  menuItems,
  announcementRow,
}) => {
  const templateTypeToShow = headerTemplateId
    ? (('type' + headerTemplateId) as
        | 'type1'
        | 'type2'
        | 'type3'
        | 'type4'
        | 'type5'
        | 'type6'
        | 'type7'
        | 'type8'
        | 'type9')
    : 'type8';

  const HeaderTemplate = HeaderTemplates[templateTypeToShow];
  const router = useRouter();
  return (
    <div
      className={`${
        templateTypeToShow !== 'type8' ? 'sticky' : ''
      } top-0 md:top-7 z-40`}
      id={`${templateTypeToShow !== 'type8' ? 'MainHeader' : ''}`}
    >
      {router.pathname !== paths.CHECKOUT &&
        announcementRow &&
        announcementRow[0]?.isVisible && (
          <UpperHeader headerContent={announcementRow[0]} />
        )}
      <HeaderTemplate
        storeCode={storeCode}
        logoUrl={logoUrl}
        menuItems={menuItems}
        headerBgColor={headerBgColor}
        headerTextColor={headerTextColor}
        headerTransparent={headerTransparent}
        headerContainer={headerContainer} 
      />
      {announcementRow && announcementRow[1]?.isVisible && (
        <LowerHeader headerContent={announcementRow[1]} />
      )}
    </div>
  );
};

export default Header;
