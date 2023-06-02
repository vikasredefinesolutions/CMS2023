import SuccessErrorModal from '@appComponents/modals/successErrorModal';
import CloseStore from '@appComponents/reUsable/CloseStore';
import { storeBuilderTypeId } from '@configs/page.config';
import { paths } from '@constants/paths.constant';
import { _AnnouncementRow, _MenuItems } from '@definations/header.type';
import { _GetPageType, _StoreCache } from '@definations/slug.type';
import { _FetchStoreConfigurations } from '@definations/store.type';
import { _templateIds } from '@helpers/app.extras';
import { addCustomEvents } from '@helpers/common.helper';
import BreadCrumb from '@templates/breadCrumb';
import Footer from '@templates/Footer';
import * as _AppController from 'controllers_v2/_AppController.async';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import Header from 'Templates/Header';

interface _props {
  children: React.ReactNode;
  logoUrl: string;
  configs: { footer: _FetchStoreConfigurations | null };
  menuItems: _MenuItems | null;
  sbStore: any;
  headerConfig: _FetchStoreConfigurations | null;
  templateIDs: _templateIds;
  pageMetaData: _GetPageType;
}

const Layout: React.FC<_props & _StoreCache> = ({
  children,
  storeTypeId,
  logoUrl,
  storeCode,
  menuItems,
  configs,
  sbStore,
  templateIDs,
  headerConfig,
  pageMetaData,
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
  const [headerTemplateId, setHeaderTeamplateId] = useState<string>(
    templateIDs.headerTemplateId,
  );
  const [breadCrumbTemplateId, setBreadCrumbTemplateId] = useState<string>(
    templateIDs.breadCrumbsTemplateId,
  );
  const [headerBgColor, setHeaderBgColor] = useState<string>('');
  const [headerTextColor, setHeaderTextColor] = useState<string>('');
  const [announcementRow, setAnnouncementRow] = useState<_AnnouncementRow[]>(
    [],
  );
  const [footerData, SetFooterData] =
    useState<_FetchStoreConfigurations | null>(null);
  const router = useRouter();

  const [showFooter, setshowFooter] = useState<boolean>(true);
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
      _AppController.fetchMenuItems(storeId, storeCode).then((res) => {
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
    if (headerConfig?.config_value) {
      const headerInfo = JSON.parse(headerConfig.config_value);
      setHeaderBgColor(headerInfo?.header_bg_color);
      setHeaderTextColor(headerInfo?.header_text_color);

      headerInfo?.announcementRow &&
        setAnnouncementRow(headerInfo?.announcementRow);
    }
  }, [storeCode, logoUrl, storeId]);

  useEffect(() => {
    if (router.asPath == paths.CHECKOUT) {
      setshowFooter(false);
    } else {
      setshowFooter(true);
    }
    if (configs.footer != null) {
      SetFooterData(configs.footer);
    }
  }, [router.asPath]);

  const isbreadcrumbShow = pageMetaData?.isbreadcrumbShow;
  
  const showBreadcrumb =
    router.pathname !== paths.CHECKOUT &&
    router.asPath != paths.BRAND &&
    router.pathname !== paths.PRODUCT_COMPARE && router.pathname !== paths.CATALOGS;
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
        announcementRow={announcementRow}
      />

      {(pageMetaData &&
      pageMetaData.type &&
      pageMetaData.type.toLowerCase() === 'topic'
        ? isbreadcrumbShow && isbreadcrumbShow == 'Y'
        : true) &&
        showBreadcrumb && <><BreadCrumb breadCrumbid={breadCrumbTemplateId} /></>}
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

      {showFooter && (
        <Footer data={configs.footer ? configs.footer : footerData} />
      )}
    </>
  );
};

export default Layout;
