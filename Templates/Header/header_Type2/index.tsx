import { storeBuilderTypeId } from '@configs/page.config';
import { __LocalStorage } from '@constants/global.constant';
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
import {
  CompareIcon,
  LoggedInMenu,
  LoginIcon,
  Logo,
  MyCartIcon,
} from '../header_Type2/Components/Icons';
import Header_MenuItems from '../header_Type2/Components/Menu/Header_MenuItems';
import SearchBar from '../header_Type2/Components/Menu/Header_SearchBar';

const Header_Type2: NextPage<_HeaderProps> = ({
  logoUrl,
  menuItems,
  headerBgColor,
  headerTextColor,
}) => {
  const {
    store_setAppView,
    setShowLoader,
    updateEmployeeV2,
    product_employeeLogin,
  } = useActions_v2();
  const { width } = useWindowDimensions_v2();
  const router = useRouter();
  const storeCode = useTypedSelector_v2((state) => state.store.code);

  // const router = useRouter;
  // ------------------------------------------------------------------------
  // const userId = useTypedSelector_v2((state) => state.user.id);
  // const storeName = useTypedSelector_v2((state) => state.store.storeName);
  const showSideMenu = useTypedSelector_v2((state) => state.modals.sideMenu);
  const storeTypeId = useTypedSelector_v2((state) => state.store.storeTypeId);
  const islogo = useTypedSelector_v2((state) => state.sbStore.store.isLogo);

  // ------------------------------------------------------------------------
  const [isMobileView, setIsMobileView] = useState<boolean>(
    width <= __pagesConstant._header.mobileBreakPoint,
  );
  const { empId } = useTypedSelector_v2((state) => state.employee);

  const logoutEmployeeHandler = () => {
    // Don't logout LoggedIn user
    setShowLoader(true);
    updateEmployeeV2('CLEAN_UP');
    product_employeeLogin('MinQtyToOne_CleanUp');

    localStorage.removeItem(__LocalStorage.empData);
    localStorage.removeItem(__LocalStorage.empGuest);
    router.push(paths.HOME);
  };

  useEffect(() => {
    const isMobile = width <= __pagesConstant._header.mobileBreakPoint;
    const showMobile = isMobile ? 'MOBILE' : 'DESKTOP';
    store_setAppView(showMobile);
    setIsMobileView(isMobile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return (
    <>
      {!!empId && (
        <div className='bg-[#ffffff] hidden'>
          <div className='relative trancking-[1px]'>
            <div className='bg-[#ffffff]'>
              <div className='container mx-auto'>
                <div className='pt-[10px] pb-[10px]'>
                  <div className='flex items-center justify-end'>
                    <div className='w-1/2 md:w-1/3 flex items-center justify-end'>
                      <div className='flex items-center'>
                        <div className='pl-[15px]'>
                          <div className='flex relative tracking-[1px] text-[12px] whitespace-nowrap'>
                            Employee Logged In &nbsp;
                            <button
                              className='text-quaternary hover:text-anchor-hover flex items-center'
                              onClick={logoutEmployeeHandler}
                            >
                              <span className='text-[12px] inline-block whitespace-nowrap tracking-[1px] text-[#7BC24E]'>
                                (LogOut)
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className={`${
          storeCode !== 'PKHG' && router.asPath === paths.HOME
            ? 'bg-[' + headerBgColor + ']'
            : ''
        } border-b border-y-gray-border`}
        id='mobile_menu_box'
      >
        {/* <NotificationBar /> */}

        <div
          className={`${
            storeCode !== 'PKHG' ? 'bg-[' + headerBgColor + ']' : ''
          }`}
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
          <header
            id={`${
              storeCode === 'PKHG' && router.asPath === paths.HOME ? 'spy' : ''
            }`}
            className={`relative tracking-[1px] ${
              storeCode === 'PKHG'
                ? router.asPath === paths.HOME
                  ? ''
                  : 'bg-white'
                : ''
            }`}
          >
            <nav aria-label='Top'>
              <div
                className={`${
                  storeCode !== 'PKHG'
                    ? headerBgColor
                      ? ''
                      : 'bg-[#ffffff]'
                    : ''
                }`}
                style={{
                  backgroundColor: storeCode !== 'PKHG' ? headerBgColor : '',
                }}
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

                        {storeTypeId == storeBuilderTypeId ? (
                          islogo &&
                          (isMobileView ? (
                            <Logo
                              // screen='MOBILE'
                              logo={{
                                desktop: logoUrl.desktop,
                                mobile: logoUrl.desktop,
                              }}
                            />
                          ) : null)
                        ) : isMobileView ? (
                          <Logo
                            // screen='MOBILE'
                            logo={{
                              desktop: logoUrl.desktop,
                              mobile: logoUrl.desktop,
                            }}
                          />
                        ) : null}
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
    </>
  );
};

export default Header_Type2;
