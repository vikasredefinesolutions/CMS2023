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
import CompanyInfo from './Components/CompanyInfo';
import { LoggedInMenu, LoginIcon, Logo, MyCartIcon } from './Components/Icons';
import Header_MenuItems from './Components/Menu/Header_MenuItems';
import SearchBar from './Components/Menu/Header_SearchBar';

const Header_Type4: NextPage<_HeaderProps> = ({
  logoUrl,
  menuItems,
  headerBgColor,
  headerTextColor,
}) => {
  const { store_setAppView } = useActions_v2();
  const { width } = useWindowDimensions_v2();
  const router = useRouter();

  const showSideMenu = useTypedSelector_v2((state) => state.modals.sideMenu);
  const islogo = useTypedSelector_v2((state) => state.sbStore.isLogo);
  const storeTypeId = useTypedSelector_v2((state) => state.store.storeTypeId);
  const storeEmail = useTypedSelector_v2((state) => state.store.email_address);
  const storePhoneNumber = useTypedSelector_v2(
    (state) => state.store.phone_number,
  );
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
      className='bg-primary sticky top-0 z-40 shadow-[0_0px_5px_rgba(0,0,0,0.12)]'
      id='mobile_menu_box'
    >
      {/* <NotificationBar /> */}

      <div className='bg-primary'>
        {isMobileView && router.asPath != paths.CHECKOUT && (
          <Header_MenuItems
            showSideMenu={showSideMenu}
            // storeCode={storeCode}
            screen='MOBILE'
            menuItems={menuItems as _MenuItems}
          />
        )}

        <div className='fixed z-40 lg:hidden'></div>
        <header className='relative trancking-[1px]'>
          <nav aria-label='Top'>
            <div
              className={`${headerBgColor ? '' : 'bg-[#ffffff]'}]`}
              style={{ backgroundColor: headerBgColor }}
            >
              <div className='container pl-[15px] pr-[15px] mx-auto'>
                <div className='pt-[10px] pb-[10px]'>
                  <div className='flex items-center justify-between'>
                    {storeTypeId == storeBuilderTypeId ? (
                      islogo && (
                        <Logo
                          // screen='DESKTOP'
                          logo={{
                            desktop: logoUrl.desktop,
                            mobile: logoUrl.desktop,
                          }}
                        />
                      )
                    ) : (
                      <Logo
                        // screen='DESKTOP'
                        logo={{
                          desktop: logoUrl.desktop,
                          mobile: logoUrl.desktop,
                        }}
                      />
                    )}

                    <div className='h-full hidden lg:flex items-center flex-1'>
                      <div className=''>
                        <div className='h-full flex header-nav relative'>
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
                      </div>
                    </div>
                    <div className='flex items-center justify-end'>
                      <div className='flex items-center'>
                        <div className='flex items-center'>
                          {isMobileView ? null : (
                            <SearchBar screen={'DESKTOP'} />
                          )}
                          <LoginIcon />
                          <LoggedInMenu />
                          <MyCartIcon />
                          <div className="pl-[15px] order-1 sm:order-4">
                                                <a href="javascript:void(0);">
                                                    <img src="/assets/images/di/for-the-planet.png" alt="" />
                                                </a>
                                            </div>
                          {/* <div className='lg:hidden pl-[15px]'>
                            {router.asPath !== paths.CHECKOUT && <MenuIcon />}
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CompanyInfo
                    phoneNumber={storePhoneNumber}
                    email={storeEmail}
                  />
                  {isMobileView ? <SearchBar screen={'MOBILE'} /> : null}
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
};

export default Header_Type4;
