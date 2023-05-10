import { __pagesText } from '@constants/pages.text';
import { capitalizeFirstLetter } from '@helpers/common.helper';
import {
  FilterChangeHandler,
  FilterType,
  _CheckedFilter,
} from '@templates/ProductListings/ProductListingType';
import Link from 'next/link';
import { Fragment } from 'react';

const SideFilter = ({
  filters,
  handleChange,
  checkedFilters,
}: {
  filters: FilterType;
  handleChange: FilterChangeHandler;
  checkedFilters: Array<_CheckedFilter>;
}) => {
  return (
    <div className='pl-[16px] pr-[16px] pt-[16px] pb-[16px] bg-light-gray'>
      <form className='mt-[0px] filter-box filter-type'>
        <div>
          {filters &&
            filters.map((filter, index) => (
              <>
                <div className='py-[16px]'>
                  <div className='flex items-center justify-between w-full group relative mb-[12px] pb-[10px] after:border-b after:border-gray-border after:h-[1px] after:w-[50px] after:absolute after:top-full'>
                    <span className='text-sub-text'>{filter.label}</span>
                  </div>
                  <div className='text-default-text my-[5px]'>
                    <ul
                      className={
                        filter.label === 'Color'
                          ? 'flex flex-wrap gap-2.5'
                          : 'space-y-3'
                      }
                    >
                      {filter.options.map((val, index) => {
                        const checked =
                          checkedFilters.findIndex(
                            (res: { name: string; value: string }) =>
                              res.name === filter.label &&
                              res.value === val.name,
                          ) > -1;
                        return (
                          <Fragment key={index}>
                            {val.name || val.colorCode ? (
                              filter.label === 'Color' ? (
                                <li
                                  className={`flex items-center justify-center w-[30px] h-[30px] cursor-pointer p-[1px] border border-gray-border hover:border-primary  ${
                                    checked && 'border-secondary'
                                  }`}
                                  title={val.name}
                                >
                                  {' '}
                                  <div
                                    className={` w-full h-full`}
                                    style={{ backgroundColor: val.colorCode }}
                                    onClick={() => {
                                      handleChange(
                                        filter.label,
                                        val.name,
                                        !checked,
                                      );
                                    }}
                                  ></div>
                                </li>
                              ) : filter.label === 'Category' ? (
                                <li key={index} className='w-full py-0'>
                                  <Link
                                    key={val.name}
                                    id={val.name}
                                    className='flex items-center !text-black font-bold !no-underline'
                                    href={`/${val.sename}.html`}
                                  >
                                    <span className='material-icons-outlined'>
                                      {val.subrows
                                        ? 'chevron_right'
                                        : 'expand_more'}
                                    </span>
                                    {capitalizeFirstLetter(val.name)}(
                                    {val.productCount})
                                  </Link>
                                  {val.subrows && val.subrows.length > 0 && (
                                    <ul className='ml-3'>
                                      {val.subrows?.map((subrow) => (
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
                                              {
                                                __pagesText.productListing
                                                  .rightArrowIcon
                                              }
                                            </span>
                                            {capitalizeFirstLetter(subrow.name)}{' '}
                                            ({subrow.productCount})
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </li>
                              ) : (
                                <li
                                  className='flex items-center cursor-pointer'
                                  key={index}
                                >
                                  <input
                                    id={`${val.name}-${index}`}
                                    name={filter.label}
                                    value={val.name}
                                    checked={checked}
                                    type='checkbox'
                                    onChange={(e) => {
                                      const { name, value, checked } = e.target;
                                      handleChange(name, value, checked);
                                    }}
                                    className='h-4 w-4 border-gray-300 rounded text-indigo-600'
                                  />

                                  <label
                                    htmlFor={`${val.name}-${index}`}
                                    className='ml-[10px]'
                                  >
                                    {capitalizeFirstLetter(val.name)}
                                  </label>
                                  {/* <label
                                  htmlFor={`${val.name}-${index}`}
                                  className='text-black'
                                >
                                  {capitalizeFirstLetter(val.name)} (
                                  {val?.productCount})
                                </label> */}
                                </li>
                              )
                            ) : null}
                          </Fragment>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </>
            ))}
        </div>
      </form>
    </div>
  );
};

export default SideFilter;
