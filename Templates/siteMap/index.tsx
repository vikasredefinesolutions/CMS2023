import { _Brand } from '@definations/brand';
import { useActions_v2 } from '@hooks_v2/index';
import { FetchBrands, FetchSiteMapCategories } from '@services/brand.service';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import {
  _CategorySiteMap,
  _siteMapProps,
  _siteMapTemplates,
} from './siteMapTypes';
import SiteMap_Type1 from './siteMap_Type1';
import { SiteMap_Type2 } from './siteMap_Type2';

const siteMapTemplates: _siteMapTemplates = {
  type1: SiteMap_Type1,
  type2: SiteMap_Type2,
};
const SiteMap: NextPage<_siteMapProps> = ({ id, store }) => {
  const { setShowLoader } = useActions_v2();
  const [brandItems, setBrandItems] = useState<_Brand[]>([]);
  const [categories, setCategories] = useState<_CategorySiteMap[]>([]);
  useEffect(() => {
    setShowLoader(true);
    if (store?.storeId) {
      FetchBrands('' + store.storeId).then((res) => {
        setBrandItems(res);
      });

      FetchSiteMapCategories(store.storeId).then((res) => {
        setCategories(res);
      });
    }
    setShowLoader(false);
  }, [store?.storeId]);
  if (!brandItems) {
    return <>No data found</>;
  }

  const SiteMapTemplate = siteMapTemplates[id];
  return <SiteMapTemplate brandItems={brandItems} categories={categories} />;
};

export default SiteMap;
