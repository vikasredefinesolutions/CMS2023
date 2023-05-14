import { _CheckLogoTemplates } from './CheckLogoApproved';
import CheckLogoApproved1 from './CheckLogoApproved_Type1';
import CheckLogoApproved2 from './CheckLogoApproved_Type2';
import CheckLogoApproved3 from './CheckLogoApproved_Type3';
import CheckLogoApproved4 from './CheckLogoApproved_Type4';

const CheckLogoTemplates: _CheckLogoTemplates = {
  type1: CheckLogoApproved1,
  type2: CheckLogoApproved2,
  type3: CheckLogoApproved3,
  type4: CheckLogoApproved4,
};
const CheckLogoApproved: React.FC<{ id: string }> = ({ id }) => {
  const CheckLogoTemplate =
    CheckLogoTemplates[(`${id}` as 'type1') || 'type2' || 'type3' || 'type4'];

  return (
    <>
      <CheckLogoTemplate />
    </>
  );
};

export default CheckLogoApproved;
