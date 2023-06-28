import { _Store, storeBuilderTypeId } from '@configs/page.config';
import { paths } from '@constants/paths.constant';
import { _AnnouncementRow, _MenuItems } from '@definations/header.type';
import { _GetPageType, _StoreCache } from '@definations/slug.type';
import { _FetchStoreConfigurations } from '@definations/store.type';
import { _templateIds } from '@helpers/app.extras';
import { addCustomEvents } from '@helpers/common.helper';
import * as _AppController from 'controllers_v2/_AppController.async';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';


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

  const Header = dynamic(() => import ('Templates/Header'));
const BreadCrumb = dynamic(() => import ('Templates/breadCrumb'));
const Footer = dynamic(() => import ('Templates/Footer'));
const CloseStore = dynamic(() => import ('@appComponents/reUsable/CloseStore'));
const SuccessErrorModal = dynamic(() => import ('@appComponents/modals/successErrorModal'));

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
  const [headerContainer, setHeaderContainer] = useState<boolean>(false);
  const [headerTransparent, setHeaderTransparent] = useState<boolean>(false);
  const [announcementRow, setAnnouncementRow] = useState<_AnnouncementRow[]>(
    [],
  );
  const YearofDate = new Date().getFullYear();
  const [footerData, SetFooterData] =
    useState<_FetchStoreConfigurations | null>(null);
  const router = useRouter();

  const [showFooter, setshowFooter] = useState<boolean>(true);
  const storeId = useTypedSelector_v2((state) => state.store?.id);
  // const islogo = useTypedSelector_v2((state) => state.sbStore.isLogo);
  const [isStoreOpend, setIsStoreOpen] = useState<boolean>(true);
  const [selectedBacardiStore, setSelectedBacardiStore] = useState<
    string | null
  >('');

  const { code } = useTypedSelector_v2((state) => state.store);

  const StoreOpen = (openStoreOn: string, closedStoreOn: string) => {
    const openFrom = Date.parse(openStoreOn);
    const closeOn = Date.parse(closedStoreOn);
    const newDate = new Date();
    const todayDate = Date.parse(`${newDate}`);
    // return setIsStoreOpen(true);
    // console.log(openFrom, closeOn, todayDate);
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
      setHeaderContainer(headerInfo?.header_container);
      setHeaderTransparent(headerInfo?.header_transparent);

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
    router.pathname !== paths.PRODUCT_COMPARE &&
    router.pathname !== paths.CATALOGS &&
    router.pathname !== paths.CART;

  return (
    <>
      {/* {code === 'BCGG' && (
        <div className='w-full flex justify-center'>
          <div
            className={`p-10 m-10 border border-black cursor-pointer ${
              selectedBacardiStore === 'Bacardi' ? 'bg-primary' : ''
            }`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              localStorage.setItem('BacardiSelectedStore', 'Bacardi');
              setCookie(__Cookie.BacardiSelectedStore, 'Bacardi', 365);
              setSelectedBacardiStore('Bacardi');
              window.location.replace('/index.html');
            }}
          >
            <img src='/logo.png' className='cursor-pointer' />
          </div>
          <div
            className={`p-10 m-10  cursor-pointer ${
              selectedBacardiStore === 'GreyGoose' ? 'bg-secondary' : ''
            }`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              localStorage.setItem('BacardiSelectedStore', 'GreyGoose');
              setCookie(__Cookie.BacardiSelectedStore, 'GreyGoose', 365);
              setSelectedBacardiStore('GreyGoose');
              window.location.replace('/home/GreyGoose');
            }}
          >
            <img src='/greygoose-logo.png' className='cursor-pointer' />
          </div>
        </div>
      )} */}
      <Header
        storeCode={header.storeCode}
        logoUrl={{
          desktop: header.logoUrl,
        }}
        menuItems={useMemo(() => header.menuItems, [header.menuItems])}
        headerTemplateId={headerTemplateId}
        headerBgColor={headerBgColor}
        headerContainer={headerContainer}
         headerTextColor={headerTextColor}
        headerTransparent={headerTransparent}
        announcementRow={announcementRow}
      />

      {(pageMetaData &&
      pageMetaData.type &&
      pageMetaData.type.toLowerCase() === 'topic'
        ? isbreadcrumbShow && isbreadcrumbShow == 'Y'
        : true) &&
        showBreadcrumb && (
          <>
            <BreadCrumb breadCrumbid={breadCrumbTemplateId} />
          </>
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

      {showFooter && (
        <Footer data={configs.footer ? configs.footer : footerData} />
      )}
      {storeCode == _Store.type4 && router.asPath == paths.CHECKOUT && (
        <div className='bg-white'>
          <div className='continer'>
            <div className='text-center'>
              <div className='w-full pl-[15px] pr-[15px] pt-[10px]'>
                <div className='text-[11px] text-primary text-center pb-[10px]'>
                  © {YearofDate}{' '}
                  <a
                    className='text-[11px] text-primary hover:text-primary-hover'
                    href='javascript:void(0);'
                  >
                    Driving Impressions®
                  </a>
                  , All Rights Reserved. Terms of Use Privacy
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
