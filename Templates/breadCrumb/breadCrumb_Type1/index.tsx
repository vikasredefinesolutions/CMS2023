import NxtImage from '@appComponents/reUsable/Image';
import { storeBuilderTypeId } from '@configs/page.config';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { _BreadCrumbProps } from '../breadcrumb';
const BreadCrumb_Type1: NextPage<_BreadCrumbProps> = ({
  pageType,
  breadCrumbs,
}) => {
  const router = useRouter();
  // const showborderlineandlogo={pagetype=="product"||router.pathname=paths.REQUEST_CONSULTATION?"":""}
  const [showBorderAndLogo, setShowBorderAndLogo] = useState<boolean>(false);
  useEffect(() => {
    if (
      pageType == 'product' ||
      router.pathname == paths.REQUEST_CONSULTATION
    ) {
      setShowBorderAndLogo(true);
    } else {
      setShowBorderAndLogo(false);
    }
  }, [router, pageType]);
  const { view } = useTypedSelector_v2((state) => state.store);

  const product = useTypedSelector_v2((state) => state.product.product);
  const {
    id: storeId,
    storeTypeId,
  } = useTypedSelector_v2((state) => state.store);
  const store = useTypedSelector_v2((state) => state.store);

  return (
    <>
    {breadCrumbs.length > 0 && 
    <div className={`${store.storeTypeId === storeBuilderTypeId ? 'bg-tertiary' : ''}`}>
      <div className='container mx-auto'>
        <div
          className={`${
            showBorderAndLogo ? 'border-b border-b-gray-border mb-[10px]' : ''
          } `}
        >
          <div className='flex flex-wrap justify-between py-[5px]'>
            <nav
              className='flex flex-wrap items-center text-small-text'
              aria-label='Breadcrumb'
            >
              {(showBorderAndLogo && store.storeTypeId !== storeBuilderTypeId) && (
                <div
                  className='hidden text-anchor hover:text-anchor-hover cursor-pointer lg:inline-block mr-4 !no-underline'
                  onClick={() => {
                    window.history.back();
                  }}
                >
                  &lt;&lt; {__pagesText.BreadCrumbs.back}
                </div>
              )}
              <ol className='flex flex-wrap items-center gap-y-2'>
                <>
                  {breadCrumbs.map((item, index) => (
                    <li
                      key={index}
                      className={`inline-flex items-center ${
                        index > 0 && 'pl-[6px]'
                      } `}
                      aria-current='page'
                    >
                      <div className='flex items-center'>
                        {index > 0 && (
                          <span className='text-anchor !no-underline'>
                            &gt;
                          </span>
                        )}
                        <Link
                          href={item.url}
                          className='inline-flex items-center'
                        >
                          <a className='ml-[6px] text-anchor !no-underline'>
                            {item.name}
                          </a>
                        </Link>
                      </div>
                    </li>
                  ))}
                </>
              </ol>
            </nav>
            {showBorderAndLogo && view !== 'MOBILE' && (
              <div className='text-center w-auto product-brand-logo flex items-center justify-center '>
                <NxtImage
                  src={product.brand?.url3 || ''}
                  title={product.brand?.name || ''}
                  className='inline-block'
                  // height={100}
                  // width={100}
                  alt=''
                  useNextImage={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
      }
    </>
  );
};

export default BreadCrumb_Type1;
