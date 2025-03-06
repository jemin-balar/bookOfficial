import '../styles/globals.css'
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        // Import Bootstrap JS only on client-side
        if (typeof window !== 'undefined') {
            require('bootstrap/dist/js/bootstrap.bundle.min.js');
        }
    }, []);

    return (
        <>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp;