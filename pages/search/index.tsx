import { _defaultTemplates } from '@configs/template.config';
import ShowSearchPage from '@templates/Search';
import { NextPage } from 'next';

const ShowSearch: NextPage = () => {
  return <ShowSearchPage id={_defaultTemplates.catalogs} />;
};

export default ShowSearch;
