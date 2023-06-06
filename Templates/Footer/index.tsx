import { EMAIL_REGEX } from '@constants/global.constant';
import { commonMessage } from '@constants/successError.text';
import { subscribeSuccessMessages } from '@constants/successErrorMessages.constant';
import { checkoutUserLoginMessages } from '@constants/validationMessages';
import { _FetchStoreConfigurations } from '@definations/store.type';
import getLocation from '@helpers/getLocation';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { SubsribeToNewsLetter } from '@services/general.service';
import React, { useEffect, useRef, useState } from 'react';
interface _props {
  data: _FetchStoreConfigurations | null;
}

const Footer: React.FC<_props> = ({ data: dataFromRoot }) => {
  const [footerHTML, setFooterHTML] =
    useState<_FetchStoreConfigurations | null>(null);
  const [email, setEmail] = useState('');

  const { setShowLoader, showModal } = useActions_v2();

  const { currentPage, id: storeId } = useTypedSelector_v2(
    (state) => state.store,
  );

  const isEventListnerSet = useRef(false);

  useEffect(() => {
    if (dataFromRoot) {
      setFooterHTML(dataFromRoot);
    }
  }, [dataFromRoot]);

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handleSubscribeToLetter = async (emailFrom?: string) => {
    if (EMAIL_REGEX.test(emailFrom ? emailFrom : email)) {
      setShowLoader(true);
      const location = await getLocation();
      const payload = {
        subscribeModel: {
          rowVersion: '',
          location: location.ip_address,
          ipAddress: location.ip_address,
          macAddress: '00-00-00-00-00-00',
          id: 0,
          email: emailFrom ? emailFrom : email,
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
      showModal({ message: checkoutUserLoginMessages.email.email, title: '' });
    }
  };

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

  if (currentPage === 'STORIES') {
    return <></>;
  }

  return (
    <div className='footer' id='MainFooter'>
      <div
        dangerouslySetInnerHTML={{ __html: footerHTML?.config_value || '' }}
      ></div>
    </div>
  );
};

export default React.memo(Footer);
