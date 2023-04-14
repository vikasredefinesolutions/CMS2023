import { useTypedSelector_v2 } from '@hooks_v2/index';
import React from 'react';
interface _props {
  children: React.ReactNode;
}

export const SpinnerComponent = () => (
  <div id='root'>
    <div className='loader-wrapper'>
      <div className='loader'></div>
    </div>
  </div>
);

const Spinner: React.FC<_props> = ({ children }) => {
  const showLoader = useTypedSelector_v2((state) => state.loader.showLoader);

  return (
    <>
      {showLoader && <SpinnerComponent />}
      {children}
    </>
  );
};

export default Spinner;
