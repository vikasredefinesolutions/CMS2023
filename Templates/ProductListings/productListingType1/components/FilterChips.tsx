import { __pagesText } from '@constants/pages.text';
import { capitalizeFirstLetter } from '@helpers/common.helper';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
  FilterChangeHandler,
  _CheckedFilter,
} from '@templates/ProductListings/ProductListingType';
const FilterChips = ({
  checkedFilters,
  clearFilters,
  handleChange,
}: {
  checkedFilters: Array<_CheckedFilter>;
  clearFilters: () => void;
  handleChange: FilterChangeHandler;
}) => {
  return checkedFilters.length > 0 ? (
    <div className='mt-4 flex gap-2 text-sm leading-none items-center pl-2'>
      <div className='font-semibold whitespace-nowrap mt-1.5'>Filters :</div>
      <div className=''>
        <ul className='flex flex-wrap gap-2'>
          {checkedFilters.map((filter, index) => (
            <li key={index} className=''>
              <a className='btn btn-sm btn-primary !inline-flex items-center !rounded-md gap-x-1 !py-0.5 !text-sm'>
                <span>{capitalizeFirstLetter(filter.value)}</span>
                <span
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
        <button onClick={clearFilters} className='inline-block font-semibold'>
          {__pagesText.productListing.clearAllButton}
        </button>
      </div>
    </div>
  ) : null;
};

export default FilterChips;
