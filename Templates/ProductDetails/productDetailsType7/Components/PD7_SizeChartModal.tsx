import { _SizeChartTransformed } from '@definations/APIs/sizeChart.res';
import React, { useState } from 'react';

interface _Props {
  chart: _SizeChartTransformed | null;
}

const PD7_SizeChart: React.FC<_Props> = ({ chart }) => {
  const [modal, setModal] = useState<boolean>(false);

  if (!chart) return null;

  return (
    <div className='pt-[5px] text-default-text text-right'>
      <button
        onClick={() => setModal(true)}
        className='text-anchor hover:text-anchor-hover font-semibold'
        data-modal-toggle='FitandSize'
      >
        Size Chart
      </button>
      {modal && (
        <div
          onClick={() => setModal(false)}
          id='sizechartModal'
          className='overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center h-modal md:h-full inset-0 '
        >
          <div className='w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
            <div className='relative px-4 w-full max-w-3xl h-auto'>
              <div className='relative bg-white rounded-lg shadow max-h-screen overflow-y-auto'>
                <div className='flex justify-between items-start p-5 rounded-t border-b sticky top-0 left-0 bg-white'>
                  <h3 className='text-xl font-semibold text-gray-900 lg:text-2xl'>
                    {chart.name}
                  </h3>

                  <button
                    type='button'
                    className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
                    onClick={() => setModal(false)}
                  >
                    <svg
                      className='w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </button>
                </div>

                {chart.sizeChartView &&
                Object.keys(chart.sizeChartView).length === 0 ? (
                  <div className=''>
                    <div className='overflow-x-auto max-h-screen p-5 flex justify-center'>
                      <span className='text-center'>
                        {chart.measurements[0]}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className=''>
                    <div className='overflow-x-auto max-h-screen p-5'>
                      <table
                        cellPadding='0'
                        cellSpacing='0'
                        className='table-auto w-full text-sm text-center border border-neutral-200 text-[#191919]'
                      >
                        <thead className='text-sm bg-gray-100 font-semibold uppercase border-b border-neutral-200'>
                          <tr className='divide-x divide-slate-200'>
                            <th className='px-2 py-4'>&nbsp;</th>
                            {chart.sizeChartRange?.map((size: string) => (
                              <th className='px-2 py-4' key={size}>
                                <div className=''>{size}</div>
                              </th>
                            ))}
                          </tr>
                        </thead>

                        <tbody className='divide-y divide-slate-200'>
                          {chart.measurements?.map((piece: string) => (
                            <tr
                              className='divide-x divide-slate-200'
                              key={piece}
                            >
                              <td className='px-2 py-3 text-left'>{piece}</td>
                              {chart.sizeChartRange?.map((length: string) => (
                                <td className='px-2 py-3' key={length}>
                                  <div className=''>
                                    {chart.sizeChartView[`${piece}${length}`]}
                                  </div>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PD7_SizeChart;
