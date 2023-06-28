import SeoHead from '@appComponents/reUsable/SeoHead';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import Home from '@templates/Home';
import CatalogDisplayBrandsType1 from './catalogsType1';
import CatalogDisplayBrandsType2 from './catalogsType2';
import CatalogDisplayBrandsType3 from './catalogsType3';
import CatalogDisplayBrandsType4 from './catalogsType4';

const DisplayBrands = {
  type1: CatalogDisplayBrandsType1,
  type2: CatalogDisplayBrandsType2,
  type3: CatalogDisplayBrandsType3,
  type4: CatalogDisplayBrandsType4,
};
const CatalogDisplayBrands: React.FC<{ id: string, props: any }> = ({ id, props }) => {
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const storeCode = useTypedSelector_v2((state) => state.store.code);

  const CatalogDisplayBrandsComp =
    DisplayBrands[(`${id}` as 'type1') || 'type2' || 'type3' || 'type4'];

  return (
    <>
    <SeoHead
        title={props?.metaData?.meta_Title}
        description={props?.metaData?.meta_Description}
        keywords={props?.metaData?.meta_Keywords}
      />
      {storeCode === 'DI' ? <CatalogDisplayBrandsComp storeId={storeId} /> :
      <Home
        props={{
          pageData: { components: props?.accordian },
          pageType: 'Topic',
          slug: 'catalogs.html',
        }}
      />
      }

    </>
  );
};

export default CatalogDisplayBrands;
