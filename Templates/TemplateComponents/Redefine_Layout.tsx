import SuccessErrorModal from '@appComponents/modals/successErrorModal';
import { _Footer } from '@definations/APIs/footer.res';
import { addCustomEvents } from '@helpers/common.helper';
import BreadCrumb from '@templates/breadCrumb';
import Footer from '@templates/Footer';
import { _MenuItems } from '@templates/Header/header.type';
import * as _AppController from 'controllers_v2/_AppController.async';
import { useTypedSelector_v2 } from 'hooks_v2';
import { _StoreCache } from 'pages/[slug]/slug';
import React, { useEffect, useMemo, useState } from 'react';
import Header from 'Templates/Header';

interface _props {
  children: React.ReactNode;
  logoUrl: string;
  configs: {
    footer: _Footer | null;
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

  return (
    <>
      <Header
        storeCode={header.storeCode}
        logoUrl={{
          desktop: header.logoUrl,
        }}
        menuItems={useMemo(() => header.menuItems, [header.menuItems])}
      />

      <BreadCrumb breadCrumbid={0} />
      <SuccessErrorModal />
      <div style={{ flexGrow: 1 }}>{children}</div>
      <Footer data={configs.footer} />
    </>
  );
};

export default Layout;
