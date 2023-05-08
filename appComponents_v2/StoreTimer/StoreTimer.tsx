import { useTypedSelector_v2 } from '@hooks_v2/index';
import { useEffect, useState } from 'react';

const StoreTimer = () => {
  const { closeStoreOn } = useTypedSelector_v2((state) => state.sbStore);
  const countDownDate = new Date(closeStoreOn).getTime();
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
      <div className='timer'>
        <span>Days {days}</span>
        <span>hours {hours}</span>
        <span>minutes {minutes}</span>
        <span>seconds {seconds}</span>
      </div>
    </>
  );
};

export default StoreTimer;
