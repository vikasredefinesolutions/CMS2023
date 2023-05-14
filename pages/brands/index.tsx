import { _Brand } from '@definations/brand';
import { removeDuplicates } from '@helpers/common.helper';
import { FetchBrands } from '@services/brand.service';
import { _globalStore } from 'store.global';

const Brands = (props: any) => {
  return (
    <>
      <Brands props={props} />
    </>
  );
};

export async function getServerSideProps() {
  const { storeId } = _globalStore;

  const brands: _Brand[] = await FetchBrands(`${storeId}`);
  const alphabets: string[] = [];
  const sorted = brands.sort(
    (a: { brandName: string }, b: { brandName: string }) => {
      alphabets.push(a.brandName[0].toLowerCase());
      if (a.brandName > b.brandName) {
        return 1;
      } else if (a.brandName < b.brandName) {
        return -1;
      }
      return 0;
    },
  );
  const nonDuplicates = removeDuplicates(sorted);
  const filtered_alphabets = alphabets.filter(
    (item, index) => alphabets.indexOf(item) === index,
  );

  return {
    props: {
      brands: nonDuplicates,
      alphabets: filtered_alphabets,
    },
  };
}

export default Brands;
