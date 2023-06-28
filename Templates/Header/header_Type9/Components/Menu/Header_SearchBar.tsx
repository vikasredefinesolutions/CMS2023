import { __pagesText } from '@constants/pages.text';
import { Form, Formik } from 'formik';
import React, { useRef } from 'react';

interface _props {
  screen?: 'MOBILE' | 'DESKTOP';
  // eslint-disable-next-line no-unused-vars
  onSearchInput?: (value?: string) => Promise<void>;
}

const SearchBar: React.FC<_props> = ({
  screen = 'DESKTOP',
  onSearchInput = () => {},
}) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const searchHandler = (values: any) => {
    onSearchInput(values.text as string);
    let x = searchRef.current;
    if (x) {
      if (
        x?.value == '' ||
        x?.value == 'Enter Search here' ||
        x?.value.toString().toLowerCase().indexOf('enter search') > -1
      ) {
        alert('Please enter something to search');
      }
      var str = x.value.replace(/^\s+|\s+$/g, '');
      while (str.substring(str.length - 1, str.length) == ' ') {
        str = str.substring(0, str.length - 1);
      }
      if (str.length < 3) {
        alert('Please enter at least 3 characters to search');
        x.focus();
      }

      window.location.href =
        '/search/result.html?q=' +
        encodeURIComponent(str.replace(/^\s+|\s+$/g, ''));
    }
  };

  if (screen === 'MOBILE') {
    return (
      <>
        <Formik initialValues={{ text: '' }} onSubmit={searchHandler}>
          {({ values, handleSubmit, handleChange, handleReset }) => {
            return (
              <Form>
                <div className=''>
                  <div className=''>
                    <div className='border-b border-black w-full p-[10px] text-white hover:text-primary relative'>
                      <input
                        ref={searchRef}
                        type='text'
                        name='q'
                        min={1}
                        id='txtSearch'
                        placeholder={__pagesText.Headers.searchPlaceholder}
                        onChange={handleChange}
                        className='outline-none w-full border-0 focus:ring-0 text-[14px] tracking-[1px] text-[#000000] h-[26px]'
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
      </>
    );
  }
  if (screen === 'DESKTOP') {
    return (
      <Formik initialValues={{ text: '' }} onSubmit={searchHandler}>
        {({ values, handleSubmit, handleChange, handleReset }) => {
          return (
            <div className='mb-3'>
              <Form className='hidden lg:flex flex-grow max-w-[500px]'>
                <div>
                  <div className='border-b border-black w-full p-[10px] text-white hover:text-primary relative'>
                    <input
                      ref={searchRef}
                      type='text'
                      name='q'
                      min={1}
                      id='txtSearch'
                      placeholder={__pagesText.Headers.searchPlaceholder}
                      onChange={handleChange}
                      className='outline-none w-full border-0 focus:ring-0 text-[14px] tracking-[1px] text-[#000000] h-[26px]'
                      autoComplete='off'
                      maxLength={255}
                      defaultValue={values.text}
                    />
                    <button
                      className='w-[24px] h-[24px] absolute right-[6px] top-[12px]'
                      onClick={() => {
                        handleSubmit();
                        handleReset();
                      }}
                    >
                      <span className='material-icons text-[#000000] font-[900]'>
                        {__pagesText.Headers.searchIcon}
                      </span>
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          );
        }}
      </Formik>
    );
  }

  return <></>;
};

export default SearchBar;
