import { storeBuilderTypeId } from '@configs/page.config';
import { __pagesConstant } from '@constants/pages.constant';
import { paths } from '@constants/paths.constant';
import { _HeaderProps, _MenuItems } from '@definations/header.type';
import {
  useActions_v2,
  useTypedSelector_v2,
  useWindowDimensions_v2
} from '@hooks_v2/index';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  CompareIcon,
  LoggedInMenu,
  LoginIcon,
  Logo,
  MyCartIcon
} from '../header_Type2/Components/Icons';
import Header_MenuItems from '../header_Type2/Components/Menu/Header_MenuItems';
import SearchBar from '../header_Type2/Components/Menu/Header_SearchBar';

const Header_Type2: NextPage<_HeaderProps> = ({
  logoUrl,
  menuItems,
  headerBgColor,
  headerTextColor,
}) => {
  const { store_setAppView } = useActions_v2();
  const { width } = useWindowDimensions_v2();
  const router = useRouter();

  // const router = useRouter;
  // ------------------------------------------------------------------------
  // const userId = useTypedSelector_v2((state) => state.user.id);
  // const storeName = useTypedSelector_v2((state) => state.store.storeName);
  const showSideMenu = useTypedSelector_v2((state) => state.modals.sideMenu);
  const storeTypeId = useTypedSelector_v2((state) => state.store.storeTypeId);
  const islogo = useTypedSelector_v2((state) => state.sbStore.isLogo);

  // ------------------------------------------------------------------------
  const [isMobileView, setIsMobileView] = useState<boolean>(
    width <= __pagesConstant._header.mobileBreakPoint,
  );

  useEffect(() => {
    const isMobile = width <= __pagesConstant._header.mobileBreakPoint;
    const showMobile = isMobile ? 'MOBILE' : 'DESKTOP';
    store_setAppView(showMobile);
    setIsMobileView(isMobile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return (
    <div
      className={`bg-[${headerBgColor}] sticky top-7 z-40  border-b border-y-gray-border`}
      id='mobile_menu_box'
    >
      {/* <NotificationBar /> */}

      <div className={`bg-[${headerBgColor}]`}>
        {isMobileView && router.asPath != paths.CHECKOUT && (
          <Header_MenuItems
            showSideMenu={showSideMenu}
            // storeCode={storeCode}
            screen='MOBILE'
            menuItems={menuItems as _MenuItems}
          />
        )}
        <div className='fixed z-40 lg:hidden'></div>
        <header id={`${router.asPath===paths.HOME ? "spy" : ""}`} className='relative tracking-[1px]' >
          <nav aria-label='Top'>
            <div
              className={`${headerBgColor ? '' : 'bg-[#ffffff]'}`}
              style={{ backgroundColor: headerBgColor }}
            >
              <div className='container  mx-auto'>
                <div className='pt-[10px] pb-[10px]'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center w-1/2 sm:w-[50%] md:w-1/3 relative'>
                      {storeTypeId == storeBuilderTypeId ? (
                        islogo &&
                        (isMobileView ? null : (
                          <Logo
                            // screen='DESKTOP'
                            logo={{
                              desktop: logoUrl.desktop,
                              mobile: logoUrl.desktop,
                            }}
                          />
                        ))
                      ) : isMobileView ? null : (
                        <Logo
                          // screen='DESKTOP'
                          logo={{
                            desktop: logoUrl.desktop,
                            mobile: logoUrl.desktop,
                          }}
                        />
                      )}

                      {islogo &&
                        (isMobileView ? (
                          <Logo
                            // screen='MOBILE'
                            logo={{
                              desktop: logoUrl.desktop,
                              mobile: logoUrl.desktop,
                            }}
                          />
                        ) : null)}
                    </div>
                    {isMobileView ? (
                      <SearchBar screen={'DESKTOP'} />
                    ) : (
                      <SearchBar screen={'DESKTOP'} />
                    )}
                    <div className='w-1/2 md:w-1/3 flex items-center justify-end'>
                      <div className='flex items-center '>
                        <div className='flex items-center '>
                          <LoginIcon />
                          <LoggedInMenu />
                          <CompareIcon />
                          <MyCartIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                  {isMobileView ? <SearchBar screen={'MOBILE'} /> : <></>}
                </div>
              </div>
              {isMobileView
                ? null
                : router.asPath != paths.CHECKOUT && (
                    <Header_MenuItems
                      showSideMenu={showSideMenu}
                      screen='DESKTOP'
                      menuItems={menuItems as _MenuItems}
                    />
                  )}
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
};

export default Header_Type2;
