import { useEffect, useState } from 'react';
interface _Props {
  
}

const CanonicalTag: React.FC<_Props>  = () => {
  const [routeUrl, setRouteUrl] = useState<string>('');
  useEffect(() => {
    setRouteUrl(window.location.href);
  }, []);

  return (
    <>
      <link rel="canonical" href={`${routeUrl}`} />
        
    </>
  );
};

export default CanonicalTag;
