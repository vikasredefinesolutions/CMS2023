import Link from 'next/link';
import { _Sitemap_ExpectedProps } from '../siteMapTypes';

export const SiteMap_Type2: React.FC<_Sitemap_ExpectedProps> = ({
  brandItems,
  categories,
}) => {
  if (!categories) {
    return <>No data found</>;
  }

  return (
    <>
      {categories && (
        <div className=''>
          <div className='container mx-auto mt-6'>
            <div className=''>
              <div className='text-2xl-text text-center mb-[10px]'>
                Category
              </div>
              <div className='pl-[20px] text-sm tracking-[1.4px] text-center'>
                <div className='inline-block text-left'>
                  <ul className='relative before:bg-primary before:w-px before:absolute before:left-[-20px] before:top-2.5 before:bottom-2.5'>
                    {categories &&
                      categories.map((cat, index) => {
                        return (
                          <li
                            className='relative ml-[35px] before:bg-primary before:h-px before:w-[38px] before:absolute before:left-[-55px] before:top-[9px] my-[15px]'
                            key={index}
                          >
                             <Link href={`${cat.sename}.html`}>
                              <a className='text-default hover:text-tertiary before:absolute before:bg-primary before:rounded-full before:w-[4px] before:h-[4px] before:left-[-20px] before:inline-block before:top-2'>
                                {cat.name}
                              </a>
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
