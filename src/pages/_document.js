import Document, {Html, Head, Main, NextScript} from "next/document";

class MyDocument extends Document{
    render(){
        return (
            <Html>
              <Head>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
                <link
                  rel="shortcut icon"
                  href="/icons/favicon.ico"
                  type="image/x-icon"
                />
                <meta name="description" content="Bagi Barang Bagi Kebaikan"/>
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