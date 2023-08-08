import React from 'react';

export interface _EyeButtonProps {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface _InputProps {
  label: string;
  placeHolder: string;
  name: string;
  value: string | number;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: 'text' | 'number' | 'password' | 'email';
  required: boolean;
  error?: any;
  id: string;
  showErroMsg?: string | null;
}
