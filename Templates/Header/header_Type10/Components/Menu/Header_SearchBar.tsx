import { __pagesText } from '@constants/pages.text';
import { Form, Formik } from 'formik';
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
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchState, setSearchState] = useState('w-16');
  const changeSearchState = () => {
    if(searchState === 'w-16')
    {
      setSearchState('w-full');
    }
    else
    {
      setSearchState('w-16');
    }
  }
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
                <div className='w-40'>
                  <div className='text-[14px] text-primary relative flex items-center justify-end'>
                    <button className='w-[24px] h-[24px]'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
                        <path id="search" d="M1548.68,81.934H1548l-.24-.232a5.582,5.582,0,1,0-.6.6l.232.24v.677l4.288,4.28,1.278-1.278Zm-5.145,0a3.86,3.86,0,1,1,3.859-3.859A3.854,3.854,0,0,1,1543.535,81.934Z" transform="translate(-1537.96 -72.5)" fill="#011c48"/>
                      </svg>
                    </button>
                    <div className={`relative transition duration-700 ease-in-out ${searchState}`}>
                    <input
                      ref={searchRef}
                      type='text'
                      name='q'
                      min={1}
                      id='txtSearch'
                      placeholder={__pagesText.Headers.searchPlaceholder}
                      onChange={handleChange}
                      className='outline-none border-0 focus:ring-0 text-[14px] tracking-[1px] text-primary h-[26px] w-full'
                      autoComplete='off'
                      maxLength={128}
                      defaultValue={values.text}
                      onMouseDown={changeSearchState}
                      onBlur={changeSearchState}
                    />
                    </div>
                   
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
