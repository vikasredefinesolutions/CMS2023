import { TwitterTagsData } from '@constants/metatags.mock';
import { _GetPageType } from '@definations/slug.type';
import { _globalStore } from 'store.global';

interface _Props {
  pageMetaData: _GetPageType | null;
  pageUrl: string;
  logoUrl: string;
}

const TwitterTags: React.FC<_Props> = (props) => {
  const { pageMetaData, pageUrl, logoUrl } = props;

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
            <meta name={`${TwitterTagsData?.tagName}:url`} content={pageUrl} />
            <meta
              name={`${TwitterTagsData?.tagName}:title`}
              content={
                pageMetaData?.twitterOpenGraphTitle ||
                pageMetaData?.meta_Title ||
                ''
              }
            />
            <meta
              name={`${TwitterTagsData?.tagName}:description`}
              content={
                pageMetaData?.twitterOpenGraphDescription ||
                pageMetaData?.meta_Description ||
                ''
              }
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
