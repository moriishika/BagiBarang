import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    return await Document.getInitialProps(ctx)
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
          <link
            rel="shortcut icon"
            href="/favicon.ico"
            type="image/x-icon"
          />
          <meta name="description" content="Bagi Barang Bagi Kebaikan" />
          <meta name='bagibarang' content='Bagi Barang' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content='PWA App' />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='msapplication-config' content='/browserconfig.xml' />
          <meta name='msapplication-TileColor' content='#2B5797' />
          <meta name='msapplication-tap-highlight' content='no' />
          <meta name='theme-color' content='#000000' />

          <link rel='apple-touch-icon' href='/touch-icon-iphone.png' />
          <link rel='apple-touch-icon' sizes='152x152' href='/touch-icon-ipad.png' />
          <link rel='apple-touch-icon' sizes='180x180' href='/touch-icon-iphone-retina.png' />
          <link rel='apple-touch-icon' sizes='167x167' href='/touch-icon-ipad-retina.png' />

          <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
          <link rel='manifest' href='/manifest.json' />
          <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
          <link rel='shortcut icon' href='/favicon.ico' />

          <meta name='twitter:card' content='summary' />
          <meta name='twitter:url' content='https://bagibarang.vercel.app/' />
          <meta name='twitter:title' content='Bagi Barang' />
          <meta name='twitter:description' content='Bagi Barang Bagi Kebaikan' />
          <meta name='twitter:image' content='https://bagibarang.vercel.app/android-chrome-192x192.png' />
          <meta name='twitter:creator' content='@moriishikaa' />
          <meta property='og:type' content='website' />
          <meta property='og:title' content='PWA App' />
          <meta property='og:description' content='Bagi Barang Bagi Kebaikan' />
          <meta property='og:site_name' content='Bagi Barang' />
          <meta property='og:url' content='https://bagibarang.vercel.app' />
          <meta property='og:image' content='https://bagibarang.vercel.app/apple-touch-icon.png' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;