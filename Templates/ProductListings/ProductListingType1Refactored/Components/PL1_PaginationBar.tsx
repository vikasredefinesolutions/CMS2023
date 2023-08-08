import React from 'react';

interface _Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNo: number) => void;
}

const PL1_PaginationBar: React.FC<_Props> = ({
  onPageChange,
  totalPages,
  currentPage,
}) => {
  const pageChangeHandler = (no: number) => {
    if (no === 0) return;
    if (no > totalPages) return;
    onPageChange(no);
  };

  return (
    <div className='mb-[50px] mt-[30px]'>
      <nav className='flex justify-center gap-2'>
        <div className=''>
          <button
            disabled={currentPage === 1}
            onClick={() => pageChangeHandler(currentPage - 1)}
            className={`h-full inline-flex items-center justify-center rounded py-[10px] w-[40px] bg-white border border-gray-border shadow-sm ${
              currentPage === 1
                ? 'opacity-50'
                : 'hover:bg-primary hover:text-white'
            }`}
          >
            <svg className='h-4 w-4 fill-current' viewBox='0 0 16 16'>
              <path d='M9.4 13.4l1.4-1.4-4-4 4-4-1.4-1.4L4 8z'></path>
            </svg>
          </button>
        </div>
        <ul className='inline-flex text-default-text border border-gray-border rounded bg-white shadow-sm divide-x divide-gray-border overflow-hidden'>
          {Array.from(Array(totalPages).keys()).map((number, index) => {
            const pageNumber = number + 1;
            const active = currentPage === pageNumber;
            let showSkip = false;
            let showNumber = false;

            if (pageNumber === currentPage) showNumber = true;
            if (pageNumber === currentPage + 1) showNumber = true;
            if (pageNumber === currentPage + 3) showSkip = true;

            if (pageNumber === currentPage - 1) showNumber = true;
            if (pageNumber === currentPage - 2) showSkip = true;

            if (pageNumber === 1) {
              showNumber = true;
              showSkip = false;
            }
            if (pageNumber === totalPages) {
              showNumber = true;
              showSkip = false;
            }
            if (currentPage === 1 && pageNumber === 3) {
              showNumber = true;
            }
            if (currentPage === totalPages && pageNumber === totalPages - 2) {
              showNumber = true;
              showSkip = false;
            }
            if (currentPage === totalPages && pageNumber === totalPages - 3)
              showSkip = true;

            if (
              currentPage + 2 === totalPages - 1 &&
              currentPage + 2 === pageNumber
            ) {
              showSkip = true;
            }

            if (showSkip) {
              return (
                <li key={pageNumber} className=''>
                  <span
                    className={`inline-flex items-center justify-center py-[10px] w-[40px]`}
                  >
                    ...
                  </span>
                </li>
              );
            }

            if (showNumber) {
              return (
                <li
                  key={pageNumber}
                  className=''
                  onClick={() => pageChangeHandler(pageNumber)}
                >
                  <span
                    className={`inline-flex items-center justify-center py-[10px] w-[40px] ${
                      active
                        ? 'bg-primary text-white'
                        : 'hover:bg-primary hover:text-white'
                    }`}
                  >
                    {pageNumber}
                  </span>
                </li>
              );
            }

            return null;
          })}
        </ul>
        <div className=''>
          <button
            disabled={currentPage === totalPages}
            onClick={() => pageChangeHandler(currentPage + 1)}
            className={`h-full inline-flex items-center justify-center rounded py-[10px] w-[40px] bg-white border border-gray-border shadow-sm ${
              currentPage === totalPages
                ? 'opacity-50'
                : 'hover:bg-primary hover:text-white'
            }`}
          >
            <svg className='h-4 w-4 fill-current' viewBox='0 0 16 16'>
              <path d='M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z'></path>
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default PL1_PaginationBar;
