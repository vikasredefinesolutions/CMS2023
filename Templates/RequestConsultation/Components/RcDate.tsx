import { __pagesConstant } from '@constants/pages.constant';
import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';

interface _props {
  value: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
}

const RcDate: React.FC<_props> = ({ value, setFieldValue }) => {
  return (
    <div className='w-full '>
      <div className='flex flex-wrap items-center justify-between'>
        <div className=''>In Hands Date:</div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            inputFormat={__pagesConstant._requestConsultation.dateFormat}
            value={value}
            onChange={(event: any) => {
              event && setFieldValue('inHandDate', event['$d']);
            }}
            disableHighlightToday={true}
            disablePast={true}
            renderInput={(params) => <TextField {...params} error={false} />}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default RcDate;
