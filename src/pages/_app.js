import "tailwindcss/tailwind.css";
import "../styles/global.css";
import "../styles/animations.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { Provider } from "next-auth/client";
import { Loading, FetchedData, ScrollPositition } from "../state";
import { CheckVerifiedStatus } from "../components";
import {useRouter} from 'next/router';
import * as gtag from '../libs/ga';
import Script from 'next/script'

const App = ({ Component, pageProps }) => {
  const [isLoading, setLoadingStatus] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Mohon Tunggu");
  const [isSuccess, setSuccessStatus] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const [lastSkip, setLastSkip] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
    <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
    <Provider session={pageProps.session}>
      <Loading.Provider
        value={{
          isLoading,
          setLoadingStatus,
          loadingMessage,
          setLoadingMessage,
          isSuccess,
          setSuccessStatus,
        }}
      >
        <CheckVerifiedStatus {...pageProps}>
          <FetchedData.Provider
            value={{
              fetchedData,
              setFetchedData,
              lastSkip,
              setLastSkip,
              totalItems,
              setTotalItems,
            }}
          >
            <ScrollPositition.Provider
              value={{
                scrollHeight,
                setScrollHeight,
              }}
            >
              <Component {...pageProps} />
            </ScrollPositition.Provider>
          </FetchedData.Provider>
        </CheckVerifiedStatus>
      </Loading.Provider>
    </Provider>
    </>
  );
};

export default App;
