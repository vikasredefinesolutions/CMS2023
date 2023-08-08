import { storeBuilderTypeId } from '@configs/page.config';
import { THD_STORE_CODE, UCA, _Store_CODES } from '@constants/global.constant';
import { __pagesConstant } from '@constants/pages.constant';
import { paths } from '@constants/paths.constant';
import { _HeaderProps, _MenuItems } from '@definations/header.type';
import {
  GetCustomerId,
  useActions_v2,
  useTypedSelector_v2,
  useWindowDimensions_v2,
} from '@hooks_v2/index';
import { FetchSbStoreCartDetails } from '@services/sb.service';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CompanyInfo from './Components/CompanyInfo';
import {
  HeaderContactUs,
  LoggedInMenu,
  LoginIcon,
  Logo,
  MenuIcon,
  MyCartIcon,
} from './Components/Icons';
import Header_MenuItems from './Components/Menu/Header_MenuItems';
import SearchBar from './Components/Menu/Header_SearchBar';

const Header_Type6: NextPage<_HeaderProps> = ({
  logoUrl,
  menuItems,
  headerBgColor,
  headerTextColor,
  headerTransparent,
  headerContainer,
}) => {
  const { store_setAppView, cart_UpdateItems, setShowLoader } = useActions_v2();
  const { width } = useWindowDimensions_v2();
  const router = useRouter();
  const storeCode = useTypedSelector_v2((state) => state.store.code);
  const showSideMenu = useTypedSelector_v2((state) => state.modals.sideMenu);
  const storeEmail = useTypedSelector_v2((state) => state.store.email_address);
  const storePhoneNumber = useTypedSelector_v2(
    (state) => state.store.phone_number,
  );
  const { storeTypeId, code } = useTypedSelector_v2((state) => state.store);
  const islogo = useTypedSelector_v2((state) => state.sbStore.store.isLogo);
  const [menuHeading, setMenuHeading] = useState('');
  const [isMobileView, setIsMobileView] = useState<boolean>(
    width <= __pagesConstant._header.mobileBreakPoint,
  );

  const customerId = GetCustomerId();

  const isEmployeeLoggedIn = useTypedSelector_v2(
    (state) => state.employee.loggedIn,
  );

  const fetchCartDetails = async () => {
    return await FetchSbStoreCartDetails(+customerId, isEmployeeLoggedIn).then(
      (response) => {
        if (!response) return;

        cart_UpdateItems({ items: response });
      },
    );
  };

  useEffect(() => {
    setShowLoader(true);
    fetchCartDetails().finally(() => {
      setShowLoader(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId, isEmployeeLoggedIn]);

  useEffect(() => {
    const isMobile = width <= __pagesConstant._header.mobileBreakPoint;
    const showMobile = isMobile ? 'MOBILE' : 'DESKTOP';
    store_setAppView(showMobile);
    setIsMobileView(isMobile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);
  useEffect(() => {
    if (router.asPath == paths.CHECKOUT) {
      storeCode === UCA || storeCode === _Store_CODES.USAAHEALTHYPOINTS
        ? setMenuHeading('CHECKOUT NOW')
        : setMenuHeading('CHECKOUT');
    } else if (router.asPath == paths.CART) {
      setMenuHeading('Shopping Cart');
    }
  }, [router]);
  const showMenu = () => {
    if (router.asPath == paths.CHECKOUT) {
      return false;
    } else if (router.asPath == paths.CART) {
      return false;
    }
    return true;
  };
  return (
    <div className={`sticky top-7 z-40 header_wrapper`} id='mobile_menu_box'>
      {/* <NotificationBar /> */}

      <div className={`${headerBgColor ? '' : 'bg-[#ffffff]'}`}>
        {isMobileView && router.asPath != paths.CHECKOUT && (
          <Header_MenuItems
            showSideMenu={showSideMenu}
            // storeCode={storeCode}
            screen='MOBILE'
            menuItems={menuItems as _MenuItems}
          />
        )}

        <div className='fixed z-40 lg:hidden'></div>
        <header className='relative trancking-[1px]' id='spy'>
          <nav className='container mx-auto'>
            <div
              className={`${headerBgColor ? '' : 'bg-[#ffffff]'}`}
              style={{
                backgroundColor: headerBgColor,
              }}
            >
              <div className='p-[10px]'>
                {showMenu() && (
                  <>
                    {isMobileView ? (
                      <CompanyInfo
                        phoneNumber={storePhoneNumber}
                        email={storeEmail}
                        headerTextColor={headerTextColor}
                      />
                    ) : null}
                  </>
                )}
                <div className=''>
                  <div className='flex items-center justify-between'>
                    <div
                      className={`sm:flex sm:items-center ${
                        storeCode === UCA ? '' : 'w-full w-[50%] md:w-[25%]'
                      } relative`}
                    >
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

                    {showMenu() && (
                      <>
                        {isMobileView
                          ? null
                          : router.asPath != paths.CHECKOUT && (
                              <Header_MenuItems
                                showSideMenu={showSideMenu}
                                screen='DESKTOP'
                                menuItems={menuItems as _MenuItems}
                              />
                            )}
                        <div className='w-1/2 flex flex-wrap items-center justify-end max-w-[286px]'>
                          <div className='flex flex-wrap items-center justify-end '>
                            {isMobileView ? null : (
                              <CompanyInfo
                                phoneNumber={storePhoneNumber}
                                email={storeEmail}
                                headerTextColor={headerTextColor}
                              />
                            )}

                            <div className='flex items-center justify-end w-full'>
                              {isMobileView ? null : (
                                <>
                                  {storeCode !== _Store_CODES.UNITi && (
                                    <div className='  text-right text-default-text primary-link'>
                                      Search:
                                    </div>
                                  )}
                                  <SearchBar screen={'DESKTOP'} />
                                </>
                              )}
                              <LoginIcon />
                              <LoggedInMenu />
                              {code === THD_STORE_CODE && <HeaderContactUs />}
                              <MyCartIcon />
                              <div className=' pl-[15px]'>
                                {router.asPath !== paths.CHECKOUT &&
                                  isMobileView && <MenuIcon />}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  {!showMenu() && (
                    <div
                      className={`${
                        storeCode === _Store_CODES.UNITi
                          ? 'text-center text-title-text  mb-[20px] uppercase'
                          : 'text-sub-text text-[#ffffff] text-center uppercase'
                      } `}
                    >
                      {menuHeading}
                    </div>
                  )}
                </div>
              </div>

              {showMenu() && isMobileView && <SearchBar screen={'MOBILE'} />}
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
};

export default Header_Type6;
