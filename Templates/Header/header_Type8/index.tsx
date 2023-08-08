import { __pagesConstant } from '@constants/pages.constant';
// import { _MenuItems } from '@src/show.type';
import StoreTimer from '@appComponents/StoreTimer/StoreTimer';
import { _HeaderProps, _MenuItems } from '@definations/header.type';
import { _SbStoreConfiguration } from '@definations/store.type';
import { FetchSbStoreMessages } from '@services/sb.service';
import {
  useActions_v2,
  useTypedSelector_v2,
  useWindowDimensions_v2,
} from 'hooks_v2';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header_MenuItems from '../header_Type1/Components/Menu/Header_MenuItems';
import H8_CompanyLogo from './Components/H8_Logo';
import H8_MyCartIcon from './Components/H8_MyCartIcon';

const initialShowTimer = (sb: _SbStoreConfiguration) => {
  if (sb?.isDisplayTimer) {
    const time = Date.parse(sb.closeStoreOn) - Date.now();
    return time > 0;
  }
  return false;
};

const Header_Type8: NextPage<_HeaderProps> = ({
  logoUrl,
  headerBgColor,
  menuItems,
  headerTextColor,
}) => {
  const { store_setAppView, update_SbStoreMessages } = useActions_v2();
  const { width } = useWindowDimensions_v2();
  const router = useRouter();

  const { id: storeId, storeName: sbStoreName } = useTypedSelector_v2(
    (state) => state.store,
  );
  const showSideMenu = useTypedSelector_v2((state) => state.modals.sideMenu);
  const messages = useTypedSelector_v2((state) => state.sbStore.messages);
  const sbStore = useTypedSelector_v2((state) => state.sbStore.store);
  // ------------------------------------------------------------------------
  const [isMobileView, setIsMobileView] = useState<boolean>(
    width <= __pagesConstant._header.mobileBreakPoint,
  );
  const [showHeaderMessage, setShowHeaderMessage] = useState<boolean>(
    initialShowTimer(sbStore),
  );

  const fetchStoreLevelMessages = async () => {
    await FetchSbStoreMessages({ storeId: storeId }).then((response) => {
      update_SbStoreMessages({
        checkOutMessage: response?.checkOutMessage || '',
        orderSuccessMessage: response?.orderSuccessMessage || '',
        headerMessage: response?.headerMessage || '',
        checkoutTermsAndCondition: response?.checkoutTermsAndCondition || '',
      });
    });
  };

  useEffect(() => {
    const isMobile = width <= __pagesConstant._header.mobileBreakPoint;
    const showMobile = isMobile ? 'MOBILE' : 'DESKTOP';
    store_setAppView(showMobile);
    setIsMobileView(isMobile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  useEffect(() => {
    if (storeId > 0) {
      fetchStoreLevelMessages();
    }
  }, [storeId]);

  useEffect(() => {
    setShowHeaderMessage(initialShowTimer(sbStore));
  }, [sbStore]);

  const StoreNameHTML = () => {
    if (!sbStore.isStoreName) {
      return (
        <div className='flex items-center sm:justify-start justify-center text-large-text font-semibold py-[10px] sm:py-[0] sm:text-left text-center'>
          {sbStoreName}
        </div>
      );
    }

    if (router.asPath != '' && router.asPath != '/') {
      if (storeId === 37) {
        return (
          <div
            className='flex items-center sm:justify-start justify-center text-title-text font-semibold py-[10px] sm:py-[0] sm:text-left text-center'
            dangerouslySetInnerHTML={{
              __html: `USAA 100th Anniversary Store<br>Powered by ParsonsKellogg`,
            }}
          ></div>
        );
      }

      return null;
    }
  };

  const hideMessage = () => {
    if (router.asPath.includes('Checkout')) return false;
    if (messages?.headerMessage.length === 0) return false;
    if (!showHeaderMessage) return false;
    return true;
  };

  return (
    <>
      <div
        className={`bg-[${headerBgColor}] md:top-7 shadow-[0_0px_5px_rgba(0,0,0,0.12)] ${
          !sbStore.isCategoryMenu && 'border-b border-b-[15px] border-b-primary'
        }`}
        id={'header_with_navBar'}
        style={{
          backgroundColor: `${headerBgColor}`,
          borderBottom: !sbStore.isCategoryMenu ? 'solid 15px' : '',
        }}
      >
        <div
          className={`bg-[${headerBgColor}]`}
          style={{ color: `${headerBgColor} !important;` }}
        >
          <div className='fixed lg:hidden'></div>
          <header className='relative' id='sbheader'>
            <div className={`bg-[${headerBgColor}]`}>
              <div className='container mx-auto'>
                <div className='flex flex-wrap justify-between items-center pt-[35px] pb-[25px] mx-[-15px]'>
                  <div className='w-full lg:w-2/12 md:w-2/12 sm:w-4/12 pl-[15px]'>
                    {!sbStore.isLogo && !isMobileView && (
                      <H8_CompanyLogo
                        logo={{
                          desktop: logoUrl.desktop,
                          mobile: logoUrl.desktop,
                        }}
                      />
                    )}
                    {/* <div className='grow flex flex-wrap items-center lg:justify-between'> */}
                    {!sbStore.isLogo &&
                      (isMobileView ? (
                        <H8_CompanyLogo
                          logo={{
                            desktop: logoUrl.desktop,
                            mobile: logoUrl.desktop,
                          }}
                        />
                      ) : null)}
                  </div>
                  <div className='w-full lg:w-7/12 md:w-6/12 sm:w-8/12 px-[15px]'>
                    {StoreNameHTML()}
                  </div>
                  <div className='w-full lg:w-3/12 md:w-4/12 sm:w-12/12 px-[15px]'>
                    {router.asPath != '' && router.asPath != '/' && (
                      <div className='flex justify-end mb-[10px] absolute top-[10px] right-[10px] md:relative md:top-0 md:right-0'>
                        <H8_MyCartIcon />
                      </div>
                    )}
                    {sbStore.isDisplayTimer && (
                      <div className='flex justify-end mb-[10px] absolute top-[10px] right-[10px] md:relative md:top-0 md:right-0'>
                        <StoreTimer />
                      </div>
                    )}
                  </div>
                  {/* </div> */}
                </div>
              </div>
              {sbStore.isCategoryMenu && (
                <div
                  className='flex flex-wrap justify-center items-center bg-secondary'
                  style={{ color: `#000000` }}
                >
                  <div className='container mx-auto text-center'>
                    <div className='inline-block relative text-primary'>
                      <Header_MenuItems
                        showSideMenu={showSideMenu}
                        screen='DESKTOP'
                        menuItems={menuItems as _MenuItems}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </header>
        </div>
      </div>
      {hideMessage() && (
        <div className='container mx-auto'>
          <div
            className='bg-tertiary border border-2 border-secondary p-[15px] rounded-md my-[30px] text-normal-text'
            dangerouslySetInnerHTML={{ __html: messages.headerMessage }}
          />
        </div>
      )}
    </>
  );
};

export default Header_Type8;
