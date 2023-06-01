import { useTypedSelector_v2 } from 'hooks_v2';
import React from 'react';

const SizeChart: React.FC = () => {
  const sizeChart = useTypedSelector_v2(
    (state) => state.product.product.sizeChart,
  );

  return sizeChart ? (
    <div className='mt-[30px]'>
      <div className='text-center text-2xl-text pb-[20px] relative after:border-b after:border-gray-border after:h-[1px] after:w-[50px] after:absolute after:top-full'>
        MEASURING
      </div>
      <div className='text-default-text'>
        <p>FIND YOUR SIZE</p>
        <div className='overflow-x-auto mx-auto'>
          <table
            cellPadding='0'
            cellSpacing='0'
            className='border-collapse border border-gray-border text-medium-text'
            width='100%'
          >
            <tbody>
              <tr className='text-white' style={{ background: '#051c2c' }}>
                <td className='border border-gray-border p-[5px]'>&nbsp;</td>
                {sizeChart?.measurements?.map((piece: string) => {
                  return (
                    <td className='border border-gray-border p-[5px]  text-white'>
                      {piece}
                    </td>
                  );
                })}
              </tr>
              {sizeChart?.sizeChartRange?.map((piece: string) => (
                <tr className=' ' key={piece}>
                  <td className='border border-gray-border p-[5px]'>{piece}</td>
                  {sizeChart?.measurements.map((size: string) => (
                    <td className='border border-gray-border p-[5px]'>
                      {sizeChart.sizeChartView[`${size}${piece}`]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : null;
};

export default SizeChart;
