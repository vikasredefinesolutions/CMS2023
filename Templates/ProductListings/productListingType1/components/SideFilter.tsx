import { capitalizeFirstLetter } from '@helpers/common.helper';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Link,
} from '@mui/material';
import {
  FilterChangeHandler,
  FilterType,
  _CheckedFilter,
} from '@templates/ProductListings/ProductListingType';
import { useRouter } from 'next/router';

import { Fragment, useState } from 'react';

const SideFilter = ({
  filters,
  handleChange,
  checkedFilters,
}: {
  filters: FilterType;
  handleChange: FilterChangeHandler;
  checkedFilters: Array<_CheckedFilter>;
}) => {
  const router = useRouter();
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  let route = router.asPath.split('.')[0].replace('.html', '').replace('/', '');

  return (
    <div>
      <div
        onClick={() => setOpenFilters((prev) => !prev)}
        className='lg:hidden border-b border-b-neutral-300 p-2 sticky top-0 left-0 bg-primary flex items-center justify-between text-[#ffffff]'
      >
        <div className='text-lg font-semibold text-[#ffffff]'>Filters</div>
        <a href='javascript:void(0);' className='inline-flex'>
          <span className='material-symbols-outlined mt-[5px]'>
            {openFilters ? 'remove' : 'add'}
          </span>
        </a>
      </div>
      {openFilters && (
        <div className='relative '>
          <div className={'pt-[16px] pb-[16px] bg-light-gray'}>
            <div className={'mt-[0px] filter-box filter-type'}>
              <div>
                {filters &&
                  filters.map((filter, index) => (
                    <div key={index} className={'pt-[16px] first:pt-[0px]'}>
                      <Accordion
                        defaultExpanded={true}
                        style={{
                          background: '#f3f4f6',
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
                          className='flex items-center justify-between w-full h-5 group mb-1 min-h-[auto]'
                        >
                          <div className='text-medium-text font-semibold text-[#000000] block uppercase'>
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
                                        style={{
                                          background: option.colorCode,
                                        }}
                                        onClick={() => {
                                          handleChange(
                                            filter.label,
                                            option.name,
                                            !checked,
                                          );
                                        }}
                                        title={option.name}
                                      ></li>
                                    ) : filter.label === 'Category' ? (
                                      <li key={ind} className='w-full py-[1px]'>
                                        <Link
                                          key={option.name}
                                          id={option.name}
                                          className={`flex items-center !text-black !no-underline cursor-pointer ${
                                            route === option.sename
                                              ? 'font-bold'
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
                                                        ? 'font-bold'
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
                                          className='h-[13px] w-[13px] border-2 border-black rounded text-[#003a70] focus:ring-[#003a70] focus-visible:border-0'
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
        <div className={'pt-[16px] pb-[16px] bg-light-gray'}>
          <div className={'mt-[0px] filter-box filter-type'}>
            <div>
              {filters &&
                filters.map((filter, index) => (
                  <div key={index} className={'pt-[16px] first:pt-[0px]'}>
                    <Accordion
                      defaultExpanded={true}
                      style={{
                        background: '#f3f4f6',
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
                        className='flex items-center justify-between w-full h-5 group mb-[10px] min-h-[auto]'
                      >
                        <div className='text-medium-text font-semibold text-[#000000] block uppercase'>
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
                                            ? 'font-bold'
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
                                        router.asPath != '/accessories.html' &&
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
                                                      ? 'font-bold'
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
                                        className='h-[13px] w-[13px] border-2 border-black rounded text-[#003a70] focus:ring-[#003a70] focus-visible:border-0'
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

export default SideFilter;
