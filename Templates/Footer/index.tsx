import { _Footer } from '@definations/APIs/footer.res';
import React, { useEffect, useState } from 'react';
interface _props {
  data: _Footer | null;
}

const Footer: React.FC<_props> = ({ data: dataFromRoot }) => {
  const [footerHTML, setFooterHTML] = useState<_Footer | null>(null);

  useEffect(() => {
    if (dataFromRoot) {
      setFooterHTML(dataFromRoot);
    }
  }, [dataFromRoot]);

  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: footerHTML?.config_value || '' }}
      ></div>
    </>
  );
};

export default React.memo(Footer);
