import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document';
import { _globalStore } from 'store.global';
import DcTags from 'tags/DcTags';
import TwitterTags from 'tags/TwitterTags';

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
          {_globalStore.googleFonts && (
            <script
              dangerouslySetInnerHTML={{ __html: _globalStore.googleFonts }}
            ></script>
          )}
          {_globalStore.customHeadScript && (
            <script
              dangerouslySetInnerHTML={{
                __html: _globalStore.customHeadScript,
              }}
            ></script>
          )}
          {_globalStore.customGoogleVerification && (
            <script
              dangerouslySetInnerHTML={{
                __html: _globalStore.customGoogleVerification,
              }}
            ></script>
          )}
          <DcTags />
          <TwitterTags />
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
          <link
            rel='stylesheet'
            type='text/css'
            href={`${_globalStore.blobUrl}/${
              _globalStore.blobUrlRootDirectory
            }/${_globalStore.companyId}/store/main.css?${Math.random()}`}
          />
          {/* -----------------------SLIDER STYLESHEETS------------------------- */}
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
          ></script>
          {/* ---------------------Google Tag Manager--------------------- */}
          {/* <script
            async
            src={`https://www.googletagmanager.com/gtm.js?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
          /> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
          window.dataLayer = window.dataLayer || [];
              
        function gtag(){
          dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
          page_path: window.location.pathname
        });
        `,
            }}
          />
          {/* ---------------------End Google Tag Manager---------------------  */}
        </Head>
        <body className='font-Outfit bg-white'>
          <noscript
            dangerouslySetInnerHTML={{
              __html: _globalStore.customGlobalBodyScript,
            }}
          ></noscript>
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
      </Html>
    );
  }
}

export default MyDocument;
