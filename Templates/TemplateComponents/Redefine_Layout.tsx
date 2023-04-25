import SuccessErrorModal from '@appComponents/modals/successErrorModal';
import { paths } from '@constants/paths.constant';
import { _MenuItems } from '@definations/header.type';
import { _FetchStoreConfigurations } from '@definations/store.type';
import { addCustomEvents } from '@helpers/common.helper';
import BreadCrumb from '@templates/breadCrumb';
import Footer from '@templates/Footer';
import * as _AppController from 'controllers_v2/_AppController.async';
import { useTypedSelector_v2 } from 'hooks_v2';
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
}

const Layout: React.FC<_props & _StoreCache> = ({
  children,
  // storeTypeId,
  logoUrl,
  storeCode,
  menuItems,
  configs,
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
  const storeId = useTypedSelector_v2((state) => state.store?.id);

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
  }, [storeCode, logoUrl, storeId]);
  const router = useRouter();

  return (
    <>
      <Header
        storeCode={header.storeCode}
        logoUrl={{
          desktop: header.logoUrl,
        }}
        menuItems={useMemo(() => header.menuItems, [header.menuItems])}
      />

      {router.pathname !== paths.PRODUCT_COMPARE && (
        <BreadCrumb breadCrumbid={0} />
      )}
      <SuccessErrorModal />
      <div style={{ flexGrow: 1 }}>{children}</div>
      <Footer data={configs.footer} />
    </>
  );
};

export default Layout;
