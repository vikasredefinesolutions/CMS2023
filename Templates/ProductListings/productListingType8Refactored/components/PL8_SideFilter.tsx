import { capitalizeFirstLetter } from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Link,
} from '@mui/material';
import {
  FilterType,
  _CheckedFilter,
} from '@templates/ProductListings/ProductListingType';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';

interface _Props {
  filters: FilterType;
  checkedFilters: Array<_CheckedFilter>;
  pageId: number;
  slug: string;
}

const PL8_SideFilters: React.FC<_Props> = ({
  filters,
  checkedFilters,
  pageId,
  slug,
}) => {
  const storeCode = useTypedSelector_v2((state) => state.store.code);
  const router = useRouter();
  const { setShowLoader } = useActions_v2();

  const [openFilters, setOpenFilters] = useState<boolean>(false);
  let route = router.asPath.split('.')[0].replace('.html', '').replace('/', '');

  function removeDuplicates(arr: string[]) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }
  const updateFilter = (
    filterOption: Array<{
      name: string;
      value: string;
    }>,
  ) => {
    const nameArray = removeDuplicates(filterOption.map((res) => res.name));
    const valueArray: string[] = [];
    nameArray.forEach((name) => {
      const filteredValue = filterOption.filter(
        (filter) => filter.name === name,
      );
      const filter = filteredValue.map((res) => res.value).join('~');
      valueArray.push(filter);
    });

    const sort = router.query['sort'];

    // const sortQuery = sort
    //   ? `?sort=${sort}&page=${router.query?.page || 1}`
    //   : `?page=${router.query?.page || 1}`;
    const sortQuery = sort ? `?sort=${sort}` : ``;

    if (nameArray.length > 0 && valueArray.length > 0) {
      const parameters = nameArray.join(',');
      const parametersValue = valueArray.join(',');

      const url = `/${parameters}/${parametersValue}/${pageId}/${slug}.html${sortQuery}`;
      router.replace(url);
      setShowLoader(true);
      return;
    }

    router.replace(`/${slug}.html${sortQuery}`);
  };

  const handleChange = (name: string, value: string, checked: boolean) => {
    const index = checkedFilters.findIndex(
      (filter: { name: string; value: string }) =>
        filter.name === name && filter.value === value,
    );
    const newArray = [...checkedFilters];
    if (index < 0) {
      if (checked) {
        newArray.push({
          name,
          value,
        });
      }
    } else if (!checked) {
      newArray.splice(index, 1);
    }

    updateFilter(newArray);
  };

  const clearFilterSection = (name: string) => {
    const modifiedFilters = checkedFilters.filter(
      (filter) => filter.name !== name,
    );
    updateFilter(modifiedFilters);
  };

  if (filters.length === 0) return null;
  return (
    <div className='bg-white'>
      <div
        onClick={() => setOpenFilters((prev) => !prev)}
        className='lg:hidden border-b border-b-neutral-300 p-2 sticky top-0 left-0 bg-primary flex items-center justify-between text-[#ffffff]'
      >
        <div className='text-lg font-semibold text-[#ffffff]'>Filters</div>
        <a href='javascript:void(0);' className='inline-flex'>
          <span className='material-symbols-outlined'>
            {openFilters ? 'remove' : 'add'}
          </span>
        </a>
      </div>
      {openFilters && (
        <div className='relative '>
          <div className={'pt-[16px] pb-[16px]'}>
            <div className={'mt-[0px] filter-box filter-type'}>
              <div>
                {filters &&
                  filters.map((filter, index) => (
                    <div
                      key={index}
                      className={'pt-[16px] first:pt-[0px] relative'}
                    >
                      {checkedFilters.find(
                        (flt) => flt.name === filter.label,
                      ) && (
                        <a
                          href='javascript:void(0);'
                          className='absolute z-10 p-[7px] -top-1.5 right-10 text-[12px] text-anchor hover:text-anchor-hover'
                          onClick={() => clearFilterSection(filter.label)}
                        >
                          RESET
                        </a>
                      )}
                      <Accordion
                        defaultExpanded={true}
                        style={{
                          background: '#ffffff',
                          boxShadow: 'none',
                        }}
                      >
                        <AccordionSummary
                          expandIcon={
                            <svg
                              className='w-8 h-8 shrink-0 fill-current text-gray-400 group-hover:text-gray-500 rotate-180'
                              viewBox='0 0 32 32'
                            >
                              <path d='M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z'></path>
                            </svg>
                          }
                          aria-controls='panel1a-content'
                          id='panel1a-header'
                          className='flex items-center justify-between w-full h-5 group !mb-[10px] min-h-[auto]'
                        >
                          <div className='text-sub-text font-semibold text-[#000000] block uppercase'>
                            {filter.label === 'Color' || filter.label === 'Size'
                              ? `Select ${filter.label}`
                              : filter.label}
                          </div>
                        </AccordionSummary>
                        <AccordionDetails className='text-[15px] tracking-[.1em]'>
                          <ul
                            className={
                              filter.label === 'Color'
                                ? 'flex flex-wrap items-center gap-x-1.5 gap-y-2 pb-4 pt-2'
                                : filter.label === 'Category'
                                ? 'ml-0 w-full'
                                : 'pb-2 pt-2 space-y-1.5'
                            }
                          >
                            {filter.options.map((option, ind) => {
                              const checked =
                                checkedFilters.findIndex(
                                  (res: { name: string; value: string }) =>
                                    res.name === filter.label &&
                                    res.value === option.name,
                                ) > -1;

                              return (
                                <Fragment key={ind}>
                                  {option.name || option.colorCode ? (
                                    filter.label === 'Color' ? (
                                      <li
                                        className={`w-8 h-8 border-2 hover:border-secondary p-0.5 cursor-pointer ${
                                          checked && 'border-secondary'
                                        }`}
                                        onClick={() => {
                                          handleChange(
                                            filter.label,
                                            option.name,
                                            !checked,
                                          );
                                        }}
                                        title={option.name}
                                      >
                                        <div
                                          className='w-full h-full'
                                          style={{
                                            background: option.colorCode,
                                          }}
                                        ></div>
                                      </li>
                                    ) : filter.label === 'Category' ? (
                                      <li key={ind} className='w-full py-[1px]'>
                                        <Link
                                          key={option.name}
                                          id={option.name}
                                          className={`flex items-center !text-black !no-underline cursor-pointer ${
                                            route === option.sename
                                              ? '!font-bold'
                                              : ''
                                          }`}
                                          href={`/${option.sename}.html`}
                                        >
                                          <span className='material-icons-outlined'>
                                            {option.subrows &&
                                            option.subrows.length > 0 &&
                                            index === 0
                                              ? 'expand_more'
                                              : 'chevron_right'}
                                          </span>
                                          {capitalizeFirstLetter(option.name)}(
                                          {option.productCount})
                                        </Link>
                                        {option.subrows &&
                                          router.asPath !=
                                            '/accessories.html' &&
                                          option.subrows.length > 0 && (
                                            <ul className='ml-[10px]'>
                                              {option.subrows?.map((subrow) => (
                                                <li
                                                  key={subrow.id}
                                                  className='w-full py-0 flex items-center'
                                                >
                                                  {' '}
                                                  <Link
                                                    key={subrow.name}
                                                    href={`/${subrow.sename}.html`}
                                                    className={`flex items-center !text-black !no-underline cursor-pointer ${
                                                      route === subrow.sename
                                                        ? '!font-bold'
                                                        : ''
                                                    }`}
                                                  >
                                                    <>
                                                      <span className='material-icons-outlined'>
                                                        {' '}
                                                        chevron_right
                                                      </span>
                                                      <span>
                                                        {capitalizeFirstLetter(
                                                          subrow.name,
                                                        )}{' '}
                                                        ({subrow.productCount})
                                                      </span>
                                                    </>
                                                  </Link>
                                                </li>
                                              ))}
                                            </ul>
                                          )}
                                      </li>
                                    ) : (
                                      <li
                                        className='flex items-center gap-x-1.5'
                                        key={ind}
                                      >
                                        <input
                                          id={`${option.name}-${ind}`}
                                          name={filter.label}
                                          value={option.name}
                                          checked={checked}
                                          type='checkbox'
                                          onChange={(e) => {
                                            const { name, value, checked } =
                                              e.target;
                                            handleChange(name, value, checked);
                                          }}
                                          className='h-[16px] w-[16px] border-2 border-black rounded text-[#003a70] focus:ring-[#003a70] focus-visible:border-0'
                                        />
                                        {option.label === 'Size' ||
                                        option.label === 'Brand' ||
                                        option.label === 'Price Range' ? (
                                          <label
                                            htmlFor={`${option.name}-${ind}`}
                                            className='text-black cursor-pointer'
                                          >
                                            {capitalizeFirstLetter(option.name)}
                                          </label>
                                        ) : (
                                          <label
                                            htmlFor={`${option.name}-${ind}`}
                                            className='text-black cursor-pointer'
                                          >
                                            {capitalizeFirstLetter(option.name)}{' '}
                                            ({option?.productCount})
                                          </label>
                                        )}
                                        {/* <label
                                      htmlFor={`${option.name}-${ind}`}
                                      className='text-black'
                                    >
                                      {capitalizeFirstLetter(option.name)} (
                                      {option?.productCount})
                                    </label> */}
                                      </li>
                                    )
                                  ) : null}
                                </Fragment>
                              );
                            })}
                          </ul>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='hidden lg:block'>
        <div className={'pt-[16px] pb-[16px] bg-white '}>
          <div className={'mt-[0px] filter-box filter-type'}>
            <div>
              {filters &&
                filters.map((filter, index) => (
                  <div
                    key={index}
                    className={'mt-[16px] first:mt-[0px] relative'}
                  >
                    {checkedFilters.find(
                      (flt) => flt.name === filter.label,
                    ) && (
                      <a
                        href='javascript:void(0);'
                        className='absolute z-10 p-[7px] -top-1.5 right-10 text-[12px] text-anchor hover:text-anchor-hover'
                        onClick={() => clearFilterSection(filter.label)}
                      >
                        {' '}
                        RESET
                      </a>
                    )}

                    <Accordion
                      defaultExpanded={true}
                      style={{
                        background: '#ffffff',
                        boxShadow: 'none',
                      }}
                    >
                      <AccordionSummary
                        expandIcon={
                          <svg
                            className='w-8 h-8 shrink-0 fill-current text-gray-400 group-hover:text-gray-500 rotate-180'
                            viewBox='0 0 32 32'
                          >
                            <path d='M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z'></path>
                          </svg>
                        }
                        aria-controls='panel1a-content'
                        id='panel1a-header'
                        className='flex items-center justify-between w-full h-5 group !mb-[10px] min-h-[auto]'
                      >
                        <div className='text-sub-text font-semibold text-[#000000] block uppercase'>
                          {filter.label === 'Color' || filter.label === 'Size'
                            ? `Select ${filter.label}`
                            : filter.label}
                        </div>
                      </AccordionSummary>

                      <AccordionDetails className='text-[15px] tracking-[.1em]'>
                        <ul
                          className={
                            filter.label === 'Color'
                              ? 'flex flex-wrap items-center gap-x-1.5 gap-y-2 pb-4 pt-2'
                              : filter.label === 'Category'
                              ? 'ml-0 w-full'
                              : 'pb-2 pt-2 space-y-1.5'
                          }
                        >
                          {filter.options.map((option, ind) => {
                            const checked =
                              checkedFilters.findIndex(
                                (res: { name: string; value: string }) =>
                                  res.name === filter.label &&
                                  res.value === option.name,
                              ) > -1;

                            return (
                              <Fragment key={ind}>
                                {option.productCount > 0 &&
                                (option.name || option.colorCode) ? (
                                  filter.label === 'Color' ? (
                                    <li
                                      className={`w-8 h-8 border-2 hover:border-secondary p-0.5 cursor-pointer ${
                                        checked && 'border-secondary'
                                      }`}
                                      onClick={() => {
                                        handleChange(
                                          filter.label,
                                          option.name,
                                          !checked,
                                        );
                                      }}
                                      title={option.name}
                                    >
                                      <div
                                        className='w-full h-full'
                                        style={{
                                          background: option.colorCode,
                                        }}
                                      ></div>
                                    </li>
                                  ) : filter.label === 'Category' ? (
                                    <li key={ind} className='w-full py-[1px]'>
                                      <Link
                                        key={option.name}
                                        id={option.name}
                                        className={`flex items-center !text-black !no-underline cursor-pointer ${
                                          route === option.sename
                                            ? '!font-bold'
                                            : ''
                                        }`}
                                        href={`/${option.sename}.html`}
                                      >
                                        <span className='material-icons-outlined'>
                                          {option.subrows &&
                                          option.subrows.length > 0 &&
                                          route === option.sename
                                            ? 'expand_more'
                                            : 'chevron_right'}
                                        </span>
                                        {capitalizeFirstLetter(option.name)}(
                                        {option.productCount})
                                      </Link>
                                      {option.subrows &&
                                        option.sename &&
                                        router.asPath != '/accessories.html' &&
                                        route.includes(option.sename) &&
                                        option.subrows.length > 0 && (
                                          <ul className='ml-[10px]'>
                                            {option.subrows?.map((subrow) => {
                                              if (subrow.productCount > 0) {
                                                return (
                                                  <li
                                                    key={subrow.id}
                                                    className='w-full py-0 flex items-center'
                                                  >
                                                    {' '}
                                                    <Link
                                                      key={subrow.name}
                                                      href={`/${subrow.sename}.html`}
                                                      className={`flex items-center !text-black !no-underline cursor-pointer ${
                                                        route === subrow.sename
                                                          ? '!font-bold'
                                                          : ''
                                                      }`}
                                                    >
                                                      <>
                                                        <span className='material-icons-outlined'>
                                                          {' '}
                                                          chevron_right
                                                        </span>
                                                        <span>
                                                          {capitalizeFirstLetter(
                                                            subrow.name,
                                                          )}{' '}
                                                          ({subrow.productCount}
                                                          )
                                                        </span>
                                                      </>
                                                    </Link>
                                                  </li>
                                                );
                                              }
                                            })}
                                          </ul>
                                        )}
                                    </li>
                                  ) : (
                                    <li
                                      className='flex items-center gap-x-1.5'
                                      key={ind}
                                    >
                                      <input
                                        id={`${option.name}-${ind}`}
                                        name={filter.label}
                                        value={option.name}
                                        checked={checked}
                                        type='checkbox'
                                        onChange={(e) => {
                                          const { name, value, checked } =
                                            e.target;
                                          handleChange(name, value, checked);
                                        }}
                                        className='h-[16px] w-[16px] border-2 border-black rounded text-[#003a70] focus:ring-[#003a70] focus-visible:border-0'
                                      />
                                      {option.label === 'Size' ||
                                      option.label === 'Brand' ||
                                      option.label === 'Price Range' ? (
                                        <label
                                          htmlFor={`${option.name}-${ind}`}
                                          className='text-black cursor-pointer'
                                        >
                                          {capitalizeFirstLetter(option.name)}
                                        </label>
                                      ) : (
                                        <label
                                          htmlFor={`${option.name}-${ind}`}
                                          className='text-black cursor-pointer'
                                        >
                                          {capitalizeFirstLetter(option.name)} (
                                          {option?.productCount})
                                        </label>
                                      )}
                                    </li>
                                  )
                                ) : null}
                              </Fragment>
                            );
                          })}
                        </ul>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PL8_SideFilters;
