import {
  CG_STORE_CODE,
  DI_STORE_CODE,
  GG_STORE_CODE,
  PKHG_STORE_CODE,
  PTML_STORE_CODE
} from '@constants/global.constant';
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { _globalStore } from 'store.global';

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => App,
      });

    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

 
  render() {
    const showGTM = _globalStore.domain.includes('online');
   
  
    return (
      <Html lang='en'>
        <link
          rel='shortcut icon'
          href={`${_globalStore.blobUrl}${_globalStore.favicon}`}
        />
        <Head>
          <>
            {_globalStore.topHeaderScriptGTM &&
              _globalStore.storeId === CG_STORE_CODE && (
                <script
                  type='text/javascript'
                  dangerouslySetInnerHTML={{
                    __html: _globalStore.topHeaderScriptGTM,
                  }}
                ></script>
              )}

            {_globalStore.homePageScriptGTM &&
              _globalStore.storeId === CG_STORE_CODE && (
                <script
                  type='text/javascript'
                  dangerouslySetInnerHTML={{
                    __html: _globalStore.homePageScriptGTM,
                  }}
                ></script>
              )}

            {_globalStore.googleFonts && (
              <code
                dangerouslySetInnerHTML={{ __html: _globalStore.googleFonts }}
              ></code>
            )}
            {_globalStore.customHeadScript && (
              <script
                dangerouslySetInnerHTML={{
                  __html: _globalStore.customHeadScript,
                }}
              ></script>
            )}
            {_globalStore.customGoogleVerification &&
              _globalStore.storeId !== CG_STORE_CODE && (
                <script
                  dangerouslySetInnerHTML={{
                    __html: _globalStore.customGoogleVerification,
                  }}
                ></script>
              )}
            {/* <link
            rel='stylesheet'
            type='text/css'
            href={`${_globalStore.blobUrl}/${
              _globalStore.blobUrlRootDirectory
            }/${_globalStore.companyId}/store/main.css?${Math.random()}`}
          /> */}
            <link
              rel='preload stylesheet'
              as='style'
              type='text/css'
              href={`/assets/css/main.css?${Math.random()}`}
            />
            <link
              rel='preload stylesheet'
              as='style'
              type='text/css'
              href={`/assets/css/tailwin-css.css?${Math.random()}`}
            />
            <link
              rel='preload stylesheet'
              as='style'
              type='text/css'
              href={`${_globalStore.blobUrl}/${
                _globalStore.blobUrlRootDirectory
              }/${_globalStore.companyId}/store/${_globalStore.storeId}/css/${
                _globalStore.code === 'BCGG'
                  ? _globalStore.bacardiSelectedStore === 'Bacardi'
                    ? `${_globalStore.storeId}-${1}`
                    : `${_globalStore.storeId}-${2}`
                  : _globalStore.storeId
              }.css?${Math.random()}`}
            />
            {/* <link
            rel='stylesheet'
            type='text/css'
            href={`${_globalStore.blobUrl}/${
              _globalStore.blobUrlRootDirectory
            }/${_globalStore.companyId}/store/tailwin-css.css?${Math.random()}`}
          /> */}
           
            <link
              rel='preload stylesheet'
              as='style'
              type='text/css'
              href={`/assets/css/custom.css?${Math.random()}`}
            />

            {/* -----------------------SLIDER STYLESHEETS------------------------- */}
            <link
              rel='preload stylesheet'
              as='style'
              type='text/css'
              charSet='UTF-8'
              href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
            />
            <link
              rel='preload stylesheet'
              as='style'
              type='text/css'
              href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
            />

            {/* <script
            dangerouslySetInnerHTML={{ __html: _globalStore.customScript }}
          ></script> */}
          {/* -----------------------CSS STYLESHEETS------------------------- */}
          {!showGTM &&
            _globalStore.bottomHeaderScriptGTM &&
            _globalStore.storeId === CG_STORE_CODE && (
              <script
                type='text/javascript'
                dangerouslySetInnerHTML={{
                  __html: _globalStore.bottomHeaderScriptGTM,
                }}
              ></script>
            )}

            {/* <link
            rel='stylesheet'
            type='text/css'
            href={`${_globalStore.blobUrl}/${
              _globalStore.blobUrlRootDirectory
            }/${_globalStore.companyId}/store/${
              _globalStore.storeId
            }/css/klevu-landing-page-style.css?${Math.random()}`}
          /> */}
            <link
              rel='preload stylesheet'
              as='style'
              type='text/css'
              href={`/assets/css/klevu-landing-page-style.css?${Math.random()}`}
            />
            <link
              rel='preload stylesheet'
              as='style'
              type='text/css'
              href={`${_globalStore.blobUrl}/${
                _globalStore.blobUrlRootDirectory
              }/${_globalStore.companyId}/store/${
                _globalStore.storeId
              }/css/klevu-landing-responsive.css?${Math.random()}`}
            />
             <link
              rel='preload stylesheet'
              as='style'
              type='text/css'
              href={`${_globalStore.blobUrl}/${
                _globalStore.blobUrlRootDirectory
              }/${_globalStore.companyId}/store/${
                _globalStore.storeId
              }/css/custom.css?${Math.random()}`}
            />
          </>
        </Head>
        <body
          className={`font-Outfit ${
            _globalStore.code === 'PRSC' ? 'bg-light-gray' : ''
          }`}
        >
          {_globalStore.topBodySnippetGTM &&
            _globalStore.storeId === CG_STORE_CODE && (
              <noscript
                dangerouslySetInnerHTML={{
                  __html: _globalStore.topBodySnippetGTM,
                }}
              ></noscript>
            )}
          {_globalStore.storeId !== CG_STORE_CODE && (
            <noscript
              dangerouslySetInnerHTML={{
                __html: _globalStore.customGlobalBodyScript,
              }}
            ></noscript>
          )}
          <Main />
          <NextScript />
          {_globalStore.klaviyoKey && (
            <script
              type='application/javaScript'
              async
              src={`${process.env.NEXT_PUBLIC_KLAVIYO}?company_id=${_globalStore.klaviyoKey}`}
              crossOrigin='anonymous'
            ></script>
          )}
          {_globalStore.customFooterScript && (
            <>
              <script
                dangerouslySetInnerHTML={{
                  __html: _globalStore.customFooterScript,
                }}
              ></script>
            </>
          )}

          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.openWidget = function() {
              window.fcWidget.open()
            }`,
            }}
          />

          {(_globalStore.storeId === CG_STORE_CODE ||
            _globalStore.storeId === PKHG_STORE_CODE ||
            _globalStore.storeId === GG_STORE_CODE ||
            _globalStore.storeId === DI_STORE_CODE ||
            _globalStore.storeId === PTML_STORE_CODE) && (
            <>
              <script src='https://js.klevu.com/core/v2/klevu.js'></script>
              <script src='https://js.klevu.com/theme/default/v2/quick-search.js'></script>
              <script src='https://js.klevu.com/theme/default/v2/search-results-page.js'></script>
            </>
          )}

          {_globalStore.storeId === CG_STORE_CODE && (
            <script src={`/assets/css/cg-klevu.js?${Math.random()}`}></script>
          )}
          {_globalStore.storeId === GG_STORE_CODE && (
            <script src={`/assets/css/gg-klevu.js?${Math.random()}`}></script>
          )}
          {_globalStore.storeId === PKHG_STORE_CODE && (
            <script src={`/assets/css/pkhg-klevu.js?${Math.random()}`}></script>
          )}
          {_globalStore.storeId === DI_STORE_CODE && (
            <script src={`/assets/css/di-klevu.js?${Math.random()}`}></script>
          )}
          {_globalStore.storeId === PTML_STORE_CODE && (
            <script src={`/assets/css/petermiller-klevu.js?${Math.random()}`}></script>
          )}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
