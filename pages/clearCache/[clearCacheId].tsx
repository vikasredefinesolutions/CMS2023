import { useTypedSelector_v2 } from '@hooks_v2/index';
import { ClearBrandCache, ClearCategoryCache } from '@services/cache.service';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ClearCacheById = () => {
  const [id, setId] = useState<string | null>('');
  const [cacheId, setCacheId] = useState<null | number>(null);
  const [response, setResponse] = useState<boolean | null>(null);

  const router = useRouter();

  const storeId = useTypedSelector_v2((state) => state.store.id);

  useEffect(() => {
    if (
      router?.query?.clearCacheId &&
      typeof router?.query?.clearCacheId == 'string'
    ) {
      const dynamicArray = router?.query?.clearCacheId.split('=');
      setId(dynamicArray[0]);
      setCacheId(parseInt(dynamicArray[1]));
    }
  }, [router]);

  useEffect(() => {
    if (id == 'brand_id') {
      ClearBrandCache({ storeid: storeId, brandid: cacheId }).then((res) => {
        // console.log(res, 'BrandResponse');
        setResponse(res);
      });
    } else if (id == 'category_id') {
      ClearCategoryCache({ storeid: storeId, categoryid: cacheId }).then(
        (res) => {
          // console.log(res, 'CategoryResponse');
          setResponse(res);
        },
      );
    }
  }, [id, cacheId]);

  return (
    <>{response ? <h1>Response is True</h1> : <h1>Response is False</h1>}</>
  );
};

export default ClearCacheById;
