import { _Brand } from '@definations/brand';
import { _Story } from '@definations/story';
import React from 'react';
import SL_TemplateType1 from './SL_TemplateType1';

interface _Props {
  id: string;
  list: _Story[];
  brands: _Brand[];
}

interface _SL_Templates {
  type1: React.FC<Omit<_Props, 'id'>>;
  type2: React.FC<Omit<_Props, 'id'>>;
}

const SL_Templates: _SL_Templates = {
  type1: SL_TemplateType1,
  type2: SL_TemplateType1,
};

const SL_Template: React.FC<_Props> = ({ id, ...rest }) => {
  const Template = SL_Templates[`type${id}` as 'type1' | 'type2'];
  return <Template {...rest} />;
};

export default SL_Template;
