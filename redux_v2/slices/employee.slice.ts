import { EmployeeType } from '@definations/APIs/user.res';
import { createSlice } from '@reduxjs/toolkit';

export interface _EmployeeState {
  empId: number | null;
  employee: EmployeeType | null;
  loggedIn: boolean;
  isLoadingComplete: boolean;
}

const initialState: _EmployeeState = {
  empId: null,
  employee: null,
  loggedIn: false,
  isLoadingComplete: false,
};

export const employeeSlice = createSlice({
  name: 'employeeDetails',
  initialState,
  reducers: {
    updateEmployeeV2: (
      state,
      action: {
        payload:
          | 'CLEAN_UP'
          | {
              employee: EmployeeType;
              empId: number;
            };
      },
    ) => {
      if (action.payload === 'CLEAN_UP') {
        state.employee = null;
        state.empId = null;
        state.loggedIn = false;
        state.isLoadingComplete = true;
        return;
      }

      state.employee = action.payload.employee;
      state.empId = action.payload.empId;
      state.loggedIn = true;
      state.isLoadingComplete = true;
    },
  },
});

export const employeeActions = employeeSlice.actions;
export default employeeSlice.reducer;
