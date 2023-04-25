import { _defaultTemplates } from '@configs/template.config';
import { NextPage } from 'next';
import YouMayAlsoLikeType1 from './YouMayAlsoLikeType1';
import {
  _YouMayAlsoLikeProps,
  _YouMayAlsoLikeTemplates,
} from './youMayAlsoLike';

const YouMayAlsoLikeTemplates: _YouMayAlsoLikeTemplates = {
  type1: YouMayAlsoLikeType1,
  type2: YouMayAlsoLikeType1,
  type3: YouMayAlsoLikeType1,
  type4: YouMayAlsoLikeType1,
};
const YouMayAlsoLike: NextPage<_YouMayAlsoLikeProps> = ({ product, id }) => {
  const YouMayAlsoLikeTemplate =
    YouMayAlsoLikeTemplates[_defaultTemplates.youMayAlsoLike];
  return <YouMayAlsoLikeTemplate productsData={product} />;
};

export default YouMayAlsoLike;
