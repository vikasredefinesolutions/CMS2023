import { __pagesText } from '@constants/pages.text';
import { capitalizeFirstLetter } from '@helpers/common.helper';
import {
  FilterChangeHandler,
  FilterType,
  _CheckedFilter,
} from '@templates/ProductListings/ProductListingType';
import Link from 'next/link';
import { Fragment } from 'react';

const SideFilter = ({
  filters,
  handleChange,
  checkedFilters,
}: {
  filters: FilterType;
  handleChange: FilterChangeHandler;
  checkedFilters: Array<_CheckedFilter>;
}) => {
  return (
    // <div className='relative'>
    //   <div className={'pt-[16px] pb-[16px] bg-light-gray'}>
    //     <div className={'mt-[0px] filter-box filter-type'}>
    //       <div>
    //         {filters &&
    //           filters.map((filter, index) => (
    //             <div key={index} className={'pt-[16px] first:pt-[0px]'}>
    //               <Accordion
    //                 defaultExpanded={true}
    //                 style={{
    //                   background: '#f3f4f6',
    //                   boxShadow: 'none',
    //                 }}
    //               >
    //                 <AccordionSummary
    //                   expandIcon={
    //                     <svg
    //                       className='w-8 h-8 shrink-0 fill-current text-gray-400 group-hover:text-gray-500 rotate-180'
    //                       viewBox='0 0 32 32'
    //                     >
    //                       <path d='M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z'></path>
    //                     </svg>
    //                   }
    //                   aria-controls='panel1a-content'
    //                   id='panel1a-header'
    //                   className='flex items-center justify-between w-full h-5 group mb-1 min-h-[auto]'
    //                 >
    //                   <div className='text-medium-text font-semibold text-[#000000] block uppercase'>
    //                     {filter.label}
    //                   </div>
    //                 </AccordionSummary>
    //                 <AccordionDetails className='text-[15px] tracking-[.1em]'>
    //                   <ul
    //                     className={
    //                       filter.label === 'Color'
    //                         ? 'flex flex-wrap items-center gap-x-1.5 gap-y-2 pb-4 pt-2'
    //                         : filter.label === 'Category'
    //                         ? 'ml-0 w-full'
    //                         : 'pb-2 pt-2 space-y-1.5'
    //                     }
    //                   >
    //                     {filter.options.map((option, ind) => {
    //                       const checked =
    //                         checkedFilters.findIndex(
    //                           (res: { name: string; value: string }) =>
    //                             res.name === filter.label &&
    //                             res.value === option.name,
    //                         ) > -1;

    //                       return (
    //                         <Fragment key={ind}>
    //                           {option.name || option.colorCode ? (
    //                             filter.label === 'Color' ? (
    //                               <li
    //                                 className={`w-8 h-8 border-2 hover:border-secondary p-0.5 cursor-pointer ${
    //                                   checked && 'border-secondary'
    //                                 }`}
    //                                 style={{
    //                                   background: option.colorCode,
    //                                 }}
    //                                 onClick={() => {
    //                                   handleChange(
    //                                     filter.label,
    //                                     option.name,
    //                                     !checked,
    //                                   );
    //                                 }}
    //                                 title={option.name}
    //                               ></li>
    //                             ) : filter.label === 'Category' ? (
    //                               <li key={ind} className='w-full py-0'>
    //                                 <Link
    //                                   key={option.name}
    //                                   id={option.name}
    //                                   className='flex items-center !text-black font-bold !no-underline'
    //                                   href={`/${option.sename}.html`}
    //                                 >
    //                                   <span className='material-icons-outlined'>
    //                                     {option.subrows
    //                                       ? 'chevron_right'
    //                                       : 'expand_more'}
    //                                   </span>
    //                                   {capitalizeFirstLetter(option.name)}(
    //                                   {option.productCount})
    //                                 </Link>
    //                                 {option.subrows && (
    //                                   <ul className='ml-3'>
    //                                     {option.subrows?.map((subrow) => (
    //                                       <li
    //                                         key={subrow.id}
    //                                         className='flex items-center !text-black !no-underline'
    //                                       >
    //                                         {' '}
    //                                         <Link
    //                                           key={subrow.name}
    //                                           href={`/${subrow.sename}.html`}
    //                                           className='!text-black !no-underline'
    //                                         >
    //                                           <span className='material-icons-outlined'>
    //                                             {' '}
    //                                             chevron_right
    //                                           </span>
    //                                           {capitalizeFirstLetter(
    //                                             subrow.name,
    //                                           )}{' '}
    //                                           ({subrow.productCount})
    //                                         </Link>
    //                                       </li>
    //                                     ))}
    //                                   </ul>
    //                                 )}
    //                               </li>
    //                             ) : (
    //                               <li
    //                                 className='flex items-center gap-x-1.5'
    //                                 key={ind}
    //                               >
    //                                 <input
    //                                   id={`${option.name}-${ind}`}
    //                                   name={filter.label}
    //                                   value={option.name}
    //                                   checked={checked}
    //                                   type='checkbox'
    //                                   onChange={(e) => {
    //                                     const { name, value, checked } =
    //                                       e.target;
    //                                     handleChange(name, value, checked);
    //                                   }}
    //                                   className='h-[13px] w-[13px] border-2 border-black rounded text-[#003a70] focus:ring-[#003a70] focus-visible:border-0'
    //                                 />
    //                                 {option.label === 'Size' ||
    //                                 option.label === 'Brand' ||
    //                                 option.label === 'Price Range' ? (
    //                                   <label
    //                                     htmlFor={`${option.name}-${ind}`}
    //                                     className='text-black'
    //                                   >
    //                                     {capitalizeFirstLetter(option.name)}
    //                                   </label>
    //                                 ) : (
    //                                   <label
    //                                     htmlFor={`${option.name}-${ind}`}
    //                                     className='text-black'
    //                                   >
    //                                     {capitalizeFirstLetter(option.name)} (
    //                                     {option?.productCount})
    //                                   </label>
    //                                 )}
    //                                 {/* <label
    //                                   htmlFor={`${option.name}-${ind}`}
    //                                   className='text-black'
    //                                 >
    //                                   {capitalizeFirstLetter(option.name)} (
    //                                   {option?.productCount})
    //                                 </label> */}
    //                               </li>
    //                             )
    //                           ) : null}
    //                         </Fragment>
    //                       );
    //                     })}
    //                   </ul>
    //                 </AccordionDetails>
    //               </Accordion>
    //             </div>
    //           ))}
    //       </div>
    //     </div>
    //   </div>
    // </div>
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
                                    <span className='material-icons-outlined'>
                                      {val.subrows
                                        ? 'chevron_right'
                                        : 'expand_more'}
                                    </span>
                                    {capitalizeFirstLetter(val.name)}(
                                    {val.productCount})
                                  </Link>
                                  {val.subrows && (
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
                                            <span className='material-icons-outlined'>
                                              {' '}
                                              {
                                                __pagesText.productListing
                                                  .rightArrowIcon
                                              }
                                            </span>
                                            {capitalizeFirstLetter(subrow.name)}{' '}
                                            ({subrow.productCount})
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

export default SideFilter;
