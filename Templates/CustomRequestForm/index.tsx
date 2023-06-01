import { _CustomeRequestTemplates } from './CustomRequest.d';
import CustomRequest_Type1 from './CustomRequest_Type1';
import CustomRequest_Type2 from './CustomRequest_Type2';
import CustomRequest_Type3 from './CustomRequest_Type3';

const customRequestTemplates: _CustomeRequestTemplates = {
  type1: CustomRequest_Type1,
  type2: CustomRequest_Type2,
  type3: CustomRequest_Type3, //For PKHG
};

const CustomRequestTemplate: React.FC<{ id: string }> = ({ id }) => {
  const Template =
    customRequestTemplates[
      (`type${id}` as 'type1') || 'type2' || 'type3' || 'type4'
    ];
  return <Template />;
};

export default CustomRequestTemplate;
