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
  {
    /* <div className='mt-[15px] flex gap-2 text-sm leading-none items-center px-[10px] text-normal-text'>
                    <div className='font-semibold whitespace-nowrap'>
                      Filters:
                    </div>
                    <div className=''>
                      <ul className='flex flex-wrap gap-2'>
                        <li className=''>
                          <a
                            className='inline-flex items-center py-[5px] px-[16px] text-sm rounded bg-primary'
                            href='javascript:void(0);'
                          >
                            <span className='mr-[10px] text-[#ffffff]'>
                              Adidas
                            </span>{' '}
                            <span className='material-icons-outlined text-normal-text text-[#ffffff]'>
                              close
                            </span>
                          </a>
                        </li>
                        <li className=''>
                          <a
                            className='inline-flex items-center py-[5px] px-[16px] text-sm rounded bg-primary'
                            href='javascript:void(0);'
                          >
                            <span className='mr-[10px] text-[#ffffff]'>
                              Columbia
                            </span>{' '}
                            <span className='material-icons-outlined text-normal-text text-[#ffffff]'>
                              close
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className='whitespace-nowrap'>
                      <a
                        href='javascript:void(0);'
                        className='inline-block font-semibold'
                      >
                        Clear All
                      </a>
                    </div>
                  </div> */
  }
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
        <button onClick={clearFilters} className='inline-block font-semibold'>
          {__pagesText.productListing.clearAllButton}
        </button>
      </div>
    </div>
  ) : null;
};

export default FilterChips;
