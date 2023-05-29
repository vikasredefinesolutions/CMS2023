import { useTypedSelector_v2 } from '@hooks_v2/index';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { _BreadCrumbProps } from '../breadcrumb';

const BreadCrumb_Type4: NextPage<_BreadCrumbProps> = ({
  pageType,
  breadCrumbs,
}) => {
  const router = useRouter();
  const product = useTypedSelector_v2((state) => state.product.product);

  return (
    <>
      <div className='bg-drak-gray'>
        <div className='container mx-auto '>
          <div className='flex flex-wrap justify-between py-[10px] bg-drak-gray'>
            <nav
              className='flex flex-wrap items-center text-extra-small-text'
              aria-label='Breadcrumb'
            >
              <ol className='inline-flex items-center'>
                <>
                  {breadCrumbs.map((item, index) => (
                    <li
                      key={index}
                      className={` ${index > 0 && 'inline-flex items-center'} `}
                      aria-current='page'
                    >
                      <Link
                        href={item.url}
                        className='inline-flex items-center'
                      >
                        {
                          <div className='flex items-center'>
                            {index > 0 && (
                              <span className='material-icons-outlined text-sm'>
                                east
                              </span>
                            )}
                            <div
                              className={` ${
                                index == 0
                                  ? 'inline-flex items-center font-semibold'
                                  : index !== 0 &&
                                    index == breadCrumbs.length - 1
                                  ? 'ml-[6px] text-gray-text font-semibold'
                                  : 'ml-[6px] font-semibold'
                              } `}
                            >
                              {item.name}
                            </div>
                          </div>
                        }
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
      </div>
    </>
  );
};

export default BreadCrumb_Type4;
