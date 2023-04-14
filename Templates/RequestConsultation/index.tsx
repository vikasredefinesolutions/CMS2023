import React from 'react';
import {
  _RequestConsultationProps,
  _RequestConsultationTemplates,
} from './requestConsultation';
import RequestConsultationType1 from './RequestConsultationType1';

const requestConsultationTemplates: _RequestConsultationTemplates = {
  type1: RequestConsultationType1,
  type2: RequestConsultationType1,
};

const RequestConsultation: React.FC<
  _RequestConsultationProps & { id: string }
> = ({ id, ...rest }) => {
  const Component =
    requestConsultationTemplates[`type${id}` as 'type1' | `type2`];
  return <Component {...rest} />;
};

export default RequestConsultation;
