import { _defaultTemplates } from '@configs/template.config';
import { NextPage } from 'next';
import {
  _YouMayAlsoLikeProps,
  _YouMayAlsoLikeTemplates,
} from './youMayAlsoLike';
import YouMayAlsoLikeType1 from './YouMayAlsoLikeType1';
import YouMayAlsoLikeType2 from './YouMayAlsoLikeType2';

const YouMayAlsoLikeTemplates: _YouMayAlsoLikeTemplates = {
  type1: YouMayAlsoLikeType1,
  type2: YouMayAlsoLikeType2,
  type3: YouMayAlsoLikeType1,
  type4: YouMayAlsoLikeType1,
};
const YouMayAlsoLike: NextPage<_YouMayAlsoLikeProps> = ({ product, id }) => {
  const YouMayAlsoLikeTemplate =
    YouMayAlsoLikeTemplates[
      id
        ? (`type1` as 'type1' | 'type2' | 'type3' | 'type4')
        : _defaultTemplates.youMayAlsoLike
    ];
  return <YouMayAlsoLikeTemplate productsData={product} />;
};

export default YouMayAlsoLike;
