import { _Brand } from '@definations/brand';
import { _Story } from '@definations/story';
import React from 'react';
import SL_TemplateType1 from './SL_TemplateType1';

interface _Props {
  id: 'type1';
  list: _Story[];
  brands: _Brand[];
}

interface _SL_Templates {
  type1: React.FC<Omit<_Props, 'id'>>;
}

const SL_Templates: _SL_Templates = {
  type1: SL_TemplateType1,
};

const SL_Template: React.FC<_Props> = ({ id, ...rest }) => {
  const Template = SL_Templates[id];
  return <Template {...rest} />;
};

export default SL_Template;
