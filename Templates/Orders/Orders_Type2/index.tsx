import MyAccountTabsType2 from '@appComponents/common/MyAccountTabsType2';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import {
  FetchOrderDetails,
  FetchOrdersIdByCustomerId,
  FetchOrdersIdByCustomerUserId,
} from '@services/user.service';
import React, { useEffect, useState } from 'react';
import { _OrderDetails } from '../Orders_Type1';

const Orders_Type2: React.FC = () => {
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const userId = useTypedSelector_v2((state) => state.user.id);
  const customerRoleId = useTypedSelector_v2(
    (state) => state.user.customer?.customerRoleId,
  );
  const [orderDetails, setOrderDetails] = useState<_OrderDetails | null | []>(
    null,
  );
  const isAdmin = customerRoleId == 0 || customerRoleId == 2 ? true : false;

  const [showTab, setShowTab] = useState<'MyOwnOrders' | 'OtherUsersOrders'>(
    'MyOwnOrders',
  );

  const [listMetaInfo, setListMetaInfo] = useState<{
    pageNumber: number;
    totalCounts: number;
    itemsCountToShow: number;
    totalPages: number;
  }>({
    pageNumber: 1,
    totalCounts: 0,
    itemsCountToShow: 0,
    totalPages: 1,
  });

  const handleItemsQtyChange = () => {
    const newQty: number = 5;
    setListMetaInfo((prev) => ({
      ...prev,
      pageNumber: 1,
      itemsCountToShow: newQty,
      totalPages: Math.ceil(prev.totalCounts / newQty),
    }));
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= listMetaInfo.totalPages) {
      setListMetaInfo((prev) => ({
        ...prev,
        pageNumber: pageNumber,
      }));
    }
  };

  const PageNumbersHTML = () => {
    const pageNumbers = [];
    for (let index = 1; index <= listMetaInfo.totalPages; index++) {
      pageNumbers.push(
        <div
          onClick={() => handlePageChange(listMetaInfo.pageNumber)}
          className='w-[30px] h-[30px] flex items-center justify-center bg-light-gray'
        >
          index
        </div>,
      );
    }
    return pageNumbers;
  };

  const fetchMultipleOrderDetails = async (ids: number[] | null) => {
    if (ids === null) {
      setOrderDetails([]);
      return;
    }
    let orders: _OrderDetails = [];
    const ordersToFetch = ids.map((id) => FetchOrderDetails({ orderId: id }));

    await Promise.allSettled(ordersToFetch).then((values) => {
      values.map((value, index) => {
        orders[index] = value.status === 'fulfilled' ? value.value : null;
      });
    });

    setOrderDetails(orders);
  };

  useEffect(() => {
    setOrderDetails(null);
    if (storeId && userId) {
      if (showTab == 'MyOwnOrders') {
        FetchOrdersIdByCustomerId({
          storeId,
          userId,
        })
          .then((ids) => fetchMultipleOrderDetails(ids))
          .catch(() => setOrderDetails([]));
        return;
      }

      if (showTab === 'OtherUsersOrders') {
        FetchOrdersIdByCustomerUserId({
          storeId,
          userId,
        })
          .then((ids) => fetchMultipleOrderDetails(ids))
          .catch(() => setOrderDetails([]));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId, userId, showTab]);

  return (
    <MyAccountTabsType2>
      {orderDetails === null ? (
        <div id='root'>
          <div className='loader-wrapper'>
            <div className='loader'></div>
          </div>
        </div>
      ) : (
        <div className='w-4/4 lg:w-4/5'>
          <div className=''>
            <div className='flex flex-wrap items-center justify-between mb-[10px] gap-[10px] text-default-text'>
              <div className='flex flex-wrap items-center gap-[5px]'>
                <div className=''>Show</div>
                <div className=''>
                  <select
                    className='form-input'
                    onChange={handleItemsQtyChange}
                  >
                    {[10, 25, 50, 100].map((num) => (
                      <option key={num} value=''>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
                <div className=''>entries</div>
              </div>
              <div className=''>
                <input placeholder='Search' className='form-input' value='' />
              </div>
            </div>
            <div className='overflow-auto max-h-screen border border-gray-border'>
              <table className='table table-auto border-collapse border-gray-border w-full text-default-text text-left'>
                <thead className='bg-light-gray'>
                  <tr>
                    <th className='p-[10px] border-r last:border-r-0 border-gray-border'>
                      <div className='font-semibold text-left w-48 flex items-center'>
                        <span>Order Date</span>
                        <div className='flex flex-col pl-2'>
                          <span className='material-icons-outlined text-sm h-2 leading-[10px]'>
                            keyboard_arrow_up
                          </span>
                          <span className='material-icons-outlined text-sm h-2 leading-[10px]'>
                            keyboard_arrow_down
                          </span>
                        </div>
                      </div>
                    </th>
                    <th className='p-[10px] border-r last:border-r-0 border-gray-border'>
                      <div className='font-semibold text-left w-48 flex items-center'>
                        <span>Order #</span>
                        <div className='flex flex-col pl-2'>
                          <span className='material-icons-outlined text-sm h-2 leading-[10px]'>
                            keyboard_arrow_up
                          </span>
                          <span className='material-icons-outlined text-sm h-2 leading-[10px]'>
                            keyboard_arrow_down
                          </span>
                        </div>
                      </div>
                    </th>
                    <th className='p-[10px] border-r last:border-r-0 border-gray-border'>
                      <div className='font-semibold text-left w-48 flex items-center'>
                        <span>Order Status</span>
                        <div className='flex flex-col pl-2'>
                          <span className='material-icons-outlined text-sm h-2 leading-[10px]'>
                            keyboard_arrow_up
                          </span>
                          <span className='material-icons-outlined text-sm h-2 leading-[10px]'>
                            keyboard_arrow_down
                          </span>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='border-t border-r last:border-r-0 border-gray-border p-[10px]'>
                      08/14/2018
                    </td>
                    <td className='border-t border-r last:border-r-0 border-gray-border p-[10px]'>
                      <a href='order-details.html'>145546</a>
                    </td>
                    <td className='border-t border-r last:border-r-0 border-gray-border p-[10px]'>
                      Canceled
                    </td>
                  </tr>
                  <tr>
                    <td className='border-t border-r last:border-r-0 border-gray-border p-[10px]'>
                      08/18/2019
                    </td>
                    <td className='border-t border-r last:border-r-0 border-gray-border p-[10px]'>
                      <a href='order-details.html'>222554</a>
                    </td>
                    <td className='border-t border-r last:border-r-0 border-gray-border p-[10px]'>
                      Canceled
                    </td>
                  </tr>
                  <tr>
                    <td className='border-t border-r last:border-r-0 border-gray-border p-[10px]'>
                      05/22/2022
                    </td>
                    <td className='border-t border-r last:border-r-0 border-gray-border p-[10px]'>
                      <a href='order-details.html'>255412</a>
                    </td>
                    <td className='border-t border-r last:border-r-0 border-gray-border p-[10px]'>
                      Canceled
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='flex flex-wrap items-center justify-between mt-[10px] gap-[10px] text-default-text'>
              <div className=''>Showing 1 to 4 of 4 entries</div>
              <div className='flex flex-wrap items-center gap-[5px]'>
                <div className='flex flex-wrap border border-gray-border divide-x divide-gray-border'>
                  <div
                    onClick={() => handlePageChange(listMetaInfo.pageNumber)}
                    className='px-[10px] flex items-center justify-center opacity-[0.5]'
                  >
                    Previous
                  </div>
                  {PageNumbersHTML()}
                  <div
                    onClick={() => handlePageChange(listMetaInfo.pageNumber)}
                    className='px-[10px] flex items-center justify-center'
                  >
                    <a href='javascript:void(0);'>Next</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </MyAccountTabsType2>
  );
};

export default Orders_Type2;
