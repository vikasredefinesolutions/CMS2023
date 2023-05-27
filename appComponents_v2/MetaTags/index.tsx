// import { _GetPageType } from '@type/slug.type';
import TwitterTags from '@appComponents/MetaTags//TwitterTags';
import OgTags from '@appComponents/MetaTags/OgTags';
import { _GetPageType } from '@definations/slug.type';
import React, { useEffect, useState } from 'react';

interface _Props {
  storeName: string | null;
  pageMetaData: _GetPageType | null;
  routepath: string;
}
const Metatags: React.FC<_Props> = (props) => {
  const [routeUrl, setRouteUrl] = useState<string>('');
  useEffect(() => {
    setRouteUrl(window.location.href);
  }, [props.routepath]);
  return (
    <>
      <OgTags
        storeName={props.storeName}
        pageMetaData={props.pageMetaData}
        routeUrl={routeUrl}
      />
      <TwitterTags
        pageMetaData={props.pageMetaData}
        routeUrl={routeUrl}
        storeName={props.storeName}
      />
    </>
  );
};

export default Metatags;
