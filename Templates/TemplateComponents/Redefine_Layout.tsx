<<<<<<< HEAD
import { storeBuilderTypeId } from '@configs/page.config';
=======
import SuccessErrorModal from '@appComponents/modals/successErrorModal';
import CloseStore from '@appComponents/reUsable/CloseStore';
import { storeBuilderTypeId } from '@configs/page.config';
>>>>>>> ca687e5376e90f4bf91188162d63a7b2a82c8531
import { paths } from '@constants/paths.constant';
import { _StoreMenu } from '@definations/header.type';
import { _GetPageType } from '@definations/slug.type';
import { _FetchStoreConfigurations } from '@definations/store.type';
import { _templateIds } from '@helpers/app.extras';
import { addCustomEvents } from '@helpers/common.helper';
<<<<<<< HEAD
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

=======
import Footer from '@templates/Footer';
import BreadCrumb from '@templates/breadCrumb';
import Header from 'Templates/Header';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
>>>>>>> ca687e5376e90f4bf91188162d63a7b2a82c8531

interface _props {
  children: React.ReactNode;
  configs: {
    footer: _FetchStoreConfigurations | null;
    header: _FetchStoreConfigurations | null;
  };
  store: {
    id: number;
    sbStore: any;
    typeId: number;
    code: string;
    logoUrl: string;
    menuItems: _StoreMenu[] | null;
  };
  templateIDs: _templateIds;
  pageMetaData: _GetPageType;
}

const Layout: React.FC<_props> = ({
  children,
  store,
  configs,
  templateIDs,
  pageMetaData,
}) => {
  const router = useRouter();
  //
  const [template] = useState<_templateIds>(templateIDs);
  const [isStoreOpend, setIsStoreOpen] = useState<boolean>(true);
  //
  const isbreadcrumbShow = pageMetaData?.isbreadcrumbShow;

  const StoreOpen = (openStoreOn: string, closedStoreOn: string) => {
    const openFrom = Date.parse(openStoreOn);
    const closeOn = Date.parse(closedStoreOn);
    const newDate = new Date();
    const todayDate = Date.parse(`${newDate}`);
    if (todayDate <= closeOn && todayDate >= openFrom) {
      return setIsStoreOpen(true);
    } else {
      setIsStoreOpen(false);
    }
  };

  const showBreadcrumb = () => {
    const show =
      router.pathname !== paths.CHECKOUT &&
      router.asPath != paths.BRAND &&
      router.pathname !== paths.PRODUCT_COMPARE &&
      router.pathname !== paths.CATALOGS &&
      router.pathname !== paths.CART &&
      router.asPath !== paths.PETERMILLAR.CUSTOM_FORM &&
      router.asPath !== paths.PETERMILLAR.THANK_YOU 
      && router.asPath !== "/sitemap.html";

    return (
      (pageMetaData &&
      pageMetaData.type &&
      pageMetaData.type.toLowerCase() === 'topic'
        ? isbreadcrumbShow && isbreadcrumbShow == 'Y'
        : true) && show
    );
  };

  const showBody = () => {
    if (store.typeId == storeBuilderTypeId && !isStoreOpend) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (localStorage) addCustomEvents('localStorage');

    if (store.typeId === storeBuilderTypeId && store.sbStore) {
      StoreOpen(store.sbStore.openStoreOn, store.sbStore.closeStoreOn);
    }
  }, []);

  const showHeader = () => {
    return (
      router.asPath !== paths.PETERMILLAR.CUSTOM_FORM &&
      router.asPath !== paths.PETERMILLAR.THANK_YOU
    );
  };

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
      {showHeader() && (
        <Header
          store={store}
          config={configs.header}
          templateId={template.headerTemplateId}
        />
      )}
      {showBreadcrumb() && (
        <div className='min-h-[45px]'>
          <BreadCrumb breadCrumbid={template.breadCrumbsTemplateId} />
        </div>
      )}
      <SuccessErrorModal />
      {showBody() && <div style={{ flexGrow: 1 }}>{children}</div>}
      {!showBody() && <CloseStore />}
      <Footer data={configs.footer} store={{ code: store.code }} />
      {store.id === 36 && 
        <div dangerouslySetInnerHTML={{ __html: `<script>(function() {window.__insp = window.__insp || [];__insp.push(['wid', 360278541]);var ldinsp = function(){if(typeof window.__inspld != "undefined") return; window.__inspld = 1; var insp = document.createElement('script'); insp.type = 'text/javascript'; insp.async = true; insp.id = "inspsync"; insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js?wid=360278541&r=' + Math.floor(new Date().getTime()/3600000); var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(insp, x); };setTimeout(ldinsp, 0);})();</script>`}}></div>
      }
    </>
  );
};

export default Layout;
