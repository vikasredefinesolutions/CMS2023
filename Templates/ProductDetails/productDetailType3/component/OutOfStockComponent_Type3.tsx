import { BACARDI } from '@constants/global.constant';
import { useTypedSelector_v2 } from '@hooks_v2/index';

function OutOfStockComponent_Type3({ elem }: any) {
  const { code: store_Code } = useTypedSelector_v2((state) => state.store);
  return (
    <div className='flex flex-wrap items-center border-b border-b-gray-border pl-[10px]'>
      <div className='w-1/3 pt-[10px] pb-[10px]'>{elem.name}</div>
      <div className='w-1/3 pt-[10px] pb-[10px] text-center text-red-700 font-[600]'>
        OUT OF STOCK
      </div>
      <div
        className={`w-1/3 pt-[10px] pb-[10px] text-right ${
          store_Code === BACARDI ? 'pr-8' : ''
        }`}
      >
        -
      </div>
    </div>
  );
}

export default OutOfStockComponent_Type3;
