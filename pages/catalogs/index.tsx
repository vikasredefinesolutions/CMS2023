import { _defaultTemplates } from '@configs/template.config';
import CatalogDisplayBrands from '@templates/Catalogs';
import { NextPage } from 'next';

const ShowCatalogs: NextPage = () => {
  return <CatalogDisplayBrands id={_defaultTemplates.catalogs} />;
};

export default ShowCatalogs;
