import { EmployeeType } from '@definations/APIs/user.res';
import { createSlice } from '@reduxjs/toolkit';

export interface _EmployeeState {
  empId: number | null;
  employee: EmployeeType | null;
  loggedIn: boolean;
  isLoadingComplete: boolean;
  isEmpGuest: boolean;
}

const initialState: _EmployeeState = {
  empId: null,
  employee: null,
  loggedIn: false,
  isLoadingComplete: false,
  isEmpGuest: false, // FOR PK
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
        state.isEmpGuest = false;
        return;
      }

      state.employee = action.payload.employee;
      state.empId = action.payload.empId;
      state.loggedIn = true;
      state.isLoadingComplete = true;
    },
    employee_Login: (state, action: { payload: { isGuest: boolean } }) => {
      state.isEmpGuest = action.payload.isGuest;
    },
  },
});

export const employeeActions = employeeSlice.actions;
export default employeeSlice.reducer;
