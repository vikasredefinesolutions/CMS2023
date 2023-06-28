import NxtImage from '@appComponents/reUsable/Image';
import { _Store } from '@configs/page.config';
import { __pagesText } from '@constants/pages.text';
import { paths } from '@constants/paths.constant';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { _BreadCrumbProps } from '../breadcrumb';

const BreadCrumb_Type2: NextPage<_BreadCrumbProps> = ({
  pageType,
  breadCrumbs,
}) => {
  const router = useRouter();
  const product = useTypedSelector_v2((state) => state.product.product);
  const [showBorderAndLogo, setShowBorderAndLogo] = useState<boolean>(false);
  const { view, code: storeCode } = useTypedSelector_v2((state) => state.store);
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
  return (
    <>
      <div className='container mx-auto'>
        <div className='flex flex-wrap justify-between pt-[15px] pb-[10px] border-b border-gray-border mb-[15px] breadcrumbs2'>
          <nav
            className='flex flex-wrap items-center text-extra-small-text'
            aria-label='Breadcrumb'
          >
            {' '}
            {showBorderAndLogo && (
              <div
                className='hidden text-anchor hover:text-anchor-hover cursor-pointer lg:inline-block mr-4 !no-underline'
                onClick={() => {
                  window.history.back();
                }}
              >
                &lt;&lt; {__pagesText.BreadCrumbs.back}
              </div>
            )}
            <ol className='inline-flex items-center flex-wrap gap-y-1'>
              <>
                {breadCrumbs.map((item, index) => (
                  <li
                    key={index}
                    className={`flex flex-wrap items-center gap-y-2 ${
                      index > 0 && 'pl-[6px]'
                    } `}
                    aria-current='page'
                  >
                    <div className='flex items-center'>
                      {index > 0 && <span className=' text-anchor'>/</span>}
                      <Link
                        href={item.url}
                        className='inline-flex items-center '
                      >
                        <a
                          className={`${
                            index == breadCrumbs.length - 1
                              ? 'ml-[6px] text-tertiary'
                              : 'ml-[6px] text-anchor hover:text-anchor-hover'
                          } `}
                        >
                          {item.name}
                        </a>
                      </Link>
                    </div>
                  </li>
                ))}
              </>
            </ol>
          </nav>
          {storeCode == _Store.type4 &&
            showBorderAndLogo &&
            view !== 'MOBILE' && (
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
    </>
  );
};

export default BreadCrumb_Type2;
