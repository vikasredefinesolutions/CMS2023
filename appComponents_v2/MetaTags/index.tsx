// import { _GetPageType } from '@type/slug.type';
import { __domain } from '@configs/page.config';
import { _GetPageType } from '@definations/slug.type';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
interface _Props {
  storeName: string | null;
  pageMetaData: _GetPageType | null;
  routepath: string;
}
const Metatags: React.FC<_Props> = (props) => {
  const router = useRouter();
 
  return (
    <>
      <Head>
        <link rel='canonical' href={`https://${__domain.localDomain}${router.asPath}`} />
      </Head>
    </>
  );
};

export default Metatags;
