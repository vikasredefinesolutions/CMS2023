import { useTypedSelector_v2 } from 'hooks_v2';
import { useEffect, useState } from 'react';

const StoreTimer = () => {
  const { closeStoreOn } = useTypedSelector_v2((state) => state.sbStore.store);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const getTime = (closeStoreOn: string) => {
    const time = Date.parse(closeStoreOn) - Date.now();
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(closeStoreOn), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className='timer btn-group my-3 flex justify-center items-center'>
        <span className='text-center'><span className='text-2xl font-bold bg-primary relative text-white overflow-hidden rounded-lg px-2 py-2 inline-flex justify-center w-full'>{days}</span> <span className='mt-2'>Days</span></span>
        <span className='text-2xl font-bold text-primary px-2 text-center'><span>:</span> <span>&nbsp;</span></span>
        <span className='text-center'><span className='text-2xl font-bold bg-primary relative text-white overflow-hidden rounded-lg px-2 py-2 inline-flex justify-center w-full'>{hours}</span> <span className='mt-2'>hours</span></span>
        <span className='text-2xl font-bold text-primary px-2 text-center'><span>:</span> <span>&nbsp;</span></span>
        <span className='text-center'><span className='text-2xl font-bold bg-primary relative text-white overflow-hidden rounded-lg px-2 py-2 inline-flex justify-center w-full'>{minutes}</span> <span className='mt-2'>minutes</span></span>
        <span className='text-2xl font-bold text-primary px-2 text-center'><span>:</span> <span>&nbsp;</span></span>
        <span className='text-center'><span className='text-2xl font-bold bg-primary relative text-white overflow-hidden rounded-lg px-2 py-2 inline-flex justify-center w-full'>{seconds}</span> <span className='mt-2'>seconds</span> </span>
      </div>
    </>
  );
};

export default StoreTimer;