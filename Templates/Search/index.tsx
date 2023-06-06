import { useTypedSelector_v2 } from '@hooks_v2/index';
import Script from 'next/script';

const ShowSearchPage: React.FC<{ id: string }> = ({ id }) => {
  const storeId = useTypedSelector_v2((state) => state.store.id);
  

  return (
    <>
        <head>
          <Script dangerouslySetInnerHTML={{ __html: "https://js.klevu.com/core/v2/klevu.js"}}></Script>
          <Script dangerouslySetInnerHTML={{ __html: "https://js.klevu.com/theme/default/v2/quick-search.js"}}></Script>
          <Script dangerouslySetInnerHTML={{ __html: "https://js.klevu.com/theme/default/v2/search-results-page.js"}}></Script>

        </head>
    </>
  );
};

export default ShowSearchPage;
