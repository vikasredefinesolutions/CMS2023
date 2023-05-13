import { employeeData } from '@constants/common.constant';
import { __Cookie } from '@constants/global.constant';
import { extractCookies, setCookie } from '@helpers/common.helper';
import { useActions_v2 } from '@hooks_v2/index';
import CryptoJS from 'crypto-js';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export type EmployeeDataObject = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
};
const EmployeeController = () => {
  const router = useRouter();
  const { updateEmployeeV2 } = useActions_v2();
  let empData = router.query.id;

  const decryptData = () => {
    if (typeof empData === 'string') {
      empData = empData?.replaceAll(' ', '+');
      const bytes = CryptoJS.AES.decrypt(empData, employeeData.secretPass);
      let stringyfiedBytes = bytes.toString(CryptoJS.enc.Utf8);
      const decrptedData = JSON.parse(stringyfiedBytes);
      const encodedEmployeeData = encodeURIComponent(stringyfiedBytes);

      if (decrptedData) {
        setCookie(__Cookie.empData, encodedEmployeeData, 'Session');
        updateEmployeeV2({
          empId: decrptedData.id,
          employee: {
            firstname: decrptedData.firstname,
            lastName: decrptedData.lastname,
            email: decrptedData.email,
          },
        });
      }
    }
  };

  useEffect(() => {
    if (empData) {
      decryptData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [empData]);

  useEffect(() => {
    const newsavedEmpData = extractCookies(
      __Cookie.empData,
      'browserCookie',
    ).empData;

    if (newsavedEmpData) {
      updateEmployeeV2({
        empId: newsavedEmpData.id,
        employee: {
          firstname: newsavedEmpData.firstname,
          lastName: newsavedEmpData.lastname,
          email: newsavedEmpData.email,
        },
      });
    }
  }, []);
};

export default EmployeeController;
