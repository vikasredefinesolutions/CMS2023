import React from 'react';

const Subtotal: React.FC<{ subTotal: number }> = ({ subTotal }) => {
  return (
    <div className=''>
      <span className='inline-block'>Subtotal:</span>{' '}
      <span className='font-semibold text-xl lg:text-3xl'>
        ${subTotal.toFixed(2)}
      </span>
    </div>
  );
};
export default Subtotal;
