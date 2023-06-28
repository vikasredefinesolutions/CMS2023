import { BACARDI, CYXTERA_CODE, UNITI_CODE } from '@constants/global.constant';
import { FilterChangeHandler, FilterType } from '@definations/productList.type';
import { capitalizeFirstLetter } from '@helpers/common.helper';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { _CheckedFilter } from '@templates/ProductListings/ProductListingType';
import { Fragment } from 'react';

const SideFiltersTypeThree = ({
  filters,
  handleChange,
  checkedFilters,
}: {
  filters: FilterType;
  handleChange: FilterChangeHandler;
  checkedFilters: Array<_CheckedFilter>;
}) => {
  const storeCode = useTypedSelector_v2((state) => state.store.code);

  return (
    <div
      className={` ${
        storeCode === BACARDI
          ? 'pb-[0] px-[0] border-none'
          : ' pb-[16px] px-[16px]'
      }  ${
        storeCode == CYXTERA_CODE || storeCode == UNITI_CODE ? '' : 'border'
      }`}
    >
      <form className='filter-box filter-type'>
        <div>
          {filters &&
            filters.map((filter, index) => (
              <>
                <div
                  className={`${
                    storeCode == UNITI_CODE ||
                    storeCode == CYXTERA_CODE ||
                    storeCode === BACARDI
                      ? 'pb-[16px]'
                      : 'py-[16px]'
                  }`}
                >
                  <div
                    className={`flex items-center justify-between w-full group relative mb-[12px]  ${
                      storeCode === BACARDI
                        ? ''
                        : storeCode == CYXTERA_CODE || storeCode == UNITI_CODE
                        ? ' pb-[10px] after:border-b after:border-gray-border after:h-[1px] after:w-[50px] after:absolute after:top-full'
                        : 'bg-[#ebebeb]'
                    }`}
                  >
                    <span
                      className={`text-[18px] px-[10px] ${
                        storeCode === BACARDI ? 'py-[2px]' : 'py-[7px]'
                      }`}
                    >
                      {filter.label}
                    </span>
                    {storeCode === BACARDI && (
                      <span
                        className='border border-b-2 mt-[2px] w-[60px] h-[2px] mb-[15px] absolute bottom-[-15px] left-[5%]'
                        style={{ backgroundColor: ' #000000' }}
                      >
                        &nbsp;
                      </span>
                    )}
                  </div>
                  <div className='text-xs mt-[15px] mb-[3px] px-[15px]'>
                    <ul
                      className={
                        filter.label === 'Color' || filter.label === 'Size'
                          ? 'flex flex-wrap gap-2.5'
                          : 'space-y-3'
                      }
                    >
                      {filter.options.map((val, index) => {
                        const checked =
                          checkedFilters.findIndex(
                            (res: { name: string; value: string }) =>
                              res.name.toLowerCase() ===
                                filter.label.toLowerCase() &&
                              res.value.toLowerCase() ===
                                val.name.toLowerCase(),
                          ) > -1;
                        return (
                          <Fragment key={index}>
                            {val.name || val.colorCode ? (
                              filter.label === 'Color' ||
                              filter.label == 'Size' ? (
                                <li
                                  className={`flex items-center justify-center w-[30px] h-[30px] cursor-pointer p-[1px] border border-gray-border hover:border-primary  ${
                                    checked && 'border-secondary'
                                  }`}
                                  title={val.name}
                                >
                                  {' '}
                                  <div
                                    className={` w-full h-full flex items-center justify-center`}
                                    style={
                                      filter.label == 'Size'
                                        ? { backgroundColor: val.colorCode }
                                        : {}
                                    }
                                    onClick={() => {
                                      handleChange(
                                        filter.label,
                                        val.name,
                                        !checked,
                                      );
                                    }}
                                  >
                                    {filter.label == 'Size' ? val.name : ''}
                                  </div>
                                </li>
                              ) : (
                                <>
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
                                        const { name, value, checked } =
                                          e.target;
                                        handleChange(name, value, checked);
                                      }}
                                      className='h-[16px] w-[16px] border-gray-300 rounded text-indigo-600'
                                    />

                                    <label
                                      htmlFor={`${val.name}-${index}`}
                                      className='ml-[10px]'
                                    >
                                      {capitalizeFirstLetter(val.name)}
                                    </label>
                                  </li>
                                </>
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

export default SideFiltersTypeThree;
