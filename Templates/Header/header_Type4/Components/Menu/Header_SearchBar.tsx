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
  const searchHandler = (value: { text: string }) => {
    // SearchFor(value);
    onSearchInput(value.text as string);
    // .then().catch().finally;
  };

  if (screen === 'MOBILE') {
    return (
      <>
        <Formik initialValues={{ text: '' }} onSubmit={searchHandler}>
          {({ handleSubmit, handleChange, handleReset }) => {
            return (
              <Form>
                <div className='sm:hidden'>
                  <div className=''>
                    <div className='border border-tertiary border-sm pt-[5px] pb-[4px] pl-[10px] pr-[30px] text-tertiary relative'>
                      <input
                        ref={searchRef}
                        type='text'
                        name='text'
                        min={1}
                        id='txtSearch'
                        placeholder={__pagesText.Headers.searchPlaceholder}
                        onChange={handleChange}
                        className='bg-transparent outline-none w-full border-0 focus:ring-0 text-[14px] tracking-[1.25px] text-[#ffffff] h-[26px]'
                        autoComplete='off'
                        maxLength={255}
                      />
                      <button
                        className='w-[24px] h-[24px] absolute right-[6px] top-[6px]'
                        onClick={() => {
                          handleSubmit();
                          handleReset();
                        }}
                      >
                        <span
                          className='material-icons text-tertiary font-[900]'
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
        {({ handleSubmit, handleChange, handleReset }) => {
          return (
            <Form className='hidden sm:flex max-w-[140px] xl:max-w-[190px] ml-[8px] sm:order-1'>
              <div>
                <div className='border border-tertiary pt-[5px] pb-[4px] pl-[10px] pr-[30px] text-[#ffffff] relative'>
                  <input
                    ref={searchRef}
                    type='text'
                    name='text'
                    min={1}
                    id='txtSearch'
                    placeholder={__pagesText.Headers.searchPlaceholder}
                    onChange={handleChange}
                    className='bg-transparent outline-none w-full border-0 focus:ring-0 text-[14px] tracking-[1.25px] text-[#ffffff] h-[26px]'
                    autoComplete='off'
                    maxLength={255}
                  />
                  <button
                    className='w-[24px] h-[24px] absolute right-[6px] top-[6px]'
                    // onClick={() => {
                    //   handleSubmit();
                    //   handleReset();
                    // }}
                  >
                    <span
                      className='material-icons text-tertiary hover:text-primary-hover font-[900]'
                      onClick={() => searchRef?.current?.focus()}
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
    );
  }

  return <></>;
};

export default SearchBar;
