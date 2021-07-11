import 'tailwindcss/tailwind.css';
import '../styles/global.css';
import '../styles/animations.css';
import { Provider } from 'next-auth/client';

const App = ({ Component, pageProps }) => {
    return (
        <Provider session={pageProps.session}>
            <Component {...pageProps} />
        </Provider>
    )
}

export default App;