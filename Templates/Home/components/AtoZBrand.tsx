import { _Brand } from '@definations/brand';
import { removeDuplicates } from '@helpers/common.helper';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import { FetchBrands } from '@services/header.service';

import { useEffect, useState } from 'react';
import Br_Alphabets from './Br_Alphabets';

const AtoZBrand = () => {
  const [brands, setBrands] = useState<_Brand[] | null>(null);
  const { id: storeId } = useTypedSelector_v2((state) => state.store);
  const albhabetSet = new Set();
  const [alphabets, setAlphabets] = useState<string[]>([]);

  const getBrands = async () => {
    await FetchBrands({ storeId: storeId }).then((result) => {
      if (!result?.brands) {
        return;
      }
      let brand = result.brands.sort(
        (a: { brandName: string }, b: { brandName: string }) => {
          albhabetSet.add(a.brandName[0].toLowerCase());
          return a.brandName
            .toLowerCase()
            .localeCompare(b.brandName.toLowerCase());
        },
      );
      if (brand) {
        brand = removeDuplicates(brand);
        brand = brand.map((brd) => {
          const firstLetter = brd.brandName.charAt(0).toUpperCase();
          const remainingLetter = brd.brandName.slice(1);
          return { ...brd, brandName: firstLetter + remainingLetter };
        });
      }

      setBrands(brand);

      let alphabet = albhabetSet?.size
        ? (Array.from(albhabetSet) as string[])
        : [];

      setAlphabets(alphabet);
    });
  };

  useEffect(() => {
    if (storeId) {
      getBrands();
    }
  }, [storeId]);
  return (
    <>
      <Br_Alphabets brands={brands} alphabets={alphabets} />
    </>
  );
};

export default AtoZBrand;
