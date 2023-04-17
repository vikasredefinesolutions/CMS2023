import { NextPage } from 'next';
import { _CompareProductTemplates } from './CompareProduct';
import CompareProduct_Type1 from './CompareProduct_Type1';

const CompareProductTemplates: _CompareProductTemplates = {
  type1: CompareProduct_Type1,
  //   type2: CompareProduct_Type2,
};
const CompareProduct: NextPage<any> = (props) => {
  const CompareProductTemplate = CompareProductTemplates['type1'];
  return <CompareProductTemplate {...props} />;
};

export default CompareProduct;
