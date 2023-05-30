import { useTypedSelector_v2 } from '@hooks_v2/index';
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
const CatalogDisplayBrands: React.FC<{ id: string }> = ({ id }) => {
  const storeId = useTypedSelector_v2((state) => state.store.id);
  console.log('HERE', storeId, id);
  const CatalogDisplayBrandsComp =
    DisplayBrands[(`${id}` as 'type1') || 'type2' || 'type3' || 'type4'];

  return (
    <>
      <CatalogDisplayBrandsComp storeId={storeId} />
    </>
  );
};

export default CatalogDisplayBrands;
