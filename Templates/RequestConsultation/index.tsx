import React from 'react';
import RequestConsultationType1 from './RequestConsultationType1';
import {
  _RequestConsultationProps,
  _RequestConsultationTemplates,
} from './requestConsultation';

const requestConsultationTemplates: _RequestConsultationTemplates = {
  type1: RequestConsultationType1,
  type2: RequestConsultationType1,
};

const RequestConsultation: React.FC<
  _RequestConsultationProps & { id: 'type1' }
> = ({ id, ...rest }) => {
  const Component = requestConsultationTemplates[id];
  return <Component {...rest} />;
};

export default RequestConsultation;
