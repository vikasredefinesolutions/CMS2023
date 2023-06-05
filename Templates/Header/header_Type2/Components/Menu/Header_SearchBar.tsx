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
    // SearchFor(value);
    onSearchInput(values.text as string);

    if (
      values.text == '' ||
      values.text == 'Enter Search here' ||
      values.text.toString().toLowerCase().indexOf('enter search') > -1
    ) {
      alert('Please enter something to search');
    }
    var str = values.text.replace(/^\s+|\s+$/g, '');
    while (str.substring(str.length - 1, str.length) == ' ') {
      str = str.substring(0, str.length - 1);
    }
    if (str.length < 3) {
      alert('Please enter at least 3 characters to search');
      values.focus();
    }

    window.location.href =
      '/' + encodeURIComponent(values.text.replace(/^\s+|\s+$/g, ''));
  };

  if (screen === 'MOBILE') {
    return (
      <>
        <Formik initialValues={{ text: '' }} onSubmit={searchHandler}>
          {({ values, handleSubmit, handleChange, handleReset }) => {
            return (
              <div className='md:hidden pt-[10px]'>
                <div className='container mx-auto'>
                  <Form>
                    <div>
                      <div className='border rounded-full border-gray-border pt-[5px] pb-[4px] pl-[15px] pr-[24px] text-quaternary relative'>
                        <input
                          ref={searchRef}
                          type='text'
                          name='text'
                          min={1}
                          id='txtSearch'
                          placeholder={__pagesText.Headers.searchPlaceholder}
                          onChange={handleChange}
                          className='outline-none w-full border-0 focus:ring-0 text-[14px] tracking-[1px] text-quaternary h-[26px] bg-none'
                          autoComplete='off'
                          maxLength={255}
                          value={values.text}
                        />
                        <button
                          className='w-[24px] h-[24px] absolute right-[6px] top-[6px]'
                          onClick={() => {
                            handleSubmit();
                            handleReset();
                          }}
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
                  </Form>
                </div>
              </div>
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
            <div className='md:w-1/3 hidden md:inline-block pl-[20px]'>
              <Form className='max-w-[450px] mx-auto'>
                <div>
                  <div className='border rounded-full border-gray-border pt-[5px] pb-[4px] pl-[15px] pr-[24px] text-quaternary relative'>
                    <input
                      ref={searchRef}
                      type='text'
                      name='text'
                      min={1}
                      id='txtSearch'
                      placeholder={__pagesText.Headers.searchPlaceholder}
                      onChange={handleChange}
                      className='outline-none w-full border-0 focus:ring-0 text-[14px] tracking-[1px] text-quaternary h-[26px] bg-none'
                      autoComplete='off'
                      maxLength={255}
                      value={values.text}
                    />
                    <button
                      className='w-[24px] h-[24px] absolute right-[6px] top-[6px]'
                      type='submit'
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
