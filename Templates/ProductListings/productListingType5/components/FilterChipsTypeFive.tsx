import { __pagesText } from '@constants/pages.text';
import { capitalizeFirstLetter } from '@helpers/common.helper';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
  FilterChangeHandler,
  _CheckedFilter,
} from '@templates/ProductListings/ProductListingType';
const FilterChipsTypeFive = ({
  checkedFilters,
  clearFilters,
  handleChange,
}: {
  checkedFilters: Array<_CheckedFilter>;
  clearFilters: () => void;
  handleChange: FilterChangeHandler;
}) => {
  return checkedFilters.length > 0 ? (
    <div className='mt-4 flex gap-2 text-sm leading-none items-center px-[10px] text-normal-text'>
      <div className='font-semibold whitespace-nowrap'>Filters :</div>
      <div className=''>
        <ul className='flex flex-wrap gap-2'>
          {checkedFilters.map((filter, index) => (
            <li key={index} className=''>
              <a
                className='inline-flex items-center py-[5px] lg:py-[10px] px-[10px] lg:px-[20px] text-sm rounded bg-tertiary'
                href='javascript:void(0);'
              >
                <span className='mr-[10px] text-[#ffffff]'>
                  {capitalizeFirstLetter(filter.value)}
                </span>
                <span
                  className='mr-[10px] text-[#ffffff]'
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
      <div className='whitespace-nowrap'>
        <button onClick={clearFilters} className='inline-block font-semibold'>
          {__pagesText.productListing.clearAllButton}
        </button>
      </div>
    </div>
  ) : null;
};

export default FilterChipsTypeFive;
