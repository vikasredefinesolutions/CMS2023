import { capitalizeFirstLetter } from '@helpers/common.helper';
import { useActions_v2 } from '@hooks_v2/index';
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
import { Fragment } from 'react';
interface _Props {
  filters: FilterType;
  checkedFilters: Array<_CheckedFilter>;
  pageId: number;
  slug: string;
}

const PL5_SideFilters: React.FC<_Props> = ({
  filters,
  checkedFilters,
  pageId,
  slug,
}) => {
  const router = useRouter();
  const { setShowLoader } = useActions_v2();

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
  let route = router.asPath.split('.')[0].replace('.html', '').replace('/', '');

  if (filters.length === 0) return null;
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
                                  className={`w-[32px] h-[32px] border-2  hover:border-primary p-[2px] cursor-pointer ${
                                    checked
                                      ? 'relative border-primary'
                                      : 'border-secondary'
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
                                <li
                                  key={ind}
                                  className='w-full pt-[2px] pb-[2px]'
                                >
                                  <Link
                                    key={option.name}
                                    id={option.name}
                                    className={`flex items-center !text-black !no-underline cursor-pointer font-semibold text-tertiary text-small-text ${
                                      route === option.sename
                                        ? '!font-bold'
                                        : ''
                                    }`}
                                    href={`/${option.sename}.html`}
                                  >
                                    <span className='material-icons-outlined'>
                                      {option.subrows &&
                                      option.subrows.length > 0
                                        ? 'expand_more'
                                        : 'chevron_right'}
                                    </span>
                                    {capitalizeFirstLetter(option.name)}(
                                    {option.productCount})
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
                                            className='!text-black !no-underline text-small-text flex items-center'
                                            style={{
                                              fontWeight: `${
                                                route === subrow.sename
                                                  ? 'bold'
                                                  : 'normal'
                                              }`,
                                            }}
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
                                      {capitalizeFirstLetter(option.name)}(
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

export default PL5_SideFilters;
