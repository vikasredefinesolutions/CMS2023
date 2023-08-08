import LoginModal from '@appComponents/modals/loginModal';
import { _Store } from '@configs/page.config';
import {
  BACARDI,
  BOSTONBEAR,
  EMAIL_REGEX,
  SIMPLI_SAFE_CODE,
  UCA,
  _Store_CODES,
  __Cookie,
} from '@constants/global.constant';
import { paths } from '@constants/paths.constant';
import { commonMessage } from '@constants/successError.text';
import { subscribeSuccessMessages } from '@constants/successErrorMessages.constant';
import { checkoutUserLoginMessages } from '@constants/validationMessages';
import { _FetchStoreConfigurations } from '@definations/store.type';
import { extractCookies } from '@helpers/common.helper';
import getLocation from '@helpers/getLocation';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { SubsribeToNewsLetter } from '@services/general.service';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
interface _props {
  data: _FetchStoreConfigurations | null;
  store: {
    code: string;
  };
}

const Footer: React.FC<_props> = ({ data: dataFromRoot, store }) => {
  const selectedBacardiStor = extractCookies(
    'BacardiSelectedStore',
    'browserCookie',
  ).BacardiSelectedStore;

  const router = useRouter();
  const isEventListnerSet = useRef(false);
  const isEventListnerSet2 = useRef(false);
  //
  const { setShowLoader, showModal } = useActions_v2();
  const {
    currentPage,
    id: storeId,
    code: storeCode,
  } = useTypedSelector_v2((state) => state.store);
  //
  const [footerHTML] = useState<_FetchStoreConfigurations | null>(dataFromRoot);
  const [email, setEmail] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  //
  const YearofDate = new Date().getFullYear();

  const showDICheckoutFooter = () => {
    if (store.code !== _Store.type4) return false;
    if (router.asPath === paths.CHECKOUT) return true;
    //
    return false;
  };

  const showPK1CheckoutFooter = () => {
    if (
      store.code !== UCA &&
      store.code !== SIMPLI_SAFE_CODE &&
      store.code != BOSTONBEAR
    )
      return false;
    if (router.asPath === paths.CHECKOUT || router.asPath === paths.CART)
      return true;

    return false;
  };
  const showFooter = () => {
    if (currentPage === 'STORIES') return false;
    if (
      (router.asPath === paths.CHECKOUT || router.asPath === paths.CART) &&
      store.code !== _Store_CODES.UNITi
    )
      return false;
    if (router.asPath === paths.PETERMILLAR.CUSTOM_FORM) return false;
    if (router.asPath === paths.PETERMILLAR.THANK_YOU) return false;
    if (storeCode === BACARDI) return false;
    //
    return true;
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const CartAndCheckoutFooter = (
    <footer>
      <div className='footer' id='MainFooter'>
        <div>
          <div className='container mx-auto white-link'>
            <div className=''>
              <div className='py-[25px]'>
                <div>
                  <div className='flex justify-center items-center'>
                    <p className='mr-[8px]'>
                      © 2023 ParsonsKellogg Store. All Rights Reserved. Powered
                      by ParsonsKellogg{' '}
                    </p>
                    <img
                      src='	https://betasbacardi.parsonskellogg.com/images/pk-logo-mini.png'
                      alt=''
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  const BacardiFooter = (
    <footer className='mt-[40px]' aria-labelledby='footer-heading'>
      <h2 id='footer-heading' className='sr-only'>
        Footer
      </h2>
      <div className='container mx-auto'>
        <div className='bg-primary'>
          <div className='py-[25px] lg:pt-[50px] lg:pb-[30px]'>
            <div className='py-[15px]'>
              <div className='flex flex-wrap lg:-mx-[25px] gap-y-4 items-center'>
                <div className='w-full lg:px-[25px] text-center'>
                  <img
                    src='https://storagemedia.corporategear.com/storagemedia/1/store/16/images/footer-bacardi-logo.png?0.8928410401954329'
                    alt=''
                    title=''
                    className='inline-block max-w-[150px]'
                  />
                </div>
                <div className='w-full lg:py-[25px] !text-white'>
                  <div className='text-center w-full mx-auto mb-[10px]'>
                    <img
                      src='https://headlesscdn-c2fyfua9dca0dthr.z01.azurefd.net/storagemedia/1/store/16/images/call-us-icon.png?0.4617295057349491'
                      alt=''
                      title=''
                      className='inline-block'
                    />
                  </div>
                  <div className='text-center w-full !text-white text-large-text font-semibold'>
                    781.974.5134
                  </div>
                </div>
                <div className='w-full lg:px-[25px] text-center !text-white text-small-text'>
                  <a
                    href='#'
                    title=''
                    className='!text-white text-small-text hover:text-white mx-[15px] hover:underline uppercase'
                  >
                    Home
                  </a>
                  <a
                    href='#'
                    title=''
                    className='!text-white text-small-text hover:text-white mx-[15px] hover:underline uppercase'
                  >
                    About Us
                  </a>
                  <a
                    href='#'
                    title=''
                    className='!text-white text-small-text hover:text-white mx-[15px] hover:underline uppercase'
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
            <div className='py-[10px] px-[32px]'>
              <div className='border-t border-gray-border pt-[15px]'>
                <div className='lg:flex gap-y-4 lg:items-center lg:justify-between w-full'>
                  <div className='w-full text-small-text text-white'>
                    <div className='text-small-text font-semibold !text-white mb-[10px]'>
                      SIP RESPONSIBLY
                    </div>
                    <div className='text-extra-small-text !text-white pb-[5px]'>
                      &copy; 2023. BACARDÍ , ITS TRADE DRESS, THE BAT DEVICE AND
                      BACARDI UNTAMEABLE ARE TRADEMARKS.
                      <br /> BACARDI U.S.A., INC., CORAL GABLES, FL. RUM - 40%
                      ALC. BY VOL. RUM SPECIALITIES – 35% ALC. BY VOL.
                    </div>
                  </div>
                  <div className='w-full !text-white text-small-text mt-[15px] lg:mt-0'>
                    <div className='flex lg:justify-end lg:items-center w-full text-white'>
                      <span className='mr-[10px]'>Powered by:</span>
                      <a title='PK' href='javascript:void(0)'>
                        <img
                          src='https://storagemedia.corporategear.com/storagemedia/1/store/pk-black-logo.png'
                          alt='PK'
                          title='PK'
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  const GreyGooseFooter = (
    <footer className='mt-[40px]' aria-labelledby='footer-heading'>
      <h2 id='footer-heading' className='sr-only'>
        Footer
      </h2>
      <div className='container mx-auto'>
        <div className='bg-primary'>
          <div className='py-[25px] lg:pt-[50px] lg:pb-[30px]'>
            <div className='py-[15px]'>
              <div className='flex flex-wrap lg:-mx-[25px] gap-y-4 items-center'>
                <div className='w-full lg:px-[25px] text-center'>
                  <img
                    src='https://storagemedia.corporategear.com/storagemedia/1/store/16/images/footer-logo.png'
                    alt=''
                    title=''
                    className='inline-block max-w-[150px]'
                  />
                </div>
                <div className='w-full lg:py-[25px] !text-white'>
                  <div className='text-center w-full mx-auto mb-[10px]'>
                    <img
                      src='https://headlesscdn-c2fyfua9dca0dthr.z01.azurefd.net/storagemedia/1/store/16/images/call-us-icon.png?0.4617295057349491'
                      alt=''
                      title=''
                      className='inline-block'
                    />
                  </div>
                  <div className='text-center w-full !text-white text-large-text font-semibold'>
                    (866) 602-8398
                  </div>
                </div>
                <div className='w-full lg:px-[25px] text-center !text-white text-small-text'>
                  <a
                    href='#'
                    title=''
                    className='!text-white text-small-text hover:text-white mx-[15px] hover:underline uppercase'
                  >
                    Home
                  </a>
                  <a
                    href='#'
                    title=''
                    className='!text-white text-small-text hover:text-white mx-[15px] hover:underline uppercase'
                  >
                    About Us
                  </a>
                  <a
                    href='#'
                    title=''
                    className='!text-white text-small-text hover:text-white mx-[15px] hover:underline uppercase'
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
            <div className='py-[10px] px-[32px]'>
              <div className='border-t border-gray-border pt-[15px]'>
                <div className='lg:flex gap-y-4 lg:items-center lg:justify-between w-full'>
                  <div className='w-full text-small-text !text-white'>
                    <div className='text-small-text font-semibold !text-white mb-[10px]'>
                      SIP RESPONSIBLY
                    </div>
                    <div className='text-extra-small-text !text-white pb-[5px]'>
                      &copy; 2023 GREY GOOSE, THE GEESE DEVICE AND THE TRADE
                      DRESSES ARE TRADEMARKS. IMPORTED BY GREY GOOSE <br />{' '}
                      IMPORTING COMPANY, CORAL GABLES, FL.
                    </div>
                    {/* <!-- <div className="text-extra-small-text text-white">BACARDI U.S.A., INC., CORAL GABLES, FL. RUM - 40% ALC. BY
              VOL. RUM SPECIALITIES &ndash; 35% ALC. BY VOL.</div> --> */}
                  </div>
                  <div className='w-full !text-white text-small-text mt-[15px] lg:mt-0'>
                    <div className='flex lg:justify-end lg:items-center w-full !text-white'>
                      <span className='mr-[10px]'>Powered by:</span>
                      <a title='PK' href='javascript:void(0)'>
                        <img
                          src='https://storagemedia.corporategear.com/storagemedia/1/store/pk-white-logo.png'
                          alt='PK'
                          title='PK'
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  const showBacardiFooter = () => {
    if (storeCode == BACARDI) {
      if (router.asPath == paths.CART || router.asPath == paths.CHECKOUT)
        return CartAndCheckoutFooter;
      if (selectedBacardiStor === 'Bacardi') {
        return BacardiFooter;
      } else if (selectedBacardiStor === 'GreyGoose') {
        return GreyGooseFooter;
      }
    } else return false;
  };

  const handleSubscribeToLetter = async (emailFrom?: string) => {
    const emailToBeSend = emailFrom ? emailFrom : email;
    if (EMAIL_REGEX.test(emailToBeSend)) {
      setShowLoader(true);
      const location = await getLocation();
      const payload = {
        subscribeModel: {
          rowVersion: '',
          location: location.ip_address,
          ipAddress: location.ip_address,
          macAddress: '00-00-00-00-00-00',
          id: 0,
          email: emailToBeSend,
          isSubscribe: true,
          storeId: storeId,
          recStatus: 'A',
        },
      };
      try {
        const res = await SubsribeToNewsLetter(payload);
        if (res)
          showModal({
            message: subscribeSuccessMessages.subscribeToLetter,
            title: '',
          });
        setShowLoader(false);
      } catch (error) {
        showModal({ message: commonMessage.somethingWentWrong, title: '' });
        setShowLoader(false);
      }
    } else {
      showModal({
        message: emailToBeSend.length
          ? checkoutUserLoginMessages.email.email
          : checkoutUserLoginMessages.email.required,
        title: '',
      });
    }
  };

  const handleTrackOrder = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const customerId = extractCookies('', 'browserCookie').userId;

    if (customerId) {
      return router.push(paths.loggedInMenu.order);
    }
    return setShowLoginModal(true);
  };

  function redirect() {
    const userLoggedIn = extractCookies(
      __Cookie.userId,
      'browserCookie',
    ).userId;

    if (!userLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    router.push(paths.myAccount.account_settings);
  }

  useEffect(() => {
    let thankYouButton: HTMLElement | null =
      document.getElementById('track_order');
    if (thankYouButton && !isEventListnerSet2.current) {
      isEventListnerSet2.current = true;
      thankYouButton.addEventListener('click', (e) => handleTrackOrder(e));
    }
    return () => {
      thankYouButton?.removeEventListener('click', (e) => handleTrackOrder(e));
    };
  }, [footerHTML]);

  useEffect(() => {
    let subscribeEmailInput: HTMLElement | null = document.getElementById(
      'email_newsletter_input',
    );
    let subscribeBtn: HTMLElement | null = document.getElementById(
      'email_newsletter_btn',
    );
    if (!isEventListnerSet.current && subscribeBtn && subscribeEmailInput) {
      isEventListnerSet.current = true;

      subscribeEmailInput?.addEventListener('input', (event) =>
        handleEmailChange((event.target as HTMLInputElement).value),
      );
      subscribeBtn = document.getElementById('email_newsletter_btn');
      subscribeBtn?.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();
        handleSubscribeToLetter(
          (subscribeEmailInput as HTMLInputElement)?.value,
        );
      });
    }

    return () => {
      subscribeEmailInput?.removeEventListener('input', (event) =>
        handleEmailChange((event.target as HTMLInputElement).value),
      );
      subscribeBtn?.removeEventListener('click', () =>
        handleSubscribeToLetter(),
      );
    };
  }, [footerHTML]);

  useEffect(() => {
    let subscribeEmailInput: HTMLElement | null =
      document.getElementById('inputemail');
    let subscribeBtn: HTMLElement | null =
      document.getElementById('inputbutton');
    if (!isEventListnerSet.current && subscribeBtn && subscribeEmailInput) {
      isEventListnerSet.current = true;

      subscribeEmailInput?.addEventListener('input', (event) =>
        handleEmailChange((event.target as HTMLInputElement).value),
      );

      subscribeEmailInput?.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          event.stopPropagation();
          event.preventDefault();
          handleSubscribeToLetter(
            (subscribeEmailInput as HTMLInputElement)?.value,
          );
        }
      });

      subscribeBtn = document.getElementById('inputbutton');
      subscribeBtn?.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();
        handleSubscribeToLetter(
          (subscribeEmailInput as HTMLInputElement)?.value,
        );
      });
    }

    return () => {
      subscribeEmailInput?.removeEventListener('input', (event) =>
        handleEmailChange((event.target as HTMLInputElement).value),
      );
      subscribeBtn?.removeEventListener('click', () =>
        handleSubscribeToLetter(),
      );
    };
  }, [footerHTML]);

  useEffect(() => {
    let myAccount: HTMLElement | null = null;
    setTimeout(() => {
      myAccount = document.getElementById('myaccfooter');
      myAccount?.addEventListener('click', redirect);
    }, 200);

    return () => {
      myAccount?.removeEventListener('click', redirect);
    };
  }, []);

  return (
    <>
      {showFooter() && (
        <div className='footer' id='MainFooter'>
          <div
            dangerouslySetInnerHTML={{ __html: footerHTML?.config_value || '' }}
          ></div>
        </div>
      )}
      {showLoginModal && (
        <LoginModal modalHandler={() => setShowLoginModal(!showLoginModal)} />
      )}
      {showDICheckoutFooter() && (
        <div className='bg-white'>
          <div className='continer'>
            <div className='text-center'>
              <div className='w-full pl-[15px] pr-[15px] pt-[10px]'>
                <div className='text-[11px] text-primary text-center pb-[10px]'>
                  © {YearofDate}{' '}
                  <a
                    className='text-[11px] text-primary hover:text-primary-hover'
                    href='javascript:void(0);'
                  >
                    Driving Impressions®
                  </a>
                  , All Rights Reserved. Terms of Use Privacy
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showPK1CheckoutFooter() && (
        <div className='footer' id='MainFooter'>
          <div>
            <div className='container mx-auto white-link'>
              <div className='bg-primary'>
                <div className='border-t border-gray-border py-[25px]'>
                  <div>
                    <div className='text-center text-xs text-white'>
                      © 2023 ParsonsKellogg Store. All Rights Reserved
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showBacardiFooter()}
    </>
  );
};

export default React.memo(Footer);
