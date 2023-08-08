import { OgTagsData } from '@constants/metatags.mock';
import { _GetPageType } from '@definations/slug.type';
interface _Props {
  storeName: string | null;
  pageMetaData: _GetPageType | null;
  pageUrl: string;
  imageUrl: string;
  mediaBaseUrl: string;
}

const OgTags: React.FC<_Props> = ({
  storeName,
  pageMetaData,
  mediaBaseUrl,
  pageUrl,
  imageUrl,
}) => {
  return (
    <>
      {/* {_globalStore?.googleTags &&
        _globalStore?.googleTags?.dcTags?.dcTagRadio && ( */}
      <>
        <meta
          property='og:description'
          content={
            pageMetaData?.facebookOpenGraphDescription ||
            pageMetaData?.openGraphDescription ||
            pageMetaData?.meta_Description ||
            ''
          }
        />
        <meta property='og:longitude' content={OgTagsData.longitude} />
        <meta
          property='og:street-address'
          content={OgTagsData.street_address}
        />
        <meta property='og:locality' content={OgTagsData.locality} />
        <meta property='og:region' content={OgTagsData.region} />

        <meta property='og:postal_code' content={OgTagsData.postal_code} />
        <meta property='og:country_name' content={OgTagsData.country_name} />
        <meta
          property='og:title'
          content={
            pageMetaData?.facebookOpenGraphTitle ||
            pageMetaData?.openGraphTitle ||
            pageMetaData?.meta_Title ||
            ''
          }
        />
        <meta
          property='og:image'
          content={`${mediaBaseUrl}${
            pageMetaData?.facebookImagePath ||
            pageMetaData?.openGraphImagePath ||
            imageUrl ||
            ''
          }`}
        />
        <meta property='cor' content={pageUrl} />
        <meta property='og:locale' content='en_US' />
        <meta property='og:site_name' content={storeName || ''} />
        <meta property='og:latitude' content={OgTagsData.latitude} />
        <meta property='og:type' content='website' />
      </>
      {/* )} */}
    </>
  );
};

export default OgTags;
