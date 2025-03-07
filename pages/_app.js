import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        // Import Bootstrap JS on client-side
        import('bootstrap/dist/js/bootstrap');
    }, []);

    return <Component {...pageProps} />;
}

export default MyApp;