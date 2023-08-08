import { _HeaderTemplates, _StoreMenu } from '@definations/header.type';
import { NextPage } from 'next';
import LowerHeader from './Components/LowerHeader';
import UpperHeader from './Components/UpperHeader';
import Header_Type1 from './header_Type1';
import Header_Type10 from './header_Type10';
import Header_Type2 from './header_Type2';
import Header_Type3 from './header_Type3';
import Header_Type4 from './header_Type4';
import Header_Type5 from './header_Type5';
import Header_Type6 from './header_Type6';
import Header_Type7 from './header_Type7';
import Header_Type8 from './header_Type8';
import Header_Type9 from './header_Type9';

import { _AnnouncementRow, _MenuItems } from '@definations/header.type';
import { _FetchStoreConfigurations } from '@definations/store.type';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import * as _AppController from 'controllers_v2/_AppController.async';
import { useEffect, useState } from 'react';

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
  type10: Header_Type10,
};

interface _Props {
  store: {
    id: number;
    sbStore: any;
    typeId: number;
    code: string;
    logoUrl: string;
    menuItems: _StoreMenu[] | null;
  };
  config: _FetchStoreConfigurations | null;
  templateId: string;
}

const Header: NextPage<_Props> = ({
  store,
  config: headerConfig,
  templateId,
}) => {
  const [header, setHeader] = useState<{
    bgColor: string;
    textColor: string;
    menuItems: _MenuItems | null;
    announcementRow: _AnnouncementRow[];
    transparent: boolean;
    container: boolean;
  }>({
    menuItems: { items: store.menuItems, items_content: null },
    bgColor: '',
    textColor: '',
    announcementRow: [],
    transparent: false,
    container: false,
  });
  const { logoUrl } = useTypedSelector_v2((store) => store.store);

  const callMenuItemsAPI = async () => {
    // await _AppController.fetchMenuItems(store.id).then((response) => {
    //   setHeader((prev) => ({
    //     ...prev,
    //     menuItems: {
    //       items: response,
    //       items_content: null,
    //     },
    //   }));
    // });

    await _AppController
      .fetchMenuContents(store.menuItems, store.id, store.code)
      .then((response) => {
        if (!store.menuItems || store.menuItems.length === 0) return;
        if (!response || response.length === 0) return;

        setHeader((prev) => ({
          ...prev,
          menuItems: {
            items: store.menuItems,
            items_content: response,
          },
        }));
      });
  };

  useEffect(() => {
    callMenuItemsAPI();

    if (headerConfig?.config_value) {
      const headerInfo = JSON.parse(headerConfig.config_value);
      setHeader((prev) => ({
        ...prev,
        bgColor: headerInfo?.header_bg_color || '',
        textColor: headerInfo?.header_text_color || '',
        announcementRow: headerInfo?.announcementRow || [],
      }));
    }
  }, []);

  ///////////////////////////////////
  /*             VIEW              */
  ///////////////////////////////////
  const templateTypeToShow = templateId
    ? (('type' + templateId) as 'type1')
    : 'type8';

  const T = HeaderTemplates[templateTypeToShow];
  const { empId } = useTypedSelector_v2((state) => state.employee);

  return (
    <div
      className={`${templateTypeToShow !== 'type8' ? 'sticky' : ''} top-0 z-40`}
      id={`${templateTypeToShow !== 'type8' ? 'MainHeader' : ''}`}
    >
      {(header?.announcementRow[0]?.isVisible || !!empId) && (
        <UpperHeader content={header.announcementRow} />
      )}
      <T
        storeCode={store.code}
        logoUrl={{ desktop: store.logoUrl || logoUrl || '' }}
        menuItems={header.menuItems}
        headerBgColor={header.bgColor}
        headerTextColor={header.textColor}
        headerContainer={header.container}
        headerTransparent={header.transparent}
      />
      {header?.announcementRow[1]?.isVisible && (
        <LowerHeader content={header.announcementRow} />
      )}
    </div>
  );
};

export default Header;
