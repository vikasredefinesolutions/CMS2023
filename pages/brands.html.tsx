import { NextPage } from 'next';

import { _defaultTemplates } from '@configs/template.config';
import { _Brand } from '@definations/brand';
import { _GetPageType } from '@definations/slug.type';
import { removeDuplicates } from '@helpers/common.helper';
import { useActions_v2 } from '@hooks_v2/index';
import { FetchBrands } from '@services/header.service';
import { getPageComponents } from '@services/home.service';
import { FetchPageType } from '@services/slug.service';
import BrandsListingTemplate from '@templates/Brands';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { useEffect } from 'react';
import { _globalStore } from 'store.global';

interface _Props {
  brands: _Brand[] | null;
  alphabets: string[];
  accordian: any;
}

const Brands: NextPage<_Props> = (props) => {
  const { store_CurrentPage } = useActions_v2();

  useEffect(() => {
    store_CurrentPage('BRANDS');
    return () => {
      store_CurrentPage(null);
    };
  }, []);

  return <BrandsListingTemplate id={_defaultTemplates.brands} {...props} />;
};

export default Brands;

export const getServerSideProps: GetServerSideProps = async (
  context,
): Promise<GetServerSidePropsResult<_Props>> => {
  const { storeId } = _globalStore;
  let brands: _Brand[] | null = null;
  let alphabets: string[] = [];
  let accordian: any = [];

  let pageMetaData: _GetPageType | null = null;

  pageMetaData = await FetchPageType({
    storeId: _globalStore.storeId!,
    slug: 'brands',
  });

  if (pageMetaData) {
    accordian = await getPageComponents({
      pageId: pageMetaData.id,
      type: pageMetaData.type,
    });
  }

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
      accordian: accordian,
    },
  };
};
