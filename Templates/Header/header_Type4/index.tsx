import NxtImage from '@appComponents/reUsable/Image';
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
  const storeCode = useTypedSelector_v2((state) => state.store.code);
  const showSideMenu = useTypedSelector_v2((state) => state.modals.sideMenu);
  const islogo = useTypedSelector_v2((state) => state.sbStore.store.isLogo);
  const storeTypeId = useTypedSelector_v2((state) => state.store.storeTypeId);
  const storeEmail = useTypedSelector_v2((state) => state.store.email_address);
  const storePhoneNumber = useTypedSelector_v2(
    (state) => state.store.phone_number,
  );
  const [isMobileView, setIsMobileView] = useState<boolean>(
    width <= __pagesConstant._header.mobileBreakPoint,
  );

  const showComponent = (): boolean => {
    if (router.asPath === paths.CHECKOUT) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    const isMobile = width <= __pagesConstant._header.mobileBreakPoint;
    const showMobile = isMobile ? 'MOBILE' : 'DESKTOP';
    store_setAppView(showMobile);
    setIsMobileView(isMobile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return (
    <div className='bg-primary sticky top-0 z-40' id='mobile_menu_box'>
      {/* <NotificationBar /> */}

      <div className='bg-primary'>
        {isMobileView && showComponent() && (
          <Header_MenuItems
            showSideMenu={showSideMenu}
            // storeCode={storeCode}
            screen='MOBILE'
            menuItems={menuItems as _MenuItems}
          />
        )}

        <div className='fixed z-40 lg:hidden'></div>
        <header
          className='relative trancking-[1px]'
          id={`${storeCode === 'DI' ? 'spy' : ''}`}
        >
          <nav aria-label='Top'>
            <div>
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

                    <div className='h-full hidden lg:flex sm:flex items-center flex-1'>
                      <div className=''>
                        <div className='h-full flex header-nav relative'>
                          {!isMobileView && showComponent() ? (
                            <Header_MenuItems
                              showSideMenu={showSideMenu}
                              screen='DESKTOP'
                              menuItems={menuItems as _MenuItems}
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center justify-end'>
                      <div className='flex items-center'>
                        {showComponent() ? (
                          <SearchBar screen={'DESKTOP'} />
                        ) : null}
                        {showComponent() && <LoginIcon />}
                        {showComponent() && <LoggedInMenu />}
                        <MyCartIcon />
                        {showComponent() && (
                          <div className='pl-[15px] order-1 sm:order-4 max-w-[100px]'>
                            <a href='/patagonia-sustainability-initiatives.html'>
                              <NxtImage
                                isStatic={true}
                                useNextImage={false}
                                className=''
                                src='/assets/images/di/for-the-planet.png'
                                alt=''
                              />
                            </a>
                          </div>
                        )}
                        {/* <div className='lg:hidden pl-[15px]'>
                            {router.asPath !== paths.CHECKOUT && <MenuIcon />}
                          </div> */}
                      </div>
                    </div>
                  </div>
                  {showComponent() && (
                    <CompanyInfo
                      phoneNumber={storePhoneNumber}
                      email={storeEmail}
                    />
                  )}
                  {showComponent() && isMobileView ? (
                    <SearchBar screen={'MOBILE'} />
                  ) : null}
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
