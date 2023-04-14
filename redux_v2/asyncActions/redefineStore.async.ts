import { PageResponseType } from '@definations/app.type';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const SetPageType = createAsyncThunk(
  'pageType/details',
  (payload: PageResponseType) => {
    return { payload };
  },
);
