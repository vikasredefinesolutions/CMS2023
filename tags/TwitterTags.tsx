import { TwitterTagsData } from '@constants/metatags.mock';
import { _GetPageType } from '@definations/slug.type';
import { useEffect, useState } from 'react';
import { _globalStore } from 'store.global';

interface _Props {
  pageMetaData: _GetPageType | null;
  routepath: string;
  logoUrl: string;
}

const TwitterTags: React.FC<_Props> = (props) => {
  const { pageMetaData, routepath, logoUrl } = props;

  const [routeUrl, setRouteUrl] = useState<string>('');
  useEffect(() => {
    setRouteUrl(window.location.href);
  }, [routepath]);

  return (
    <>
      {_globalStore?.googleTags &&
        _globalStore?.googleTags?.twitterTags?.twitterTagRadio && (
          <>
            <code
              dangerouslySetInnerHTML={{
                __html:
                  _globalStore.googleTags?.twitterTags?.twitterTagTextArea,
              }}
            ></code>
            <meta
              name={`${TwitterTagsData?.tagName}:url`}
              content={`${routeUrl}`}
            />
            <meta
              name={`${TwitterTagsData?.tagName}:title`}
              content={pageMetaData?.meta_Title}
            />
            <meta
              name={`${TwitterTagsData?.tagName}:description`}
              content={pageMetaData?.meta_Description}
            />
            <meta
              name={`${TwitterTagsData?.tagName}:image`}
              content={logoUrl}
            />
          </>
        )}
    </>
  );
};

export default TwitterTags;
