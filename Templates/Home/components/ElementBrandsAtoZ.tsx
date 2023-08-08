import React from 'react';

import { _Brand } from '@definations/brand';
import { removeDuplicates } from '@helpers/common.helper';
import { FetchBrands } from '@services/header.service';
import { Br_Alphabets } from '@templates/Brands/Brands_type1/components';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { _globalStore } from 'store.global';

interface _Props {
  brands: _Brand[] | null;
  alphabets: string[];
}

const ElementBrandsAtoZ: React.FC<_Props> = (props) => {
  return <Br_Alphabets {...props} />;
};

export default ElementBrandsAtoZ;

export const getServerSideProps: GetServerSideProps = async (
  context,
): Promise<GetServerSidePropsResult<_Props>> => {
  const { storeId } = _globalStore;

  let brands: _Brand[] | null = null;
  let alphabets: string[] = [];

  if (storeId) {
    const albhabetSet = new Set();
    await FetchBrands({ storeId: storeId }).then((result) => {
      if (!result?.brands) {
        return;
      }
      brands = result.brands.sort(
        (a: { brandName: string }, b: { brandName: string }) => {
          albhabetSet.add(a.brandName[0].toLowerCase());
          return a.brandName
            .toLowerCase()
            .localeCompare(b.brandName.toLowerCase());
        },
      );
      if (brands) {
        brands = removeDuplicates(brands);
        brands = brands.map((brd) => {
          const firstLetter = brd.brandName.charAt(0).toUpperCase();
          const remainingLetter = brd.brandName.slice(1);
          return { ...brd, brandName: firstLetter + remainingLetter };
        });
      }

      alphabets = albhabetSet?.size
        ? (Array.from(albhabetSet) as string[])
        : [];
    });
  }
  return {
    props: {
      brands: brands,
      alphabets: alphabets,
    },
  };
};
