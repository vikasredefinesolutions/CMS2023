import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { _globalStore } from 'store.global';
import DcTags from 'tags/DcTags';
import TwitterTags from 'tags/TwitterTags';

let storeId: null | number = null;
let faviconURL: string = '';

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage;

    if (_globalStore.storeId) {
      storeId = _globalStore.storeId;
      faviconURL = _globalStore.favicon;
    }

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
          href={`${_globalStore.blobUrl}${faviconURL}`}
        />
        <Head>
          {_globalStore.googleFonts && (
            <code
              dangerouslySetInnerHTML={{ __html: _globalStore.googleFonts }}
            ></code>
          )}
          {_globalStore.customHeadScript && (
            <code
              dangerouslySetInnerHTML={{
                __html: _globalStore.customHeadScript,
              }}
            ></code>
          )}
          {_globalStore.customGoogleVerification && (
            <code
              dangerouslySetInnerHTML={{
                __html: _globalStore.customGoogleVerification,
              }}
            ></code>
          )}
          <DcTags />
          <TwitterTags />
          <link
            rel='stylesheet'
            type='text/css'
            href={`${_globalStore.blobUrl}/${_globalStore.blobRootDirectory}/${_globalStore.companyId}/store/${storeId}/css/${storeId}.css`}
          />
          <link
            rel='stylesheet'
            type='text/css'
            href={`${_globalStore.blobUrl}/${_globalStore.blobRootDirectory}/${
              _globalStore.companyId
            }/store/tailwin-css.css?${Math.random()}`}
          />
           {' '}
          <link
            rel='stylesheet'
            type='text/css'
            href={`${_globalStore.blobUrl}/${_globalStore.blobRootDirectory}/${_globalStore.companyId}/store/${storeId}/css/custom.css`}
          />
          <link
            rel='stylesheet'
            type='text/css'
            href={`${_globalStore.blobUrl}/${_globalStore.blobRootDirectory}/${
              _globalStore.companyId
            }/store/main.css?${Math.random()}`}
          />
          {/* -----------------------SLIDER STYLESHEETS------------------------- */}
          <link
            rel='stylesheet'
            type='text/css'
            href={`${_globalStore.blobUrl}/${_globalStore.blobRootDirectory}/${
              _globalStore.companyId
            }/store/main.css?${Math.random()}`}
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
        </Head>
        <body className='font-Outfit bg-white'>
          <code
            dangerouslySetInnerHTML={{
              __html: _globalStore.customGlobalBodyScript,
            }}
          ></code>
          <Main />
          <NextScript />

          {_globalStore.customFooterScript && (
            <>
              <code
                dangerouslySetInnerHTML={{
                  __html: _globalStore.customFooterScript,
                }}
              ></code>
            </>
          )}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
