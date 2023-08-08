import { __pagesText } from '@constants/pages.text';
import { capitalizeFirstLetter } from '@helpers/common.helper';
import { useActions_v2 } from '@hooks_v2/index';
import { _CheckedFilter } from '@templates/ProductListings/ProductListingType';
import { useRouter } from 'next/router';

interface _Props {
  checkedFilters: Array<_CheckedFilter>;
  slug: string;
  pageId: number;
}

const PL2_FilterChips: React.FC<_Props> = ({
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

      setShowLoader(true);
      const url = `/${parameters}/${parametersValue}/${pageId}/${slug}.html${sortQuery}`;
      router.replace(url);
      return;
    }

    router.replace(`/${slug}.html${sortQuery}`);
  };

  const handleChange = (name: string, value: string, checked: boolean) => {
    const updatedFilters = checkedFilters.filter((filter) => {
      if (filter.name === name && filter.value === value) return false;
      return true;
    });
    updateFilter(updatedFilters);
  };

  const removeAllFilters = () => {
    const sort = router.query['sort'];
    // const sortQuery = sort
    //   ? `?sort=${sort}&page=${router.query?.page || 1}`
    //   : `?page=${router.query?.page || 1}`;

    const sortQuery = sort ? `?sort=${sort}` : ``;

    router.replace(`/${slug}.html${sortQuery}`);
    return;
  };

  return checkedFilters.length > 0 ? (
    <div className='mt-[20px] flex gap-2.5 text-sm leading-none items-center'>
      <div className=''>Filters :</div>
      <div className=''>
        <ul className='flex flex-wrap gap-2'>
          {checkedFilters.map((filter, index) => (
            <li key={index} className=''>
              <a
                className='bg-secondary inline-flex items-center py-[4px] px-[20px] text-sm text-[#ffffff] rounded cursor-pointer'
                href='javascript:void(0);'
              >
                <span className='mr-[10px]'>
                  {capitalizeFirstLetter(filter.value)}
                </span>
                <span
                  onClick={() => {
                    handleChange(filter.name, filter.value, false);
                  }}
                  className='material-icons-outlined text-sm'
                >
                  close
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className=''>
        <a
          onClick={removeAllFilters}
          href='javascript:void(0);'
          className='inline-block !font-semibold text-default-text cursor-pointer'
        >
          {__pagesText.productListing.clearAllButton}
        </a>
      </div>
    </div>
  ) : null;
};

export default PL2_FilterChips;
