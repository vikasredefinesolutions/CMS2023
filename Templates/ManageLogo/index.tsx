/* eslint-disable no-unused-vars */
import { LogoList } from '@definations/APIs/logo.res';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { getLogoDetailsList } from '@services/logo.service';
import MyAccountTabs from '@templates/account/accountTemplate_Type1/components/MyAccountTab';
import React, { useEffect, useState } from 'react';
import ManageLogoType1 from './ManageLogoType1';
import ManageLogoType2 from './ManageLogoType2';
import { _ManageLogoTemplates } from './managelogo.d';

const ManageLogoTemplates: _ManageLogoTemplates = {
  type1: ManageLogoType1,
  type2: ManageLogoType2,
};
const ManageLogo: React.FC<{ id: string }> = ({ id }) => {
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const [logoList, setLogoList] = useState<LogoList | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 25;

  const fetchLogoDetails = async () => {
    try {
      if (storeId && customerId) {
        const filter = {
          args: {
            pageIndex: currentPage,
            pageSize,
            pagingStrategy: 0,
            sortingOptions: [],
            filteringOptions: [],
          },
          customerId: customerId,
          storeId: storeId,
        };

        await getLogoDetailsList(filter).then((res) => {
          if (res) {
            setLogoList(res);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = async () => {
    setCurrentPage((prevState) => prevState + 1);
  };

  useEffect(() => {
    if (storeId && customerId) {
      fetchLogoDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId, customerId, currentPage]);

  const ManagelogoDeatils = ManageLogoTemplates[`type${id}` as 'type1'];


  // console.log('managelogo' , logoList);
  

  return (
    <>
      <MyAccountTabs />
      {logoList && logoList.items.length > 0 ? (
        <ManagelogoDeatils logoList={logoList} />
      ) : (
        <div className='text-center col-span-8 p-2 mt-2'>No record found.</div>
      )}
    </>
  );
};

export default ManageLogo;
