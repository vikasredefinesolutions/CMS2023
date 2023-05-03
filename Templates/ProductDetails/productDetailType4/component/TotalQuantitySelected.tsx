import React from 'react';

const TotalQtySelected: React.FC<{ total: number }> = ({ total }) => {
  return (
    <div className='mb-2'>
      <span className='inline-block w-40'>Quantity Selected:</span>{' '}
      <span className='font-semibold'>{total}</span>
    </div>
  );
};
export default TotalQtySelected;
