//import React, { useState, useEffect, useRef } from "react";
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import { useEffect, useState } from 'react';


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
    topic_set_isCMS(true);
    return () => {
      topic_set_isCMS(false);
    };
  }, []);

  useEffect(() => {
    // let pageId = pageData.id;
    // document.title = pageData?.seTitle;
    if (pageData.components !== undefined) {
      setComponentHtml(pageData?.components);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData]);

  // const getPageData = (pageId) => {
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },u
  //     body: {}

  //   };

  //   fetch(
  //     `https://www.redefinecommerce.net/API/api/topics/${pageId}`,
  //     requestOptions,
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.success) {
  //          setPageData(data.data);
  //       }
  //     });
  //}

  const loadBackgroundDefault = (element) => {
    if (element.selectedVal != undefined) {
      if (Object.keys(element.selectedVal).length > 0) {
        const bgPropertyName = 'bg';
        // Object.keys(JSON.parse(element.properties)).find(
        //   (key) => JSON.parse(element.properties)[key] === 'background',
        // );

        let attributes;
        Object.entries(element.selectedVal).map(([key, value]) => {
          if (key == bgPropertyName) {
            attributes = value;
          }
        });

        if (attributes != undefined && Object.keys(attributes).length > 0) {
          if (attributes.type == 'color') {
            return attributes.value;
          } else if (attributes.type == 'image') {
            return 'url(\'' + attributes.value + '\')';
          } else if (attributes.type == 'none') {
            return 'none';
          }
        }
      }

      return 'none';
    }
    return 'none';
  };

  const loadBackgroundType = (element) => {
    if (element.selectedVal != undefined) {
      if (Object.keys(element.selectedVal).length > 0) {
        const bgPropertyName = 'bg';
        // Object.keys(JSON.parse(element.properties)).find(
        //   (key) => JSON.parse(element.properties)[key] === 'background',
        // );

        let attributes;
        Object.entries(element.selectedVal).map(([key, value]) => {
          if (key == bgPropertyName) {
            attributes = value;
          }
        });

        if (attributes != undefined && Object.keys(attributes).length > 0) {
          return attributes.type;
        }
        else {
          return '';
        }
      }

      return '';
    }
    return '';
  };

    const loadBackgroundDefaultStyle = (element) => {
      
      if (element.selectedVal != undefined) {
        if (Object.keys(element.selectedVal).length > 0) {
          const bgPropertyName = 'bg';

          let attributes;
          Object.entries(element.selectedVal).map(
            ([key, value]) => {
              
              if (key == bgPropertyName+'_bg_style')
              {
                attributes = value;
              } 
            }
          );


          if (attributes != undefined && Object.keys(attributes).length > 0) {
              if(attributes.value === 'fullbg')
              {
                  return 'outer';
              }
              else
              {
                  return 'inner';
              }
          }
        }

        return 'outer';
      }
      return 'outer';
  }

  const loadBackgroundImageClass = (element) => {
      
      if (element.selectedVal != undefined) {
        if (Object.keys(element.selectedVal).length > 0) {
          const bgPropertyName = 'bg';

          let attributes;
          Object.entries(element.selectedVal).map(
            ([key, value]) => {
              
              if (key == bgPropertyName)
              {
                attributes = value;
              } 
            }
          );

          let bgType = '';
          
          if (attributes != undefined && Object.keys(attributes).length > 0) {
            if (attributes.type == 'image') {
              bgType = 'image';
            }
          }
          if(bgType === 'image')
          {
            let imageClass = '';
            
            if('bg_bg_image_style' in element.selectedVal)
            {
              imageClass += ' ' + element.selectedVal.bg_bg_image_style.value;                                                          
            }
            if('bg_bg_image_position' in element.selectedVal)
            {
              imageClass += ' ' + element.selectedVal.bg_bg_image_position.value;                                                          
            }
            return imageClass;
          }
        }

        return '';
      }
      return '';
  }

  useEffect(() => {
    componentHtml?.map((element, index) => {
      //let x = ReactDOM.findDOMNode(refArray.current[element.uid]);
      //  x.querySelectorAll('#div'+element.no)[0].innerHTML = element.uid;
     // helper.updateSetProperties(element, index);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentHtml]);

  const storeTypeId = useTypedSelector_v2((state) => state.store.storeTypeId);
  return ("HELLO"
  );
};

export default Home;
