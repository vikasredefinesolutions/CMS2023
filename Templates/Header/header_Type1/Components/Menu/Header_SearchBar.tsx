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
        x?.value === '' ||
        x?.value === 'Enter Search here' ||
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
        x.focus();
        return;
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
                <div className='sm:hidden'>
                  <div className=''>
                    <div className='border border-[#003a70] pt-[5px] pb-[4px] pl-[15px] pr-[24px] text-primary relative'>
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
                        type='submit'
                        className='w-[24px] h-[24px] absolute right-[6px] top-[6px]'
                      >
                        <span
                          className='material-icons text-primary font-[900]'
                          onClick={() => searchRef?.current?.focus()}
                        >
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
            <Form>
              <div className='hidden sm:flex max-w-[140px] xl:max-w-[190px] ml-[8px]'>
                <div className=''>
                  <div className='border border-primary pt-[5px] pb-[4px] pl-[15px] pr-[24px] text-primary relative'>
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
                      maxLength={128}
                      defaultValue={values.text}
                    />
                    {
                      <button
                        type='submit'
                        className='w-[24px] h-[24px] absolute right-[6px] top-[6px]'
                      >
                        <span
                          className='material-icons text-primary font-[900]'
                          onClick={() => searchRef?.current?.focus()}
                        >
                          {__pagesText.Headers.searchIcon}
                        </span>
                      </button>
                    }
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    );
  }

  return <></>;
};

export default SearchBar;
