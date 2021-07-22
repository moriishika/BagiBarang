import "tailwindcss/tailwind.css";
import "../styles/global.css";
import "../styles/animations.css";
import { useState } from "react";
import { Provider } from "next-auth/client";
import { Loading } from "../state";

const App = ({ Component, pageProps }) => {
  const [isLoading, setLoadingStatus] = useState(false);

  return (
    <Provider session={pageProps.session}>
      <Loading.Provider value={{isLoading, setLoadingStatus}}>
        <Component {...pageProps} />
      </Loading.Provider>
    </Provider>
  );
};

export default App;
