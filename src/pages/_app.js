import 'tailwindcss/tailwind.css'
import '../styles/global.css'
import {Head} from 'next/document'

const App = ({Component, pageProps}) => {
    <Head>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
    </Head>
    return <Component {...pageProps}/>
}

export default App;