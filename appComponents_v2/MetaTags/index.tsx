// import { _GetPageType } from '@type/slug.type';
import { _GetPageType } from '@definations/slug.type';
import Head from 'next/head';
import React from 'react';
import OgTags from './OgTags';
interface _Props {
  storeName: string | null;
  mediaBaseUrl: string;
  pageMetaData: _GetPageType | null;
  pageUrl: string;
  imageUrl: string;
}
const Metatags: React.FC<_Props> = (props) => {
  return (
    <>
      <Head>
        <link rel='canonical' href={props.pageUrl} />
        <OgTags
          mediaBaseUrl={props.mediaBaseUrl}
          imageUrl={props.imageUrl}
          storeName={props.storeName}
          pageMetaData={props.pageMetaData}
          pageUrl={props.pageUrl}
        />
       
      </Head>
    </>
  );
};

export default Metatags;
