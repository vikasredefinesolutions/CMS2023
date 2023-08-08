import { __pagesText } from '@constants/pages.text';
import { capitalizeFirstLetter } from '@helpers/common.helper';
import { useActions_v2 } from '@hooks_v2/index';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { _CheckedFilter } from '@templates/ProductListings/ProductListingType';
import { useRouter } from 'next/router';
interface _Props {
  checkedFilters: Array<_CheckedFilter>;
  slug: string;
  pageId: number;
}

const PL4_FilterChips: React.FC<_Props> = ({
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
    <div className='mt-[15px] flex gap-2 text-sm leading-none items-center px-[10px] text-normal-text'>
      <div className='font-semibold whitespace-nowrap'>Filters:</div>
      <div className=''>
        <ul className='flex flex-wrap gap-2'>
          {checkedFilters.map((filter, index) => (
            <li key={index} className=''>
              <a className='inline-flex items-center py-[5px] px-[16px] text-sm rounded bg-primary'>
                <span className='mr-[10px] text-[#ffffff]'>
                  {capitalizeFirstLetter(filter.value)}
                </span>
                <span
                  className='material-icons-outlined text-normal-text text-[#ffffff]'
                  onClick={() => {
                    handleChange(filter.name, filter.value, false);
                  }}
                >
                  <CloseOutlinedIcon />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className='whitespace-nowrap mt-1.5'>
        <button
          onClick={removeAllFilters}
          className='inline-block font-semibold'
        >
          {__pagesText.productListing.clearAllButton}
        </button>
      </div>
    </div>
  ) : null;
};

export default PL4_FilterChips;
