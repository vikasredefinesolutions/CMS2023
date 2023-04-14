import BrandsListing from '@templates/Brands';
import { NextPage } from 'next';

import { _Brands } from '@definations/APIs/header.res';
import { _Brand } from '@definations/brand';
import { removeDuplicates } from '@helpers/common.helper';
import { FetchBrands } from '@services/header.service';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { _globalStore } from 'store.global';

interface _Props {
  brands: _Brand[] | null;
  alphabets: string[];
}

const Brands: NextPage<_Props> = (props) => {
  return <BrandsListing id={'1'} {...props} />;
};

export default Brands;

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<_Props>
> => {
  const { storeId } = _globalStore;
  let brands: _Brands[] | null = null;
  let alphabets: string[] = [];

  if (storeId) {
    await FetchBrands({ storeId: storeId }).then((result) => {
      if (!result?.brands) {
        return;
      }

      brands = result.brands.sort(
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

      brands = removeDuplicates(brands);
      alphabets = alphabets.filter(
        (item, index) => alphabets.indexOf(item) === index,
      );
    });
  }

  return {
    props: {
      brands: brands,
      alphabets: alphabets,
    },
  };
};
