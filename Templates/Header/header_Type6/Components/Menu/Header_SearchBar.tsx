import LoginModal from '@appComponents/modals/loginModal';
import ThirdPartyLogin from '@appComponents/modals/loginModal/ThirdPartyLogin';
import {
  HEALTHYPOINTS,
  SIMPLI_SAFE_CODE,
  UCA,
  _Store_CODES,
} from '@constants/global.constant';
import { __pagesText } from '@constants/pages.text';
import { _modals } from '@definations/product.type';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';

interface _props {
  screen?: 'MOBILE' | 'DESKTOP';
  // eslint-disable-next-line no-unused-vars
  onSearchInput?: (value?: string) => Promise<void>;
}

const SearchBar: React.FC<_props> = ({
  screen = 'DESKTOP',
  onSearchInput = () => {},
}) => {
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);
  const [openModal, setOpenModal] = useState<null | _modals>(null);
  const [inputText, setInputText] = useState<string>('');
  const { id: customerId } = useTypedSelector_v2((state) => state.user);
  const { setRedirectPagePath } = useActions_v2();
  const { thirdPartyLogin } = useTypedSelector_v2((state) => state.store);
  const { id: storeId, code: storeCode } = useTypedSelector_v2(
    (state) => state.store,
  );

  const modalHandler = (param: null | _modals) => {
    if (param) {
      setOpenModal(param);
      return;
    }
    setOpenModal(null);
  };

  const searchHandler = (values: any) => {
    if (!customerId && (storeCode === UCA || storeCode === HEALTHYPOINTS)) {
      onSearchInput(values.text as string);
      let x = searchRef.current;
      if (x) {
        if (
          x?.value == '' ||
          x?.value == 'Enter Search here' ||
          x?.value.toString().toLowerCase().indexOf('enter search') > -1
        ) {
          return alert('Please enter something to search');
        }
      }
    }
    if (
      customerId ||
      storeCode == SIMPLI_SAFE_CODE ||
      storeCode == HEALTHYPOINTS
    ) {
      onSearchInput(values.text as string);
      let x = searchRef.current;
      if (x) {
        if (
          x?.value == '' ||
          x?.value == 'Enter Search here' ||
          x?.value.toString().toLowerCase().indexOf('enter search') > -1
        ) {
          return alert('Please enter something to search');
        }
        var str = x.value.replace(/^\s+|\s+$/g, '');
        while (str.substring(str.length - 1, str.length) == ' ') {
          str = str.substring(0, str.length - 1);
        }
        if (str.length < 3) {
          alert('Please enter at least 3 characters to search');
          return x.focus();
        }

        window.location.href =
          '/search/result.html?q=' +
          encodeURIComponent(str.replace(/^\s+|\s+$/g, ''));
      }
    } else {
      setOpenModal('login');
      let x = searchRef.current;
      if (x) {
        var str = x.value.replace(/^\s+|\s+$/g, '');
        while (str.substring(str.length - 1, str.length) == ' ') {
          str = str.substring(0, str.length - 1);
        }
        setRedirectPagePath(
          '/search/result.html?q=' +
            encodeURIComponent(str.replace(/^\s+|\s+$/g, '')),
        );
      }
    }
  };

  if (screen === 'MOBILE') {
    return (
      <>
        <Formik initialValues={{ text: '' }} onSubmit={searchHandler}>
          {({ values, handleSubmit, handleChange, handleReset }) => {
            return (
              <Form>
                <div className='p-[10px]'>
                  <div className=''>
                    <div className='bg-white border border-[#003a70] pt-[5px] pb-[4px] pl-[15px] pr-[24px] text-primary relative'>
                      <input
                        ref={searchRef}
                        type='text'
                        name='q'
                        min={1}
                        id='txtSearch'
                        placeholder={__pagesText.Headers.searchPlaceholder}
                        onChange={handleChange}
                        className='outline-none w-full border-0 focus:ring-0 text-[14px] tracking-[1px] text-primary h-[26px]'
                        autoComplete='off'
                        maxLength={255}
                        defaultValue={values.text}
                      />
                      <button
                        className='w-[24px] h-[24px] absolute right-[6px] top-[6px]'
                        onClick={() => {
                          handleSubmit();
                          handleReset();
                        }}
                        type='button'
                      >
                        <span className='material-icons text-primary font-[900]'>
                          {__pagesText.Headers.searchIcon}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
        {openModal === 'login' && <LoginModal modalHandler={modalHandler} />}
      </>
    );
  }
  if (screen === 'DESKTOP') {
    return (
      <>
        <Formik initialValues={{ text: '' }} onSubmit={searchHandler}>
          {({ values, handleSubmit, handleChange, handleReset }) => {
            return (
              <Form className='hidden sm:flex max-w-[140px] xl:max-w-[240px] ml-[8px]'>
                <div>
                  <div className='bg-white border border-primary pt-[5px] pb-[4px] pl-[15px] pr-[24px] rounded-full text-primary relative'>
                    <input
                      ref={searchRef}
                      type='text'
                      name='q'
                      min={1}
                      id='txtSearch'
                      placeholder={__pagesText.Headers.searchPlaceholder}
                      onChange={handleChange}
                      className='outline-none w-full border-0 focus:ring-0 text-[14px] tracking-[1px] text-primary h-[26px]'
                      autoComplete='off'
                      maxLength={255}
                      defaultValue={values.text}
                    />
                    <button
                      className='w-[24px] h-[24px] absolute right-[6px] top-[6px]'
                      onClick={() => {
                        handleSubmit();
                        handleReset();
                      }}
                      type='button'
                    >
                      <span
                        className={`material-icons text-primary font-[900] ${
                          storeCode === _Store_CODES.USAAHEALTHYPOINTS
                            ? 'hover:primary-link '
                            : 'hover:text-secondary'
                        } `}
                      >
                        {__pagesText.Headers.searchIcon}
                      </span>
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
        {openModal === 'login' && (
          <>
            {thirdPartyLogin ? (
              <ThirdPartyLogin modalHandler={modalHandler} />
            ) : (
              <LoginModal modalHandler={modalHandler} />
            )}
          </>
        )}
      </>
    );
  }

  return <></>;
};

export default SearchBar;
