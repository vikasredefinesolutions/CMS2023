import { _FetchStoreConfigurations } from '@definations/store.type';
import React, { useEffect, useState } from 'react';
interface _props {
  data: _FetchStoreConfigurations | null;
}

const Footer: React.FC<_props> = ({ data: dataFromRoot }) => {
  const [footerHTML, setFooterHTML] =
    useState<_FetchStoreConfigurations | null>(null);

  useEffect(() => {
    if (dataFromRoot) {
      setFooterHTML(dataFromRoot);
    }
  }, [dataFromRoot]);

  return (
    <div className='footer' id='MainFooter'>
      <div
        dangerouslySetInnerHTML={{ __html: footerHTML?.config_value || '' }}
      ></div>
    </div>
  );
};

export default React.memo(Footer);
