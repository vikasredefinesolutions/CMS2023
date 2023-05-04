import React from 'react';
import PageNotFoundType1 from './pageNotFoundType1';

export interface _PageNotFoundTemplates {
  type1: React.FC;
}

const pageNotFoundTemplates: _PageNotFoundTemplates = {
  type1: PageNotFoundType1,
};

const PageNotFound: React.FC<{ id: 'type1' }> = ({ id }) => {
  const Template = pageNotFoundTemplates[id];
  return <Template />;
};

export default PageNotFound;
