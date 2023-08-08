import { __pagesText } from '@constants/pages.text';
import { capitalizeFirstLetter } from '@helpers/common.helper';
import { useActions_v2 } from '@hooks_v2/index';
import {
  FilterType,
  _CheckedFilter,
} from '@templates/ProductListings/ProductListingType';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

interface _Props {
  filters: FilterType;
  checkedFilters: Array<_CheckedFilter>;
  pageId: number;
  slug: string;
}

const PL4_SideFilters: React.FC<_Props> = ({
  filters,
  checkedFilters,
  pageId,
  slug,
}) => {
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
                                    <a>
                                      <span className='material-icons-outlined'>
                                        {val.subrows
                                          ? 'chevron_right'
                                          : 'expand_more'}
                                      </span>
                                      {capitalizeFirstLetter(val.name)}(
                                      {val.productCount})
                                    </a>
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
                                            <a>
                                              <span className='material-icons-outlined'>
                                                {' '}
                                                {
                                                  __pagesText.productListing
                                                    .rightArrowIcon
                                                }
                                              </span>
                                              {capitalizeFirstLetter(
                                                subrow.name,
                                              )}{' '}
                                              ({subrow.productCount})
                                            </a>
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

export default PL4_SideFilters;
