import { useTypedSelector_v2 } from '@hooks_v2/index';
import { FetchBannerDetails } from '@services/header.service';
import React, { useEffect, useState } from 'react';
import { _BannerProps, _BannerRes, _BannerTemplates } from './Banner';
import BannerType1 from './bannerType1';
import BannerType2 from './bannerType2';
import BannerType3 from './bannerType3';
import BannerType4 from './bannerType4';

const bannerTemplates: _BannerTemplates = {
  type1: BannerType1,
  type2: BannerType2,
  type3: BannerType3,
  type4: BannerType4,
};

const Banner: React.FC<_BannerProps & { id: string }> = ({
  id,
  storeId,
  seType,
  slug,
}) => {
  const Component =
    bannerTemplates[`${id}` as 'type1' | 'type2' | 'type3' | 'type4'];
  const isbrand: boolean = seType === 'brand' ? true : false;
  const [banner, setBanner] = useState<_BannerRes[] | null>(null);
  const [showModal, setShowModal] = useState<string | null>(null);
  const userId = useTypedSelector_v2((state) => state.user.id);
  useEffect(() => {
    if (storeId && slug) {
      FetchBannerDetails({
        storeId: storeId,
        isBrand: isbrand,
        sename: slug,
      }).then((res) => {
        setBanner(res);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId, slug, id]);
  return (
    <Component
      userId={userId}
      banner={banner}
      showModal={showModal}
      setShowModal={setShowModal}
    />
  );
};

export default Banner;
