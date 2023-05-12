import { paths } from '@constants/paths.constant';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { _BreadCrumbProps } from '../breadcrumb';

const BreadCrumb_Type3: NextPage<_BreadCrumbProps> = ({
  pageType,
  breadCrumbs,
}) => {
  const router = useRouter();
  const product = useTypedSelector_v2((state) => state.product.product);

  return (
    <>
      <div className='container mx-auto'>
        <div className='bg-white px-[10px] py-[5px]'>
          <nav
            className='flex bg-light-gray px-[10px] py-[5px]'
            aria-label='Breadcrumb'
          >
            <ol className='inline-flex items-center space-x-1 md:space-x-3 text-sm'>
              <>
                {breadCrumbs.map((item, index) => (
                  <li
                    key={index}
                    className={` ${index > 0 && 'inline-flex items-center'} `}
                    aria-current='page'
                  >
                    <Link href={item.url} className='inline-flex items-center'>
                      {index !== 0 ? (
                        <div className='flex items-center'>
                          <span className='material-icons-outlined text-base leading-none'>
                            chevron_right
                          </span>
                          <div
                            className={` ml-[5px] md:ml-[10px] ${
                              index == breadCrumbs.length - 1
                                ? 'ml-[6px] text-gray-text'
                                : ' text-quaternary hover:text-quaternary-hover'
                            } `}
                          >
                            {item.name}
                          </div>
                        </div>
                      ) : (
                        <a
                          href={paths.HOME}
                          className='inline-flex items-center font-medium text-quaternary hover:text-quaternary-hover'
                        >
                          <svg
                            className='w-[16px] h-[16px]'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z'></path>
                          </svg>
                        </a>
                      )}
                    </Link>
                  </li>
                ))}
              </>
            </ol>
          </nav>
          {/* {pageType === 'product' && (
              <div className='text-center w-auto product-brand-logo'>
                <NxtImage
                  src={product.brand?.url || ''}
                  title={product.brand?.name || ''}
                  className='inline-block'
                  // height={100}
                  // width={100}
                  alt=''
                  useNextImage={false}
                />
              </div>
            )} */}
        </div>
      </div>
    </>
  );
};

export default BreadCrumb_Type3;
