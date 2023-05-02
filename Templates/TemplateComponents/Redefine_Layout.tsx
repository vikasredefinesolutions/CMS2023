import SuccessErrorModal from '@appComponents/modals/successErrorModal';
import CloseStore from '@appComponents/reUsable/CloseStore';
import { storeBuilderTypeId } from '@configs/page.config';
import { paths } from '@constants/paths.constant';
import { _MenuItems } from '@definations/header.type';
import { _FetchStoreConfigurations } from '@definations/store.type';
import { addCustomEvents } from '@helpers/common.helper';
import { FetchStoreConfigurations } from '@services/app.service';
import BreadCrumb from '@templates/breadCrumb';
import Footer from '@templates/Footer';
import * as _AppController from 'controllers_v2/_AppController.async';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import { useRouter } from 'next/router';
import { _StoreCache } from 'pages/[slug]/slug';
import React, { useEffect, useMemo, useState } from 'react';
import Header from 'Templates/Header';

interface _props {
  children: React.ReactNode;
  logoUrl: string;
  configs: {
    footer: _FetchStoreConfigurations | null;
  };
  menuItems: _MenuItems | null;
  sbStore: any;
}

const Layout: React.FC<_props & _StoreCache> = ({
  children,
  storeTypeId,
  logoUrl,
  storeCode,
  menuItems,
  configs,
  sbStore,
}) => {
  useEffect(() => {
    if (localStorage) {
      addCustomEvents('localStorage');
    }
  }, []);
  const [header, setHeader] = useState<{
    storeCode: string;
    logoUrl: string;
    menuItems: _MenuItems | null;
  }>({ storeCode: storeCode, logoUrl: logoUrl, menuItems: menuItems });
  const { setShowLoader } = useActions_v2();
  const [headerTemplateId, setHeaderTeamplateId] = useState<string>('');
  const [headerBgColor, setHeaderBgColor] = useState<string>('');
  const [headerTextColor, setHeaderTextColor] = useState<string>('');
  const storeId = useTypedSelector_v2((state) => state.store?.id);
  // const islogo = useTypedSelector_v2((state) => state.sbStore.isLogo);
  const [isStoreOpend, setIsStoreOpen] = useState<boolean>(true);

  const StoreOpen = (openStoreOn: string, closedStoreOn: string) => {
    const openFrom = Date.parse(openStoreOn);
    const closeOn = Date.parse(closedStoreOn);
    const newDate = new Date();

    const todayDate = Date.parse(`${newDate}`);
    if (todayDate <= closeOn && todayDate >= openFrom) {
      return setIsStoreOpen(true);
    } else {
      return setIsStoreOpen(false);
    }
  };
  useEffect(() => {
    if (!header.menuItems && storeId) {
      _AppController.fetchMenuItems(storeId).then((res) => {
        setHeader((last) => ({
          ...last,
          menuItems: res,
        }));
      });
    }

    setHeader((last) => ({
      ...last,
      storeCode: storeCode || last.storeCode,
      logoUrl: logoUrl || last.logoUrl,
    }));
    if (storeTypeId == storeBuilderTypeId) {
      sbStore && StoreOpen(sbStore.openStoreOn, sbStore.closeStoreOn);
    }
  }, [storeCode, logoUrl, storeId]);
  const router = useRouter();
  useEffect(() => {
    FetchStoreConfigurations({ storeId, configname: 'header_config' }).then(
      (res) => {
        if (res?.config_value) {
          const headerInfo = JSON.parse(res.config_value);
          setHeaderTeamplateId(headerInfo.template_Id);
          setHeaderBgColor(headerInfo?.header_bg_color);
          setHeaderTextColor(headerInfo?.header_text_color);
        }
      },
    );
  }, [storeId]);

  return (
    <>
      <Header
        storeCode={header.storeCode}
        logoUrl={{
          desktop: header.logoUrl,
        }}
        menuItems={useMemo(() => header.menuItems, [header.menuItems])}
        headerTemplateId={headerTemplateId}
        headerBgColor={headerBgColor}
        headerTextColor={headerTextColor}
      />

      {router.pathname !== paths.PRODUCT_COMPARE && (
        <BreadCrumb breadCrumbid={0} />
      )}
      <SuccessErrorModal />
      {storeTypeId == storeBuilderTypeId ? (
        <>
          {isStoreOpend ? (
            <div style={{ flexGrow: 1 }}>{children}</div>
          ) : (
            <CloseStore />
          )}
        </>
      ) : (
        <div style={{ flexGrow: 1 }}>{children}</div>
      )}

      <Footer data={configs.footer} />
    </>
  );
};

export default Layout;
