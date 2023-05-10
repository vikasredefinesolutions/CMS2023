import NxtImage from '@appComponents/reUsable/Image';
import { __pagesText } from '@constants/pages.text';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { _BreadCrumbProps } from '../breadcrumb';

const BreadCrumb_Type1: NextPage<_BreadCrumbProps> = ({
  pageType,
  breadCrumbs,
}) => {
  const router = useRouter();
  const product = useTypedSelector_v2((state) => state.product.product);
  return (
    <>
      <div className='container mx-auto'>
        <div className='border-b border-b-gray-border mb-[10px]'>
          <div className='flex flex-wrap justify-between py-[15px]'>
            <nav
              className='flex flex-wrap items-center text-small-text'
              aria-label='Breadcrumb'
            >
              {pageType === 'product' && (
                <div
                  className='hidden text-anchor hover:text-anchor-hover cursor-pointer lg:inline-block mr-4 !no-underline'
                  onClick={() => router.push('/')}
                >
                  &lt;&lt; {__pagesText.BreadCrumbs.back}
                </div>
              )}
              <ol className='inline-flex items-center'>
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
            {pageType === 'product' && (
              <div className='text-center w-auto product-brand-logo '>
                <Link href={`/${product.brand?.name}.html`}>
                  <a>
                    <NxtImage
                      src={product.brand?.url || ''}
                      title={product.brand?.name || ''}
                      className='inline-block'
                      // height={100}
                      // width={100}
                      alt=''
                      useNextImage={false}
                    />
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BreadCrumb_Type1;
