import Spinner from '@appComponents/ui/spinner';
import { getServerSideProps } from '@controllers/getServerSideProps';
import { LogoList } from '@definations/APIs/logo.res';
import { getPageType } from '@helpers/common.helper';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { getLogoDetailsList } from '@services/logo.service';
import ManageLogo from '@templates/ManageLogo';
import { useEffect, useState } from 'react';

const Index = () => {
  const [seType, setSeType] = useState<string>('');
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const customerId = useTypedSelector_v2((state) => state.user.id);
  const [logoList, setLogoList] = useState<LogoList | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 25;
  const [loading, setloading] = useState<boolean>(false);

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
            setloading(false);
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
    let pageType = getPageType(storeId, 'myAccountPage').then((res: any) => {
      if (res) {
        let pageType = res?.config_value ? JSON.parse(res.config_value) : {};
        setSeType(pageType.myAccountTemplateId);
      }
    });
  }, [storeId]);

  useEffect(() => {
    if (storeId && customerId) {
      setloading(true);
      fetchLogoDetails();
    }
  }, [storeId, customerId, currentPage]);

  return (
    <>
      {!loading ? (
        seType && <ManageLogo id={seType} logoList={logoList} />
      ) : (
        <Spinner>{''}</Spinner>
      )}
    </>
  );
};
export { getServerSideProps };
export default Index;
