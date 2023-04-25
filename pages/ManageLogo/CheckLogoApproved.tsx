import { _defaultTemplates } from '@configs/template.config';
import CheckLogoApproved from '@templates/CheckLogoApproved';

const index = () => {
  return <CheckLogoApproved id={_defaultTemplates.checkLogoApproved} />;
};

export default index;
