import React, { useState } from "react";

interface _props {
  url: string;
  alt: string;
}

const ListingImage: React.FC<_props> = ({url, alt}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const changeImageLoaded = () => {
    setImageLoaded(false)
  }

  return (
    <>
    <img src={url} alt={alt} className={`${!imageLoaded && "hidden"} max-h-[348px] !inline-black m-auto`} />
    {/* <img src={url} alt={alt} className={`${!imageLoaded && "hidden"} max-h-[348px] !inline-black m-auto`} onLoad={changeImageLoaded} />  */}
    {/* {!imageLoaded && <img src={'./default.gif'} alt={alt} className='max-h-[348px] !inline-black m-auto' /> } */}
  </>
    );
};

export default ListingImage;

