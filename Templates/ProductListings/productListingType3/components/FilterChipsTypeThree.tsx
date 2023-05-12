import { __pagesText } from '@constants/pages.text';
import { FilterChangeHandler } from '@definations/productList.type';
import { capitalizeFirstLetter } from '@helpers/common.helper';
import { _CheckedFilter } from '@templates/ProductListings/ProductListingType';

const FilterChipsTypeThree = ({
  checkedFilters,
  clearFilters,
  handleChange,
}: {
  checkedFilters: Array<_CheckedFilter>;
  clearFilters: () => void;
  handleChange: FilterChangeHandler;
}) => {
  return checkedFilters.length > 0 ? (
    <div className='mt-[20px] flex gap-2.5 text-sm leading-none items-center'>
      <div className='font-semibold'>
        {__pagesText.productListing.Filters} :
      </div>
      <div className=''>
        <ul className='flex flex-wrap gap-2'>
          {checkedFilters.map((filter, index) => (
            <li key={index} className=''>
              <a
                className='bg-secondary inline-flex items-center py-[4px] px-[20px] text-sm text-[#ffffff] hover:bg-secondary-hover hover:text-white rounded cursor-pointer'
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
                  {__pagesText.productListing.closeIcon}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className=''>
        <a
          onClick={clearFilters}
          className='inline-block font-semibold text-default-text cursor-pointer'
          href='javascript:void(0);'
        >
          {__pagesText.productListing.clearAllButton}
        </a>
      </div>
    </div>
  ) : null;
};

export default FilterChipsTypeThree;
