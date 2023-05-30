import { FilterChangeHandler, FilterType } from '@definations/productList.type';
import { capitalizeFirstLetter } from '@helpers/common.helper';
import { _CheckedFilter } from '@templates/ProductListings/ProductListingType';
import Link from 'next/link';
import { Fragment } from 'react';

const SideFiltersTypeTwo = ({
  filters,
  handleChange,
  checkedFilters,
  clearFilterSection,
}: {
  filters: FilterType;
  handleChange: FilterChangeHandler;
  checkedFilters: Array<_CheckedFilter>;
  clearFilterSection: (value: string) => void;
}) => {
  return (
    <div className='pb-[16px]'>
      <form className='filter-box filter-type'>
        <div>
          {filters &&
            filters.map((filter, index) =>
              filter.label !== 'Category' ? (
                <Fragment key={index}>
                  <div className='py-[16px]'>
                    <div className='flex items-center justify-between w-full group relative mb-[12px] pb-[10px] after:border-b after:border-gray-border after:h-[1px] after:w-[50px] after:absolute after:top-full'>
                      <span className='text-sub-text'>{filter.label}</span>
                      {checkedFilters.find(
                        (flt) => flt.name === filter.label,
                      ) && (
                        <a
                          href='javascript:void(0);'
                          className='p-[7px] text-extra-small-text text-anchor hover:text-anchor-hover'
                          onClick={() => clearFilterSection(filter.label)}
                        >
                          {' '}
                          RESET
                        </a>
                      )}
                    </div>
                    <div className='text-default-text my-[5px]'>
                      <ul
                        className={
                          filter.label === 'Color'
                            ? 'flex flex-wrap gap-2.5'
                            : 'space-y-2'
                        }
                      >
                        {filter.options.map((val, _index) => {
                          const checked =
                            checkedFilters.findIndex(
                              (res: { name: string; value: string }) =>
                                res.name === filter.label &&
                                res.value === val.name,
                            ) > -1;
                          return (
                            <Fragment key={`${index}${_index}`}>
                              {val.name || val.colorCode ? (
                                filter.label === 'Color' ? (
                                  <li
                                    className={`flex items-center justify-center w-[30px] h-[30px] cursor-pointer p-[1px] border border-gray-border ${
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
                                  <li
                                    key={`${index}${_index}`}
                                    className='w-full py-0'
                                  >
                                    <Link
                                      key={val.name}
                                      id={val.name}
                                      className='flex items-center !text-black font-bold !no-underline'
                                      href={`/${val.sename}.html`}
                                    >
                                      <div className='flex items-center cursor-pointer'>
                                        <span className='material-icons-outlined'>
                                          {val.subrows
                                            ? 'chevron_right'
                                            : 'expand_more'}
                                        </span>
                                        {capitalizeFirstLetter(val.name)}(
                                        {val.productCount})
                                      </div>
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
                                              <div className='flex items-center cursor-pointer'>
                                                <span className='material-icons-outlined'>
                                                  {' '}
                                                  chevron_right
                                                </span>
                                                {capitalizeFirstLetter(
                                                  subrow.name,
                                                )}{' '}
                                                ({subrow.productCount})
                                              </div>
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </li>
                                ) : (
                                  <li
                                    className='flex items-center cursor-pointer'
                                    key={`${index}${_index}`}
                                  >
                                    <input
                                      id={`${val.name}-${index}`}
                                      name={filter.label}
                                      value={val.name}
                                      checked={checked}
                                      type='checkbox'
                                      onChange={(e) => {
                                        const { name, value, checked } =
                                          e.target;
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
                </Fragment>
              ) : (
                <></>
              ),
            )}
        </div>
      </form>
    </div>
  );
};

export default SideFiltersTypeTwo;
