//import React, { useState, useEffect, useRef } from "react";
import ShareIcons from '@appComponents/SocialShare';
import { paths } from '@constants/paths.constant';
import BrandsTabbing from '@templates/Home/components/BrandsTabbing';
import DIHomePage from '@templates/Home/components/DIHomePage';
import ElementAccordionDisplay from '@templates/Home/components/ElementAccordionDisplay';
import ElementCarouselDisplay from '@templates/Home/components/ElementCarouselDisplay';
import ElementFullSlider from '@templates/Home/components/ElementFullSlider';
import FeaturedProducts from '@templates/Home/components/FeaturedProducts';
import * as helper from '@templates/Home/components/Helper';
import { useActions_v2, useTypedSelector_v2 } from 'hooks_v2';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AtoZBrand from './components/AtoZBrand';

// import AOS from 'aos';
// import 'aos/dist/aos.css';

const Home = (props) => {
  const pageData = props.props?.pageData;
  const [componentHtml, setComponentHtml] = useState([]);
  const storeId = useTypedSelector_v2((state) => state.store.id);
  const { topic_set_isCMS } = useActions_v2();
  const router = useRouter();
  const storeCode = useTypedSelector_v2((state) => state.store.code);
  const [count, setCount] = useState(0);
  let cont = 0;
  const storeLogo = useTypedSelector_v2(
    (state) => state.store.mediaBaseUrl + state.store.logoUrl,
  );

  useEffect(() => {
    document.body.classList.remove('product_details');
    if (router.asPath === paths.HOME) {
      document.body.classList.add('index-page');
      topic_set_isCMS(true);
    }

    return () => {
      topic_set_isCMS(false);
    };
  }, []);

  // useEffect(() => {
  //   AOS.init();
  //   AOS.refresh();
  // }, []);

  useEffect(() => {
    // let pageId = pageData.id;
    // document.title = pageData?.seTitle;
    if (pageData?.components !== undefined) {
      setComponentHtml(
        pageData?.components?.filter(
          (component) => component.visibility !== 'Off',
        ),
      );
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
            return "url('" + attributes.value + "')";
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
        } else {
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
        Object.entries(element.selectedVal).map(([key, value]) => {
          if (key == bgPropertyName + '_bg_style') {
            attributes = value;
          }
        });

        if (attributes != undefined && Object.keys(attributes).length > 0) {
          if (attributes.value === 'fullbg') {
            return 'outer';
          } else {
            return 'inner';
          }
        }
      }

      return 'outer';
    }
    return 'outer';
  };

  const checkFixedBG = (element) => {
    if (element.selectedVal != undefined) {
      if (Object.keys(element.selectedVal).length > 0) {
        const bgPropertyName = Object.keys(element.properties).find(
          (key) => key === 'bg',
        );

        let attributes;
        let fixedBg;
        Object.entries(element.selectedVal).map(([key, value]) => {
          if (key == bgPropertyName) {
            attributes = value;
          }
          if (key == bgPropertyName + '_fixed_bg') {
            fixedBg = value;
          }
        });

        if (attributes != undefined && Object.keys(attributes).length > 0) {
          if (attributes.type == 'color') {
            return false;
          } else if (attributes.type == 'image') {
            if (fixedBg && fixedBg.value) {
              return true;
            }
          } else if (attributes.type == 'none') {
            return false;
          }
        }
      }

      return false;
    }
    return false;
  };

  const loadBackgroundImageClass = (element) => {
    if (element.selectedVal != undefined) {
      if (Object.keys(element.selectedVal).length > 0) {
        const bgPropertyName = 'bg';

        let attributes;
        Object.entries(element.selectedVal).map(([key, value]) => {
          if (key == bgPropertyName) {
            attributes = value;
          }
        });

        let bgType = '';

        if (attributes != undefined && Object.keys(attributes).length > 0) {
          if (attributes.type == 'image') {
            bgType = 'image';
          }
        }
        if (bgType === 'image') {
          let imageClass = '';

          if ('bg_bg_image_style' in element.selectedVal) {
            imageClass += ' ' + element.selectedVal.bg_bg_image_style.value;
          }
          if ('bg_bg_image_position' in element.selectedVal) {
            imageClass += ' ' + element.selectedVal.bg_bg_image_position.value;
          }
          return imageClass;
        }
      }

      return '';
    }
    return '';
  };

  useEffect(() => {
    if (document.readyState === 'complete') {
      // let x = document.querySelectorAll('#allContents')[0];
      // x.classList.remove('hidden');
    }
  }, []);

  useEffect(() => {
    componentHtml?.map((element, index) => {
      //let x = ReactDOM.findDOMNode(refArray.current[element.uid]);
      //  x.querySelectorAll('#div'+element.no)[0].innerHTML = element.uid;
      helper.updateSetProperties(element, index);
    });
    let x = document.querySelectorAll('#allContents')[0];
    if (x) {
      x.classList.remove('hidden');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentHtml]);

  const storeTypeId = useTypedSelector_v2((state) => state.store.storeTypeId);

  // const isUpperCase = (string) => /[A-Z]/.test(string)
  // console.log(isUpperCase('bcc'));
  return (
    <>
      {storeCode === 'DI' &&
      (props.props.slug === '/' || props.props.slug === '') ? (
        <>
          <DIHomePage storeId={storeId}></DIHomePage>
        </>
      ) : (
        <>
          <div className='hidden' id='allContents'>
            {/* {featuredItems?.products && (
          <FeaturedItems
            brands={__constant._Home.featuredItems.brands}
            products={featuredItems.products}
          />          
        )}*/}
            <main key={props.props?.slug}>
              {pageData?.components &&
              pageData?.components.filter(
                (component) => component.visibility !== 'off',
              ).length > 0 ? (
                pageData.components
                  .filter((component) => component.visibility !== 'off')
                  .map((componentValue, index) => {
                    /* Code for hidden component */
                    if (typeof componentValue.selectedVal == 'string') {
                      componentValue.selectedVal = JSON.parse(
                        componentValue.selectedVal,
                      );
                    }
                    if (typeof componentValue.properties == 'string') {
                      componentValue.properties = JSON.parse(
                        componentValue.properties,
                      );
                    }

                    const backgroundDefault =
                      loadBackgroundDefault(componentValue);
                    const backgroundStyle =
                      loadBackgroundDefaultStyle(componentValue);
                    const backgroundImageClass =
                      loadBackgroundImageClass(componentValue);
                    const fixedBgDisplay = checkFixedBG(componentValue);
                    let additionalclass = '';
                    let additionalclass1 = '';
                    let innerDivClass = '';
                    if (
                      componentValue.selectedVal &&
                      'additionalclass' in componentValue.selectedVal
                    ) {
                      additionalclass1 =
                        componentValue.selectedVal.additionalclass.value;
                    }
                    if (
                      componentValue.selectedVal &&
                      'container' in componentValue.selectedVal
                    ) {
                      if (
                        componentValue.selectedVal.container.value == 'w-full'
                      )
                        additionalclass += ' container-fluid';
                      else
                        additionalclass +=
                          ' ' +
                          componentValue.selectedVal.container.value +
                          ' mx-auto ';
                    } else {
                      additionalclass += ' container mx-auto ';
                    }
                    if (
                      componentValue.selectedVal &&
                      'container_left_padding' in componentValue.selectedVal
                    ) {
                      innerDivClass +=
                        ' ' +
                        componentValue.selectedVal.container_left_padding.value;
                    }
                    if (
                      componentValue.selectedVal &&
                      'container_top_padding' in componentValue.selectedVal
                    ) {
                      innerDivClass +=
                        ' ' +
                        componentValue.selectedVal.container_top_padding.value;
                    }
                    if (
                      componentValue.selectedVal &&
                      'container_right_padding' in componentValue.selectedVal
                    ) {
                      innerDivClass +=
                        ' ' +
                        componentValue.selectedVal.container_right_padding
                          .value;
                    }
                    if (
                      componentValue.selectedVal &&
                      'container_bottom_padding' in componentValue.selectedVal
                    ) {
                      innerDivClass +=
                        ' ' +
                        componentValue.selectedVal.container_bottom_padding
                          .value;
                    }
                    if (
                      componentValue.selectedVal &&
                      'container_left_margin' in componentValue.selectedVal
                    ) {
                      innerDivClass +=
                        ' ' +
                        componentValue.selectedVal.container_left_margin.value;
                    }
                    if (
                      componentValue.selectedVal &&
                      'container_top_margin' in componentValue.selectedVal
                    ) {
                      innerDivClass +=
                        ' ' +
                        componentValue.selectedVal.container_top_margin.value;
                    }
                    if (
                      componentValue.selectedVal &&
                      'container_right_margin' in componentValue.selectedVal
                    ) {
                      innerDivClass +=
                        ' ' +
                        componentValue.selectedVal.container_right_margin.value;
                    }
                    if (
                      componentValue.selectedVal &&
                      'container_bottom_margin' in componentValue.selectedVal
                    ) {
                      innerDivClass +=
                        ' ' +
                        componentValue.selectedVal.container_bottom_margin
                          .value;
                    }

                    let componentName = 'div' + componentValue.no;
                    if (
                      componentValue.selectedVal &&
                      'componentname' in componentValue.selectedVal
                    ) {
                      componentName =
                        componentValue.selectedVal.componentname.value;
                    }

                    return (
                      <div
                        key={index}
                        className={`w-full mx-auto ${
                          componentValue.visibility == 'off' ? 'hidden' : ''
                        } ${
                          backgroundStyle === 'outer'
                            ? backgroundImageClass
                            : ''
                        }  ${additionalclass1}`}
                        style={
                          loadBackgroundType(componentValue) == 'image'
                            ? {
                                backgroundImage:
                                  backgroundStyle === 'outer'
                                    ? backgroundDefault
                                    : 'none',
                                backgroundAttachment:
                                  backgroundStyle === 'outer'
                                    ? fixedBgDisplay
                                      ? 'fixed'
                                      : 'inherit'
                                    : 'inherit',
                              }
                            : {
                                background:
                                  backgroundStyle === 'outer'
                                    ? backgroundDefault
                                    : 'none',
                              }
                        }
                        name={componentName}
                        id={`div${componentValue.no}`}
                        // ref={ref => {
                        //     refArray.current[componentValue.uid] = ref; // took this from your guide's example.
                        // }}
                      >
                        <section className={`${additionalclass}`}>
                          <div
                            className={`${innerDivClass} ${
                              backgroundStyle === 'inner'
                                ? backgroundImageClass
                                : ''
                            }`}
                            style={
                              loadBackgroundType(componentValue) == 'image'
                                ? {
                                    backgroundImage:
                                      backgroundStyle === 'inner'
                                        ? backgroundDefault
                                        : 'none',
                                    backgroundAttachment:
                                      backgroundStyle === 'inner'
                                        ? fixedBgDisplay
                                          ? 'fixed'
                                          : 'inherit'
                                        : 'inherit',
                                  }
                                : {
                                    background:
                                      backgroundStyle === 'inner'
                                        ? backgroundDefault
                                        : 'none',
                                  }
                            }
                          >
                            {Object.keys(componentValue.properties).includes(
                              'PlainText',
                            ) ? (
                              <>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      componentValue.selectedVal?.PlainText
                                        ?.value,
                                  }}
                                />
                              </>
                            ) : (
                              <>
                                {Object.keys(
                                  componentValue.properties,
                                ).includes('socialshare') ? (
                                  <>
                                    <ShareIcons mediaURL={storeLogo} />
                                  </>
                                ) : (
                                  <>
                                    {Object.keys(
                                      componentValue.selectedVal,
                                    ).includes('featuredproducts') ? (
                                      <>
                                        <FeaturedProducts
                                          dataArr={componentValue.selectedVal}
                                          featuredItems={
                                            props?.featuredItems?.products[
                                              cont++
                                            ]
                                          }
                                          count={count}
                                          setCount={setCount}
                                        />
                                      </>
                                    ) : (
                                      <>
                                        {Object.keys(
                                          componentValue.selectedVal,
                                        ).includes('carousel') ? (
                                          <>
                                            <ElementCarouselDisplay
                                              bannerArr={
                                                componentValue.selectedVal
                                                  .carousel.value
                                              }
                                            />
                                          </>
                                        ) : (
                                          <>
                                            {Object.keys(
                                              componentValue.selectedVal,
                                            ).includes('FullAccordion') ? (
                                              <>
                                                {componentValue?.selectedVal
                                                  ?.Title?.value && (
                                                  <div
                                                    class='text-box-h2 mb-4'
                                                    id='Title'
                                                  >
                                                    {componentValue.selectedVal
                                                      .Title.value ?? ''}
                                                  </div>
                                                )}
                                                <ul className='w-full'>
                                                  <ElementAccordionDisplay
                                                    selected_Values={
                                                      componentValue.selectedVal
                                                    }
                                                    acValues={
                                                      componentValue.selectedVal
                                                        .FullAccordion.value
                                                    }
                                                  />
                                                </ul>
                                              </>
                                            ) : (
                                              <>
                                                {Object.keys(
                                                  componentValue.selectedVal,
                                                ).includes('slickslider') ? (
                                                  <>
                                                    <ElementFullSlider
                                                      bannerArr={
                                                        componentValue
                                                          .selectedVal
                                                          .slickslider.value
                                                      }
                                                    />
                                                  </>
                                                ) : (
                                                  <>
                                                  {
                                                    Object.keys(componentValue.properties).includes("BrandsAtoZ") ? <>
                                                    <AtoZBrand />
                                                    </>
                                                  : (
                                                    <>
                                                    {
                                                      Object.keys(componentValue.properties).includes("brandtabbing") ? <>
                                                      <BrandsTabbing componentValue={componentValue} />
                                                      </> : (

                                                    <div
                                                      className={
                                                        componentValue.uuid
                                                      }
                                                      dangerouslySetInnerHTML={{
                                                        __html:
                                                          componentValue.html
                                                            .replace(
                                                              '"https://pkheadlessstorage.blob.core.windows.net/storagemedia/1/store/gray-500-horizontal.png"',
                                                              '""',
                                                            )
                                                            .replace(
                                                              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque massa nibh, pulvinar vitae aliquet nec, accumsan aliquet orci.',
                                                              '',
                                                            )
                                                            .replace(
                                                              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
                                                              '',
                                                            )
                                                            .replace(
                                                              's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                                                              '',
                                                            ),
                                                      }}
                                                    ></div>
                                                      )
                                                    }
                                                    
                                                    </>)}
                                                  </>
                                                )}
                                              </>
                                            )}
                                          </>
                                        )}
                                      </>
                                    )}{' '}
                                  </>
                                )}
                              </>
                            )}
                          </div>
                        </section>
                      </div>
                    );

                    // return <div key={index} className="text-center p-5 border my-2" dangerouslySetInnerHTML={{ __html: comphtml }}></div>
                  })
              ) : (
                <>
                  <section className='mainsection taillwind_content_block_22'></section>
                </>
              )}
              
            </main>
          </div>
          <div
            id='wrapperloading'
            style={{ position: 'fixed', zIndex: '10000000' }}
          >
            <div id='loading'></div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;

Home.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};