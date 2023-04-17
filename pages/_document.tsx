import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main
} from 'next/document';
import { _globalStore } from 'store.global';
import config, { cssApis } from '../configs_v2/api.config';
import { __pagesConstant } from '../constants_v2/pages.constant';

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
          {/* -----------------------CSS STYLESHEETS------------------------- */}
          {storeId == 1 && (
            <link rel='stylesheet' type='text/css' href={cssApis[1]} />
          )}
          {storeId == 21 && (
            <link rel='stylesheet' type='text/css' href={cssApis[21]} />
          )}
          {storeId == 3 && (
            <link rel='stylesheet' type='text/css' href={cssApis[3]} />
          )}
          {storeId == 23 && (
            <link rel='stylesheet' type='text/css' href={cssApis[23]} />
          )}

          {storeId == 108 && (
            <link rel='stylesheet' type='text/css' href={cssApis[108]} />
          )}
          {storeId == 134 && (
            <link rel='stylesheet' type='text/css' href={cssApis[134]} />
          )}
          {storeId == 135 && (
            <link rel='stylesheet' type='text/css' href={cssApis[135]} />
          )}
          {storeId == 139 && (
            <link rel='stylesheet' type='text/css' href={cssApis[139]} />
          )}
          {storeId == 27 && (
            <link rel='stylesheet' type='text/css' href={cssApis[27]} />
          )}
          {storeId == 22 && (
            <link rel='stylesheet' type='text/css' href={cssApis[22]} />
          )}

          {/* ---------------------CUSTOM CSS STYLESHEETS------------------------ */}

          <link
            rel='stylesheet'
            type='text/css'
            href={`${_globalStore.blobUrl}/${
              _globalStore.blobRootDirectory
            }/${1}/store/${storeId}/css/${storeId}.css`}
          />
           <link
            rel='stylesheet'
            type='text/css'
            href={`https://redefinecommerce.blob.core.windows.net/rdcbeta/1/store/tailwin-css-29.css`}
          />
          

          <link
            rel='stylesheet'
            type='text/css'
            href={`${_globalStore.blobUrl}/${
              _globalStore.blobRootDirectory
            }/${1}/store/${storeId}/css/custom.css`}
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
            href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css'
            integrity='sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=='
            crossOrigin='anonymous'
            referrerPolicy='no-referrer'
          />

          {/* -----------------------ICONS------------------------- */}
          <link
            href={`${config.baseUrl.googleFonts}icon?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Round|Material+Icons+Sharp|Material+Icons+Two+Tone`}
            rel='stylesheet'
          />
          <link
            rel='stylesheet'
            href={`${config.baseUrl.googleFonts}css2?family=Inter:wght@400;500;600;700&display=fallback`}
          />
          <link
            rel='stylesheet'
            href={`${config.baseUrl.googleFonts}css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp`}
          />
          <link
            rel='stylesheet'
            href={`${config.baseUrl.googleFonts}css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,1,-50..200`}
          />
          <link
            rel='stylesheet'
            href={`${config.baseUrl.googleFonts}css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0`}
          />

          {/* -----------------------KLEVU------------------------- */}
          <script
            type='text/javascript'
            dangerouslySetInnerHTML={{
              __html:
                'var klevu_addPageNumberToUrl = true,klevu_addSelectedFiltersToUrl = true; ',
            }}
          ></script>

          {/* -----------------------KLAVIYO------------------------- */}
          <script
            type='text/javascript'
            src={`${config.baseUrl.klaviyo}?company_id=${__pagesConstant._document.klaviyoKey}`}
            async
          ></script>
        </Head>
        <body className='font-Outfit bg-white'>
          <Main />
          
        </body>
      </Html>
    );
  }
}

export default MyDocument;
