import {
  BACARDI,
  BOSTONBEAR,
  CYXTERA_CODE,
  THD_STORE_CODE,
  UCA,
  UNITI_CODE,
  _Store_CODES,
} from '@constants/global.constant';
import { FilterType } from '@definations/productList.type';
import { capitalizeFirstLetter } from '@helpers/common.helper';
import { useActions_v2, useTypedSelector_v2 } from '@hooks_v2/index';
import { _CheckedFilter } from '@templates/ProductListings/ProductListingType';
import { useRouter } from 'next/router';
import { Fragment, useCallback } from 'react';

interface _Props {
  filters: FilterType;
  checkedFilters: Array<_CheckedFilter>;
  pageId: number;
  slug: string;
}

const PL3_SideFilters: React.FC<_Props> = ({
  filters,
  checkedFilters,
  pageId,
  slug,
}) => {
  const storeCode = useTypedSelector_v2((state) => state.store.code);
  const router = useRouter();
  const { setShowLoader } = useActions_v2();

  // const [openFilters, setOpenFilters] = useState<boolean>(false);
  // let route = router.asPath.split('.')[0].replace('.html', '').replace('/', '');

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

  const handleChange = (
    name: string,
    value: string,
    checked: boolean,
    seName?: string,
  ) => {
    if (name === 'Category') return router.push(`/${seName}.html`);
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

  const dontShowBrandFilters = useCallback(
    (label: string) =>
      storeCode !== _Store_CODES.UNITi &&
      storeCode !== BOSTONBEAR &&
      storeCode !== THD_STORE_CODE &&
      storeCode !== _Store_CODES.USAAPUNCHOUT &&
      storeCode !== BACARDI &&
      label === 'Brand',
    [storeCode, filters],
  );

  if (filters.length === 0) return null;

  return (
    <div
      className={` ${
        storeCode === BACARDI
          ? 'pb-[0] px-[0] border-none'
          : storeCode === THD_STORE_CODE ||
            storeCode === _Store_CODES.USAAPUNCHOUT
          ? 'pb-[16px] pr-[16px] pl-[16px]'
          : ' pb-[16px] lg:pr-[16px]'
      }  ${
        storeCode == CYXTERA_CODE ||
        storeCode == UNITI_CODE ||
        storeCode === BOSTONBEAR ||
        storeCode === UCA
          ? ''
          : 'border'
      }`}
    >
      <form className='filter-box filter-type'>
        <div>
          {filters &&
            filters.map((filter) => {
              if (
                filter.label.toLowerCase() == 'category' &&
                storeCode == BOSTONBEAR
              )
                return <></>;
              return (
                <>
                  {dontShowBrandFilters(filter.label) ? (
                    <></>
                  ) : (
                    <div
                      key={filter.label}
                      className={`${
                        storeCode == UNITI_CODE ||
                        storeCode == CYXTERA_CODE ||
                        storeCode === BACARDI ||
                        storeCode === BOSTONBEAR ||
                        storeCode === UCA
                          ? 'pb-[16px]'
                          : storeCode === THD_STORE_CODE ||
                            storeCode === _Store_CODES.USAAPUNCHOUT
                          ? 'pb-[16px] last:pb-[0px]'
                          : 'py-[16px]'
                      }`}
                    >
                      <div
                        className={`flex items-center justify-between w-full group relative mb-[12px]  ${
                          storeCode == CYXTERA_CODE ||
                          storeCode == UNITI_CODE ||
                          storeCode === BOSTONBEAR ||
                          storeCode === UCA ||
                          storeCode == BACARDI
                            ? ' pb-[10px] after:border-b after:border-gray-border after:h-[1px] after:w-[50px] after:absolute after:top-full'
                            : 'bg-[#ebebeb]'
                        }`}
                      >
                        <span
                          className={`${
                            storeCode === THD_STORE_CODE ||
                            storeCode === _Store_CODES.USAAPUNCHOUT
                              ? 'text-medium-text'
                              : 'text-sub-text'
                          } ${
                            storeCode === BACARDI
                              ? 'py-[2px] uppercase !font-[600]'
                              : storeCode === THD_STORE_CODE ||
                                storeCode === _Store_CODES.USAAPUNCHOUT
                              ? 'p-[7px]'
                              : 'py-[7px]'
                          }`}
                        >
                          {filter.label}
                        </span>
                        {/* {storeCode === BACARDI && (
                          <span
                            className='border border-b-2 mt-[2px] w-[60px] h-[2px] mb-[15px] absolute bottom-[-15px] left-[5%]'
                            style={{ backgroundColor: ' #000000' }}
                          >
                            &nbsp;
                          </span>
                        )} */}
                      </div>
                      <div className='text-md mt-[15px] mb-[3px]'>
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
                                      className={`flex items-center justify-center w-[30px] h-[30px] cursor-pointer p-[1px] ${
                                        (storeCode === THD_STORE_CODE ||
                                          storeCode ===
                                            _Store_CODES.USAAPUNCHOUT) &&
                                        filter.label == 'Size'
                                          ? 'border-2'
                                          : 'border-2'
                                      }  hover:border-black ${
                                        storeCode == BOSTONBEAR ||
                                        storeCode === THD_STORE_CODE ||
                                        storeCode === _Store_CODES.USAAPUNCHOUT
                                          ? 'bg-light-gray'
                                          : ''
                                      } ${
                                        checked
                                          ? 'border-black'
                                          : 'border-gray-border'
                                      } `}
                                      title={val.name}
                                    >
                                      {' '}
                                      <div
                                        className={` w-full h-full flex items-center justify-center`}
                                        style={
                                          filter.label == 'Color'
                                            ? { backgroundColor: val.colorCode }
                                            : {}
                                        }
                                        onClick={() => {
                                          handleChange(
                                            filter.label,
                                            val.name,
                                            !checked,
                                            val.sename,
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
                                        {val.productCount == 0 ? (
                                          <></>
                                        ) : (
                                          <>
                                            <input
                                              id={`${val.name}-${index}`}
                                              name={filter.label}
                                              value={val.name}
                                              checked={
                                                filter.label === 'Category' &&
                                                val.sename &&
                                                router.asPath.includes(
                                                  `/${val.sename}.html`,
                                                )
                                                  ? true
                                                  : checked
                                              }
                                              type='checkbox'
                                              onChange={(e) => {
                                                const { name, value, checked } =
                                                  e.target;
                                                handleChange(
                                                  name,
                                                  value,
                                                  checked,
                                                  val.sename,
                                                );
                                              }}
                                              className='h-[16px] w-[16px] border-gray-300 rounded text-indigo-600'
                                            />
                                            <label
                                              htmlFor={`${val.name}-${index}`}
                                              className='ml-[10px]'
                                            >
                                              {capitalizeFirstLetter(val.name)}{' '}
                                              {storeCode === BOSTONBEAR
                                                ? ''
                                                : `(${val.productCount})`}
                                            </label>
                                          </>
                                        )}
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
                  )}
                </>
              );
            })}
        </div>
      </form>
    </div>
  );
};

export default PL3_SideFilters;
