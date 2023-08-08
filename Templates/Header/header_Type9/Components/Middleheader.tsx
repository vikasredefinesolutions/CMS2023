import NxtImage from '@appComponents/reUsable/Image';
import { extractCookies } from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import React, { useEffect, useState } from 'react';
import { LoggedInMenu, LoginIcon, MenuIcon, MyCartIcon } from './Icons';
import SearchBar from './Menu/Header_SearchBar';

// interface _props {
//   setOpenTab: (args: string) => void;
// }
const MiddleHeader: React.FC = () => {
  const { toggleSideMenu } = useActions_v2();
  const selectedBacardi = extractCookies(
    'BacardiSelectedStore',
    'browserCookie',
  ).BacardiSelectedStore;
  const [selectedBacardiStore, setSelectedBacardiStore] = useState<
    string | null
  >(null);
  const { storeTypeId, code: storeCode } = useTypedSelector_v2(
    (state) => state.store,
  );

  const { view } = useTypedSelector_v2((state) => state.store);

  useEffect(() => {
    setSelectedBacardiStore(selectedBacardi);
  }, [selectedBacardi]);

  useEffect(() => {
    if (storeCode === 'BCGG') {
      setSelectedBacardiStore(
        extractCookies('BacardiSelectedStore', 'browserCookie')
          .BacardiSelectedStore,
      );
    }
  }, []);

  return (
    <>
      {' '}
      {storeCode === 'BCGG' && (
        <div
          className='w-full lg:bg-[#efefef]'
          style={{ backgroundColor: '#efefef' }}
        >
          <div className='container mx-auto'>
            <div x-data='{ open: false }' className=''>
              <header className='relative border-b border-gray-border'>
                <nav aria-label='Top'>
                  <div className=''>
                    <div className='py-[20px] flex items-center lg:justify-center justify-between gap-8'>
                      <div className='hidden lg:flex lg:items-center'>
                        <div className='relative'>
                          <a
                            className={` ${
                              selectedBacardiStore === 'Bacardi'
                                ? 'after:absolute after:w-full after:h-1 after:left-0 after:bottom-[-20px] after:bg-secondary'
                                : ''
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              localStorage.setItem(
                                'BacardiSelectedStore',
                                'Bacardi',
                              );
                              document.cookie =
                                'BacardiSelectedStore=Bacardi; path=/';
                              // setCookie(
                              //   __Cookie.BacardiSelectedStore,
                              //   'Bacardi',
                              //   365,
                              // );
                              setSelectedBacardiStore('Bacardi');
                              window.location.replace('/index.html');
                            }}
                          >
                            <NxtImage
                              src='/bacardi/logo.png'
                              useNextImage={false}
                              alt='Bacardi'
                              isStatic={true}
                              className={`max-h-[80px] w-auto  ${
                                selectedBacardiStore === 'GreyGoose'
                                  ? 'opacity-30'
                                  : ''
                              }`}
                            />
                          </a>
                        </div>
                        <div className='relative'>
                          <div
                            className={`${
                              selectedBacardiStore === 'GreyGoose'
                                ? 'after:absolute after:w-full after:h-1 after:left-0 after:bottom-[-20px] after:bg-secondary-hover'
                                : ''
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              localStorage.setItem(
                                'BacardiSelectedStore',
                                'GreyGoose',
                              );
                              document.cookie =
                                'BacardiSelectedStore=GreyGoose; path=/';
                              // setCookie(
                              //   __Cookie.BacardiSelectedStore,
                              //   'GreyGoose',
                              //   365,
                              // );
                              setSelectedBacardiStore('GreyGoose');
                              window.location.replace('/home/GreyGoose');
                            }}
                          >
                            <NxtImage
                              useNextImage={false}
                              alt='Grey-Goose'
                              isStatic={true}
                              src='/grey-goose/greygoose-logo.png'
                              className={`max-h-[80px] w-auto  ${
                                selectedBacardiStore !== 'GreyGoose'
                                  ? 'opacity-30'
                                  : ''
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                      <div className='flex items-center lg:hidden space-x-3'>
                        <MenuIcon />
                        <SearchBar />
                      </div>
                      <div className='relative lg:hidden'>
                        <a
                          className={` ${
                            selectedBacardiStore === 'Bacardi'
                              ? 'bg-primary after:absolute after:w-full after:h-1 after:left-0 after:bottom-[-20px] after:bg-secondary'
                              : ''
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            localStorage.setItem(
                              'BacardiSelectedStore',
                              'Bacardi',
                            );
                            document.cookie =
                              'BacardiSelectedStore=Bacardi; path=/';
                            // setCookie(
                            //   __Cookie.BacardiSelectedStore,
                            //   'Bacardi',
                            //   365,
                            // );
                            setSelectedBacardiStore('Bacardi');
                            window.location.replace('/index.html');
                          }}
                        >
                          <NxtImage
                            useNextImage={false}
                            alt=''
                            isStatic={true}
                            src='bacardi/logo.png'
                            className={`h-auto w-auto  ${
                              selectedBacardiStore === 'GreyGoose'
                                ? 'opacity-30'
                                : ''
                            }`}
                          />
                        </a>
                      </div>
                      <div className='relative lg:hidden'>
                        <div
                          className={`${
                            selectedBacardiStore === 'GreyGoose'
                              ? 'after:absolute after:w-full after:h-1 after:left-0 after:bottom-[-20px] after:bg-secondary'
                              : ''
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            localStorage.setItem(
                              'BacardiSelectedStore',
                              'GreyGoose',
                            );
                            document.cookie =
                              'BacardiSelectedStore=GreyGoose; path=/';
                            // setCookie(
                            //   __Cookie.BacardiSelectedStore,
                            //   'GreyGoose',
                            //   365,
                            // );
                            setSelectedBacardiStore('GreyGoose');
                            window.location.replace('/home/GreyGoose');
                          }}
                        >
                          <NxtImage
                            useNextImage={false}
                            alt=''
                            isStatic={true}
                            src='grey-goose/greygoose-logo.png'
                            className={`h-auto w-auto  ${
                              selectedBacardiStore !== 'GreyGoose'
                                ? 'opacity-30'
                                : ''
                            }`}
                          />
                        </div>
                      </div>
                      <div className='flex items-center justify-end lg:hidden'>
                        <div className='flex items-center'>
                          <div className='flex items-center space-x-3'>
                            <LoginIcon />
                            <LoggedInMenu />
                            <MyCartIcon />
                          </div>
                        </div>
                      </div>
                    </div>
                    {view === 'MOBILE' && <SearchBar screen={'MOBILE'} />}
                  </div>
                </nav>
              </header>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MiddleHeader;
