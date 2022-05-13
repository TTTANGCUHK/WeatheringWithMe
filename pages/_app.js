import '../styles/globals.css';
import NavBar from "../component/NavBar.js";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps} }) {
    return (
        <SessionProvider session={session} refetchInterval={5 * 60}>
            <NavBar />
            <Component {...pageProps} />
        </SessionProvider>
    )
}