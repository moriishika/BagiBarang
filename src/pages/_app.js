import "tailwindcss/tailwind.css";
import "../styles/global.css";
import "../styles/animations.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { Provider } from "next-auth/client";
import { Loading, FetchedData } from "../state";
import { CheckVerifiedStatus } from "../components";
import Router from 'next/router';

const App = ({ Component, pageProps }) => {
  const [isLoading, setLoadingStatus] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Mohon Tunggu");
  const [isSuccess, setSuccessStatus] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const [lastSkip, setLastSkip] = useState(0);

  useEffect(() => {
    // history.scrollRestoration = "manual"

    // const cachedScroll = [];

    // Router.events.on("routeChangeStart", () => {
    //   cachedScroll.push([window.scrollX, window.scrollY]);
    // });

    // Router.beforePopState(() => {
    //   const [x, y] = cachedScroll.pop();
    //   setTimeout(() => {
    //     window.scrollTo(x, y);
    //   }, 100);

    //   return true;
    // });

    const cachedPageHeight = []
    const html = document.querySelector('html')

    Router.events.on('routeChangeStart', () => {
      cachedPageHeight.push(document.documentElement.offsetHeight)
    })

    Router.events.on('routeChangeComplete', () => {
      html.style.height = 'initial'
    })

    Router.beforePopState(() => {
      html.style.height = `${cachedPageHeight.pop()}px`

      return true
    })

  }, [])

  return (
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
              setLastSkip
            }}
          >
            <Component {...pageProps} />
          </FetchedData.Provider>
        </CheckVerifiedStatus>
      </Loading.Provider>
    </Provider>
  );
};

export default App;
