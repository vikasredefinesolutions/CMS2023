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
import { Fragment } from 'react';
const SideFiltersTypeFive = ({
  filters,
  handleChange,
  checkedFilters,
}: {
  filters: FilterType;
  handleChange: FilterChangeHandler;
  checkedFilters: Array<_CheckedFilter>;
}) => {
  const router = useRouter();
  let route = router.asPath.split('.')[0].replace('.html', '').replace('/', '');
  console.log(route);

  return (
    // <div className='relative'>
    <div className={'pl-[16px] pr-[16px] pt-[16px] pb-[16px] bg-light-gray'}>
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
                    className='flex items-center justify-between w-full group mb-[4px]'
                  >
                    <div className='text-medium-text font-semibold text-tertiary block uppercase'>
                      {filter.label}
                    </div>
                  </AccordionSummary>
                  <AccordionDetails className='text-small-text !no-underline'>
                    <ul
                      className={
                        filter.label === 'Color'
                          ? 'flex flex-wrap items-center gap-x-1.5 gap-y-2 pt-[8px] pb-[16px]'
                          : filter.label === 'Category'
                          ? ' w-full'
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
                                  className={`w-[32px] h-[32px] border-2  hover:border-primary p-[2px] ${
                                    checked
                                      ? 'relative border-primary'
                                      : 'border-secondary'
                                  }`}
                                  // style={{
                                  //   background: option.colorCode,
                                  // }}
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
                                <li
                                  key={ind}
                                  className='w-full pt-[2px] pb-[2px]'
                                >
                                  <Link
                                    key={option.name}
                                    id={option.name}
                                    className={`flex items-center !text-black !no-underline cursor-pointer`}
                                    href={`/${option.sename}.html`}
                                  >
                                    <a
                                      className={`font-semibold flex items-center text-tertiary text-small-text !no-underline ${
                                        route === option.sename
                                          ? '!font-bold'
                                          : ''
                                      }`}
                                    >
                                      <span className='material-icons-outlined'>
                                        {option.subrows
                                          ? 'chevron_right'
                                          : 'expand_more'}
                                      </span>
                                      {capitalizeFirstLetter(option.name)}(
                                      {option.productCount})
                                    </a>
                                  </Link>
                                  {option.subrows && (
                                    <ul className='ml-3'>
                                      {option.subrows?.map((subrow) => (
                                        <li
                                          key={subrow.id}
                                          className='flex items-center !text-black !no-underline'
                                        >
                                          {' '}
                                          <Link
                                            key={subrow.name}
                                            href={`/${subrow.sename}.html`}
                                            className='!text-black !no-underline'
                                          >
                                            <span className='material-icons-outlined'>
                                              {' '}
                                              chevron_right
                                            </span>
                                            {capitalizeFirstLetter(
                                              subrow.name,
                                            )}{' '}
                                            ({subrow.productCount})
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
                                      const { name, value, checked } = e.target;
                                      handleChange(name, value, checked);
                                    }}
                                    className='h-[13px] w-[13px] border-2 border-black rounded text-[#003a70] focus:ring-[#003a70] focus-visible:border-0'
                                  />
                                  {option.label === 'Size' ||
                                  option.label === 'Brand' ||
                                  option.label === 'Price Range' ? (
                                    <label
                                      htmlFor={`${option.name}-${ind}`}
                                      className='text-black'
                                    >
                                      {capitalizeFirstLetter(option.name)}
                                    </label>
                                  ) : (
                                    <label
                                      htmlFor={`${option.name}-${ind}`}
                                      className='text-black'
                                    >
                                      {capitalizeFirstLetter(option.name)} (
                                      {option?.productCount})
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
    // </div>
  );
};

export default SideFiltersTypeFive;
