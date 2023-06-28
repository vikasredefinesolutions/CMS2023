import LoginModal from '@appComponents/modals/loginModal';
import { _Store } from '@configs/page.config';
import { EMAIL_REGEX } from '@constants/global.constant';
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
}

const Footer: React.FC<_props> = ({ data: dataFromRoot }) => {
  const [footerHTML, setFooterHTML] =
    useState<_FetchStoreConfigurations | null>(null);
  const [email, setEmail] = useState('');

  const [showLoginModal, setShowLoginModal] = useState(false);

  const router = useRouter();

  const { setShowLoader, showModal } = useActions_v2();

  const {
    currentPage,
    id: storeId,
    code: storeCode,
  } = useTypedSelector_v2((state) => state.store);

  const isEventListnerSet = useRef(false);
  const isEventListnerSet2 = useRef(false);

  useEffect(() => {
    if (dataFromRoot) {
      setFooterHTML(dataFromRoot);
    }
  }, [dataFromRoot]);

  const handleEmailChange = (value: string) => {
    setEmail(value);
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

  const addUrl = () => {
    const redirect = () => {
      router.push(paths.myAccount.account_settings);
    };

    if (storeCode === _Store.type11) {
      const myAccount = document.getElementById('myaccfooter');
      myAccount?.addEventListener('click', redirect);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      addUrl();
    }, 200);
  }, []);

  if (currentPage === 'STORIES') {
    return <></>;
  }

  return (
    <>
      <div className='footer' id='MainFooter'>
        <div
          dangerouslySetInnerHTML={{ __html: footerHTML?.config_value || '' }}
        ></div>
      </div>
      {showLoginModal && (
        <LoginModal modalHandler={() => setShowLoginModal(!showLoginModal)} />
      )}
    </>
  );
};

export default React.memo(Footer);
