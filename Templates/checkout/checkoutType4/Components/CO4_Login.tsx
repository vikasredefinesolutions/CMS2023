import React, { useState } from 'react';
import CO4_EmailInput from './CO4_EmailInput';
import CO4_PasswordInput from './CO4_PasswordInput';

const CO4_Login: React.FC = () => {
  const [show, setShow] = useState<
    'Email' | 'EnterPassword' | 'CreatePassword'
  >('Email');

  return (
    <div id='LoginMain'>
      {show === 'Email' && <CO4_EmailInput setShow={setShow} />}
      {show === 'EnterPassword' && <CO4_PasswordInput />}
      {show === 'CreatePassword' && <CO4_PasswordInput />}
    </div>
  );
};

export default CO4_Login;
