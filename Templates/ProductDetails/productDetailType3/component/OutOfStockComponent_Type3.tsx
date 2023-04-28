function OutOfStockComponent_Type3({ elem }: any) {
  return (
    <div className='flex flex-wrap items-center border-b border-b-gray-border pl-[10px]'>
      <div className='w-1/3 pt-[10px] pb-[10px]'>{elem.name}</div>
      <div className='w-1/3 pt-[10px] pb-[10px] text-center text-red-700 font-[600]'>
        OUT OF STOCK
      </div>
      <div className='w-1/3 pt-[10px] pb-[10px] text-right'>-</div>
    </div>
  );
}

export default OutOfStockComponent_Type3;
