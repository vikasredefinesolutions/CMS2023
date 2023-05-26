import { CG_STORE_CODE } from '@constants/global.constant';
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
    return (
      <Html lang='en'>
        <link
          rel='shortcut icon'
          href={`${_globalStore.blobUrl}${_globalStore.favicon}`}
        />
        <Head>
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
          <link
            rel='stylesheet'
            type='text/css'
            href={`${_globalStore.blobUrl}/${
              _globalStore.blobUrlRootDirectory
            }/${_globalStore.companyId}/store/main.css?${Math.random()}`}
          />
          <link
            rel='stylesheet'
            type='text/css'
            href={`${_globalStore.blobUrl}/${_globalStore.blobUrlRootDirectory}/${_globalStore.companyId}/store/${_globalStore.storeId}/css/${_globalStore.storeId}.css`}
          />
          <link
            rel='stylesheet'
            type='text/css'
            href={`${_globalStore.blobUrl}/${
              _globalStore.blobUrlRootDirectory
            }/${_globalStore.companyId}/store/tailwin-css.css?${Math.random()}`}
          />
          <link
            rel='stylesheet'
            type='text/css'
            href={`${_globalStore.blobUrl}/${_globalStore.blobUrlRootDirectory}/${_globalStore.companyId}/store/${_globalStore.storeId}/css/custom.css`}
          />

          {/* -----------------------SLIDER STYLESHEETS------------------------- */}
          <link
            rel='stylesheet'
            type='text/css'
            charSet='UTF-8'
            href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
          />
          <link
            rel='stylesheet'
            type='text/css'
            href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
          />
          {/* -----------------------KLEVU------------------------- */}
          <script
            type='text/javascript'
            dangerouslySetInnerHTML={{
              __html:
                'var klevu_addPageNumberToUrl = true,klevu_addSelectedFiltersToUrl = true; ',
            }}
          ></script>
          {/* <script
            dangerouslySetInnerHTML={{ __html: _globalStore.customScript }}
          ></script> */}
          {/* -----------------------CSS STYLESHEETS------------------------- */}
          <script
            type='text/javascript'
            src='https://platform-api.sharethis.com/js/sharethis.js#property=622863e42e0ffb001379992c&product=sop'
            async={true}
          ></script>

          {_globalStore.bottomHeaderScriptGTM &&
            _globalStore.storeId === CG_STORE_CODE && (
              <script
                type='text/javascript'
                dangerouslySetInnerHTML={{
                  __html: _globalStore.bottomHeaderScriptGTM,
                }}
              ></script>
            )}
        </Head>
        <body className='font-Outfit'>
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

          {_globalStore.customFooterScript && (
            <>
              <script
                dangerouslySetInnerHTML={{
                  __html: _globalStore.customFooterScript,
                }}
              ></script>
            </>
          )}
        </body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.openWidget = function() {
              window.fcWidget.open()
            }`,
          }}
        />
      </Html>
    );
  }
}

export default MyDocument;
