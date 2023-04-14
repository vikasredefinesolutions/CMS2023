import { NextPage } from 'next';
import {
  _YouMayAlsoLikeProps,
  _YouMayAlsoLikeTemplates,
} from './youMayAlsoLike';
import YouMayAlsoLikeType1 from './YouMayAlsoLikeType1';

const YouMayAlsoLikeTemplates: _YouMayAlsoLikeTemplates = {
  type1: YouMayAlsoLikeType1,
  type2: YouMayAlsoLikeType1,
  type3: YouMayAlsoLikeType1,
  type4: YouMayAlsoLikeType1,
};
const YouMayAlsoLike: NextPage<_YouMayAlsoLikeProps> = ({ product, id }) => {
  const YouMayAlsoLikeTemplate =
    YouMayAlsoLikeTemplates[`type${id}` as 'type1'];
  return <YouMayAlsoLikeTemplate productsData={product} />;
};

export default YouMayAlsoLike;
