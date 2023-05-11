import { useTypedSelector_v2 } from 'hooks_v2';
import React from 'react';

const SizeChart: React.FC = () => {
  const sizeChart = useTypedSelector_v2(
    (state) => state.product.product.sizeChart,
  );

  return (
    <div className='mt-[30px]'>
      <div className='text-center text-2xl-text pb-[20px]'>MEASURING</div>
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
              <th className='border border-gray-border p-[5px]'>&nbsp;</th>
              {sizeChart?.sizeChartRange.map((piece: string) => (
                <th className='border border-gray-border p-[5px]' key={piece}>
                  {piece}
                </th>
              ))}
              {sizeChart?.measurements.map((piece: string) => (
                <tr className=' ' key={piece}>
                  <td className='border border-gray-border p-[5px]'>{piece}</td>
                  {sizeChart?.sizeChartRange.map((size: string) => (
                    <td className='border border-gray-border p-[5px]'>
                      {sizeChart.sizeChartView[`${piece}${size}`]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SizeChart;
