import { paths, __SpecialBreadCrumbsPaths } from '@constants/paths.constant';
import { capitalizeFirstLetter } from '@helpers/common.helper';
import { useTypedSelector_v2 } from '@hooks_v2/index';
import {
  fetchCategoryByCategoryId,
  FetchCategoryByproductId,
} from '@services/product.service';

import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  _breadCrumbs,
  _BreadCrumbTemplates,
  __BreadCrumbTemplatesProps,
} from './breadcrumb';
import BreadCrumb_Type1 from './breadCrumb_Type1';
import BreadCrumb_Type2 from './breadCrumb_Type2';
import BreadCrumb_Type3 from './breadCrumb_Type3';
import BreadCrumb_Type4 from './breadCrumb_Type4';

const BreadCrumbTemplates: _BreadCrumbTemplates = {
  type1: BreadCrumb_Type1,
  type2: BreadCrumb_Type2,
  type3: BreadCrumb_Type3,
  type4: BreadCrumb_Type4,
};

const BreadCrumb: NextPage<__BreadCrumbTemplatesProps> = ({ breadCrumbid }) => {
  const breadCrumbtemplateid = breadCrumbid
    ? (('type' + breadCrumbid) as 'type1' | 'type2' | 'type3' | 'type4')
    : 'type1';
  const BreadCrumbTemplate = BreadCrumbTemplates[breadCrumbtemplateid];
  //   const storeLayout = useTypedSelector_v2((state) => state.store.layout);
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const router = useRouter();
  const pageType = useTypedSelector_v2((state) => state.store.pageType);
  const isCMSpage = useTypedSelector_v2((state) => state.home.isCMS_page);
  const [breadCrumbs, setBreadCrumbs] = useState<_breadCrumbs[]>([]);
  const { id: productId, brand: brandDetails } = useTypedSelector_v2(
    (state) => state.product.product,
  );
  const getBreadCrubs = async () => {
    if (isCMSpage) {
      return [
        { name: 'Home', url: '/' },
        {
          name: capitalizeFirstLetter(pageType?.name || ''),
          url: `${pageType.slug}.html`,
        },
      ];
    } else if (pageType.type === 'brand') {
      return [
        { name: 'Home', url: '/' },
        {
          name: capitalizeFirstLetter(pageType?.name || ''),
          url: `${pageType.slug}.html`,
        },
      ];
    } else if (['product', 'category'].includes(pageType.type)) {
      const categories = await (pageType.type === 'category'
        ? fetchCategoryByCategoryId
        : FetchCategoryByproductId)(~~pageType.id, storeId || 0);
      const breadCrumbs = [{ name: 'Home', url: '/' }];
      if (categories.length > 0) {
        const _categories = categories[0];
        const catNames = _categories.name.split(' > ');
        const catSeNames = _categories.sename.split(' > ');
        catNames.forEach((cate: string, index: number) => {
          breadCrumbs.push({
            name: cate,
            url: `${catSeNames[index].trim()}.html/`,
          });
        });
        if (pageType.type == 'product' && brandDetails?.name) {
          breadCrumbs.push({
            name: capitalizeFirstLetter(brandDetails?.name),
            url: `${brandDetails.brandSEname}.html/?v=brand-product-list`,
          });
        }
      } else {
        breadCrumbs.push({
          name: pageType.slug,
          url: pageType.slug,
        });
      }
      return breadCrumbs;
    } else if (router.pathname == paths.REQUEST_CONSULTATION && productId) {
      const categories = await FetchCategoryByproductId(
        productId,
        storeId || 0,
      );
      const breadCrumbs = [{ name: 'Home', url: '/' }];

      if (categories.length > 0) {
        const _categories = categories[0];
        const catNames = _categories.name.split(' > ');
        const catSeNames = _categories.sename.split(' > ');
        catNames.forEach((cate: string, index: number) => {
          breadCrumbs.push({
            name: cate,
            url: `${catSeNames[index].trim()}.html/`,
          });
        });
      } else {
        breadCrumbs.push({
          name: pageType.slug,
          url: pageType.slug,
        });
      }
      return breadCrumbs;
    }
    return [];
  };

  useEffect(() => {
    let callBreadCrumbAPI = true;

    __SpecialBreadCrumbsPaths.forEach((item) => {
      if (item.path.includes(router.asPath)) {
        callBreadCrumbAPI = false;
        if (item.name) {
          setBreadCrumbs([
            { name: 'Home', url: paths.HOME },
            { name: item.name, url: item.directTo || '' },
          ]);
          return;
        } else {
          setBreadCrumbs([]); // to hide the breadCrumbs
        }
      }
    });

    if (callBreadCrumbAPI) {
      setTimeout(() => {
        getBreadCrubs().then((breadCrumbs) => {
          setBreadCrumbs(breadCrumbs);
        });
      }, 1000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath, pageType.slug, productId]);
  return (
    <BreadCrumbTemplate pageType={pageType.type} breadCrumbs={breadCrumbs} />
  );
};

export default BreadCrumb;
