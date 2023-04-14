//import React, { useState, useEffect, useRef } from "react";
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import { useEffect, useState } from 'react';

import * as helper from '@templates/Home/components/Helper';

const Home = (props) => {
  const pageData = props.props?.pageData;
  const [componentHtml, setComponentHtml] = useState([]);
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const { topic_set_isCMS } = useActions_v2();

  // const pathArray = document.location.pathname.split('/');
  // const slug = pathArray.at(-1);
  // const [pageData, setPageData] = useState([]);

  // const [componentHtml, setComponentHtml] = useState([]);



  useEffect(() => {
    componentHtml?.map((element, index) => {
      //let x = ReactDOM.findDOMNode(refArray.current[element.uid]);
      //  x.querySelectorAll('#div'+element.no)[0].innerHTML = element.uid;
      helper.updateSetProperties(element, index);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentHtml]);

  const storeTypeId = useTypedSelector_v2((state) => state.store.storeTypeId);
  return (
    <>
   helo
    </>
  );
};

export default Home;
