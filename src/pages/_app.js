import "tailwindcss/tailwind.css";
import "../styles/global.css";
import "../styles/animations.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import { Provider } from "next-auth/client";
import { Loading } from "../state";
import { CheckVerifiedStatus } from "../components";

const App = ({ Component, pageProps }) => {
  const [isLoading, setLoadingStatus] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Mohon Tunggu");
  const [isSuccess, setSuccessStatus] = useState(false);

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
          <Component {...pageProps} />
        </CheckVerifiedStatus>
      </Loading.Provider>
    </Provider>
  );
};

export default App;
