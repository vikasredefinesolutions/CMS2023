import { storeBuilderTypeId } from '@configs/page.config';
import { __pagesConstant } from '@constants/pages.constant';
import { paths } from '@constants/paths.constant';
import { _HeaderProps, _MenuItems } from '@definations/header.type';
import {
  useActions_v2,
  useTypedSelector_v2,
  useWindowDimensions_v2,
} from '@hooks_v2/index';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CompanyInfo from './Components/CompanyInfo';
import {
  LoggedInMenu,
  LoginIcon,
  Logo,
  MenuIcon,
  MyCartIcon,
} from './Components/Icons';
import Header_MenuItems from './Components/Menu/Header_MenuItems';
import SearchBar from './Components/Menu/Header_SearchBar';

const Header_Type3: NextPage<_HeaderProps> = ({
  logoUrl,
  menuItems,
  headerBgColor,
  headerTextColor,
}) => {
  const { store_setAppView } = useActions_v2();
  const { width } = useWindowDimensions_v2();
  const router = useRouter();

  const showSideMenu = useTypedSelector_v2((state) => state.modals.sideMenu);
  const store = useTypedSelector_v2((state) => state.store);
  const storeEmail = useTypedSelector_v2((state) => state.store.email_address);
  const storePhoneNumber = useTypedSelector_v2(
    (state) => state.store.phone_number,
  );
  const storeTypeId = useTypedSelector_v2((state) => state.store.storeTypeId);
  const islogo = useTypedSelector_v2((state) => state.sbStore.isLogo);

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
      className={`bg-[${headerBgColor}] sticky top-7 z-40  shadow-[0_0px_5px_rgba(0,0,0,0.12)]`}
      id='mobile_menu_box'
    >
      {/* <NotificationBar /> */}

      <div
        className={`${headerBgColor ? '' : 'bg-[#ffffff]'}]`}
        style={{ backgroundColor: headerBgColor }}
      >
        {isMobileView && router.asPath != paths.CHECKOUT && (
          <Header_MenuItems
            showSideMenu={showSideMenu}
            // storeCode={storeCode}
            screen='MOBILE'
            menuItems={menuItems as _MenuItems}
          />
        )}

        <div className='fixed z-40 lg:hidden'></div>
        <header className='relative trancking-[1px]' id="spy">
          <nav className='container mx-auto'>
            <div
              className={`${headerBgColor ? '' : 'bg-[#ffffff]'}]`}
              style={{ backgroundColor: headerBgColor }}
            >
              <div className='p-[10px]'>
                {isMobileView ? (
                  <CompanyInfo
                    phoneNumber={storePhoneNumber}
                    email={storeEmail}
                  />
                ) : null}
                <div className=''>
                  <div className='flex items-center justify-between'>
                    <div className='sm:flex sm:items-center sm:w-[50%] md:w-[25%] relative'>
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
                    </div>

                    <div className='flex flex-wrap items-center justify-end max-w-[286px]'>
                      <div className='flex flex-wrap items-center justify-end '>
                        {isMobileView ? null : (
                          <CompanyInfo
                            phoneNumber={storePhoneNumber}
                            email={storeEmail}
                          />
                        )}

                        <div className='flex items-center justify-end w-full'>
                          {isMobileView ? null : (
                            <SearchBar screen={'DESKTOP'} />
                          )}
                          <LoginIcon />
                          <LoggedInMenu />
                          <MyCartIcon />
                          <div className='lg:hidden pl-[15px]'>
                            {router.asPath !== paths.CHECKOUT && <MenuIcon />}
                          </div>
                        </div>
                      </div>
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
                  <SearchBar screen={'MOBILE'} />
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
};

export default Header_Type3;
